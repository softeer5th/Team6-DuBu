import { useState } from 'react';

import useSearchAddressQuery from './hooks/useSearchAddressQuery';
import * as S from './SearchAddress.styled';
import SearchAddressHeader from './SearchAddressHeader';
import SearchAddressResult from './SearchAddressResult';
import SearchAddressSearchBar from './SearchAddressSearchBar';
import Icon from '../Icon';

import { SearchAddress as SearchAddressType } from '@/api/search';
import useMemberAddressQuery from '@/pages/MainPage/hooks/useMemberAddressQuery';
import { colors } from '@/styles/theme';

interface SearchAddressProps {
  onSelectAddress: (address: string, coordinateX: number, coordinateY: number) => void;
  onClose: () => void;
}

const SearchAddress = ({ onSelectAddress, onClose }: SearchAddressProps) => {
  const [addressInput, setAddressInput] = useState('');
  const { data: addresses = [], isLoading } = useSearchAddressQuery(addressInput);
  const { data: memberInfo } = useMemberAddressQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };

  const handleSelectAddress = (address: SearchAddressType) => {
    onSelectAddress(
      address.title || address.roadAddress,
      address.x_coordinate,
      address.y_coordinate,
    );
    onClose();
  };

  const handleClose = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose();
  };

  const handleSelectHome = () => {
    onSelectAddress(
      memberInfo?.homeAddressName || '',
      memberInfo?.homeXCoordinate || 0,
      memberInfo?.homeYCoordinate || 0,
    );
    onClose();
  };

  const handleSelectSchool = () => {
    onSelectAddress(
      memberInfo?.schoolAddressName || '',
      memberInfo?.schoolXCoordinate || 0,
      memberInfo?.schoolYCoordinate || 0,
    );
    onClose();
  };

  return (
    <S.SearchAddressLayout>
      <S.TopContainer>
        <SearchAddressHeader onClick={handleClose} />
        <SearchAddressSearchBar query={addressInput} handleSearch={handleSearch} />
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
