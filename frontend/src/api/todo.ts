import fetchClient from './fetchClient';

export interface Todo {
  todo_id: number;
  category: string; // 독서, 영어, 언어, 뉴스, 취미, 기타
  difficulty: '쉬움' | '보통' | '어려움';
  name: string;
}

export const getTodayTodoList = async () => {
  return await fetchClient.get<Todo[]>('/todos/today');
};
