import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'th' | 'zh';

export interface Translations {
  // Header
  appTitle: string;
  appSubtitle: string;
  // Hero
  heroTitle: string;
  heroDesc: string;
  // Controls
  sectionConfig: string;
  selectCountry: string;
  searchCountry: string;
  generateBtn: string;
  generatingBtn: string;
  // Card details panel
  sectionDetails: string;
  detailCountry: string;
  detailRegion: string;
  detailName: string;
  detailIdNo: string;
  detailIssued: string;
  detailExpires: string;
  // ID Card field labels
  cardNationalId: string;
  fieldFullName: string;
  fieldDOB: string;
  fieldGender: string;
  fieldNationality: string;
  fieldPOB: string;
  fieldBloodType: string;
  fieldIssued: string;
  fieldExpires: string;
  // Gender values
  male: string;
  female: string;
  // Action buttons
  copyData: string;
  copied: string;
  copyId: string;
  // Info section
  info1Title: string;
  info1Desc: string;
  info2Title: string;
  info2Desc: string;
  info3Title: string;
  info3Desc: string;
  // Disclaimer + footer
  disclaimer: string;
  footerTagline: string;
  footerBuilt: string;
  openSource: string;
}

const en: Translations = {
  appTitle: 'Random ID Card Generator',
  appSubtitle: '195+ countries worldwide',
  heroTitle: 'Generate Realistic ID Cards',
  heroDesc: 'Create fake identity cards for testing, design mockups, or educational purposes. Covers 195+ countries with realistic formats.',
  sectionConfig: 'Configuration',
  selectCountry: 'Select Country',
  searchCountry: 'Search country…',
  generateBtn: 'Generate New Card',
  generatingBtn: 'Generating…',
  sectionDetails: 'Card Details',
  detailCountry: 'Country',
  detailRegion: 'Region',
  detailName: 'Name',
  detailIdNo: 'ID No.',
  detailIssued: 'Issued',
  detailExpires: 'Expires',
  cardNationalId: 'National Identity Card',
  fieldFullName: 'Full Name',
  fieldDOB: 'Date of Birth',
  fieldGender: 'Gender',
  fieldNationality: 'Nationality',
  fieldPOB: 'Place of Birth',
  fieldBloodType: 'Blood Type',
  fieldIssued: 'Date Issued',
  fieldExpires: 'Expires',
  male: 'Male',
  female: 'Female',
  copyData: 'Copy Data',
  copied: 'Copied!',
  copyId: 'Copy ID',
  info1Title: '195+ Countries',
  info1Desc: 'Full coverage of all UN member states and territories, each with their own national ID format.',
  info2Title: 'Realistic Formats',
  info2Desc: 'ID numbers follow the actual format rules of each country — from SSN (US) to Aadhaar (India).',
  info3Title: 'Privacy Safe',
  info3Desc: 'All data is randomly generated in your browser. Nothing is stored or transmitted.',
  disclaimer: 'All generated data is completely fictional and intended for testing and educational purposes only. Do not use for identity fraud or illegal activities.',
  footerTagline: 'For educational and testing use only',
  footerBuilt: 'Built with React, TypeScript & Faker.js',
  openSource: 'Open source',
};

