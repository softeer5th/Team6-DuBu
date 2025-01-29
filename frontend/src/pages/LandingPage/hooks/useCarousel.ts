import { useEffect, useState } from 'react';

import { CarouselItemType } from '../LandingPage.types';

export const useCarousel = (items: CarouselItemType[], timeout: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemCount = items.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, timeout);

    return () => clearInterval(interval);
  }, [itemCount, timeout]);

  const getVisibleItems = () => {
    const prevIndex = (currentIndex - 1 + itemCount) % itemCount;
    const nextIndex = (currentIndex + 1) % itemCount;

    return [
      { ...items[prevIndex], status: 'blur' },
      { ...items[currentIndex], status: 'focus' },
      { ...items[nextIndex], status: 'blur' },
    ];
  };

  return getVisibleItems();
};
