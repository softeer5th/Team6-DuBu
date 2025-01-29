import CarouselItem from './CarouselItem';
import * as S from './CarouselList.styled';

import { useCarousel } from '@/pages/LandingPage/hooks/useCarousel';
import { CAROUSEL_ITEMS, CAROUSEL_TIMEOUT } from '@/pages/LandingPage/LandingPage.constants';
import { CarouselItemStatusType } from '@/pages/LandingPage/LandingPage.types';

const CarouselList = () => {
  const visibleItems = useCarousel(CAROUSEL_ITEMS, CAROUSEL_TIMEOUT);

  return (
    <S.ListLayout>
      {visibleItems.map((item, index) => (
        <CarouselItem
          key={`${item.text}-${index}`}
          icon={item.icon}
          text={item.text}
          status={item.status as CarouselItemStatusType}
        />
      ))}
    </S.ListLayout>
  );
};

export default CarouselList;
