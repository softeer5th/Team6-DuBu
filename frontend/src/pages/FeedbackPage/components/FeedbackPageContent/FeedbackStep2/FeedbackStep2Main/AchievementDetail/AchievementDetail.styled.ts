import styled from 'styled-components';

export const AchievementDetailLayout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  width: 32.7rem;
  background-color: ${({ theme }) => `${theme.colors.green100}4D`};
  border-radius: 2.4rem;
`;

export const Title = styled.div`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.gray600};
`;

export const AchievementList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const AchievementItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background-color: ${({ theme }) => theme.colors.white};
  height: 4.8rem;
  border-radius: 1.2rem;
  padding: 1.2rem;
  color: ${({ theme }) => theme.colors.gray950};
  ${({ theme }) => theme.fonts.body15};
`;
