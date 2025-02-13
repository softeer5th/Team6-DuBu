import { SVGProps } from 'react';

import { colors } from '@/styles/theme';

const FilledFavorite = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="icons/share/activated">
        <path
          id="Vector"
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill={props.color || colors.green600}
        />
      </g>
    </svg>
  );
};

export default FilledFavorite;
