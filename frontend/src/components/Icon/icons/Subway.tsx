import { SVGProps } from 'react';

import theme from '@/styles/theme';

const Subway = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 3.75C12 3.75 6 4.5 6 9.75V24C6 26.895 8.355 29.25 11.25 29.25L9 30.75V32.25H27V30.75L24.75 29.25C27.645 29.25 30 26.895 30 24V9.75C30 4.5 24.63 3.75 18 3.75ZM12.75 24.75C11.505 24.75 10.5 23.745 10.5 22.5C10.5 21.255 11.505 20.25 12.75 20.25C13.995 20.25 15 21.255 15 22.5C15 23.745 13.995 24.75 12.75 24.75ZM16.5 15.75H9V11.25H16.5V15.75ZM23.25 24.75C22.005 24.75 21 23.745 21 22.5C21 21.255 22.005 20.25 23.25 20.25C24.495 20.25 25.5 21.255 25.5 22.5C25.5 23.745 24.495 24.75 23.25 24.75ZM27 15.75H19.5V11.25H27V15.75Z"
        fill={props.color || theme.colors.white}
      />
    </svg>
  );
};

export default Subway;
