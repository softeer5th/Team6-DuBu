import * as S from './FeedbackMemo.styled';

import { useFeedback } from '@/pages/FeedbackPage/hooks/useFeedback';

const MEMO_MAX_LENGTH = 20;
const isMemoValid = (memo: string) => {
  const regex = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣!@#$%^&*()_+={}[\]:;"'<>,.?/`~|-]+$/;

  return regex.test(memo);
};

const FeedbackMemo = () => {
  const { feedbackData, setFeedbackData } = useFeedback();

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const memo = e.target.value;

    if (memo.length > MEMO_MAX_LENGTH) {
      return;
    }

    if (!memo) {
      setFeedbackData((prevData) => ({ ...prevData, memo: '' }));

      return;
    }

    if (isMemoValid(memo)) {
      setFeedbackData((prevData) => ({ ...prevData, memo }));
    }
  };

  return (
    <S.FeedbackMemoLayout>
      <S.Title>남기고 싶은 메모가 있나요?</S.Title>
      <S.MemoInput
        placeholder="오늘의 코멘트 남기기"
        onChange={handleMemoChange}
        value={feedbackData.memo}
        maxLength={MEMO_MAX_LENGTH}
      />
    </S.FeedbackMemoLayout>
  );
};

export default FeedbackMemo;
