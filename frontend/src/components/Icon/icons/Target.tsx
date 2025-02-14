import { SVGProps } from 'react';

import { colors } from '@/styles/theme';

const Target = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title />
      <g data-name="21-Target" id="_21-Target">
        <path
          d="M27.95,15A12,12,0,0,0,17,4.05V0H15V4.05A12,12,0,0,0,4.05,15H0v2H4.05A12,12,0,0,0,15,27.95V32h2V27.95A12,12,0,0,0,27.95,17H32V15Zm-2,2A10,10,0,0,1,17,25.95V22H15v3.95A10,10,0,0,1,6.05,17H10V15H6.05A10,10,0,0,1,15,6.05V10h2V6.05A10,10,0,0,1,25.95,15H22v2Z"
          fill={props.color || colors.gray500}
        />
        <circle cx="16" cy="16" r="2" fill={props.color || colors.gray500} />
      </g>
    </svg>
  );
};

export default Target;
