import { useEffect, useState } from 'react';

import useBaseBottomSheet from './useBaseBottomSheet';
import useEditTodoMutation from './useEditTodoMutation';
import TodoEditForm from '../components/TodoEditForm';

import { Todo } from '@/types/todo';

const useEditTodoBottomSheet = (dateType: string, routeId?: number) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { mutate: editTodo, isSuccess, reset } = useEditTodoMutation(dateType);

  const handleOpen = (todo: Todo) => {
    setSelectedTodo(todo);
    dispatch.open();
  };

  const handleEditTodo = (todo: Todo) => {
    editTodo({ todo, routeId });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch.close();
      reset();
    }
  }, [isSuccess, dispatch, reset]);

  return {
    isOpen,
    open: handleOpen,
    close: dispatch.close,
    handleEditTodo,
    content: selectedTodo && <TodoEditForm todo={selectedTodo} handleEditTodo={handleEditTodo} />,
    title: '할 일 수정하기',
  };
};

export default useEditTodoBottomSheet;
