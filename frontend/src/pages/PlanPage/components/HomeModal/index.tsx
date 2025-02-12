import { createPortal } from 'react-dom';

import * as S from './HomeModal.styled';

interface HomeModalProps {
  close: () => void;
  onConfirm: () => void;
}

const HomeModal = ({ close, onConfirm }: HomeModalProps) => {
  return (
    <>
      {createPortal(
        <S.ModalContainer>
          <S.ModalDimmed onClick={close} />
          <S.Modal>
            <S.ModalTitle>처음으로 가기</S.ModalTitle>
            <S.ModalContent>
              <span>현재 경로 정보와 할 일이 모두 사라져요.</span>
              <br />
              <span>그래도 이동할까요?</span>
            </S.ModalContent>
            <S.ModalFooter>
              <S.ModalCancelButton onClick={close}>취소하기</S.ModalCancelButton>
              <S.ModalConfirmButton onClick={onConfirm}>홈으로 이동</S.ModalConfirmButton>
            </S.ModalFooter>
          </S.Modal>
        </S.ModalContainer>,
        document.body,
      )}
    </>
  );
};

export default HomeModal;
