import styled from 'styled-components';

export const RouteItemLayout = styled.div`
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray400};
  background-color: ${({ theme }) => theme.colors.lightWhite70};

  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.3rem 1.25rem;
  border-radius: 1.2rem;
`;

export const RouteTitleWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  min-width: 5.4rem;
`;

export const Location = styled.span`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.green700};
`;
