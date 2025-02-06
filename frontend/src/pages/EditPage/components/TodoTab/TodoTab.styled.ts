import styled from 'styled-components';

export const TodoTabLayout = styled.div`
  padding-top: 1.6rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SloganWrapper = styled.p`
  margin: 0 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 0.8rem;
  white-space: pre-wrap;
  text-align: center;

  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray900};
`;

export const TodoEditList = styled.ul`
  display: flex;
  flex-direction: column;

  border-top: 0.15rem solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;
