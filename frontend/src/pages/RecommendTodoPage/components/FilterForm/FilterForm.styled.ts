import styled from 'styled-components';

export const FilterContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 26rem;
  flex-wrap: wrap;
`;

export const FilterTitle = styled.span`
  ${({ theme }) => theme.fonts.body16};
`;

export const CheckedBadge = styled.button<{ $isSelected: boolean }>`
  ${({ theme }) => theme.fonts.label14Med};

  display: flex;
  align-items: center;
  gap: 0.4rem;

  padding: 0.4rem 1.2rem;
  border-radius: 0.8rem;

  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.white : theme.colors.gray50};

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.green700 : theme.colors.gray700};

  outline: ${({ theme, $isSelected }) =>
    $isSelected ? `0.1rem solid ${theme.colors.green600}` : 'none'};

  cursor: pointer;

  transition:
    background-color 0.2s,
    color 0.2s;
`;

export const Footer = styled.div`
  display: flex;
  gap: 0.8rem;
  height: 5rem;
`;

export const CancelButton = styled.button`
  flex-grow: 1;
  padding: 1.3rem 0;
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.green600};
  background-color: ${({ theme }) => theme.colors.green50};
`;

export const ConfirmButton = styled.button`
  flex-grow: 1;
  padding: 1.3rem 0;
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green600};

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.green100};
  }
`;
