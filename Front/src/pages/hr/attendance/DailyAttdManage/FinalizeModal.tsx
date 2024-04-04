import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ModalTitle, ModalBody, ModalFooter, Button } from 'react-bootstrap';

const ModalBg = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffffffe2;
`;

const ModalBox = styled.div`
  width: 25rem;
  background-color: white;
`;

const Modal = (props: { toggle: () => void; setHandleOk: Dispatch<SetStateAction<boolean>> }) => {
  const [open, setOpen] = React.useState(true);

  const modalClose = () => {
    props.setHandleOk(false);
    props.toggle();
  };

  const handleOk = () => {
    props.setHandleOk(true);
    props.toggle();
  };
  return (
    <ModalBg>
      <ModalBox>
        <ModalTitle>마감</ModalTitle>
        <ModalBody>마감하시겠습니까?</ModalBody>
        <ModalFooter>
          <Button onClick={() => modalClose()}>취소</Button>
          <Button onClick={() => handleOk()}>확인</Button>
        </ModalFooter>
      </ModalBox>
    </ModalBg>
  );
};

export default Modal;
