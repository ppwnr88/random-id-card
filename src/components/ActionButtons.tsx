import { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { IDCardData } from '../types';
import { useLanguage } from '../i18n';

interface ActionButtonsProps {
  cardRef: React.RefObject<HTMLDivElement>;
  data: IDCardData;
}

export function ActionButtons({ data }: ActionButtonsProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

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
        {copied ? t.copied : t.copyData}
      </button>
    </div>
  );
}
