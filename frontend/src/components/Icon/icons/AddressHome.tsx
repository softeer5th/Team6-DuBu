import { SVGProps } from 'react';

import theme from '@/styles/theme';

const AddressHome = (props: SVGProps<SVGSVGElement>) => {
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
        d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
        fill={props.color || theme.colors.green600}
      />
    </svg>
  );
};

export default AddressHome;
