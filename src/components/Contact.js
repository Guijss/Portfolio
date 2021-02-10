import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  height: 100vh;
  width: calc(100vw - 6rem);
  margin-left: 6rem;
  background: ${(props) => props.theme.primaryBgCol};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contact = () => {
  return (
    <ContactContainer>
      <div
        style={{
          borderRadius: '50%',
          background: 'gray',
          width: '200px',
          height: '200px',
        }}
      ></div>
    </ContactContainer>
  );
};

export default Contact;
