import styled from 'styled-components';

export const MainPageLayout = styled.main`
  position: relative;
  background-color: ${({ theme }) => theme.colors.green50};
  height: inherit;

  padding: 0 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  padding-top: 2rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 1.2rem;
`;

export const DateHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.gray800};
  ${({ theme }) => theme.fonts.body15};
  word-spacing: 0.8rem;
`;

export const EmptyDateHeader = styled.header`
  width: 2.4rem;
  height: 2.4rem;
`;

export const RouteSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const RouteTitleWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  min-width: 5.4rem;
`;

export const RouteItem = styled.div`
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray400};
  background-color: ${({ theme }) => theme.colors.lightWhite70};

  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.3rem 1.25rem;
  border-radius: 1.2rem;
`;

export const Location = styled.span`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.green700};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 1.2rem;
  border-radius: 2.4rem;

  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.lightGreen100} 0%,
    ${({ theme }) => theme.colors.lightWhite30} 100%
  );

  backdrop-filter: blur(3.3rem);
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

export const StartButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StartButton = styled.button`
  ${({ theme }) => theme.fonts.body16};
  background-color: ${({ theme }) => theme.colors.green600};
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  padding: 1.5rem 3rem;
  gap: 0.4rem;
  border-radius: 3.2rem;

  position: fixed;
  bottom: 1.6rem;
`;
