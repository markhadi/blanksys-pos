import { Button } from './button';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const Search = ({ value, onChange, onSearch }: SearchProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-1 border border-[#E1E1E1] bg-white rounded-[6px] w-full lg:w-[258px] h-[54px] p-1 focus-within:border-[#0F172A] transition-all duration-300"
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full pl-3 focus:outline-none font-inter font-normal text-[16px] leading-[24px] text-[#0F172A] placeholder:text-[#94A3B8]"
        placeholder="Search ..."
      />
      <Button type="submit" className="find-button">
        Find
      </Button>
    </form>
  );
};
