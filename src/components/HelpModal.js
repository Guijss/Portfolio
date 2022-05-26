import React, { useState } from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import styled from 'styled-components';

const HelpContainer = styled.div`
  position: absolute;
  background-color: transparent;
  top: 2rem;
  right: 5rem;
  z-index: 99;
  @media (max-height: 650px) {
    visibility: hidden;
  }
`;

const Modal = styled.div`
  position: absolute;
  color: ${(props) => props.theme.textMain};
  width: 10vw;
  right: 0;
  background-color: ${(props) => props.theme.navMain};
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.textMain};
  border-radius: 0.5rem;
`;

const HelpModal = () => {
  const [modalState, setModalState] = useState(false);
  const setModal = (state) => {
    setModalState(state);
  };

  return (
    <HelpContainer
      onMouseEnter={() => setModal(true)}
      onMouseLeave={() => setModal(false)}
    >
      <BiHelpCircle size={30} color="rgb(70, 70, 70)" />
      {modalState && (
        <Modal>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          suscipit iste aspernatur laborum obcaecati optio exercitationem illum
          laboriosam asperiores, ad sint, eaque voluptas enim magni ducimus
          animi perferendis esse itaque placeat architecto. At magni eaque, eius
          ratione facilis commodi repellat numquam quos modi autem dignissimos
          fugiat consectetur voluptatum dolor! Assumenda!
        </Modal>
      )}
    </HelpContainer>
  );
};

export default HelpModal;
