"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { t } from '../translations';
import { useLang } from './LangContext';
import {
  Users,
  CheckCircle2,
  Award,
  Zap,
  Grid
} from 'lucide-react';

function TransparentVideo({ src }: { src: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animId: number;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let hasStarted = false;

    const processFrame = () => {
      // Only start drawing once the video is actually playing and past the initial load frames
      if (video.readyState >= 2 && video.currentTime > 0.2 && ctx) {
        hasStarted = true;
      }

      if (hasStarted && ctx) {
        if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        if (canvas.width > 0 && canvas.height > 0) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = frame.data;
          const len = data.length;

          // Sample background color from a small inset to avoid edge compression artifacts
          const sampleX = 4;
          const sampleY = 4;
          const sampleIdx = (sampleY * canvas.width + sampleX) * 4;
          const refR = data[sampleIdx] !== undefined ? data[sampleIdx] : data[0];
          const refG = data[sampleIdx + 1] !== undefined ? data[sampleIdx + 1] : data[1];
          const refB = data[sampleIdx + 2] !== undefined ? data[sampleIdx + 2] : data[2];

          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Calculate distance to the sampled background color
            const diffR = Math.abs(r - refR);
            const diffG = Math.abs(g - refG);
            const diffB = Math.abs(b - refB);

            // Key out pixels that match the background color with a smooth transition
            if (diffR < 35 && diffG < 35 && diffB < 35) {
              const maxDiff = Math.max(diffR, diffG, diffB);
              if (maxDiff < 15) {
                data[i + 3] = 0; // Fully transparent
              } else {
                // Smooth transition gradient
                data[i + 3] = Math.floor(((maxDiff - 15) / 20) * 255);
              }
            }
          }
          ctx.putImageData(frame, 0, 0);

          // Smoothly fade-in canvas once processing begins
          if (canvas.style.opacity !== '1') {
            canvas.style.opacity = '1';
          }
        }
      }
      animId = requestAnimationFrame(processFrame);
    };

    video.play().catch(() => {});
    animId = requestAnimationFrame(processFrame);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        style={{
          opacity: 0,
          transition: 'opacity 0.4s ease-in-out',
          filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 25px rgba(56, 189, 248, 0.55)) drop-shadow(0 20px 50px rgba(0, 100, 255, 0.3))'
        }}
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}

