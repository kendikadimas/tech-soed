"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from './LangContext';

interface Room {
  id: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  anchor: { x: number; y: number };
  path: string;
  dot: { x: number; y: number };
  polygon: string;
  textPos: { top?: string; bottom?: string; left?: string; right?: string };
}

const rooms: Room[] = [
  {
    id: 'marketing',
    titleId: 'Marketing & Strategi',
    titleEn: 'Marketing & Strategy',
    descId: 'Riset pasar mendalam, strategi branding digital, dan optimasi target audiens bisnis.',
    descEn: 'Market research, digital branding strategy, and high-conversion audience optimization.',
    anchor: { x: 540, y: 860 },
    path: 'M 540 860 L 540 300 L 360 150',
    dot: { x: 360, y: 150 },
    polygon: '40,360 440,220 920,740 560,1100 60,770',
    textPos: { top: '4.5%', left: '3%' },
  },
  {
    id: 'software',
    titleId: 'Pengembangan Software',
    titleEn: 'Software Development',
    descId: 'Arsitektur sistem handal, clean code terstandar, integrasi API, dan database scalable.',
    descEn: 'Robust architecture, clean code standards, seamless API integrations, and scalable databases.',
    anchor: { x: 1080, y: 540 },
    path: 'M 1080 540 L 1080 220 L 1340 100',
    dot: { x: 1340, y: 100 },
    polygon: '1030,120 1640,460 1220,780 620,360',
    textPos: { top: '2.5%', left: '58%' },
  },
  {
    id: 'concept',
    titleId: 'Ruang Konsep',
    titleEn: 'Concept room',
    descId: 'Brainstorming ide kreatif, perancangan arsitektur UX, dan prototype antarmuka interaktif.',
    descEn: 'Creative concept ideation, user experience wireframing, and interactive UI prototyping.',
    anchor: { x: 1860, y: 880 },
    path: 'M 1860 880 L 1860 180',
    dot: { x: 1860, y: 180 },
    polygon: '1500,480 2280,720 1820,1240 1340,760',
    textPos: { top: '3.5%', right: '5%' },
  },
  {
    id: 'app',
    titleId: 'Aplikasi',
    titleEn: 'Application',
    descId: 'Produk digital siap rilis (Web & Mobile Apps) performa tinggi, responsif, dan siap scale.',
    descEn: 'High-performance Web & Mobile applications, fully responsive and ready to scale.',
    anchor: { x: 1280, y: 1260 },
    path: 'M 1280 1260 L 1280 1560 L 1580 1660',
    dot: { x: 1580, y: 1660 },
    polygon: '1150,840 1640,1180 1160,1600 680,1180',
    textPos: { bottom: '2%', left: '69%' },
  },
];

export default function IsometricOffice() {
  const { lang } = useLang();
  // Marketing as default initial active room
  const [activeRoomId, setActiveRoomId] = useState<string>('marketing');

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  return (
    <div 
      style={{ aspectRatio: '2400 / 1792' }}
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-2xl border border-slate-200/80 dark:border-slate-800 select-none group/office"
    >
      {/* 1. Base Isometric Illustration */}
      <Image
        src="/assets/isometric-techsoe.jpeg"
        alt="TechSoe Isometric Interactive Studio"
        fill
        sizes="(max-width: 1024px) 100vw, 750px"
        className="object-contain object-center pointer-events-none"
        priority
      />

      {/* 2. Interactive SVG Layer: Invisible Hit Areas, Clean Line, and Terminal Dot */}
      <svg
        viewBox="0 0 2400 1792"
        className="absolute inset-0 w-full h-full z-20 overflow-visible"
      >
        {/* Invisible Interactive Polygon Hit Areas (Clean, no blue highlights) */}
        {rooms.map((room) => (
          <polygon
            key={`poly-${room.id}`}
            points={room.polygon}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setActiveRoomId(room.id)}
            onClick={() => setActiveRoomId(room.id)}
            aria-label={lang === 'id' ? room.titleId : room.titleEn}
          />
        ))}

        {/* Anchor Origin Point in the room */}
        <circle
          cx={activeRoom.anchor.x}
          cy={activeRoom.anchor.y}
          r="4.5"
          fill="#0f172a"
        />

        {/* Animated Futuristic Connector Line */}
        <motion.path
          key={`path-${activeRoom.id}`}
          d={activeRoom.path}
          fill="none"
          stroke="#0f172a"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Terminal Dot next to text */}
        <motion.circle
          key={`dot-${activeRoom.id}`}
          cx={activeRoom.dot.x}
          cy={activeRoom.dot.y}
          r="8"
          fill="#0f172a"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.25 }}
        />
      </svg>

      {/* 3. Minimalist Floating Callout (Title & Description) */}
      <div className="absolute inset-0 pointer-events-none z-25 p-2 sm:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoom.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              ...activeRoom.textPos,
            }}
            className="absolute max-w-[130px] sm:max-w-[185px] md:max-w-[230px] text-left"
          >
            {/* Room Title */}
            <h4 className="font-geist text-xs sm:text-sm md:text-base font-bold text-slate-900 leading-tight mb-0.5 sm:mb-1 tracking-tight">
              {lang === 'id' ? activeRoom.titleId : activeRoom.titleEn}
            </h4>

            {/* Room Description */}
            <p className="font-geist text-[8.5px] sm:text-[11px] md:text-xs text-slate-600 leading-relaxed font-normal">
              {lang === 'id' ? activeRoom.descId : activeRoom.descEn}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