const th: Translations = {
  appTitle: 'เครื่องสร้างบัตรประชาชนสุ่ม',
  appSubtitle: '195+ ประเทศทั่วโลก',
  heroTitle: 'สร้างบัตรประชาชนจำลอง',
  heroDesc: 'สร้างบัตรประชาชนปลอมสำหรับการทดสอบ ออกแบบ หรือเพื่อการศึกษา รองรับ 195+ ประเทศพร้อมรูปแบบที่สมจริง',
  sectionConfig: 'การตั้งค่า',
  selectCountry: 'เลือกประเทศ',
  searchCountry: 'ค้นหาประเทศ…',
  generateBtn: 'สร้างบัตรใหม่',
  generatingBtn: 'กำลังสร้าง…',
  sectionDetails: 'รายละเอียดบัตร',
  detailCountry: 'ประเทศ',
  detailRegion: 'ภูมิภาค',
  detailName: 'ชื่อ',
  detailIdNo: 'เลขบัตร',
  detailIssued: 'วันออกบัตร',
  detailExpires: 'วันหมดอายุ',
  cardNationalId: 'บัตรประจำตัวประชาชน',
  fieldFullName: 'ชื่อ-นามสกุล',
  fieldDOB: 'วันเกิด',
  fieldGender: 'เพศ',
  fieldNationality: 'สัญชาติ',
  fieldPOB: 'สถานที่เกิด',
  fieldBloodType: 'หมู่โลหิต',
  fieldIssued: 'วันออกบัตร',
  fieldExpires: 'วันหมดอายุ',
  male: 'ชาย',
  female: 'หญิง',
  copyData: 'คัดลอกข้อมูล',
  copied: 'คัดลอกแล้ว!',
  copyId: 'คัดลอกเลขบัตร',
  info1Title: '195+ ประเทศ',
  info1Desc: 'ครอบคลุมทุกประเทศสมาชิก UN และดินแดนต่างๆ พร้อมรูปแบบบัตรประชาชนเฉพาะของแต่ละประเทศ',
  info2Title: 'รูปแบบที่สมจริง',
  info2Desc: 'เลขบัตรประชาชนตามรูปแบบจริงของแต่ละประเทศ เช่น SSN (สหรัฐฯ) หรือ Aadhaar (อินเดีย)',
  info3Title: 'ปลอดภัยด้านความเป็นส่วนตัว',
  info3Desc: 'ข้อมูลทั้งหมดสร้างแบบสุ่มในเบราว์เซอร์ ไม่มีการบันทึกหรือส่งข้อมูลใดๆ',
  disclaimer: 'ข้อมูลทั้งหมดเป็นข้อมูลสมมติ ใช้เพื่อการทดสอบและการศึกษาเท่านั้น ห้ามใช้ในการปลอมแปลงตัวตนหรือกิจกรรมที่ผิดกฎหมาย',
  footerTagline: 'สำหรับการศึกษาและทดสอบเท่านั้น',
  footerBuilt: 'สร้างด้วย React, TypeScript และ Faker.js',
  openSource: 'โอเพนซอร์ส',
};

const zh: Translations = {
  appTitle: '随机身份证生成器',
  appSubtitle: '覆盖全球195+个国家',
  heroTitle: '生成逼真的身份证',
  heroDesc: '为测试、设计原型或教育目的创建虚假身份证，覆盖195+个国家，格式真实可信。',
  sectionConfig: '配置',
  selectCountry: '选择国家',
  searchCountry: '搜索国家…',
  generateBtn: '生成新卡',
  generatingBtn: '生成中…',
  sectionDetails: '卡片详情',
  detailCountry: '国家',
  detailRegion: '地区',
  detailName: '姓名',
  detailIdNo: '证件号',
  detailIssued: '签发日期',
  detailExpires: '到期日期',
  cardNationalId: '国家身份证',
  fieldFullName: '全名',
  fieldDOB: '出生日期',
  fieldGender: '性别',
  fieldNationality: '国籍',
  fieldPOB: '出生地',
  fieldBloodType: '血型',
  fieldIssued: '签发日期',
  fieldExpires: '到期日期',
  male: '男',
  female: '女',
  copyData: '复制数据',
  copied: '已复制!',
  copyId: '复制证件号',
  info1Title: '195+个国家',
  info1Desc: '覆盖所有联合国成员国和地区，每个国家均有其本国身份证格式。',
  info2Title: '真实格式',
  info2Desc: '证件号码遵循每个国家的实际格式规则，如美国SSN、印度Aadhaar等。',
  info3Title: '隐私安全',
  info3Desc: '所有数据在您的浏览器中随机生成，不存储或传输任何信息。',
  disclaimer: '所有生成的数据完全是虚构的，仅用于测试和教育目的。请勿用于身份欺诈或违法活动。',
  footerTagline: '仅供教育和测试使用',
  footerBuilt: '基于 React、TypeScript 和 Faker.js 构建',
  openSource: '开源',
};

export const translations: Record<Lang, Translations> = { en, th, zh };

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang;
    return saved && ['en', 'th', 'zh'].includes(saved) ? saved : 'en';
  });

  const setLang = (l: Lang) => {
    localStorage.setItem('lang', l);
    setLangState(l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LangContext);
}
