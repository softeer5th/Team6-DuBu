import { useLottie } from 'lottie-react';
import { useEffect } from 'react';

import * as S from './FeedbackAnimation.styled';

import feedbackAnimation from '@/assets/animations/feedbackAnimation.json';

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
      const normalizedProgress = (progress - 1) / 99;
      const frameToShow = Math.round(normalizedProgress * (animationItem.totalFrames - 1));
      animationItem.goToAndStop(frameToShow, true);
    }
  }, [progress, animationItem]);

  return <S.AnimationContainer>{View}</S.AnimationContainer>;
};

export default FeedbackAnimation;
