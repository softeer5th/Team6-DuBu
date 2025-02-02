import styled from 'styled-components';

export const IconButtonLayout = styled.button<{ $isFull?: boolean }>`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  ${({ $isFull }) => $isFull && { width: '100%', padding: '1.2rem 2.4rem 1.6rem 2.4rem' }}
`;

export const IconButtonText = styled.span`
  ${({ theme }) => theme.fonts.body16};
`;
