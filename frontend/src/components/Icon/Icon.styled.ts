import styled from 'styled-components';

interface IconContainerProps {
  width?: number;
  height?: number;
  rotate?: number;
  cursor?: string;
}

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
  transition: all 0.3s;
  cursor: ${({ cursor }) => cursor};
`;
