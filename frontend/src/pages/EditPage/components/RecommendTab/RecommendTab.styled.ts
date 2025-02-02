import { Link } from 'react-router';
import styled from 'styled-components';

export const RecommendTabList = styled.ul`
  display: flex;
  flex-direction: column;

  border-top: 0.15rem solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;

export const WatchMoreLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.2rem 0;
  width: 100%;
`;

export const WatchMoreLink = styled(Link)`
  ${({ theme }) => theme.fonts.body16};
  background-color: ${({ theme }) => theme.colors.green600};
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  justify-content: center;
  padding: 0.8rem 3.2rem;
  border-radius: 3.2rem;
`;
