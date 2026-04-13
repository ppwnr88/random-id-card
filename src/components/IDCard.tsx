import { forwardRef, useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import type { IDCardData } from '../types';
import { getFlag } from '../utils/country-format/countries';
import { useLanguage } from '../i18n';

interface IDCardProps {
  data: IDCardData;
  isGenerating?: boolean;
}

// ── Region → card gradient theme ─────────────────────────────────────────────

const regionGradients: Record<string, { from: string; via: string; to: string; accent: string }> = {
  Americas: { from: '#0f172a', via: '#1e3a5f', to: '#0f172a', accent: '#60a5fa' },
  Europe:   { from: '#0f172a', via: '#1e1b4b', to: '#0f172a', accent: '#818cf8' },
  Asia:     { from: '#0f172a', via: '#1a2e1a', to: '#0f172a', accent: '#4ade80' },
  Africa:   { from: '#0f172a', via: '#2d1a0e', to: '#0f172a', accent: '#fb923c' },
  Oceania:  { from: '#0f172a', via: '#0f2233', to: '#0f172a', accent: '#22d3ee' },
};

function PhotoPlaceholder() {
  return (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="80" height="100" fill="rgba(255,255,255,0.05)" rx="4" />
      <circle cx="40" cy="35" r="18" fill="rgba(255,255,255,0.15)" />
      <path d="M5 100 Q5 65 40 65 Q75 65 75 100Z" fill="rgba(255,255,255,0.15)" />
    </svg>
  );
}

function Chip() {
  return (
    <div className="w-14 h-10 rounded-md flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #d4a843 0%, #f5d478 40%, #c69b2e 100%)' }}>
      <svg viewBox="0 0 40 28" className="w-full h-full opacity-40">
        <rect x="0" y="9" width="40" height="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="14" y="0" width="12" height="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="8" y="4" width="24" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

function Barcode({ value }: { value: string }) {
  const bars: { width: number; isSpace: boolean }[] = [];
  const seed = value.replace(/[^A-Z0-9]/gi, '').padEnd(20, '0').slice(0, 20);
  for (const ch of seed) {
    const code = ch.charCodeAt(0);
    bars.push({ width: (code % 3) + 1, isSpace: false });
    bars.push({ width: (code % 2) + 1, isSpace: true });
  }

  return (
    <div className="flex items-end gap-0 h-12" aria-hidden="true">
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{ width: `${bar.width * 2.5}px`, backgroundColor: bar.isSpace ? 'transparent' : 'rgba(255,255,255,0.85)' }}
          className="h-full rounded-sm"
        />
      ))}
    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <div className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-0.5 truncate">
        {label}
      </div>
      <div className={`text-white text-xs sm:text-sm font-semibold truncate ${mono ? 'font-mono' : ''}`}>
        {value}
      </div>
    </div>
  );
}

export const IDCard = forwardRef<HTMLDivElement, IDCardProps>(({ data, isGenerating }, ref) => {
  const { country, fullName, dateOfBirth, gender, idNumber, idLabel, nationality, dateIssued, dateExpiry, placeOfBirth, bloodType } = data;
  const flag = getFlag(country.code);
  const theme = regionGradients[country.region] ?? regionGradients.Americas;
  const { t } = useLanguage();

  const [copied, setCopied] = useState(false);
  const handleCopyId = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(idNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [idNumber]);

  return (
    <div
      ref={ref}
      className={`
        relative w-full rounded-3xl overflow-hidden select-none
        shadow-2xl shadow-black/50
        transition-all duration-500
        ${isGenerating ? 'scale-95 opacity-60' : 'scale-100 opacity-100'}
      `}
      style={{
        aspectRatio: '1.586 / 1',
        background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 50%, ${theme.to} 100%)`,
      }}
    >
      {/* Holographic shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        aria-hidden="true"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,1) 20px, rgba(255,255,255,1) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,1) 20px, rgba(255,255,255,1) 21px)',
        }}
        aria-hidden="true"
      />

      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ backgroundColor: theme.accent, transform: 'translate(30%, -30%)' }}
        aria-hidden="true"
      />

      {/* ── Card Content ──────────────────────────────────── */}
      <div className="relative h-full flex flex-col p-4 sm:p-7">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl sm:text-5xl flex-shrink-0 leading-none" aria-label={country.name}>
              {flag}
            </span>
            <div className="min-w-0">
              <div className="text-white font-bold text-xs sm:text-base leading-tight uppercase tracking-widest truncate">
                {country.name}
              </div>
              <div className="text-white/40 text-[9px] sm:text-xs uppercase tracking-widest mt-0.5">
                {t.cardNationalId}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Chip />
            {/* Hologram circle */}
            <div
              className="w-10 h-10 rounded-full border border-white/20 flex-shrink-0 hidden sm:flex items-center justify-center"
              style={{
                background: `conic-gradient(from 0deg, ${theme.accent}33, transparent, ${theme.accent}33, transparent)`,
              }}
              aria-hidden="true"
            >
              <div className="w-5 h-5 rounded-full border border-white/30" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-3" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}60, transparent)` }} aria-hidden="true" />

        {/* Body */}
        <div className="flex gap-4 flex-1 min-h-0">
          {/* Photo */}
          <div
            className="flex-shrink-0 rounded-xl overflow-hidden border border-white/15"
            style={{ width: 'clamp(64px, 13%, 110px)', aspectRatio: '4/5' }}
          >
            <PhotoPlaceholder />
          </div>

          {/* Fields grid */}
          <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-3 content-start min-w-0">
            <div className="col-span-2">
              <Field label={t.fieldFullName} value={fullName} />
            </div>
            <Field label={t.fieldDOB} value={dateOfBirth} />
            <Field label={t.fieldGender} value={gender === 'Male' ? t.male : t.female} />
            <Field label={t.fieldNationality} value={nationality} />
            <Field label={t.fieldPOB} value={placeOfBirth} />
            <Field label={t.fieldBloodType} value={bloodType} />
            <Field label={t.fieldIssued} value={dateIssued} />
          </div>
        </div>

        {/* Footer strip */}
        <div className="mt-3">
          <div className="h-px w-full mb-3" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}60, transparent)` }} aria-hidden="true" />
          <div className="flex items-end justify-between gap-4">
            <div className="flex-shrink-0 min-w-0">
              <div className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-1 truncate">
                {idLabel}
              </div>
              <div className="flex items-center gap-2">
                <div className="font-mono text-white font-bold text-xs sm:text-base tracking-wider">
                  {idNumber}
                </div>
                <button
                  data-html2canvas-ignore
                  onClick={handleCopyId}
                  className="flex-shrink-0 p-0.5 rounded text-white/40 hover:text-white/80 transition-colors duration-150"
                  aria-label={`Copy ${idLabel}`}
                  title={copied ? t.copied : t.copyId}
                >
                  {copied
                    ? <Check size={13} className="text-green-400" />
                    : <Copy size={13} />}
                </button>
              </div>
            </div>

            <div className="flex items-end gap-4 flex-shrink-0">
              <div className="text-right">
                <div className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-1">
                  {t.fieldExpires}
                </div>
                <div className="font-mono text-white font-bold text-xs sm:text-base">
                  {dateExpiry}
                </div>
              </div>
              <div aria-hidden="true">
                <Barcode value={idNumber} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

IDCard.displayName = 'IDCard';
