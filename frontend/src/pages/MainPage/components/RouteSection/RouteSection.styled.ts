import styled from 'styled-components';

export const RouteSectionLayout = styled.section<{ $isSwitch: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  transition: all 0.5s;

  ${({ $isSwitch }) =>
    $isSwitch
      ? `
          & > div:first-child {
            transform: translateY(58px);
          }
          & > div:last-child {
            transform: translateY(-58px);
          }
        `
      : `
          & > div:first-child {
            transform: translateY(0px);
          }
          & > div:last-child {
            transform: translateY(0px);
          }
        `}
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 1.6rem;
  top: 50%;
  transform: translateY(-50%);

  z-index: 1;
`;
