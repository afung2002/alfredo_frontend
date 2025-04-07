export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && Number(value) > 0;
};

export const validateDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const getValidationError = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      return validateEmail(value) ? null : 'Please enter a valid email address';
    case 'websiteUrl':
      return validateUrl(value) ? null : 'Please enter a valid URL';
    case 'amount':
    case 'estimatedValue':
    case 'postMoneyValuation':
      return validateNumber(value) ? null : 'Please enter a valid number';
    case 'investmentDate':
      return validateDate(value) ? null : 'Please enter a valid date';
    default:
      return validateRequired(value) ? null : 'This field is required';
  }
}; 