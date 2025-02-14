import { useState } from 'react';

import useEditTodoMutation from './useEditTodoMutation';
import TodoEditForm from '../components/TodoEditForm';

import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';
import { Todo, TodoType } from '@/types/todo';

const useEditTodoBottomSheet = (todoType: TodoType, planId?: number) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { mutate: editTodo } = useEditTodoMutation(todoType);

  const handleOpen = (todo: Todo) => {
    setSelectedTodo(todo);
    dispatch.open();
  };

  const handleEditTodo = (todo: Todo) => {
    editTodo(
      { todo, planId },
      {
        onSuccess: () => {
          dispatch.close();
        },
      },
    );
  };

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
