import { SVGProps } from 'react';

const Alert = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.5002 15.9993C13.8137 15.9993 16.4998 13.3132 16.4998 9.99967C16.4998 6.68615 13.8137 4 10.5002 4C7.18663 4 4.50049 6.68615 4.50049 9.99967C4.50049 13.3132 7.18663 15.9993 10.5002 15.9993Z"
        stroke="#656565"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5 12.3993V9.99948M10.5 7.59961H10.506"
        stroke="#656565"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Alert;
