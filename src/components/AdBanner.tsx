import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner({ slot, format = 'auto', className = '', label = 'Advertisement' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense not loaded in dev / ad blocker */
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-label={label}>
      <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-1">
        {label}
      </p>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9540032299322636"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
