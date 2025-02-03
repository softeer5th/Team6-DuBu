import styled from 'styled-components';

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 0.8rem;
  height: 5.3rem;
  width: 100%;
`;

export const ProgressBackground = styled.div`
  width: 25.5rem;
  height: 0.3rem;

  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 1.2rem;
  position: relative;
`;

export const ProgressBar = styled.div<{ $progressPercent: number }>`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green600};
  border-radius: 1.2rem;
  transition: width 0.3s ease-in-out;
  width: ${({ $progressPercent }) => `${$progressPercent}%`};
`;

export const ProgressMarker = styled.div<{ $progressPercent: number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 1rem;
  left: ${({ $progressPercent }) => `${$progressPercent}%`};

  transform: translate(-50%, -50%);
  transition: left 0.3s ease-in-out;
`;

export const ProgressStepText = styled.div`
  color: ${({ theme }) => theme.colors.green400};
  ${({ theme }) => theme.fonts.label13Med}
  width: 100%;
  text-align: center;
`;
