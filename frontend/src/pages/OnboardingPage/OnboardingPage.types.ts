export interface OnboardingUserInfoType {
  categories: string[];
  address: { home: string; school: string };
  nickname: string;
}

export interface OnboardingContextType {
  onboardingStep: number;
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>;
  onboardingUserInfo: OnboardingUserInfoType;
  setOnboardingUserInfo: React.Dispatch<React.SetStateAction<OnboardingUserInfoType>>;
  onboardingStepValidity: { [key: number]: boolean };
  setOnboardingStepValidity: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}
