// components/SortDropdown.tsx
import React from 'react';
import { MenuItem, Select, FormControl } from '@mui/material';

export type SortOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  minWidth?: number;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  options,
  value,
  onChange,
  minWidth = 200,
}) => {
  return (
    <FormControl variant="standard" sx={{ minWidth }}>
      <Select
       className="text-right"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disableUnderline
        sx={{ fontWeight: 500, fontSize: '14px', color: 'black' }}
      >
        {options.map(({ label, value, disabled }) => (
          <MenuItem key={value} value={value} disabled={disabled} className="flex flex-row-reverse">
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
