import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const useFormattedTime = (dateString: string): string => {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const date = dayjs(dateString);
      const now = dayjs();
      const diffMinutes = now.diff(date, 'minutes');
      const diffHours = now.diff(date, 'hours');
      const diffDays = now.diff(date, 'days');
      const diffMonths = now.diff(date, 'months');

      if (diffMinutes < 5) {
        setFormattedTime('Just now');
      } else if (diffMinutes < 60) {
        setFormattedTime(`${diffMinutes} minutes ago`);
      } else if (diffHours < 24) {
        setFormattedTime(date.fromNow());
      } else if (diffDays < 30) {
        setFormattedTime(date.format('ddd [at] HH:mm'));
      } else {
        setFormattedTime(diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`);
      }
    };

    updateTime();

    // Update every 60 seconds
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [dateString]);

  return formattedTime;
};
