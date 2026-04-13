export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export interface Country {
  code: string;
  name: string;
  nativeName?: string;
  region: Region;
  fakerLocale?: string;
}

export type Gender = 'Male' | 'Female';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface IDCardData {
  country: Country;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  idNumber: string;
  nationality: string;
  dateIssued: string;
  dateExpiry: string;
  placeOfBirth: string;
  bloodType: BloodType;
  address: string;
}
