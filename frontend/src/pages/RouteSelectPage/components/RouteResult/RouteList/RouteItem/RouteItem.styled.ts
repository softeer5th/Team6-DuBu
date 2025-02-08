import styled from 'styled-components';

export const RouteResultItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 2.4rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray100};

  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.gray100 : theme.colors.white};
  transition: background-color 0.2s ease;

  cursor: pointer;
`;

export const RecentlyUsedBox = styled.div`
  color: ${({ theme }) => theme.colors.green500};
  border: 0.15rem solid ${({ theme }) => theme.colors.green100};
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.caption12Reg};
  padding: 0.4rem 0.8rem;
  width: fit-content;
`;
