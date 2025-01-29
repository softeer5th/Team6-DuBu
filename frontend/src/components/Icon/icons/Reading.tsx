import { SVGProps } from 'react';

const Reading = (props: SVGProps<SVGSVGElement>) => {
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
      <rect width="24" height="24" rx="6" fill="#BA1A1A" fillOpacity="0.12" />
      <path
        d="M11.8337 9.66664C11.8337 9.11853 11.6159 8.59286 11.2283 8.20529C10.8408 7.81771 10.3151 7.59998 9.76699 7.59998H6.66699V15.35H10.2837C10.6947 15.35 11.089 15.5133 11.3797 15.804C11.6704 16.0946 11.8337 16.4889 11.8337 16.9M11.8337 9.66664V16.9M11.8337 9.66664C11.8337 9.11853 12.0514 8.59286 12.439 8.20529C12.8265 7.81771 13.3522 7.59998 13.9003 7.59998H17.0003V15.35H13.3837C12.9726 15.35 12.5783 15.5133 12.2876 15.804C11.997 16.0946 11.8337 16.4889 11.8337 16.9"
        stroke="#BA1A1A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Reading;
