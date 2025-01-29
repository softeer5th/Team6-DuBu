import { SVGProps } from 'react';

const Kakao = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00002 0.0996094C4.02917 0.0996094 0 3.21257 0 7.05189C0 9.43963 1.5584 11.5446 3.93152 12.7966L2.93303 16.4441C2.84481 16.7664 3.21341 17.0233 3.49646 16.8365L7.87334 13.9478C8.2427 13.9835 8.61808 14.0043 9.00002 14.0043C13.9705 14.0043 17.9999 10.8914 17.9999 7.05189C17.9999 3.21257 13.9705 0.0996094 9.00002 0.0996094Z"
        fill="black"
      />
    </svg>
  );
};

export default Kakao;
