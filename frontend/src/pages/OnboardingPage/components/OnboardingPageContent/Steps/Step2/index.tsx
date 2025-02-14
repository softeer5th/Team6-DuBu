import { useState } from 'react';

import SearchAddressButton from './SearchAddressButton';
import * as S from './Step2.styled';

import SearchAddress from '@/components/SearchAddress';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const Step2 = () => {
  const { setOnboardingUserInfo: setUserInfo } = useOnboarding();
  const [isSearchAddressOpen, setIsSearchAddressOpen] = useState(false);
  const [selectedAddressType, setSelectedAddressType] = useState<'home' | 'school' | null>(null);

  const updateAddress = (
    title: string,
    address: string,
    coordinateX: number,
    coordinateY: number,
  ) => {
    setUserInfo((prev) => ({
      ...prev,
      [`${selectedAddressType}Title`]: title,
      [`${selectedAddressType}Address`]: address,
      [`${selectedAddressType}AddressX`]: coordinateX,
      [`${selectedAddressType}AddressY`]: coordinateY,
    }));
  };

  const handleAddressButtonClick = (type: 'home' | 'school') => {
    setSelectedAddressType(type);
    setIsSearchAddressOpen(true);
  };

  return (
    <S.Step2Layout>
      <SearchAddressButton type="home" onClick={() => handleAddressButtonClick('home')} />
      <SearchAddressButton type="school" onClick={() => handleAddressButtonClick('school')} />

      {isSearchAddressOpen && (
        <SearchAddress
          onClose={() => setIsSearchAddressOpen(false)}
          onSelectAddress={updateAddress}
        />
      )}
    </S.Step2Layout>
  );
};

export default Step2;
