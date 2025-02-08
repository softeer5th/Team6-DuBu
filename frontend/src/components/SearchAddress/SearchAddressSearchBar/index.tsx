import * as S from './SearchAddressSearchBar.styled';

import Icon from '@/components/Icon';

const SearchAddressSearchBar = ({
  query,
  handleSearch,
}: {
  query: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <S.SearchBarContainer>
      <Icon icon="Search" width={20} height={20} />
      <S.SearchInput
        placeholder="지번, 도로명, 건물명으로 검색해보세요"
        value={query}
        onChange={handleSearch}
      />
    </S.SearchBarContainer>
  );
};

export default SearchAddressSearchBar;
