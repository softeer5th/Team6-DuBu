import { SVGProps } from 'react';

import theme from '@/styles/theme';

const Chevron = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 19L8 12L15 5"
        stroke={props.color || theme.colors.gray950}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Chevron;
