import { useState } from 'react';

import DetailUserTodo from '../components/DetailTodo';

import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';

const useMarkerBottomSheet = () => {
  const {
    isOpen,
    dispatch: { open, close },
  } = useBaseBottomSheet();
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const handleOpen = (memberId: number) => {
    setSelectedMemberId(memberId);
    open();
  };

  const handleClose = () => {
    setSelectedMemberId(null);
    close();
  };

  return {
    isOpen,
    open: handleOpen,
    close: handleClose,
    content: selectedMemberId && <DetailUserTodo memberId={selectedMemberId} />,
  };
};
export default useMarkerBottomSheet;
