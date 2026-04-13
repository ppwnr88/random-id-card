import Select, { type StylesConfig, type SingleValue, components, type OptionProps, type SingleValueProps } from 'react-select';
import { countries, getFlag } from '../utils/country-format/countries';
import type { Country } from '../types';

interface CountryOption {
  value: string;
  label: string;
  country: Country;
  flag: string;
}

const options: CountryOption[] = countries
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((c) => ({
    value: c.code,
    label: c.name,
    country: c,
    flag: getFlag(c.code),
  }));

const OptionComponent = (props: OptionProps<CountryOption>) => (
  <components.Option {...props}>
    <span className="flex items-center gap-2">
      <span className="text-lg leading-none" aria-hidden="true">{props.data.flag}</span>
      <span className="text-sm">{props.data.label}</span>
      <span className="ml-auto text-xs text-gray-400 font-mono">{props.data.value}</span>
    </span>
  </components.Option>
);

const SingleValueComponent = (props: SingleValueProps<CountryOption>) => (
  <components.SingleValue {...props}>
    <span className="flex items-center gap-2">
      <span className="text-lg leading-none" aria-hidden="true">{props.data.flag}</span>
      <span className="text-sm font-medium">{props.data.label}</span>
    </span>
  </components.SingleValue>
);

interface CountrySelectorProps {
  value: Country;
  onChange: (country: Country) => void;
  isDark?: boolean;
}

export function CountrySelector({ value, onChange, isDark = false }: CountrySelectorProps) {
  const selected = options.find((o) => o.value === value.code) ?? null;

  const styles: StylesConfig<CountryOption> = {
    control: (base, state) => ({
      ...base,
      minHeight: '44px',
      borderRadius: '10px',
      borderColor: state.isFocused
        ? '#6366f1'
        : isDark ? '#374151' : '#e5e7eb',
      backgroundColor: isDark ? '#111827' : '#ffffff',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
      '&:hover': { borderColor: '#6366f1' },
      cursor: 'pointer',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '10px',
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDark ? '#3730a3' : '#e0e7ff'
        : state.isFocused
          ? isDark ? '#374151' : '#f3f4f6'
          : 'transparent',
      color: isDark ? '#f3f4f6' : '#111827',
      cursor: 'pointer',
      padding: '8px 12px',
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? '#f3f4f6' : '#111827',
    }),
    input: (base) => ({
      ...base,
      color: isDark ? '#f3f4f6' : '#111827',
    }),
    placeholder: (base) => ({
      ...base,
      color: isDark ? '#6b7280' : '#9ca3af',
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '280px',
      padding: '4px',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: isDark ? '#6b7280' : '#9ca3af',
      '&:hover': { color: isDark ? '#d1d5db' : '#6b7280' },
    }),
  };

  return (
    <div>
      <label
        htmlFor="country-select"
        className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2"
      >
        Select Country
      </label>
      <Select<CountryOption>
        inputId="country-select"
        options={options}
        value={selected}
        onChange={(opt: SingleValue<CountryOption>) => {
          if (opt) {
            onChange(opt.country);
            localStorage.setItem('preferredCountry', opt.country.code);
          }
        }}
        components={{ Option: OptionComponent, SingleValue: SingleValueComponent }}
        styles={styles}
        isSearchable
        placeholder="Search country..."
        aria-label="Select country"
      />
    </div>
  );
}
