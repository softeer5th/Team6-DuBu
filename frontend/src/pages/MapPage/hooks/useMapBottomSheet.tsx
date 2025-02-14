import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';

const useMapBottomSheet = () => {
  const {
    isOpen,
    dispatch: { open, close },
  } = useBaseBottomSheet(true);

  return {
    isOpen,
    open,
    close,
  };
};

export default useMapBottomSheet;
