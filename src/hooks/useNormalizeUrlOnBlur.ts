// @utils/hooks/useNormalizeUrlOnBlur.ts
import { useCallback } from 'react';
import { UseFormSetValue, Path, UseFormWatch } from 'react-hook-form';
import { normalizeUrl } from '@utils/index';

export const useNormalizeUrlOnBlur = <TFieldValues>(
  fieldName: Path<TFieldValues>,
  setValue: UseFormSetValue<TFieldValues>,
  watch: UseFormWatch<TFieldValues>
) => {
  return useCallback(() => {
    const value = watch(fieldName) as string;
    if (value && typeof value === 'string') {
      setValue(fieldName, normalizeUrl(value) as any, { shouldValidate: true });
    }
  }, [watch, setValue, fieldName]);
};
