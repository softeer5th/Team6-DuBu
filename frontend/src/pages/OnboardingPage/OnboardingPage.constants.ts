export const ONBOARDING_FIRST_STEP = 1;
export const ONBOARDING_LAST_STEP = 3;

export const ONBOARDING_DESCRIPTIONS: { [key: number]: string[] } = {
  1: ['이동시간을 활용하여', '이루고 싶은 목표를 선택해 주세요'],
  2: ['집과 학교의 주소를', '입력해 주세요'],
  3: ['마지막으로, 두리번에서', '사용할 닉네임을 알려주세요'],
};

export const ONBOARDING_GUIDES: { [key: number]: string[] } = {
  1: ['최소 1개에서 최대 3개까지 선택할 수 있어요.'],
  2: ['한 번만 입력하면,', '주소를 기억해서 경로를 빠르게 보여드릴 수 있어요!'],
};

export const ONBOARDING_NICKNAME_MESSAGES = {
  DEFAULT: '공백없이 한글, 숫자, 영문자 8자 이내로 입력해주세요',
  ERROR: '공백없이 한글, 숫자, 영문자 8자 이내로만 가능해요',
  VALID: '닉네임 사용이 가능해요',
};
