import React, { HTMLAttributes, PropsWithChildren } from 'react';

import useTabContext from '@/hooks/useTabContext';

const TabContent = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const { selectedIdx } = useTabContext();

  return (
    <div {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        return index === selectedIdx ? child : null;
      })}
    </div>
  );
};

export default TabContent;
