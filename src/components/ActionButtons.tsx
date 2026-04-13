import { useRef, useState } from 'react';
import { Download, Copy, Check, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import type { IDCardData } from '../types';

interface ActionButtonsProps {
  cardRef: React.RefObject<HTMLDivElement>;
  data: IDCardData;
}

export function ActionButtons({ cardRef, data }: ActionButtonsProps) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `id-card-${data.country.code}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    const text = [
      `=== ID Card — ${data.country.name} ===`,
      `Full Name:     ${data.fullName}`,
      `Date of Birth: ${data.dateOfBirth}`,
      `Gender:        ${data.gender}`,
      `ID Number:     ${data.idNumber}`,
      `Nationality:   ${data.nationality}`,
      `Place of Birth:${data.placeOfBirth}`,
      `Blood Type:    ${data.bloodType}`,
      `Date Issued:   ${data.dateIssued}`,
      `Date Expiry:   ${data.dateExpiry}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard API not available */
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="
          flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
          bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
          disabled:opacity-60 disabled:cursor-not-allowed
          text-white shadow-md shadow-indigo-500/25
          transition-all duration-150
        "
        aria-label="Download ID card as PNG"
      >
        {downloading
          ? <Loader2 size={16} className="animate-spin" />
          : <Download size={16} />}
        {downloading ? 'Saving…' : 'Download PNG'}
      </button>

      <button
        onClick={handleCopy}
        className="
          flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
          bg-gray-100 hover:bg-gray-200 active:bg-gray-300
          dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600
          text-gray-700 dark:text-gray-200
          transition-all duration-150
        "
        aria-label="Copy ID card data to clipboard"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy Data'}
      </button>
    </div>
  );
}
