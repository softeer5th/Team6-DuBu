import { CSSProperties } from 'react';

import * as S from './Icon.styled';
import * as icons from './icons';

export interface CustomSVGProps extends React.SVGProps<SVGSVGElement> {
  subColor?: string;
}

interface IconProps extends CustomSVGProps {
  icon: keyof typeof icons;
  width?: number;
  height?: number;
  rotate?: number;
  cursor?: CSSProperties['cursor'];
  color?: string;
}

export default function Icon({
  icon,
  cursor = 'initial',
  width = 24,
  height = 24,
  rotate,
  className,
  color,
  ...props
}: IconProps) {
  const IconComponent = icons[icon as keyof typeof icons];

  return (
    <S.IconContainer width={width} height={height} rotate={rotate} cursor={cursor}>
      <IconComponent
        {...props}
        className={`icon ${className || ''}`.trim()}
        width={width}
        height={height}
        color={color}
      />
    </S.IconContainer>
  );
}
