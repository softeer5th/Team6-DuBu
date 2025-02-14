import { useState } from 'react';

import Icon from '../Icon';
import useSearchAddressQuery from './hooks/useSearchAddressQuery';
import * as S from './SearchAddress.styled';
import SearchAddressHeader from './SearchAddressHeader';
import SearchAddressResult from './SearchAddressResult';
import SearchAddressSearchBar from './SearchAddressSearchBar';

import { SearchAddress as SearchAddressType } from '@/api/search';
import useMemberAddressQuery from '@/pages/MainPage/hooks/useMemberAddressQuery';
import { colors } from '@/styles/theme';

interface SearchAddressProps {
  onClose: () => void;
  onSelectAddressMain?: (title: string, coordinateX: number, coordinateY: number) => void;
  onSelectAddress?: (
    title: string,
    address: string,
    coordinateX: number,
    coordinateY: number,
  ) => void;
  isMain?: boolean;
}

const SearchAddress = ({
  onSelectAddressMain,
  onSelectAddress,
  onClose,
  isMain,
}: SearchAddressProps) => {
  const [addressInput, setAddressInput] = useState('');
  const { data: addresses = [], isLoading } = useSearchAddressQuery(addressInput);
  const { data: memberInfo } = useMemberAddressQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };

  const handleSelectAddress = (address: SearchAddressType) => {
    if (onSelectAddress) {
      onSelectAddress(
        address.title,
        address.roadAddress,
        address.x_coordinate,
        address.y_coordinate,
      );
    }

    onClose();
  };

  const handleClose = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose();
  };

  const handleSelectHome = () => {
    if (onSelectAddressMain) {
      onSelectAddressMain(
        memberInfo?.homeTitle || '',
        memberInfo?.homeXCoordinate || 0,
        memberInfo?.homeYCoordinate || 0,
      );
    }

    onClose();
  };

  const handleSelectSchool = () => {
    if (onSelectAddressMain) {
      onSelectAddressMain(
        memberInfo?.schoolTitle || '',
        memberInfo?.schoolXCoordinate || 0,
        memberInfo?.schoolYCoordinate || 0,
      );
    }

    onClose();
  };

  return (
    <S.SearchAddressLayout>
      <SearchAddressHeader onClick={handleClose} />
      <S.TopContainer>
        <SearchAddressSearchBar query={addressInput} handleSearch={handleSearch} />
        {isMain && (
          <S.ShortcutButtonContainer>
            <S.IconButtonWrapper
              icon={
                <Icon
                  icon="AddressHome"
                  width={20}
                  height={20}
                  color={colors.green300}
                  cursor="pointer"
                />
              }
              onClick={handleSelectHome}
              text="집"
            />
            <S.IconButtonWrapper
              icon={
                <Icon
                  icon="AddressUniv"
                  width={20}
                  height={20}
                  color={colors.green300}
                  cursor="pointer"
                />
              }
              color={colors.green300}
              onClick={handleSelectSchool}
              text="학교"
            />
          </S.ShortcutButtonContainer>
        )}
      </S.TopContainer>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SearchAddressResult addresses={addresses} handleSelectAddress={handleSelectAddress} />
      )}
    </S.SearchAddressLayout>
  );
};

export default SearchAddress;
