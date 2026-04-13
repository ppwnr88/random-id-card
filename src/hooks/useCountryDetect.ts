import { useState, useEffect } from 'react';
import { countries, countriesByCode } from '../utils/country-format/countries';
import type { Country } from '../types';

/** Detect user's country via Intl API and navigator.language, with IP geolocation fallback. */
export function useCountryDetect(): Country {
  const [detected, setDetected] = useState<Country>(() => {
    // 1. Try localStorage cache
    const cached = localStorage.getItem('preferredCountry');
    if (cached && countriesByCode[cached]) return countriesByCode[cached];

    // 2. Intl.Locale (most reliable, no network)
    try {
      const locale = new Intl.Locale(navigator.language);
      const region = locale.region ?? locale.maximize().region;
      if (region && countriesByCode[region]) return countriesByCode[region];
    } catch {
      /* ignore */
    }

    // 3. Language-to-country heuristic
    const lang = navigator.language.split('-')[0].toLowerCase();
    const langMap: Record<string, string> = {
      en: 'US', de: 'DE', fr: 'FR', es: 'ES', it: 'IT', pt: 'BR',
      zh: 'CN', ja: 'JP', ko: 'KR', ar: 'SA', ru: 'RU', hi: 'IN',
      nl: 'NL', pl: 'PL', sv: 'SE', no: 'NO', da: 'DK', fi: 'FI',
      tr: 'TR', uk: 'UA', ro: 'RO', cs: 'CZ', hu: 'HU', el: 'GR',
      he: 'IL', fa: 'IR', th: 'TH', vi: 'VN', id: 'ID', ms: 'MY',
    };
    const code = langMap[lang];
    if (code && countriesByCode[code]) return countriesByCode[code];

    // 4. Default to US
    return countriesByCode['US'];
  });

  useEffect(() => {
    // IP-based geolocation fallback (only if Intl gave us a non-specific result)
    const tryIpGeolocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
        if (!res.ok) return;
        const data: { country_code?: string } = await res.json();
        if (data.country_code && countriesByCode[data.country_code]) {
          const c = countriesByCode[data.country_code];
          setDetected(c);
          localStorage.setItem('preferredCountry', c.code);
        }
      } catch {
        /* IP geolocation is optional, silently ignore */
      }
    };

    // Only attempt if current detection is the fallback US default
    if (detected.code === 'US' && !localStorage.getItem('preferredCountry')) {
      tryIpGeolocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return detected;
}

export { countries };
