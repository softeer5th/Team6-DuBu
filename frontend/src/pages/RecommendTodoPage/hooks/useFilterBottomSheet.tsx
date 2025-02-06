import useBaseBottomSheet from '@/pages/EditPage/hooks/useBaseBottomSheet';

const useFilterBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    title: '할 일 수정하기',
  };
};

export default useFilterBottomSheet;
