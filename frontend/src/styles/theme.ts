export const colors = {
  // green (primary)
  green25: '#f5faf9',
  green50: '#ecf5f4',
  green100: '#c5e1dc',
  green200: '#a9d3cb',
  green300: '#82bfb3',
  green400: '#69b2a4',
  green500: '#449f8d',
  green600: '#3e9180',
  green700: '#307164',
  green800: '#25574e',
  green900: '#1d433b',

  // grayscale
  white: '#FFFFFF',
  gray50: '#FAFAFA',
  gray100: '#F2F2F3',
  gray200: '#DCDCDC',
  gray300: '#BDBDBD',
  gray400: '#989898',
  gray500: '#7C7C7C',
  gray600: '#656565',
  gray700: '#525252',
  gray800: '#464646',
  gray900: '#3D3D3D',
  gray950: '#292929',

  // system
  lightGreen100: '#c5e1dc4d',
  lightWhite70: '#ffffffb3',
  lightWhite30: '#ffffff4d',
  lightWhite: '#ffffff00',

  textRed: '#cd0e0e',
  textBlue: '#0e87d8',
  iconRed: '#f67777',
  iconBlue: '#0e87d8',

  // category color
  READING: '#BA1A1A',
  HOBBY: '#C48430',
  ENGLISH: '#ACB337',
  LANGUAGE: '#83589A',
  NEWS: '#3C7AB0',
  OTHERS: '#656565',

  // category background-color
  background: {
    READING: '#BA1A1A1E',
    HOBBY: '#C484301E',
    ENGLISH: '#ACB3371E',
    LANGUAGE: '#83589A1E',
    NEWS: '#3C7AB01E',
    OTHERS: '#6565651E',
  },

  // transport
  Bus: '#9C50D3',
  Subway: '#DC831E',
} as const;

export const fonts = {
  title36: {
    'font-size': '3.6rem',
    'line-height': '4.8rem',
    'font-weight': '600',
  },
  title32: {
    'font-size': '3.2rem',
    'line-height': '3.2rem',
    'font-weight': '600',
  },
  title28: {
    'font-size': '2.8rem',
    'line-height': '3.8rem',
    'font-weight': '600',
  },
  title26: {
    'font-size': '2.6rem',
    'line-height': '3.6rem',
    'font-weight': '600',
  },
  title24: {
    'font-size': '2.4rem',
    'line-height': '3.2rem',
    'font-weight': '600',
  },
  heading22: {
    'font-size': '2.2rem',
    'line-height': '3.0rem',
    'font-weight': '600',
  },
  heading20: {
    'font-size': '2.0rem',
    'line-height': '2.8rem',
    'font-weight': '600',
  },
  headline18: {
    'font-size': '1.8rem',
    'line-height': '2.6rem',
    'font-weight': '600',
  },
  headline17: {
    'font-size': '1.7rem',
    'line-height': '2.4rem',
    'font-weight': '600',
  },
  headline17Med: {
    'font-size': '1.7rem',
    'line-height': '2.4rem',
    'font-weight': '500',
  },
  headline17Reg: {
    'font-size': '1.7rem',
    'line-height': '2.4rem',
    'font-weight': '400',
  },
  body16: {
    'font-size': '1.6rem',
    'line-height': '2.4rem',
    'font-weight': '600',
  },
  body15: {
    'font-size': '1.5rem',
    'line-height': '2.4rem',
    'font-weight': '600',
  },
  body15Med: {
    'font-size': '1.5rem',
    'line-height': '2.2rem',
    'font-weight': '500',
  },
  label14Semi: {
    'font-size': '1.4rem',
    'line-height': '2.2rem',
    'font-weight': '600',
  },
  label14Med: {
    'font-size': '1.4rem',
    'line-height': '2.2rem',
    'font-weight': '500',
  },
  label14Reg: {
    'font-size': '1.4rem',
    'line-height': '2.2rem',
    'font-weight': '400',
  },
  label13: {
    'font-size': '1.3rem',
    'line-height': '1.8rem',
    'font-weight': '600',
  },
  label13Med: {
    'font-size': '1.3rem',
    'line-height': '1.8rem',
    'font-weight': '500',
  },
  caption12Semi: {
    'font-size': '1.2rem',
    'line-height': '1.4rem',
    'font-weight': '600',
  },
  caption12Reg: {
    'font-size': '1.2rem',
    'line-height': '1.6rem',
    'font-weight': '400',
  },
  caption11: {
    'font-size': '1.1rem',
    'line-height': '1.4rem',
    'font-weight': '600',
  },
} as const;

const theme: {
  colors: typeof colors;
  fonts: typeof fonts;
} = {
  colors,
  fonts,
};

export default theme;
