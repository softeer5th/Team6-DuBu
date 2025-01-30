import { IconType } from '@/components/Icon';

export interface CarouselItemType {
  icon: IconType;
  text: string;
}

export type CarouselItemStatusType = 'focus' | 'blur';
