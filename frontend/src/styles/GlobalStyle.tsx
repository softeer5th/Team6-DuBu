import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard';
  font-weight: 700;
  font-display: swap;
  src:
    local('Pretendard Bold'),
    url('/src/assets/fonts/Pretendard-Bold.subset.woff2') format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 600;
  font-display: swap;
  src:
    local('Pretendard SemiBold'),
    url('/src/assets/fonts/Pretendard-SemiBold.subset.woff2') format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 500;
  font-display: swap;
  src:
    local('Pretendard Medium'),
    url('/src/assets/fonts/Pretendard-Medium.subset.woff2') format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 400;
  font-display: swap;
  src:
    local('Pretendard Regular'),
    url('/src/assets/fonts/Pretendard-Regular.subset.woff2') format('woff2');
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

html {
    font-size: 62.5%;
  }

body {
	line-height: 1;
  width: 375px;
	height: 100vh;
	margin: 0 auto;
	border: 0.1px solid black;
  
  -ms-overflow-style: none;
  overflow-y: hidden;
}
 
/* 기본 스크롤바 제거 */
::-webkit-scrollbar {
  display: none;
}


#root {
  height: inherit;
}

body,
  input,
  select,
  textarea,
  button {
    font-family: Pretendard, system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
  *, *::before, *::after {
    box-sizing: border-box;
  }



  button {
	border: 0;
	padding: 0;
	background-color: transparent;
	cursor: pointer;
  }
  
  a {
	text-decoration: none;
	color: inherit;
  }

  input {
    outline: none;
    border: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
  }

  textarea {
  padding: 0;
  border: none;
  height: auto;
  resize: none;
}
  
`;

export default GlobalStyle;
