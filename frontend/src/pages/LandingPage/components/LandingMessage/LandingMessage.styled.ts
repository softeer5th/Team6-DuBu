import styled from 'styled-components';

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Subtitle = styled.div`
  ${({ theme }) => theme.fonts.headline17Reg};
  color: ${({ theme }) => theme.colors.gray300};
`;

export const Title = styled.div`
  font-size: 3.3rem;
  line-height: 4.6rem;
  font-weight: 500;
  color: #031516;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
