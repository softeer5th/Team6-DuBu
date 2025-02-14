import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useReducer, useRef, useState } from 'react';

import * as S from './TimeBlockItem.styled';
import TodoShowForm from './TodoShowForm';

import { checkTodo, PathTodo } from '@/api/plan';
import BottomSheet from '@/components/BottomSheet';
import Icon from '@/components/Icon';
import { ICON_MAPPER } from '@/constants/config';
import useShowTodoBottomSheet from '@/pages/PlanPage/hooks/useShowTodoBottomSheet';

const TODO_CHECK_DELAY = 500;

const useCheckTodoMutation = () => {
  return useMutation({
    mutationFn: ({ todoId, isCompleted }: { todoId: number; isCompleted: boolean }) =>
      checkTodo(todoId, isCompleted),
  });
};

interface TimeBlockItemProps {
  todo: PathTodo;
}

const TimeBlockItem = ({ todo }: TimeBlockItemProps) => {
  const { isOpen, open, close, title } = useShowTodoBottomSheet();
  const { mutateAsync: checkTodo } = useCheckTodoMutation();

  const [isDone, toggle] = useReducer((prev) => !prev, todo.isDone);
  const [isAnimating, setIsAnimating] = useState(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUncheckTodo = async () => {
    await checkTodo({ todoId: todo.todoId, isCompleted: false });
    toggle();
  };

  const handleCheckTodo = async () => {
    await checkTodo({ todoId: todo.todoId, isCompleted: !isDone });
    setIsAnimating(true);
    checkTimeoutRef.current = setTimeout(() => {
      toggle();
      setIsAnimating(false);
    }, TODO_CHECK_DELAY);
  };

  useEffect(() => {
    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <S.TimeBlockItem>
        <S.CheckIconWrapper
          onClick={isDone ? handleUncheckTodo : handleCheckTodo}
          $isDone={isDone}
          $isAnimating={isAnimating}
        >
          <Icon icon="EmptyCheck" cursor="pointer" />
          <Icon icon="FilledCheck" cursor="pointer" />
          <Icon icon={ICON_MAPPER[todo.category]} cursor="pointer" />
        </S.CheckIconWrapper>
        <S.TimeBlockContent onClick={open}>
          <S.TodoTitle $isDone={isDone}>{todo.title}</S.TodoTitle>
          <S.TodoMemo>{todo.memo}</S.TodoMemo>
        </S.TimeBlockContent>
      </S.TimeBlockItem>
      <BottomSheet
        isOpen={isOpen}
        onClose={close}
        title={title}
        content={<TodoShowForm todo={todo} />}
      />
    </>
  );
};

export default TimeBlockItem;
