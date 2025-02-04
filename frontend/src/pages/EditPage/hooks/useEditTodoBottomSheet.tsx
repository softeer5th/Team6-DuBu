import { useEffect, useState } from 'react';

import useBaseBottomSheet from './useBaseBottomSheet';
import useEditTodoMutation from './useEditTodoMutation';
import TodoEditForm from '../components/TodoEditForm';

import { Todo } from '@/types/todo';

const useEditTodoBottomSheet = (dateType: string) => {
  const { isOpen, open, close } = useBaseBottomSheet();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { mutate: editTodo, isSuccess } = useEditTodoMutation(dateType);

  const handleOpen = (todo: Todo) => {
    setSelectedTodo(todo);
    open();
  };

  const handleEditTodo = (todo: Todo) => {
    editTodo({ todo });
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess]);

  return {
    isOpen,
    open: handleOpen,
    close,
    handleEditTodo,
    content: selectedTodo && <TodoEditForm todo={selectedTodo} handleEditTodo={handleEditTodo} />,
    title: '할 일 수정하기',
  };
};

export default useEditTodoBottomSheet;
