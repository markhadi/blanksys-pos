import { Button } from './button';
import { KeyboardEvent } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const Search = ({ value, onChange, onSearch }: SearchProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('🔍 Search triggered by Enter key:', value);
      if (value.trim()) {
        onSearch();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🔄 Search input changed:', e.target.value);
    onChange(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('🔍 Search triggered by button click:', value);
    onSearch();
  };

  return (
    <div className="flex items-center gap-1 border border-[#E1E1E1] bg-white rounded-[6px] w-full sm:w-[220px] md:w-[258px] h-[54px] p-1 focus-within:border-[#0F172A] transition-all duration-300">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full pl-3 focus:outline-none font-inter font-normal text-[16px] leading-[24px] text-[#0F172A] placeholder:text-[#94A3B8]"
        placeholder="Search ..."
      />
      <Button onClick={handleSearchClick} className="find-button" type="button">
        Find
      </Button>
    </div>
  );
};
