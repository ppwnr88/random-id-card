import {
  faker,
  fakerAR,
  fakerAZ,
  fakerCS_CZ,
  fakerDA,
  fakerDE,
  fakerDE_AT,
  fakerDE_CH,
  fakerEL,
  fakerEN,
  fakerEN_AU,
  fakerEN_CA,
  fakerEN_GB,
  fakerEN_GH,
  fakerEN_IE,
  fakerEN_IN,
  fakerEN_NG,
  fakerEN_US,
  fakerEN_ZA,
  fakerES,
  fakerES_MX,
  fakerFA,
  fakerFI,
  fakerFR,
  fakerFR_LU,
  fakerHE,
  fakerHR,
  fakerHU,
  fakerHY,
  fakerID_ID,
  fakerIT,
  fakerJA,
  fakerKA_GE,
  fakerKO,
  fakerLV,
  fakerMK,
  fakerNB_NO,
  fakerNE,
  fakerNL,
  fakerNL_BE,
  fakerPL,
  fakerPT_BR,
  fakerPT_PT,
  fakerRO,
  fakerRU,
  fakerSK,
  fakerSR_RS_latin,
  fakerSV,
  fakerTH,
  fakerTR,
  fakerUK,
  fakerUR,
  fakerVI,
  fakerZH_CN,
  fakerZH_TW,
  type Faker,
} from '@faker-js/faker';

import type { Country, IDCardData, Gender, BloodType } from '../../types';
import { generateIdNumber } from './idFormats';

// ── Faker locale map ─────────────────────────────────────────────────────────

const localeMap: Record<string, Faker> = {
  ar:          fakerAR,
  az:          fakerAZ,
  cs_CZ:       fakerCS_CZ,
  da:          fakerDA,
  de:          fakerDE,
  de_AT:       fakerDE_AT,
  de_CH:       fakerDE_CH,
  el:          fakerEL,
  en:          fakerEN,
  en_AU:       fakerEN_AU,
  en_CA:       fakerEN_CA,
  en_GB:       fakerEN_GB,
  en_GH:       fakerEN_GH,
  en_IE:       fakerEN_IE,
  en_IN:       fakerEN_IN,
  en_NG:       fakerEN_NG,
  en_NZ:       fakerEN_AU,   // NZ falls back to AU locale
  en_SG:       fakerEN_GB,   // SG falls back to GB locale
  en_US:       fakerEN_US,
  en_ZA:       fakerEN_ZA,
  es:          fakerES,
  es_MX:       fakerES_MX,
  fa:          fakerFA,
  fi:          fakerFI,
  fr:          fakerFR,
  fr_LU:       fakerFR_LU,
  he:          fakerHE,
  hr:          fakerHR,
  hu:          fakerHU,
  hy:          fakerHY,
  id_ID:       fakerID_ID,
  it:          fakerIT,
  ja:          fakerJA,
  ka:          fakerKA_GE,
  ko:          fakerKO,
  lv:          fakerLV,
  mk:          fakerMK,
  nb_NO:       fakerNB_NO,
  ne:          fakerNE,
  nl:          fakerNL,
  nl_BE:       fakerNL_BE,
  pl:          fakerPL,
  pt_BR:       fakerPT_BR,
  pt_PT:       fakerPT_PT,
  ro:          fakerRO,
  ru:          fakerRU,
  sk:          fakerSK,
  sr_RS_latin: fakerSR_RS_latin,
  sv:          fakerSV,
  th:          fakerTH,
  tl:          fakerEN,      // Tagalog not available, fall back to EN
  tr:          fakerTR,
  uk:          fakerUK,
  ur:          fakerUR,
  vi:          fakerVI,
  zh_CN:       fakerZH_CN,
  zh_TW:       fakerZH_TW,
};

// Countries where family name comes first
const familyNameFirst = new Set(['CN', 'JP', 'KR', 'KP', 'TW', 'VN', 'HU', 'MN']);

const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function getFakerInstance(country: Country): Faker {
  if (country.fakerLocale && localeMap[country.fakerLocale]) {
    return localeMap[country.fakerLocale];
  }
  return faker;
}

function formatDate(date: Date, fmt: string): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = String(date.getFullYear());
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const mon = months[date.getMonth()];

  switch (fmt) {
    case 'DD/MM/YYYY': return `${d}/${m}/${y}`;
    case 'MM/DD/YYYY': return `${m}/${d}/${y}`;
    case 'YYYY-MM-DD': return `${y}-${m}-${d}`;
    case 'DD MMM YYYY': return `${d} ${mon} ${y}`;
    default: return `${d}/${m}/${y}`;
  }
}

function getDateFormat(code: string): string {
  const us  = new Set(['US', 'PH']);
  const iso  = new Set(['CN', 'JP', 'KR', 'KP', 'TW', 'MN', 'KZ', 'UZ', 'TM', 'TJ', 'KG', 'AZ']);
  if (us.has(code))  return 'MM/DD/YYYY';
  if (iso.has(code)) return 'YYYY-MM-DD';
  return 'DD/MM/YYYY';
}

