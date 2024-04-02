import { useEffect, useRef } from 'react';

import { useDeviceType } from '@/hooks/useDeviceType';

import { DeviceType } from '@/types';

const useMouseMoveEffect = (moveScale: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const echoRef = useRef<HTMLDivElement>(null);
  const echoShadowRef = useRef<HTMLDivElement>(null);
  const currentDeviceType = useDeviceType();

  useEffect(() => {
    const container = containerRef.current;
    const mainText = mainTextRef.current;
    const subText = subTextRef.current;
    const echo = echoRef.current;
    const echoShadow = echoShadowRef.current;

    if (!container || !mainText || !subText || !echo || !echoShadow) {
      return;
    }

    mainText.style.willChange = 'transform';
    subText.style.willChange = 'transform';
    echo.style.willChange = 'transform';
    echoShadow.style.willChange = 'transform';

    const handleMouseMove = (event: MouseEvent) => {
      requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;

        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;

        const offsetX = (mouseX - centerX) / centerX;
        const offsetY = (mouseY - centerY) / centerY;

        mainText.style.transform = `translate(${offsetX * moveScale}px, ${offsetY * moveScale}px)`;
        subText.style.transform = `translate(${offsetX * moveScale}px, ${offsetY * moveScale}px)`;
        echo.style.transform = `translate(calc(-50% + ${-offsetX * moveScale}px), ${-offsetY * moveScale}px)`;
        echoShadow.style.transform = `translate(calc(-50% + ${offsetX * 1}px), ${offsetY * 1}px)`;
      });
    };

    if (currentDeviceType === DeviceType.PC) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentDeviceType === DeviceType.PC) {
        container.removeEventListener('mousemove', handleMouseMove);
      }

      mainText.style.willChange = 'transform';
      subText.style.willChange = 'transform';
      echo.style.willChange = 'transform';
      echoShadow.style.willChange = 'transform';
    };
  }, [moveScale, currentDeviceType]);

  return { containerRef, mainTextRef, subTextRef, echoRef, echoShadowRef };
};

export default useMouseMoveEffect;
