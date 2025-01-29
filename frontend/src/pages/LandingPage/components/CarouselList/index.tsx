import CarouselItem from './CarouselItem';
import * as S from './CarouselList.styled';

import { IconType } from '@/components/Icon';
import { useCarousel } from '@/pages/LandingPage/hooks/useCarousel';
import { CAROUSEL_ITEMS, CAROUSEL_TIMEOUT } from '@/pages/LandingPage/LandingPage.constants';

const CarouselList = () => {
  const visibleItems = useCarousel(CAROUSEL_ITEMS, CAROUSEL_TIMEOUT);

  return (
    <S.ListLayout>
      {visibleItems.map((item, index) => (
        <CarouselItem
          key={`${item.text}-${index}`}
          icon={item.icon as IconType}
          text={item.text}
          status={item.status as 'blur' | 'focus'}
        />
      ))}
    </S.ListLayout>
  );
};

export default CarouselList;
