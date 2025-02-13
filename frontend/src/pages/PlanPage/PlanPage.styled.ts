import styled from 'styled-components';

export const PlanPageLayout = styled.section`
  position: relative;
  height: inherit;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow-y: scroll;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

// PlanContent (타임 블럭)
export const PlanContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow-y: scroll;
  padding-bottom: 8rem;
`;

export const TimeBlockSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem;
`;

// 이동 완료 버튼
export const FinishButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: center;
  width: 100%;
  height: 13.9rem;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.lightWhite},
    ${({ theme }) => theme.colors.white}
  );
`;

export const FinishButton = styled.button`
  position: absolute;
  bottom: 1.6rem;

  display: flex;
  padding: 1.5rem 3rem;
  gap: 0.4rem;
  border-radius: 3.2rem;

  ${({ theme }) => theme.fonts.body16};
  background-color: ${({ theme }) => theme.colors.green600};
  color: ${({ theme }) => theme.colors.white};
`;
