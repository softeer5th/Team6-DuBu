export interface OnboardingUserInfoType extends Record<string, string | number | string[]> {
  categories: string[];
  homeTitle: string;
  homeAddress: string;
  homeAddressX: number;
  homeAddressY: number;
  schoolTitle: string;
  schoolAddress: string;
  schoolAddressX: number;
  schoolAddressY: number;
  nickname: string;
}

export interface OnboardingContextType {
  onboardingStep: number;
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>;
  onboardingUserInfo: OnboardingUserInfoType;
  setOnboardingUserInfo: React.Dispatch<React.SetStateAction<OnboardingUserInfoType>>;
}
