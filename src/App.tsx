import { useState, useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

import { Header } from './components/Header';
import { CountrySelector } from './components/CountrySelector';
import { IDCard } from './components/IDCard';
import { ActionButtons } from './components/ActionButtons';
import { AdBanner } from './components/AdBanner';

import { useTheme } from './hooks/useTheme';
import { useCountryDetect } from './hooks/useCountryDetect';
import { generateCardData } from './utils/country-format';

import type { Country, IDCardData } from './types';

export default function App() {
  const { theme, toggle } = useTheme();
  const detectedCountry = useCountryDetect();

  const [country, setCountry] = useState<Country>(detectedCountry);
  const [cardData, setCardData] = useState<IDCardData>(() => generateCardData(detectedCountry));
  const [isGenerating, setIsGenerating] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const generate = useCallback((c: Country) => {
    setIsGenerating(true);
    // Small timeout to show the animation
    setTimeout(() => {
      setCardData(generateCardData(c));
      setIsGenerating(false);
    }, 350);
  }, []);

  const handleCountryChange = (c: Country) => {
    setCountry(c);
    generate(c);
  };

  const handleGenerate = () => generate(country);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggle} />

      {/* ── Top AdSense Banner ───────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      {/* ── Hero text ────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-2 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Generate Realistic ID Cards
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          Create fake identity cards for testing, design mockups, or educational purposes.
          Covers 195+ countries with realistic formats.
        </p>
      </div>

      {/* ── Main Content ─────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">

          {/* Left: Controls */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Configuration
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
                aria-label="Generate new random ID card"
              >
                <RefreshCw
                  size={16}
                  className={isGenerating ? 'animate-spin' : ''}
                  aria-hidden="true"
                />
                {isGenerating ? 'Generating…' : 'Generate New Card'}
              </button>
            </div>

            {/* Info card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                Card Details
              </h3>
              <dl className="space-y-2 text-sm">
                {[
                  ['Country',   cardData.country.name],
                  ['Region',    cardData.country.region],
                  ['Name',      cardData.fullName],
                  ['ID No.',    cardData.idNumber],
                  ['Issued',    cardData.dateIssued],
                  ['Expires',   cardData.dateExpiry],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between gap-2">
                    <dt className="text-gray-400 dark:text-gray-500 flex-shrink-0">{label}</dt>
                    <dd className="text-gray-700 dark:text-gray-200 font-medium text-right truncate max-w-[160px]" title={val}>{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-gray-400 dark:text-gray-600 text-center leading-relaxed px-1">
              All generated data is completely fictional and intended for testing and educational purposes only.
              Do not use for identity fraud or illegal activities.
            </p>
          </div>

          {/* Right: Card preview */}
          <div className="flex flex-col gap-5">
            <div className="animate-fade-in">
              <IDCard ref={cardRef} data={cardData} isGenerating={isGenerating} />
            </div>

            <ActionButtons cardRef={cardRef} data={cardData} />

            {/* In-content AdSense */}
            <AdBanner slot="0987654321" format="rectangle" label="Sponsored" />
          </div>
        </div>
      </main>

      {/* ── Info section (SEO content) ───────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: '195+ Countries',
              desc: 'Full coverage of all UN member states and territories, each with their own national ID format.',
            },
            {
              title: 'Realistic Formats',
              desc: 'ID numbers follow the actual format rules of each country — from SSN (US) to Aadhaar (India).',
            },
            {
              title: 'Privacy Safe',
              desc: 'All data is randomly generated in your browser. Nothing is stored or transmitted.',
            },
          ].map(({ title, desc }) => (
            <div key={title} className="text-center sm:text-left">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom AdSense Banner ────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <AdBanner slot="1122334455" format="horizontal" />
      </div>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-xs text-gray-400 dark:text-gray-600">
          <p>© {new Date().getFullYear()} Random ID Card Generator · For educational and testing use only</p>
          <p className="mt-1">
            Built with React, TypeScript &amp; Faker.js ·{' '}
            <a
              href="https://github.com/ppwnr88/random-id-card"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-400"
            >
              Open source
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
