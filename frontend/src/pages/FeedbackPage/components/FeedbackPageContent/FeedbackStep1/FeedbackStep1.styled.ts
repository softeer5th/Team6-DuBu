import styled from 'styled-components';

export const FeedbackStep1Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 6rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline18};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const AnimationContainer = styled.div`
  width: 24rem;
  height: 24rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
  margin-bottom: 4rem;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 32rem;
`;

export const Label = styled.span`
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray700};
`;

export const Slider = styled.input<{ $isActive: boolean; $sliderValue: number }>`
  height: 0.8rem;
  width: 28rem;
  background: ${({ theme, $sliderValue }) => `
    linear-gradient(
      to right,
      ${theme.colors.green700} ${$sliderValue}%,
      ${theme.colors.green50} ${$sliderValue}%,
      ${theme.colors.green50} 100%
    )
  `};
  border-radius: 0.4rem;
  appearance: none;
  outline: none;
  transition: all 0.2s ease;
  touch-action: none;

  &::-webkit-slider-thumb {
    box-sizing: content-box;
    appearance: none;
    width: ${({ $isActive }) => ($isActive ? '2.4rem' : '1.6rem')};
    height: ${({ $isActive }) => ($isActive ? '2.4rem' : '1.6rem')};
    background-color: ${({ theme }) => theme.colors.green700};
    border: 0.8rem solid ${({ theme }) => `${theme.colors.green50}AA`};
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    opacity: 0.6;
    transition: all 0.2s ease;
  }

  &::-moz-range-thumb {
    box-sizing: content-box;
    appearance: none;
    width: ${({ $isActive }) => ($isActive ? '2.4rem' : '1.6rem')};
    height: ${({ $isActive }) => ($isActive ? '2.4rem' : '1.6rem')};
    background-color: ${({ theme }) => theme.colors.green700};
    border: 6px solid rgba(236, 245, 244, 0.9);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
  }
`;
