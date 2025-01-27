import { SVGProps } from 'react';

const News = (props: SVGProps<SVGSVGElement>) => {
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
      <rect width="24" height="24" rx="6" fill="#3C7AB0" fillOpacity="0.12" />
      <g clipPath="url(#clip0_9393_11593)">
        <g clipPath="url(#clip1_9393_11593)">
          <path
            d="M11.6027 6H8C7.44772 6 7 6.44772 7 7V15.1058C7 15.658 7.44772 16.1058 8 16.1058H14.1818C14.7341 16.1058 15.1818 15.658 15.1818 15.1058V9.53748M11.6027 6L15.1818 9.53748M11.6027 6V9.53748H15.1818M8.81818 18H15C16.1046 18 17 17.1046 17 16V11.516M8.36364 11.516H13.8182M8.36364 9.20031H10.1818M8.36364 13.8317H13.8182"
            stroke="#3C7AB0"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_9393_11593">
          <rect width="16" height="16" fill="white" transform="translate(4 4)" />
        </clipPath>
        <clipPath id="clip1_9393_11593">
          <rect width="16" height="16" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default News;
