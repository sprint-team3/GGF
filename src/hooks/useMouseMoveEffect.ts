import { useEffect, useRef } from 'react';

const useMouseMoveEffect = (moveScale: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const secondElementRef = useRef<HTMLDivElement>(null);
  const reverseElementRef = useRef<HTMLDivElement>(null);

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

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      element.style.willChange = 'transform';
      secondElement.style.willChange = 'transform';
      reverseElement.style.willChange = 'transform';
    };
  }, [moveScale]);

  return { containerRef, elementRef, secondElementRef, reverseElementRef };
};

export default useMouseMoveEffect;
