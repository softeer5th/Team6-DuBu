import {
  ADDRESS_ICON_MAPPER,
  ADDRESS_LABEL_MAPPER,
  INITIAL_ADDRESS,
} from './SearchAddressButton.constants';
import * as S from './SearchAddressButton.styled';

import Icon from '@/components/Icon';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

interface SearchAddressButtonProps {
  type: 'home' | 'school';
  onClick: () => void;
}

const SearchAddressButton = ({ type, onClick }: SearchAddressButtonProps) => {
  const { onboardingUserInfo: userInfo } = useOnboarding();

  return (
    <S.AddressButton onClick={onClick}>
      <S.ButtonLabel>
        <Icon icon={ADDRESS_ICON_MAPPER[type]} />
        <S.LabelText>{ADDRESS_LABEL_MAPPER[type]}</S.LabelText>
      </S.ButtonLabel>
      <S.AddressText>{userInfo[`${type}Title`] || INITIAL_ADDRESS}</S.AddressText>
    </S.AddressButton>
  );
};

export default SearchAddressButton;
