// @utils/hooks/useCommaFormattingWatcher.ts
import { useEffect } from 'react';
import { UseFormWatch, UseFormSetValue, Path } from 'react-hook-form';
import { setFormattedCommaValue } from '@utils/index';

export const useCommaFormattingWatcher = <TFieldValues>(
  watch: UseFormWatch<TFieldValues>,
  setValue: UseFormSetValue<TFieldValues>,
  commaFields: Path<TFieldValues>[]
) => {
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type !== 'change' || !name) return;
      if (commaFields.includes(name as Path<TFieldValues>)) {
        setFormattedCommaValue(setValue, name as Path<TFieldValues>, (value as any)[name] || '');
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, commaFields]);
};
