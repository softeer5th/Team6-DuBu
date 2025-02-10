import { SVGProps } from 'react';

import theme from '@/styles/theme';

const EmptyCheck = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <mask id="path-1-inside-1_11264_12861" fill="white">
        <path d="M2 8C2 4.68629 4.68629 2 8 2H16C19.3137 2 22 4.68629 22 8V16C22 19.3137 19.3137 22 16 22H8C4.68629 22 2 19.3137 2 16V8Z" />
      </mask>
      <path
        d="M8 3.5H16V0.5H8V3.5ZM20.5 8V16H23.5V8H20.5ZM16 20.5H8V23.5H16V20.5ZM3.5 16V8H0.5V16H3.5ZM8 20.5C5.51472 20.5 3.5 18.4853 3.5 16H0.5C0.5 20.1421 3.85786 23.5 8 23.5V20.5ZM20.5 16C20.5 18.4853 18.4853 20.5 16 20.5V23.5C20.1421 23.5 23.5 20.1421 23.5 16H20.5ZM16 3.5C18.4853 3.5 20.5 5.51472 20.5 8H23.5C23.5 3.85786 20.1421 0.5 16 0.5V3.5ZM8 0.5C3.85786 0.5 0.5 3.85786 0.5 8H3.5C3.5 5.51472 5.51472 3.5 8 3.5V0.5Z"
        fill={props.color || theme.colors.gray600}
        mask="url(#path-1-inside-1_11264_12861)"
      />
    </svg>
  );
};

export default EmptyCheck;
