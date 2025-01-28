import { SVGProps } from 'react';

const Switch = (props: SVGProps<SVGSVGElement>) => {
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
        d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z"
        fill="#C5E1DC"
      />
      <path
        d="M26 21.6365L23.0909 24.5456L20.1818 21.6365"
        stroke="#25574E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.7272 11.4546L20.1817 11.4546C20.9533 11.4546 21.6932 11.7611 22.2388 12.3066C22.7843 12.8522 23.0908 13.5921 23.0908 14.3637L23.0908 24.5455"
        stroke="#25574E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0002 14.3637L12.9093 11.4546L15.8184 14.3637"
        stroke="#25574E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2725 24.5455L15.8179 24.5455C15.0464 24.5455 14.3064 24.239 13.7609 23.6934C13.2153 23.1479 12.9088 22.4079 12.9088 21.6364L12.9088 11.4546"
        stroke="#25574E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Switch;
