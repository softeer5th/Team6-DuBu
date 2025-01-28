import { SVGProps } from 'react';

import theme from '@/styles/theme';

const Check = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.3337 4L6.00033 11.3333L2.66699 8"
        stroke={props.color || theme.colors.green600}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Check;
