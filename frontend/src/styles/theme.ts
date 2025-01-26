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
};

export const fonts = {};

const theme: {
  colors: typeof colors;
  fonts: typeof fonts;
} = {
  colors,
  fonts,
};

export default theme;
