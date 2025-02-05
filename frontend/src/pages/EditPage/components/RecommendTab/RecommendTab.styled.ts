import { Link } from 'react-router';
import styled from 'styled-components';

export const RecommendTabList = styled.ul`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;

  border-top: 0.15rem solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;

export const WatchMoreLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.8rem;
`;

export const WatchMoreLink = styled(Link)`
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray700};

  padding: 1.3rem 2.4rem;
  border-radius: 3.2rem;

  text-decoration: underline;
  text-underline-offset: 0.3rem;
`;
