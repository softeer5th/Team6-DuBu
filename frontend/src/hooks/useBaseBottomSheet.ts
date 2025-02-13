import { useMemo, useState } from 'react';

const useBaseBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const dispatch = useMemo(
    () => ({ open, close }),

    [],
  );

  return {
    isOpen,
    dispatch,
  };
};

export default useBaseBottomSheet;
