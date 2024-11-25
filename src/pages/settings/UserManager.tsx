import { Search } from '@/components/ui/search';
import { useState } from 'react';

export const UserManager = () => {
  const [value, setValue] = useState('');
  const onChange = (value: string) => {
    setValue(value);
  };
  const onSearch = () => {
    console.log('search');
  };

  return (
    <div>
      <Search value={value} onChange={onChange} onSearch={onSearch} />
    </div>
  );
};
