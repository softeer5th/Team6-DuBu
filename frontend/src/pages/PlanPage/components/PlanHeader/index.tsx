import React from 'react';

import Header from '@/components/Header';

const PlanHeader = () => {
  return (
    <Header>
      <Header.Left>
        <Header.HomeButton />
      </Header.Left>
      <Header.Right>
        <Header.MenuButton />
      </Header.Right>
    </Header>
  );
};

export default PlanHeader;
