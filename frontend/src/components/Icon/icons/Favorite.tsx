import { SVGProps } from 'react';

import { colors } from '@/styles/theme';

const Favorite = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="icons/share/favoriteDeactivated">
        <path
          id="Vector"
          d="M12 2.82617L15.09 9.08617L22 10.0962L17 14.9662L18.18 21.8462L12 18.5962L5.82 21.8462L7 14.9662L2 10.0962L8.91 9.08617L12 2.82617Z"
          stroke={props.color || colors.green600}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Favorite;
