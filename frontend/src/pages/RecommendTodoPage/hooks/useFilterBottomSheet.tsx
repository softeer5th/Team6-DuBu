import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';

const useFilterBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
  };
};

export default useFilterBottomSheet;
