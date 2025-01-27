import { SVGProps } from 'react';

const Others = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="6" fill="white" />
      <rect width="24" height="24" rx="6" fill="#656565" fillOpacity="0.12" />
      <path
        d="M11.9997 17.9993C15.3132 17.9993 17.9993 15.3132 17.9993 11.9997C17.9993 8.68615 15.3132 6 11.9997 6C8.68615 6 6 8.68615 6 11.9997C6 15.3132 8.68615 17.9993 11.9997 17.9993Z"
        stroke="#656565"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.3996V11.9997M12 9.59985H12.006"
        stroke="#656565"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Others;
