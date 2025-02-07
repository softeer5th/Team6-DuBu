import * as S from './SearchAddressResult.styled';

import { SearchAddress as SearchAddressType } from '@/api/search';
import Icon from '@/components/Icon';

interface SearchAddressResultProps {
  addresses: SearchAddressType[];
  handleSelectAddress: (address: SearchAddressType) => void;
}

const SearchAddressResult = ({ addresses, handleSelectAddress }: SearchAddressResultProps) => {
  return (
    <S.SearchResultContainer>
      <S.SearchResultTitle>검색 결과</S.SearchResultTitle>
      <S.SearchResultList>
        {addresses.length > 0 ? (
          addresses.map((item) => (
            <S.SearchResultItem key={item.title} onClick={() => handleSelectAddress(item)}>
              <S.ResultIconWrapper>
                <Icon icon="Map" width={20} height={20} />
              </S.ResultIconWrapper>
              <S.AddressWrapper>
                <S.ResultItemTitle>{item.title}</S.ResultItemTitle>
                <S.ResultItemAddress>{item.roadAddress}</S.ResultItemAddress>
              </S.AddressWrapper>
            </S.SearchResultItem>
          ))
        ) : (
          <S.SearchResultEmpty>
            <S.ResultEmptyText>
              <span>검색 결과가 없어요.</span>
              <span>아래의 조합으로 검색해볼까요?</span>
            </S.ResultEmptyText>
            <S.ResultEmptySuggestion>
              <span>도로명 + 건물 번호</span>
              <span>지역명 + 번지</span>
              <span>건물명, 아파트명</span>
            </S.ResultEmptySuggestion>
          </S.SearchResultEmpty>
        )}
      </S.SearchResultList>
    </S.SearchResultContainer>
  );
};

export default SearchAddressResult;
