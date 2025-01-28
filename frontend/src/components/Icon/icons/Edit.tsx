import { SVGProps } from 'react';

import theme from '@/styles/theme';

const Edit = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_9393_11626)">
        <path
          d="M7.33398 2.66699H2.66732C2.3137 2.66699 1.97456 2.80747 1.72451 3.05752C1.47446 3.30756 1.33398 3.6467 1.33398 4.00033V13.3337C1.33398 13.6873 1.47446 14.0264 1.72451 14.2765C1.97456 14.5265 2.3137 14.667 2.66732 14.667H12.0007C12.3543 14.667 12.6934 14.5265 12.9435 14.2765C13.1935 14.0264 13.334 13.6873 13.334 13.3337V8.66699"
          stroke={props.color || theme.colors.gray900}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.334 1.66714C12.5992 1.40193 12.9589 1.25293 13.334 1.25293C13.7091 1.25293 14.0688 1.40193 14.334 1.66714C14.5992 1.93236 14.7482 2.29207 14.7482 2.66714C14.7482 3.04222 14.5992 3.40193 14.334 3.66714L8.00065 10.0005L5.33398 10.6671L6.00065 8.00048L12.334 1.66714Z"
          stroke={props.color || theme.colors.gray900}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9393_11626">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Edit;
