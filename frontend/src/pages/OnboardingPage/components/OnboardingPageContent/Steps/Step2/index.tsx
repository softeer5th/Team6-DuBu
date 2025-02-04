import * as S from './Step2.styled';

import Icon from '@/components/Icon';

const Step2 = () => {
  // TODO: 주소 찾기 기능 추가

  return (
    <S.AddressButtonWrapper>
      <S.AddressButton>
        <S.ButtonLabel>
          <Icon icon="AddressHome" />
          <S.LabelText>집</S.LabelText>
        </S.ButtonLabel>
        <span>탭하여 주소찾기</span>
      </S.AddressButton>
      <S.AddressButton>
        <S.ButtonLabel>
          <Icon icon="AddressUniv" />
          <S.LabelText>학교</S.LabelText>
        </S.ButtonLabel>
        <span>탭하여 주소찾기</span>
      </S.AddressButton>
    </S.AddressButtonWrapper>
  );
};

export default Step2;
