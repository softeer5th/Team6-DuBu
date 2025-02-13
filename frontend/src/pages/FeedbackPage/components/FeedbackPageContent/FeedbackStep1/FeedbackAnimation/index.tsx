import { useLottie } from 'lottie-react';
import { useEffect } from 'react';

import * as S from './FeedbackAnimation.styled';

import feedbackAnimation from '@/assets/animations/feedbackAnimation.json';

const MAX_FEEDBACK_PROGRESS = 99;
const MIN_FEEDBACK_PROGRESS = 1;

interface FeedbackAnimationProps {
  progress: number;
}

const FeedbackAnimation = ({ progress }: FeedbackAnimationProps) => {
  const { View, animationItem } = useLottie({
    animationData: feedbackAnimation,
    loop: true,
    autoplay: false,
  });

  useEffect(() => {
    if (animationItem) {
      const normalizedProgress =
        (progress - MIN_FEEDBACK_PROGRESS) / (MAX_FEEDBACK_PROGRESS - MIN_FEEDBACK_PROGRESS);
      const frameToShow = Math.round(normalizedProgress * (animationItem.totalFrames - 1));
      animationItem.goToAndStop(frameToShow, true);
    }
  }, [progress, animationItem]);

  return <S.AnimationContainer>{View}</S.AnimationContainer>;
};

export default FeedbackAnimation;
