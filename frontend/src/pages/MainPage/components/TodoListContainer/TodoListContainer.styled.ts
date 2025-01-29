import styled from 'styled-components';

export const TodoListContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 1.2rem;
  border-radius: 2.4rem;
  margin: 0 2.4rem;

  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.lightGreen100} 0%,
    ${({ theme }) => theme.colors.lightWhite30} 100%
  );

  backdrop-filter: blur(3.3rem);
`;

export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const TodoItem = styled.div`
  ${({ theme }) => theme.fonts.body15};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray950};

  display: flex;
  gap: 1.2rem;
  border-radius: 1.2rem;
  padding: 1.2rem;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 0.35rem 0 0.45rem;
`;

export const ContentTitle = styled.span`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.gray600};
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const EditLabel = styled.span`
  ${({ theme }) => theme.fonts.label13};
  color: ${({ theme }) => theme.colors.gray600};
`;
