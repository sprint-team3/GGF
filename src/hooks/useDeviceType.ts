import { useEffect, useState } from 'react';

import { breakPoint } from '@/constants';

import { DeviceType } from '@/types';

export const useDeviceType = (): DeviceType => {
  const detectDeviceType = (): DeviceType => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

    if (windowWidth <= breakPoint.mobile) {
      return DeviceType.Mobile;
    } else if (windowWidth <= breakPoint.tablet) {
      return DeviceType.Tablet;
    } else {
      return DeviceType.PC;
    }
  };

  const [currentDeviceType, setCurrentDeviceType] = useState<DeviceType>(detectDeviceType());

  useEffect(() => {
    const handleResize = () => {
      const newDeviceType = detectDeviceType();
      setCurrentDeviceType(newDeviceType);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return currentDeviceType;
};