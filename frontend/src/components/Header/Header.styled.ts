import styled, { css } from 'styled-components';

import { colors } from '@/styles/theme';

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const HeaderLayout = styled.header`
  display: grid;
  grid-template-columns: auto 1fr 5.2rem;
  align-items: center;
  padding: 1.5rem 1rem;
`;

export const HeaderLeft = styled.div`
  grid-column: 1;
  ${FlexCenter}
`;

export const HeaderCenter = styled.div`
  grid-column: 2;
  ${FlexCenter}
`;

export const HeaderRight = styled.div`
  grid-column: 3;
  ${FlexCenter}
`;

export const HeaderTitle = styled.h1<{ $color?: keyof typeof colors }>`
  color: ${({ theme, $color }) => ($color ? theme.colors[$color] : theme.colors.gray950)};
  ${({ theme }) => theme.fonts.headline17Med};
  text-align: center;
`;

export const Button = styled.button`
  ${FlexCenter}
  padding: 0.8rem;
  width: 5.2rem;
  border: none;
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.colors.gray950};
  ${({ theme }) => theme.fonts.headline17Med};

  &:disabled {
    color: ${({ theme }) => theme.colors.gray400};
    pointer-events: none;
  }
`;

export const HomeButton = styled(Button)`
  margin-left: 1.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
  width: 11.4rem;
  height: 3.4rem;
  ${({ theme }) => theme.fonts.label13Med};
  font-weight: 400;
`;
