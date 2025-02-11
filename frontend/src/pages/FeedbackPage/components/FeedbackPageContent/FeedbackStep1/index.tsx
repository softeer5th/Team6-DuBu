import { useState } from 'react';

import FeedbackAnimation from './FeedbackAnimation';
import * as S from './FeedbackStep1.styled';

import { FeedbackMood } from '@/pages/FeedbackPage/FeedbackPage.types';
import { useFeedback } from '@/pages/FeedbackPage/hooks/useFeedback';

const FEEDBACK_MOOD_VALUES = {
  DISSATISFIED: 0,
  MODERATE: 50,
  SATISFIED: 100,
};
const DEFAULT_MOOD = 'MODERATE';
const VALID_MOOD_VALUES = [0, 50, 100];

const getClosestValue = (value: number) => {
  return VALID_MOOD_VALUES.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
  );
};

const getMoodByValue = (value: number): FeedbackMood => {
  if (value === 0) return 'DISSATISFIED';
  if (value === 50) return 'MODERATE';
  return 'SATISFIED';
};

const FeedbackStep1 = () => {
  const { feedbackData, setFeedbackData } = useFeedback();

  const [sliderValue, setSliderValue] = useState(
    FEEDBACK_MOOD_VALUES[feedbackData?.mood || DEFAULT_MOOD],
  );

  const [isThumbActive, setIsThumbActive] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSliderValue(value);
  };

  const handleThumbMouseDown = () => {
    setIsThumbActive(true);
  };

  const handleThumbMouseUp = () => {
    setIsThumbActive(false);
    const closestValue = getClosestValue(sliderValue);
    setSliderValue(closestValue);

    setFeedbackData({
      memo: feedbackData?.memo || '',
      mood: getMoodByValue(closestValue),
    });
  };

  return (
    <S.FeedbackStep1Layout>
      <S.Title>오늘 이동은 어땠나요?</S.Title>
      <S.AnimationContainer>
        <FeedbackAnimation progress={sliderValue} />
      </S.AnimationContainer>

      <S.SliderContainer>
        <S.Slider
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={handleSliderChange}
          onMouseDown={handleThumbMouseDown}
          onMouseUp={handleThumbMouseUp}
          onTouchStart={handleThumbMouseDown}
          onTouchEnd={handleThumbMouseUp}
          $isActive={isThumbActive}
          $sliderValue={sliderValue}
        />
        <S.LabelWrapper>
          <S.Label>아쉬워요</S.Label>
          <S.Label>보통이에요</S.Label>
          <S.Label>만족해요</S.Label>
        </S.LabelWrapper>
      </S.SliderContainer>
    </S.FeedbackStep1Layout>
  );
};

export default FeedbackStep1;
