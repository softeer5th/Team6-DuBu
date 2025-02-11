import styled from 'styled-components';

import backgroundMain from '/src/assets/images/backgroundMain.png';

export const MainPageLayout = styled.main`
  position: relative;
  background-color: ${({ theme }) => theme.colors.green50};
  height: 100vh;

  display: flex;
  flex-direction: column;

  background-image: url(${backgroundMain});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 3.6rem;
`;

export const StartButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 13.9rem;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.lightWhite},
    ${({ theme }) => theme.colors.white}
  );
  position: absolute;
  bottom: 0;
`;
