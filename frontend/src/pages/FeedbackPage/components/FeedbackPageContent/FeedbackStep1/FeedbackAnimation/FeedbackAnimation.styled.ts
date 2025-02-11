import styled from 'styled-components';

export const AnimationContainer = styled.div<{ $progress: number }>`
  /* opacity: ${({ $progress }) => 0.6 + ($progress / 100) * 0.4}; */
  /* transform: scale(${({ $progress }) => 1 + ($progress / 100) * 0.4}); */
  /* width: 24rem; */
  /* height: 24rem; */
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;
