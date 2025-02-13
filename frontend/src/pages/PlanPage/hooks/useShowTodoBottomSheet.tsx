import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';

const useShowTodoBottomSheet = () => {
  const { isOpen, dispatch } = useBaseBottomSheet();

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    title: '할 일 보기',
  };
};

export default useShowTodoBottomSheet;
