import React, { useEffect, useRef, useState } from 'react';

import * as S from './TimeBlockItem.styled';
import TodoShowForm from './TodoShowForm';

import { PathTodo } from '@/api/plan';
import BottomSheet from '@/components/BottomSheet';
import Icon from '@/components/Icon';
import { ICON_MAPPER } from '@/constants/config';
import useShowTodoBottomSheet from '@/pages/PlanPage/hooks/useShowTodoBottomSheet';

const TODO_CHECK_DELAY = 500;

interface TimeBlockItemProps {
  todo: PathTodo;
}

const TimeBlockItem = ({ todo }: TimeBlockItemProps) => {
  const { isOpen, open, close, title } = useShowTodoBottomSheet();

  const [isDone, setIsDone] = useState(todo.isDone);
  const [isAnimating, setIsAnimating] = useState(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCheckTodo = () => {
    setIsAnimating(true);
    checkTimeoutRef.current = setTimeout(() => {
      setIsDone(true);
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
        <S.CheckIconWrapper onClick={handleCheckTodo} $isDone={isDone} $isAnimating={isAnimating}>
          <Icon icon="EmptyCheck" cursor={isDone ? 'not-allowed' : 'pointer'} />
          <Icon icon="FilledCheck" cursor={isDone ? 'not-allowed' : 'pointer'} />
          <Icon icon={ICON_MAPPER[todo.category]} cursor={isDone ? 'not-allowed' : 'pointer'} />
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
