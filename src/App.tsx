import { useState, useRef, useCallback, useEffect } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';

import { Header } from './components/Header';
import { CountrySelector } from './components/CountrySelector';
import { IDCard } from './components/IDCard';
import { ActionButtons } from './components/ActionButtons';
import { AdBanner } from './components/AdBanner';

import { useTheme } from './hooks/useTheme';
import { useCountryDetect } from './hooks/useCountryDetect';
import { generateCardData } from './utils/country-format';
import { LanguageProvider, useLanguage } from './i18n';

import type { Country, IDCardData } from './types';

function AppContent() {
  const { theme, toggle } = useTheme();
  const { t } = useLanguage();
  const detectedCountry = useCountryDetect();

  const [country, setCountry] = useState<Country>(detectedCountry);
  const [cardData, setCardData] = useState<IDCardData>(() => generateCardData(detectedCountry));
  const [isGenerating, setIsGenerating] = useState(false);
  const [idCopied, setIdCopied] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const hasUserSelected = useRef(false);
  const idCopyTimer = useRef<ReturnType<typeof setTimeout>>();

  // Sync when IP geolocation resolves after initial render
  useEffect(() => {
    if (!hasUserSelected.current) {
      setCountry(detectedCountry);
      setCardData(generateCardData(detectedCountry));
    }
  }, [detectedCountry]);

  const generate = useCallback((c: Country) => {
    setIsGenerating(true);
    setTimeout(() => {
      setCardData(generateCardData(c));
      setIsGenerating(false);
    }, 350);
  }, []);

  const handleCountryChange = (c: Country) => {
    hasUserSelected.current = true;
    setCountry(c);
    generate(c);
  };

  const handleGenerate = () => generate(country);

  const handleCopyIdNo = async () => {
    try {
      await navigator.clipboard.writeText(cardData.idNumber);
      setIdCopied(true);
      clearTimeout(idCopyTimer.current);
      idCopyTimer.current = setTimeout(() => setIdCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const detailRows: [string, string][] = [
    [t.detailCountry, cardData.country.name],
    [t.detailRegion,  cardData.country.region],
    [t.detailName,    cardData.fullName],
    [t.detailIssued,  cardData.dateIssued],
    [t.detailExpires, cardData.dateExpiry],
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggle} />

      {/* ── Top AdSense Banner ───────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      {/* ── Hero text ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t.heroTitle}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          {t.heroDesc}
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">

        {/* ── Controls row ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto mb-8">

          {/* Configuration */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              {t.sectionConfig}
            </h3>
            <CountrySelector
              value={country}
              onChange={handleCountryChange}
              isDark={theme === 'dark'}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="
                mt-4 w-full flex items-center justify-center gap-2.5
                px-5 py-3 rounded-xl text-sm font-bold
                bg-gradient-to-r from-indigo-600 to-blue-600
                hover:from-indigo-500 hover:to-blue-500
                active:from-indigo-700 active:to-blue-700
                disabled:opacity-60 disabled:cursor-not-allowed
                text-white shadow-lg shadow-indigo-500/30
                transition-all duration-150
              "
              aria-label={t.generateBtn}
            >
              <RefreshCw
                size={16}
                className={isGenerating ? 'animate-spin' : ''}
                aria-hidden="true"
              />
              {isGenerating ? t.generatingBtn : t.generateBtn}
            </button>
          </div>

          {/* Card Details */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              {t.sectionDetails}
            </h3>
            <dl className="space-y-2 text-sm">
              {/* ID No. row — with inline copy button */}
              <div className="flex justify-between gap-2 items-center">
                <dt className="text-gray-400 dark:text-gray-500 flex-shrink-0">{t.detailIdNo}</dt>
                <dd className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="text-gray-700 dark:text-gray-200 font-mono font-medium text-right truncate"
                    title={cardData.idNumber}
                  >
                    {cardData.idNumber}
                  </span>
                  <button
                    onClick={handleCopyIdNo}
                    className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                    aria-label={t.copyId}
                    title={idCopied ? t.copied : t.copyId}
                  >
                    {idCopied
                      ? <Check size={13} className="text-green-500" />
                      : <Copy size={13} />}
                  </button>
                </dd>
              </div>

              {/* Remaining rows */}
              {detailRows.map(([label, val]) => (
                <div key={label} className="flex justify-between gap-2">
                  <dt className="text-gray-400 dark:text-gray-500 flex-shrink-0">{label}</dt>
                  <dd
                    className="text-gray-700 dark:text-gray-200 font-medium text-right truncate max-w-[180px]"
                    title={val}
                  >
                    {val}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Disclaimer */}
            <p className="text-[10px] text-gray-400 dark:text-gray-600 leading-relaxed mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              {t.disclaimer}
            </p>
          </div>
        </div>

        {/* ── ID Card ──────────────────────────────────── */}
        <div className="max-w-[520px] mx-auto mt-8">
          <div className="animate-fade-in">
            <IDCard ref={cardRef} data={cardData} isGenerating={isGenerating} />
          </div>
        </div>

        {/* ── Action buttons ───────────────────────────── */}
        <div className="max-w-[520px] mx-auto mt-4 mb-6">
          <ActionButtons cardRef={cardRef} data={cardData} />
        </div>

        {/* In-content AdSense */}
        <div className="max-w-[900px] mx-auto">
          <AdBanner slot="0987654321" format="rectangle" label="Sponsored" />
        </div>
      </main>

      {/* ── Info section ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: t.info1Title, desc: t.info1Desc },
            { title: t.info2Title, desc: t.info2Desc },
            { title: t.info3Title, desc: t.info3Desc },
          ].map(({ title, desc }) => (
            <div key={title} className="text-center sm:text-left">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom AdSense Banner ────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <AdBanner slot="1122334455" format="horizontal" />
      </div>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-gray-400 dark:text-gray-600">
          <p>© {new Date().getFullYear()} Random ID Card Generator · {t.footerTagline}</p>
          <p className="mt-1">
            {t.footerBuilt} ·{' '}
            <a
              href="https://github.com/ppwnr88/random-id-card"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-400"
            >
              {t.openSource}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