function getNationality(country: Country): string {
  const map: Record<string, string> = {
    US:'American', GB:'British', DE:'German', FR:'French', IT:'Italian',
    ES:'Spanish', PT:'Portuguese', NL:'Dutch', BE:'Belgian', SE:'Swedish',
    NO:'Norwegian', DK:'Danish', FI:'Finnish', CH:'Swiss', AT:'Austrian',
    PL:'Polish', CZ:'Czech', SK:'Slovak', HU:'Hungarian', RO:'Romanian',
    BG:'Bulgarian', HR:'Croatian', SI:'Slovenian', RS:'Serbian', UA:'Ukrainian',
    RU:'Russian', BY:'Belarusian', GR:'Greek', TR:'Turkish', CN:'Chinese',
    JP:'Japanese', KR:'Korean', IN:'Indian', ID:'Indonesian', PH:'Filipino',
    VN:'Vietnamese', TH:'Thai', MY:'Malaysian', SG:'Singaporean', PK:'Pakistani',
    BD:'Bangladeshi', LK:'Sri Lankan', NP:'Nepali', MM:'Burmese', KH:'Cambodian',
    SA:'Saudi', AE:'Emirati', QA:'Qatari', KW:'Kuwaiti', BH:'Bahraini',
    OM:'Omani', JO:'Jordanian', LB:'Lebanese', SY:'Syrian', IQ:'Iraqi',
    IR:'Iranian', IL:'Israeli', EG:'Egyptian', MA:'Moroccan', DZ:'Algerian',
    TN:'Tunisian', LY:'Libyan', NG:'Nigerian', GH:'Ghanaian', KE:'Kenyan',
    ZA:'South African', ET:'Ethiopian', TZ:'Tanzanian', UG:'Ugandan',
    SD:'Sudanese', MX:'Mexican', BR:'Brazilian', AR:'Argentine', CL:'Chilean',
    CO:'Colombian', PE:'Peruvian', VE:'Venezuelan', EC:'Ecuadorian',
    CA:'Canadian', AU:'Australian', NZ:'New Zealander',
  };
  return map[country.code] ?? `${country.name.replace(/ \(.*\)/, '')} National`;
}

export function generateCardData(country: Country): IDCardData {
  const f = getFakerInstance(country);

  // Generate person data
  const gender: Gender = f.helpers.arrayElement(['Male', 'Female'] as Gender[]);
  const sex = gender === 'Male' ? 'male' : 'female';

  const dob = f.date.birthdate({ min: 18, max: 75, mode: 'age' });

  let firstName: string;
  let lastName: string;

  try {
    firstName = f.person.firstName(sex);
    lastName  = f.person.lastName(sex);
  } catch {
    firstName = fakerEN.person.firstName(sex);
    lastName  = fakerEN.person.lastName(sex);
  }

  const isReversed = familyNameFirst.has(country.code);
  const fullName = isReversed
    ? `${lastName} ${firstName}`
    : `${firstName} ${lastName}`;

  const dateFmt  = getDateFormat(country.code);
  const dobStr   = formatDate(dob, dateFmt);

  // Issue date: 1-10 years ago
  const issueDate = new Date(dob);
  issueDate.setFullYear(dob.getFullYear() + 18 + f.number.int({ min: 0, max: 57 }));
  const yearsAgo = f.number.int({ min: 0, max: 9 });
  issueDate.setFullYear(Math.max(issueDate.getFullYear(), new Date().getFullYear() - yearsAgo));
  if (issueDate > new Date()) {
    issueDate.setFullYear(new Date().getFullYear() - f.number.int({ min: 0, max: 5 }));
  }

  // Expiry: 5 or 10 years after issue
  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(issueDate.getFullYear() + f.helpers.arrayElement([5, 10]));

  const issuedStr  = formatDate(issueDate, dateFmt);
  const expiryStr  = formatDate(expiryDate, dateFmt);

  const idNumber  = generateIdNumber(country.code, dob, gender);
  const bloodType = f.helpers.arrayElement(bloodTypes);

  let address: string;
  try {
    address = `${f.location.streetAddress()}, ${f.location.city()}`;
  } catch {
    address = `${fakerEN.location.streetAddress()}, ${fakerEN.location.city()}`;
  }

  let placeOfBirth: string;
  try {
    placeOfBirth = f.location.city();
  } catch {
    placeOfBirth = fakerEN.location.city();
  }

  return {
    country,
    firstName,
    lastName,
    fullName,
    dateOfBirth: dobStr,
    gender,
    idNumber,
    nationality: getNationality(country),
    dateIssued:  issuedStr,
    dateExpiry:  expiryStr,
    placeOfBirth,
    bloodType,
    address,
  };
}
