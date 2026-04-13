import { faker } from '@faker-js/faker';

/**
 * Returns a realistic ID number string for the given country code.
 * Uses faker.helpers.fromRegExp for pattern-based generation.
 */
export function generateIdNumber(countryCode: string, dob: Date, gender: 'Male' | 'Female'): string {
  const r = (pattern: RegExp): string => faker.helpers.fromRegExp(pattern);
  const rnd = (min: number, max: number): number => faker.number.int({ min, max });
  const pad = (n: number, len: number): string => String(n).padStart(len, '0');

  const yy = pad(dob.getFullYear() % 100, 2);
  const mm = pad(dob.getMonth() + 1, 2);
  const dd = pad(dob.getDate(), 2);
  const yyyy = String(dob.getFullYear());

  switch (countryCode) {
    // ── Americas ─────────────────────────────────────
    case 'US': return r(/[0-8][0-9]{2}-[0-9]{2}-[1-9][0-9]{3}/);              // SSN
    case 'CA': return r(/[0-9]{3}-[0-9]{3}-[0-9]{3}/);                        // SIN
    case 'MX': {                                                                // CURP
      const g = gender === 'Male' ? 'H' : 'M';
      return r(/[A-Z]{4}[0-9]{6}/) + g + r(/[A-Z]{5}[0-9A-Z][0-9]/);
    }
    case 'BR': return r(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/);            // CPF
    case 'AR': return r(/[0-9]{2}\.[0-9]{3}\.[0-9]{3}/);                      // DNI
    case 'CL': return r(/[0-9]{7,8}-[0-9K]/);                                  // RUT
    case 'CO': return r(/[0-9]{10}/);                                           // Cédula
    case 'PE': return r(/[0-9]{8}/);                                            // DNI
    case 'VE': return r(/[VE]-[0-9]{7,8}/);                                    // Cédula
    case 'EC': return r(/[0-9]{10}/);
    case 'BO': return r(/[0-9]{7,8}[A-Z]{2}/);
    case 'PY': return r(/[0-9]{7}/);
    case 'UY': return r(/[0-9]{7}-[0-9]/);
    case 'CR': return r(/[1-9][0-9]{8}/);
    case 'PA': return r(/[0-9]{1,2}-[0-9]{3,4}-[0-9]{4,5}/);
    case 'DO': return r(/[0-9]{11}/);
    case 'GT': return r(/[0-9]{13}/);                                           // DPI
    case 'HN': return r(/[0-9]{13}/);
    case 'NI': return r(/[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]/);
    case 'SV': return r(/[0-9]{8}-[0-9]/);
    case 'CU': return r(/[0-9]{11}/);
    case 'JM': return r(/[A-Z]{2}[0-9]{7}/);

    // ── Europe ───────────────────────────────────────
    case 'GB': return r(/[A-Z]{2}[0-9]{6}[A-D]/);                             // NI Number
    case 'DE': {                                                                // Personalausweis
      const letters = 'LMNPRTVWXY';
      return letters[rnd(0, 9)] + r(/[0-9C][0-9LMNPRTVWXY]{5}[0-9]{3}/);
    }
    case 'FR': {                                                                // INSEE
      const g2 = gender === 'Male' ? '1' : '2';
      return `${g2} ${yy} ${mm} ${r(/[0-9]{2}/)} ${r(/[0-9]{3}/)} ${r(/[0-9]{3}/)} ${r(/[0-9]{2}/)}`;
    }
    case 'IT': {                                                                // Codice fiscale
      const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
      const vowels = 'AEIOU';
      const months = 'ABCDEHLMPRST';
      const cn = () => consonants[rnd(0, consonants.length - 1)];
      const vw = () => vowels[rnd(0, vowels.length - 1)];
      const nameCode = cn() + cn() + vw() + cn() + cn() + vw();
      const gDay = gender === 'Male' ? pad(rnd(1, 28), 2) : pad(rnd(41, 71), 2);
      return `${nameCode}${yy}${months[dob.getMonth()]}${gDay}${r(/[A-Z][0-9]{3}[A-Z]/)}`;
    }
    case 'ES': return r(/[0-9]{8}[A-Z]/);                                      // DNI
    case 'PT': return r(/[0-9]{9}/);                                            // NIF
    case 'NL': return r(/[0-9]{9}/);                                            // BSN
    case 'BE': return `${yy}.${mm}.${dd}-${r(/[0-9]{3}.[0-9]{2}/)}`;          // NRBE
    case 'SE': return `${yy}${mm}${dd}-${r(/[0-9]{4}/)}`;                     // Personnummer
    case 'NO': return `${dd}${mm}${yy}${r(/[0-9]{5}/)}`;                      // Fødselsnummer
    case 'DK': return `${dd}${mm}${yy}-${r(/[0-9]{4}/)}`;                     // CPR
    case 'FI': return `${dd}${mm}${yy}${faker.helpers.arrayElement(['+', '-', 'A'])}${r(/[0-9]{3}[A-Y0-9]/)}`;
    case 'PL': return `${yy}${mm}${dd}${r(/[0-9]{5}/)}`;                      // PESEL
    case 'CZ': return `${yy}${mm}${dd}/${r(/[0-9]{3,4}/)}`;                   // Rodné číslo
    case 'SK': return `${yy}${mm}${dd}/${r(/[0-9]{3,4}/)}`;
    case 'HU': return r(/[0-9]{6}[A-Z]{2}/);
    case 'RO': return `${gender === 'Male' ? '1' : '2'}${yy}${mm}${dd}${r(/[0-9]{6}/)}`;  // CNP
    case 'BG': return r(/[0-9]{10}/);
    case 'HR': return r(/[0-9]{11}/);                                           // OIB
    case 'SI': return r(/[0-9]{13}/);
    case 'RS': return r(/[0-9]{13}/);
    case 'BA': return `${dd}${mm}${yyyy.slice(-3)}${r(/[0-9]{6}/)}`;
    case 'AL': return r(/[A-Z][0-9]{8}[A-Z]/);
    case 'GR': return r(/[A-Z]{2}[0-9]{6}/);                                   // ΑΔΤ
    case 'AT': return r(/[A-Z][0-9]{8}/);
    case 'CH': return r(/756\.[0-9]{4}\.[0-9]{4}\.[0-9]{2}/);                 // AHV
    case 'LU': return r(/[0-9]{13}/);
    case 'IE': return r(/[0-9]{7}[A-Z]{1,2}/);                                 // PPS
    case 'IS': return `${dd}${mm}${yy}-${r(/[0-9]{4}/)}`;                     // Kennitala
    case 'MT': return r(/[0-9]{7}[A-Z]/);
    case 'LV': return `${dd}${mm}${yy}-${r(/[01][0-9]{4}/)}`;
    case 'LT': return `${gender === 'Male' ? '3' : '4'}${yy}${mm}${dd}${r(/[0-9]{4}/)}`;
    case 'EE': return `${gender === 'Male' ? '3' : '4'}${yy}${mm}${dd}${r(/[0-9]{4}/)}`;
    case 'MD': return r(/[0-9]{13}/);
    case 'UA': return r(/[0-9]{10}/);
    case 'BY': return r(/[0-9]{7}[A-Z][0-9]{3}[A-Z]{2}[0-9]/);
    case 'RU': return r(/[0-9]{4} [0-9]{6}/);                                  // Russian passport series+no
    case 'MK': return r(/[0-9]{13}/);
    case 'ME': return r(/[0-9]{13}/);
    case 'XK': return r(/[0-9]{10}/);

    // ── Asia ─────────────────────────────────────────
    case 'CN': {                                                                // 18-digit Resident ID
      const regions = ['110', '120', '130', '140', '150', '210', '220', '230', '310', '320', '330', '340', '350', '360', '370', '410', '420', '430', '440', '450', '460', '500', '510', '520', '530', '540', '610', '620', '630', '640', '650'];
      const region = faker.helpers.arrayElement(regions);
      return `${region}${r(/[0-9]{3}/)}${yyyy}${mm}${dd}${r(/[0-9]{3}[0-9Xx]/)}`;
    }
    case 'JP': return r(/[0-9]{12}/);                                           // My Number
    case 'KR': {                                                                // Resident Registration Number
      const g2 = gender === 'Male'
        ? (dob.getFullYear() < 2000 ? '1' : '3')
        : (dob.getFullYear() < 2000 ? '2' : '4');
      return `${yy}${mm}${dd}-${g2}${r(/[0-9]{6}/)}`;
    }
    case 'IN': return r(/[2-9][0-9]{3} [0-9]{4} [0-9]{4}/);                  // Aadhaar
    case 'PK': return r(/[0-9]{5}-[0-9]{7}-[0-9]/);                           // CNIC
    case 'BD': return r(/[0-9]{17}/);
    case 'LK': return `${yy}${r(/[0-9]{7}[VX]/)}`;
    case 'NP': return r(/[0-9]{5}-[0-9]{7}/);
    case 'MY': {                                                                // MyKad
      const g3 = gender === 'Male' ? rnd(1, 9) * 2 - 1 : rnd(1, 9) * 2;
      return `${yy}${mm}${dd}-${r(/[0-9]{2}/)}-${r(/[0-9]{3}/)}${g3}`;
    }
    case 'SG': {                                                                // NRIC
      const prefix = dob.getFullYear() < 2000 ? 'S' : 'T';
      return `${prefix}${r(/[0-9]{7}[A-Z]/)}`;
    }
    case 'ID': {                                                                // NIK
      const gDay2 = gender === 'Male' ? pad(rnd(1, 28), 2) : pad(rnd(41, 68), 2);
      return `${r(/[0-9]{6}/)}${yy}${mm}${gDay2}${r(/[0-9]{4}/)}`;
    }
    case 'PH': return r(/[0-9]{4}-[0-9]{7}-[0-9]/);                           // PhilSys
    case 'VN': return r(/0[0-9]{11}/);                                          // CCCD 12 digits
    case 'TH': return `${r(/[1-8]/)}${r(/[0-9]{12}/)}`;                       // 13-digit Thai NID
    case 'MM': return r(/[0-9]{6}\/[A-Z]{6}\([A-Z]\)[0-9]{6}/);
    case 'KH': return r(/[0-9]{9}/);
    case 'SA': {                                                                // Saudi NID
      const prefix2 = gender === 'Male' ? '1' : '2';
      return `${prefix2}${r(/[0-9]{9}/)}`;
    }
    case 'AE': return r(/784-[0-9]{4}-[0-9]{7}-[0-9]/);                       // Emirates ID
    case 'QA': return r(/[0-9]{11}/);
    case 'KW': return `${r(/[12]/)}${yy}${mm}${dd}${r(/[0-9]{4}/)}`;
    case 'BH': return r(/[0-9]{9}/);
    case 'OM': return r(/[0-9]{8}/);
    case 'JO': return r(/[0-9]{10}/);
    case 'LB': return r(/[0-9]{8}/);
    case 'SY': return r(/[0-9]{11}/);
    case 'IQ': return r(/[0-9]{12}/);
    case 'IR': return r(/[0-9]{10}/);
    case 'IL': return r(/[0-9]{9}/);
    case 'YE': return r(/[0-9]{9}/);
    case 'PS': return r(/[0-9]{9}/);
    case 'KZ': return r(/[0-9]{12}/);
    case 'UZ': return r(/[A-Z]{2}[0-9]{7}/);
    case 'TM': return r(/[A-Z][0-9]{7}/);
    case 'TJ': return r(/[A-Z][0-9]{8}/);
    case 'KG': return r(/[A-Z]{2}[0-9]{7}/);
    case 'AZ': return r(/[A-Z]{3}[0-9]{8}/);
    case 'AM': return r(/[A-Z]{2}[0-9]{7}/);
    case 'GE': return r(/[0-9]{11}/);
    case 'MN': return r(/[A-Z]{2}[0-9]{8}/);
    case 'TW': return r(/[A-Z][12][0-9]{8}/);
    case 'BN': return r(/[0-9]{8}/);
    case 'TL': return r(/[0-9]{10}/);
    case 'MV': return r(/[A-Z][0-9]{6}/);
    case 'BT': return r(/[0-9]{11}/);
    case 'LA': return r(/[A-Z]{2}[0-9]{6}/);
    case 'KP': return r(/[0-9]{7}-[0-9]{7}/);
    case 'AF': return r(/[0-9]{11}/);

    // ── Africa ───────────────────────────────────────
    case 'ZA': {                                                                // SA ID 13-digit
      const g4 = gender === 'Male' ? r(/[5-9][0-9]{3}/) : r(/[0-4][0-9]{3}/);
      return `${yy}${mm}${dd}${g4}08${r(/[0-9]/)}`;
    }
    case 'NG': return r(/[0-9]{11}/);                                           // NIN
    case 'EG': {                                                                // Egyptian 14-digit
      const g5 = gender === 'Male' ? '2' : '3';
      return `${g5}${yy}${mm}${dd}${r(/[0-9]{7}/)}`;
    }
    case 'KE': return r(/[0-9]{8}/);
    case 'GH': return `GHA-${r(/[0-9]{9}/)}-${r(/[0-9]/)}`;                  // Ghana Card
    case 'MA': return r(/[A-Z]{1,2}[0-9]{6}/);                                 // CIN
    case 'TN': return r(/[0-9]{8}/);
    case 'DZ': return r(/[0-9]{18}/);
    case 'ET': return r(/[A-Z]{2}[0-9]{9}/);
    case 'TZ': return r(/[0-9]{9}-[0-9]{5}-[0-9]{5}-[0-9]{2}/);
    case 'UG': return r(/CM[0-9]{14}/);
    case 'SD': return r(/[0-9]{15}/);
    case 'SS': return r(/[0-9]{9}/);
    case 'SN': return r(/[0-9]{13}/);
    case 'CD': return r(/[0-9]{11}/);
    case 'CG': return r(/[0-9]{9}/);
    case 'CM': return r(/[0-9]{11}/);
    case 'ZM': return r(/[0-9]{9}\/[0-9]{2}/);
    case 'ZW': return r(/[0-9]{2}-[0-9]{6}[A-Z][0-9]{2}/);
    case 'AO': return r(/[0-9]{9}[A-Z]{2}[0-9]/);
    case 'MZ': return r(/[0-9]{12}/);
    case 'NA': return r(/[0-9]{11}/);
    case 'BW': return r(/[0-9]{9}/);
    case 'RW': return r(/1[0-9]{15}/);
    case 'LY': return r(/[0-9]{12}/);
    case 'GA': return r(/[0-9]{11}/);
    case 'CI': return r(/[A-Z]{2}[0-9]{6}[A-Z]/);
    case 'MG': return r(/[0-9]{12}/);
    case 'MU': return r(/[A-Z][0-9]{4}[0-9]{6}[A-Z]/);
    case 'SC': return r(/[A-Z]{2}[0-9]{7}/);

    // ── Oceania ──────────────────────────────────────
    case 'AU': return r(/[A-Z]{1,2}[0-9]{6,8}/);
    case 'NZ': return r(/[A-Z]{2}[0-9]{6}/);
    case 'FJ': return r(/[A-Z][0-9]{6}/);
    case 'PG': return r(/[0-9]{9}/);

    // ── Generic fallback ─────────────────────────────
    default:   return r(/[A-Z]{2}[0-9]{7}[A-Z]/);
  }
}
