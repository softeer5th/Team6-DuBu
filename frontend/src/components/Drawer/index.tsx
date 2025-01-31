import * as S from './Drawer.styled';
import { useDrawer } from './hooks/useDrawer';

import Icon from '@/components/Icon';

const Drawer = () => {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <S.DrawerLayout className="drawer" $isOpen={isOpen}>
      <S.Overlay onClick={closeDrawer} $isOpen={isOpen} />
      <S.Content $isOpen={isOpen}>
        <Icon icon="Doreburn" width={120} height={15} />
        <S.ButtonWrapper>
          <S.Button>주변 둘러보기</S.Button>
          <S.Button>주간 통계</S.Button>
          <S.Button>마이 페이지</S.Button>
        </S.ButtonWrapper>
      </S.Content>
    </S.DrawerLayout>
  );
};

export default Drawer;
