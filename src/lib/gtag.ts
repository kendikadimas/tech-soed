export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-D20W7Q7SCK';
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18553208547';
export const GOOGLE_ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || 'L2i8CNaNjrIdEOP97Y5F';
export const GOOGLE_ADS_SEND_TO = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;

/**
 * Kirim event kustom ke Google Analytics / Google Ads via gtag
 */
export const trackEvent = (action: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, params);
  }
};

/**
 * Event snippet resmi Google Ads: gtag_report_conversion
 * Mengirimkan conversion ke AW-18553208547/L2i8CNaNjrIdEOP97Y5F
 */
export const gtag_report_conversion = (url?: string): boolean => {
  if (typeof window !== 'undefined') {
    const win = window as unknown as {
      gtag_report_conversion?: (url?: string) => boolean;
      gtag?: (...args: unknown[]) => void;
    };

    if (typeof win.gtag_report_conversion === 'function') {
      return win.gtag_report_conversion(url);
    }

    if (typeof win.gtag === 'function') {
      const callback = () => {
        if (typeof url !== 'undefined') {
          window.location.href = url;
        }
      };

      win.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_SEND_TO,
        value: 1.0,
        currency: 'IDR',
        event_callback: callback,
      });
      return false;
    }
  }
  return false;
};

/**
 * Kirim conversion event ke Google Ads
 * Menggunakan label default Contact conversion 'L2i8CNaNjrIdEOP97Y5F'
 */
export const trackGoogleAdsConversion = (label?: string, url?: string) => {
  if (typeof window !== 'undefined') {
    if (!label || label === GOOGLE_ADS_CONVERSION_LABEL) {
      gtag_report_conversion(url);
      return;
    }

    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof win.gtag === 'function') {
      const sendTo = `${GOOGLE_ADS_ID}/${label}`;
      win.gtag('event', 'conversion', {
        send_to: sendTo,
        value: 1.0,
        currency: 'IDR',
        ...(url ? {
          event_callback: () => {
            window.location.href = url;
          }
        } : {})
      });
    }
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

  // 2. Google Ads conversion (AW-18553208547/L2i8CNaNjrIdEOP97Y5F)
  trackGoogleAdsConversion(label);
};
