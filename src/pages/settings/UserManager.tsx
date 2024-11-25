import { ActionHeader } from '@/components/ui/ActionHeader';
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
      <ActionHeader
        searchProps={{ value, onChange, onSearch }}
        actionButton={{ label: 'Add New', onClick: () => {} }}
      />
    </div>
  );
};
