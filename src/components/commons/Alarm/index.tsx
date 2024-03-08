import Image from 'next/image';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { MyNotifications } from '@/apis/myNotifications';
import { SVGS, TIMES } from '@/constants';

export const Alarm = () => {
  const [isExistedAlarm, setIsExistedAlarm] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { data, isSuccess } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => MyNotifications.get(),
    staleTime: TIMES.FIVE_MINUTES,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setIsExistedAlarm(data.data.totalCount > 0);
    }
  }, [isSuccess, data]);

  const handleToggleAlarmActivation = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <button onClick={handleToggleAlarmActivation}>
      <Image
        src={
          isExistedAlarm
            ? isActive
              ? SVGS.alarm.activeFull.url
              : SVGS.alarm.inactiveFull.url
            : isActive
              ? SVGS.alarm.activeEmpty.url
              : SVGS.alarm.inactiveEmpty.url
        }
        alt={
          isExistedAlarm
            ? isActive
              ? SVGS.alarm.activeFull.url
              : SVGS.alarm.inactiveFull.url
            : isActive
              ? SVGS.alarm.activeEmpty.url
              : SVGS.alarm.inactiveEmpty.url
        }
        width={42}
        height={42}
        priority
      />
    </button>
  );
};
