import { SVGProps } from 'react';

import theme from '@/styles/theme';

const Home = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 14.6666V7.99992H10V14.6666M2 5.99992L8 1.33325L14 5.99992V13.3333C14 13.6869 13.8595 14.026 13.6095 14.2761C13.3594 14.5261 13.0203 14.6666 12.6667 14.6666H3.33333C2.97971 14.6666 2.64057 14.5261 2.39052 14.2761C2.14048 14.026 2 13.6869 2 13.3333V5.99992Z"
        stroke={props.color || theme.colors.gray900}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Home;
