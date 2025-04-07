import { ChangeEvent } from 'react';

export const handleInputChange = <T extends Record<string, any>>(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;
  setFormData((prev: T) => ({
    ...prev,
    [name]: value
  }));
};

export const handleNumberInputChange = <T extends Record<string, any>>(
  e: ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;
  // Only allow numbers, decimal point, and minus sign
  const numericValue = value.replace(/[^0-9.-]/g, '');
  setFormData((prev: T) => ({
    ...prev,
    [name]: numericValue
  }));
};

export const formatCurrency = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(numericValue) ? '' : numericValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
}; 