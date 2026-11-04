export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-D20W7Q7SCK';
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18553208547';
export const GOOGLE_ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || '';

/**
 * Kirim event kustom ke Google Analytics / Google Ads via gtag
 */
export const trackEvent = (action: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, params);
  }
};

/**
 * Kirim conversion event ke Google Ads
 * Jika label diberikan atau dikonfigurasi melalui GOOGLE_ADS_CONVERSION_LABEL, kirim ke AW-18553208547/LABEL
 */
export const trackGoogleAdsConversion = (label?: string) => {
  if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
    const conversionLabel = label || GOOGLE_ADS_CONVERSION_LABEL;
    const sendTo = conversionLabel ? `${GOOGLE_ADS_ID}/${conversionLabel}` : GOOGLE_ADS_ID;

    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'conversion', {
      send_to: sendTo,
      value: 1.0,
      currency: 'IDR',
    });
  }
};

/**
 * Helper terpadu untuk tracking konversi Lead (Klik WhatsApp, Submit Form, dsb.)
 * Mentriggger generate_lead, contact, dan Google Ads conversion sekaligus
 */
export const trackLeadConversion = (source: string, label?: string) => {
  // 1. Google Analytics 4 events
  trackEvent('generate_lead', {
    event_category: 'engagement',
    event_label: source,
  });
  trackEvent('contact', {
    method: 'whatsapp',
    source,
  });

  // 2. Google Ads conversion
  trackGoogleAdsConversion(label);
};

