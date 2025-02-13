import { useMemo, useState } from 'react';

const useBaseBottomSheet = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

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
