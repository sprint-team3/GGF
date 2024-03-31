import { useEffect, useRef } from 'react';

import { useDeviceType } from '@/hooks/useDeviceType';

import { DeviceType } from '@/types';

const useMouseMoveEffect = (moveScale: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const secondElementRef = useRef<HTMLDivElement>(null);
  const reverseElementRef = useRef<HTMLDivElement>(null);
  const currentDeviceType = useDeviceType();

  useEffect(() => {
    const container = containerRef.current;
    const element = elementRef.current;
    const secondElement = secondElementRef.current;
    const reverseElement = reverseElementRef.current;

    if (!container || !element || !reverseElement || !secondElement) {
      return;
    }

    element.style.willChange = 'transform';
    secondElement.style.willChange = 'transform';
    reverseElement.style.willChange = 'transform';

    const handleMouseMove = (event: MouseEvent) => {
      requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;

        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;

        const offsetX = (mouseX - centerX) / centerX;
        const offsetY = (mouseY - centerY) / centerY;

        element.style.transform = `translate(${offsetX * moveScale}px, ${offsetY * moveScale}px)`;
        secondElement.style.transform = `translate(${offsetX * moveScale}px, ${offsetY * moveScale}px)`;
        reverseElement.style.transform = `translate(${-offsetX * moveScale}px, ${-offsetY * moveScale}px)`;
      });
    };

    if (currentDeviceType === DeviceType.PC) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentDeviceType === DeviceType.PC) {
        container.removeEventListener('mousemove', handleMouseMove);
      }

      element.style.willChange = 'transform';
      secondElement.style.willChange = 'transform';
      reverseElement.style.willChange = 'transform';
    };
  }, [moveScale, currentDeviceType]);

  return { containerRef, elementRef, secondElementRef, reverseElementRef };
};

export default useMouseMoveEffect;
