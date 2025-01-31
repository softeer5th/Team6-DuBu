import styled from 'styled-components';

import useTabContext from '@/hooks/useTabContext';

interface TabActiveIndicatorProps {
  tabLength: number;
}

const TabActiveIndicator = ({ tabLength }: TabActiveIndicatorProps) => {
  const { selectedIdx } = useTabContext();

  return <ActiveIndicatorLayout $idx={selectedIdx} $tabLength={tabLength} />;
};

export default TabActiveIndicator;

const ActiveIndicatorLayout = styled.div<{ $idx: number; $tabLength: number }>`
  position: absolute;
  bottom: -0.15rem;
  left: 0;
  height: 0.15rem;
  width: calc(100% / ${({ $tabLength }) => $tabLength});
  background-color: ${({ theme }) => theme.colors.green700};
  transform: translateX(calc(${({ $idx = 0 }) => `${100 * $idx}%`}));
  transition: transform 0.3s ease-out;
`;
