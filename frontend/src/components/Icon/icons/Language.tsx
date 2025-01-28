import { SVGProps } from 'react';

const Language = (props: SVGProps<SVGSVGElement>) => {
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
      <rect width="24" height="24" rx="6" fill="#83589A" fillOpacity="0.12" />
      <path
        d="M11.9167 17.8333C15.1844 17.8333 17.8333 15.1844 17.8333 11.9167C17.8333 8.64898 15.1844 6 11.9167 6C8.64898 6 6 8.64898 6 11.9167C6 15.1844 8.64898 17.8333 11.9167 17.8333Z"
        stroke="#83589A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 11.916H17.8333" stroke="#83589A" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M11.9165 6C13.3964 7.62019 14.2374 9.72279 14.2831 11.9167C14.2374 14.1105 13.3964 16.2131 11.9165 17.8333C10.4365 16.2131 9.59551 14.1105 9.5498 11.9167C9.59551 9.72279 10.4365 7.62019 11.9165 6Z"
        stroke="#83589A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Language;
