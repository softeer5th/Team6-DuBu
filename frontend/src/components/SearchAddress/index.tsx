import { useState } from 'react';

import useSearchAddressQuery from './hooks/useSearchAddressQuery';
import * as S from './SearchAddress.styled';
import SearchAddressHeader from './SearchAddressHeader';
import SearchAddressResult from './SearchAddressResult';
import SearchAddressSearchBar from './SearchAddressSearchBar';

import { SearchAddress as SearchAddressType } from '@/api/search';

interface SearchAddressProps {
  onSelectAddress: (address: string, coordinateX: number, coordinateY: number) => void;
  onClose: () => void;
}

const SearchAddress = ({ onSelectAddress, onClose }: SearchAddressProps) => {
  const [addressInput, setAddressInput] = useState('');
  const { data: addresses = [], isLoading } = useSearchAddressQuery(addressInput);

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

  return (
    <S.SearchAddressLayout>
      <S.TopContainer>
        <SearchAddressHeader onClick={handleClose} />
        <SearchAddressSearchBar query={addressInput} handleSearch={handleSearch} />
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
