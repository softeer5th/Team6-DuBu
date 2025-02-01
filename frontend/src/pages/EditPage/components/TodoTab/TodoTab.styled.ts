import styled from 'styled-components';

export const TodoTabLayout = styled.div``;

export const SloganWrapper = styled.div`
  margin: 1.6rem 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 0.8rem;

  span {
    ${({ theme }) => theme.fonts.label14Med};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

export const TodoEditList = styled.ul`
  display: flex;
  flex-direction: column;

  border-top: 0.15rem solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;
