import styled from 'styled-components';

export const SearchResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2rem 2rem 0 0;
  flex-grow: 1;
  overflow-y: auto;
`;

export const SearchResultTitle = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray500};
  width: 100%;
  border-bottom: 0.4rem solid ${({ theme }) => theme.colors.gray50};
  padding: 1.2rem 2.4rem;
`;

export const SearchResultList = styled.ul`
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const SearchResultItem = styled.li`
  padding: 2.4rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray100};
`;

export const ResultIconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 0.8rem;
  padding: 0.8rem;
`;

export const AddressWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export const ResultItemTitle = styled.div`
  ${({ theme }) => theme.fonts.headline17Med};
  color: ${({ theme }) => theme.colors.gray900};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ResultItemAddress = styled.div`
  ${({ theme }) => theme.fonts.label14Reg};
  color: ${({ theme }) => theme.colors.gray400};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SearchResultEmpty = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.5rem 2.4rem;
  gap: 2rem;
`;

export const ResultEmptyText = styled.div`
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray600};
  display: flex;
  flex-direction: column;
  font-weight: 400;
`;

export const ResultEmptySuggestion = styled.div`
  ${({ theme }) => theme.fonts.headline17Med};
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  flex-direction: column;
  line-height: 3rem;
`;
