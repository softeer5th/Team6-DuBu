import { SVGProps } from 'react';

const MinusCircle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="#F67777" />
      <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default MinusCircle;
