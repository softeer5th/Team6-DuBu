import * as S from './CarouselItem.styled';

import Icon from '@/components/Icon';
import { CarouselItemStatusType, CarouselItemType } from '@/pages/LandingPage/LandingPage.types';

export interface CarouselItemProps extends CarouselItemType {
  status: CarouselItemStatusType;
}

const CarouselItem = ({ icon, text, status }: CarouselItemProps) => {
  return (
    <S.ItemLayout $status={status}>
      <Icon icon={icon} />
      <S.Text>{text}</S.Text>
    </S.ItemLayout>
  );
};

export default CarouselItem;
