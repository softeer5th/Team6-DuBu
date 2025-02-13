import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import useCancelPlanMutation from '../../hooks/useCancelPlanMutation';
import HomeModal from '../HomeModal';

import Header from '@/components/Header';

const PlanHeader = () => {
  const navigate = useNavigate();
  const { planId } = useParams();
  const { mutate: cancelPlan } = useCancelPlanMutation();

  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleConfirm = () => {
    cancelPlan(Number(planId), {
      onSuccess: () => {
        close();
        navigate('/', { replace: true });
      },
    });
  };

  return (
    <>
      <Header>
        <Header.Left>
          <Header.HomeButton onClick={open} />
        </Header.Left>
        <Header.Right>
          <Header.MenuButton />
        </Header.Right>
      </Header>
      {isOpen && <HomeModal close={close} onConfirm={handleConfirm} />}
    </>
  );
};

export default PlanHeader;
