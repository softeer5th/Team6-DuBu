import styled from 'styled-components';

import BackgroundFeedback from '@/assets/images/backgroundFeedback.png';

export const FeedbackPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  position: relative;
  height: 100%;
  width: 100%;
  background-image: url(${BackgroundFeedback});
  padding-bottom: 3rem;

  touch-action: none;
`;

export const ButtonBox = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green600};
  padding: 1.6rem 3rem;
  border-radius: 3.2rem;
  ${({ theme }) => theme.fonts.body16};
  gap: 1rem;
`;
