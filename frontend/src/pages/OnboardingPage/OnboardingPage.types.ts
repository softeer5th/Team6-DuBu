export interface UserInfoType {
  categories: string[];
  address: { home: string; school: string };
  nickname: string;
}

export interface OnboardingContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userInfo: UserInfoType;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
  stepValidity: { [key: number]: boolean };
  setStepValidity: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}
