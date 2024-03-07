import Image from 'next/image';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { MyNotifications } from '@/apis/myNotifications';
import { SVGS } from '@/constants';

export const Alram = () => {
  const [isExistedAlram, setIsExistedAlram] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { data, isSuccess } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => MyNotifications.get(),
    staleTime: 300 * 1000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setIsExistedAlram(data.data.totalCount > 0);
    }
  }, [isSuccess, data]);

  const handleToggleAlramActivation = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <button onClick={handleToggleAlramActivation}>
      <Image
        src={
          isExistedAlram
            ? isActive
              ? SVGS.alramActive3.url
              : SVGS.alramActive2.url
            : isActive
              ? SVGS.alramActive.url
              : SVGS.alramDefault.url
        }
        alt='alramImage'
        width={42}
        height={42}
        priority
      />
    </button>
  );
};