export default function HeroSection() {
  const { lang } = useLang();

  // Mapping icons to stats
  const statIcons = [CheckCircle2, Users, Award, Zap];
  const statColors = ['text-blue-900', 'text-blue-600', 'text-blue-900', 'text-blue-600'];

  const heroStats = t[lang].heroStats || [];

  return (
    <>
      <section className="relative min-h-[85vh] lg:min-h-screen flex items-center pt-28 pb-16 md:pt-28 md:pb-20 lg:pt-28 lg:pb-20 px-6 md:px-16 lg:px-32 overflow-hidden bg-gradient-to-br from-[#0c4cb4] via-[#053787] to-[#01173d] text-white">
        {/* Background Grid Pattern Overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
        
        {/* Dot Matrix Pattern */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] opacity-80 pointer-events-none" />

        {/* Ambient Glowing Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Large Overlapping Translucent Silhouette Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Giant Circle 1 - Top Left Layer */}
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              rotate: [0, 6, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-[25%] -left-[15%] w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] lg:w-[950px] lg:h-[950px] rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 backdrop-blur-[1px] pointer-events-none"
          />

          {/* Giant Circle 2 - Overlapping Top Right & Center */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              x: [0, 25, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[5%] left-[20%] sm:left-[30%] w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] rounded-full bg-gradient-to-tl from-cyan-400/10 via-sky-300/5 to-transparent border border-cyan-200/10 pointer-events-none"
          />

          {/* Giant Circle 3 - Bottom Left Intersecting Layer */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-[30%] -left-[10%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[750px] lg:h-[750px] rounded-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent border border-white/10 pointer-events-none"
          />

          {/* Giant Concentric Dashed Ring Silhouette */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[1000px] sm:h-[1000px] lg:w-[1250px] lg:h-[1250px] rounded-full border border-dashed border-white/10 pointer-events-none"
          />

          {/* Soft Curved Silhouette - Bottom Right */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              rotate: [-4, 4, -4]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] lg:w-[750px] lg:h-[750px] rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-400/5 to-transparent border border-cyan-400/10 pointer-events-none"
          />
        </div>



        <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-10">
          
          {/* RIGHT COLUMN: TRANSPARENT LOGO ANIMATION WITH TILTED OVAL PORTAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-[320px] sm:h-[440px] lg:h-[560px] xl:h-[600px] flex items-center justify-center pointer-events-none order-1 lg:order-2 my-2 lg:my-0"
          >
            {/* Main Visual Container */}
            <div className="relative w-full h-full pointer-events-auto flex items-center justify-center">

              {/* TILTED OVAL PORTAL BACKDROP */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                {/* Deep ambient radial glow */}
                <div className="absolute w-[75%] h-[90%] bg-gradient-to-b from-cyan-300/20 via-sky-400/15 to-blue-600/5 blur-[70px] rounded-full" />

                {/* Portal SVG — portrait-oriented tilted oval layers */}
                <motion.div
                  animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 420 560"
                    className="w-full h-full max-w-[320px] max-h-[426px] sm:max-w-[440px] sm:max-h-[586px] lg:max-w-[560px] lg:max-h-[746px] xl:max-w-[600px] xl:max-h-[800px]"
                    style={{ filter: 'drop-shadow(0 0 50px rgba(14,165,233,0.45))' }}
                  >
                    <defs>
                      {/* Centre radial: white → cyan → transparent */}
                      <radialGradient id="ovalSpotlight" cx="50%" cy="44%" r="50%" fx="50%" fy="44%">
                        <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="28%"  stopColor="#e0f7ff" stopOpacity="0.96" />
                        <stop offset="52%"  stopColor="#7dd3fc" stopOpacity="0.75" />
                        <stop offset="75%"  stopColor="#0ea5e9" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                      </radialGradient>

                      {/* Glow filter for oval rings */}
                      <filter id="ringGlow" x="-15%" y="-15%" width="130%" height="130%">
                        <feGaussianBlur stdDeviation="4" result="blur"/>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                      </filter>
                    </defs>

                    {/* Filled oval spotlight — slightly taller than wide, tilted ~-8° */}
                    <ellipse
                      cx="210" cy="248" rx="155" ry="210"
                      fill="url(#ovalSpotlight)"
                      transform="rotate(-8 210 248)"
                    />

                    {/* Ring 1 — inner glowing border */}
                    <ellipse
                      cx="210" cy="248" rx="158" ry="213"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeOpacity="0.9"
                      transform="rotate(-8 210 248)"
                      filter="url(#ringGlow)"
                    />

                    {/* Ring 2 — middle dim ring */}
                    <ellipse
                      cx="210" cy="248" rx="188" ry="248"
                      fill="none"
                      stroke="#7dd3fc"
                      strokeWidth="1.2"
                      strokeOpacity="0.45"
                      transform="rotate(-8 210 248)"
                    />

                    {/* Ring 3 — outer faint dashed ring */}
                    <ellipse
                      cx="210" cy="248" rx="208" ry="278"
                      fill="none"
                      stroke="#bae6fd"
                      strokeWidth="1"
                      strokeOpacity="0.25"
                      strokeDasharray="8 14"
                      transform="rotate(-8 210 248)"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* TRANSPARENT ANIMATED LOGO — scaled, centered on the oval */}
              <div className="relative z-10 w-full h-full max-w-[350px] max-h-[350px] sm:max-w-[480px] sm:max-h-[480px] lg:max-w-[600px] lg:max-h-[600px] xl:max-w-[650px] xl:max-h-[650px] flex items-center justify-center" style={{ marginTop: '-10%' }}>
                <TransparentVideo src="/animatelogo.mp4" />
              </div>

            </div>
          </motion.div>

          {/* LEFT COLUMN: TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-4 order-2 lg:order-1"
          >
            <h1 className="text-[1.35rem] sm:text-[2rem] lg:text-[2.7rem] xl:text-[3.375rem] font-black leading-tight text-white mb-4 lg:mb-8 tracking-tight">
              {t[lang].heroTitle.includes('&') ? (
                <>
                  {t[lang].heroTitle.split('&')[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300"> {t[lang].heroTitle.split('&')[1]}</span>
                </>
              ) : t[lang].heroTitle.includes('dan') ? (
                <>
                  {t[lang].heroTitle.split('dan')[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300"> dan {t[lang].heroTitle.split('dan')[1]}</span>
                </>
              ) : (
                t[lang].heroTitle
              )}
            </h1>

            {/* Description - Unified for both Mobile & Desktop */}
            <p className="text-sm sm:text-base lg:text-lg text-blue-100/80 max-w-xl leading-relaxed mb-8 lg:mb-10 font-medium opacity-90 px-4 lg:px-0">
              {t[lang].heroDesc}
            </p>

            {/* Buttons - Unified for both Mobile & Desktop */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 lg:px-0">
              <Link
                href="#harga"
                className="bg-blue-600 hover:bg-blue-700 text-white min-h-[44px] px-8 py-3.5 lg:py-4 rounded-2xl font-bold text-sm lg:text-base shadow-2xl shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {t[lang].heroBtnStart}
              </Link>
              <Link
                href="#portfolio"
                className="bg-transparent text-white border-2 border-white/20 min-h-[44px] px-8 py-3.5 lg:py-4 rounded-2xl font-bold text-sm lg:text-base hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <Grid className="w-4 h-4 shrink-0" />
                {t[lang].heroBtnPort}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wavy Curve */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg className="relative block w-full h-[40px] md:h-[60px] lg:h-[80px]" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C360,130 1080,10 1440,60 L1440,120 L0,120 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Honest Stats Section */}
      <div className="bg-white py-14 border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {heroStats.map((stat: any, index: number) => {
              const Icon = statIcons[index % statIcons.length];
              const color = statColors[index % statColors.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-50 ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-black text-slate-900 mb-1 leading-none">{stat.value}</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
