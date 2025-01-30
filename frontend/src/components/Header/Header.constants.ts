import { IconType } from '../Icon';

export const BUTTONS: Record<string, { text: string; icon?: IconType }> = {
  BACK: { text: '뒤로 가기', icon: 'Chevron' },
  HOME: { text: '처음으로 가기', icon: 'Home' },
  MENU: { text: '메뉴 열기', icon: 'Menu' },
  NEXT: { text: '다음' },
  COMPLETE: { text: '완료' },
};

export const PATHS = {
  HOME: '/',
};
