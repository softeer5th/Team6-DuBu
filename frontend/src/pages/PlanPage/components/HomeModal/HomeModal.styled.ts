import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalDimmed = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
`;

export const Modal = styled.div`
  width: 23.8rem;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 1.4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

export const ModalTitle = styled.h2`
  ${({ theme }) => theme.fonts.headline17};
  color: ${({ theme }) => theme.colors.gray950};
  padding-top: 2rem;
`;

export const ModalContent = styled.div`
  ${({ theme }) => theme.fonts.label13Med};
  color: ${({ theme }) => theme.colors.gray700};
  text-align: center;
  padding: 0 1.6rem 1.2rem 1.6rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  border-top: 0.1rem solid ${({ theme }) => theme.colors.gray300};
`;

export const ModalButton = styled.button`
  color: ${({ theme }) => theme.colors.green700};
  flex-basis: 50%;
  padding: 1.2rem;
`;

export const ModalCancelButton = styled(ModalButton)`
  ${({ theme }) => theme.fonts.headline17Reg};
  border-right: 0.1rem solid ${({ theme }) => theme.colors.gray300};
`;

export const ModalConfirmButton = styled(ModalButton)`
  ${({ theme }) => theme.fonts.headline17};
`;
