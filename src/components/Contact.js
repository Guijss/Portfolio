import React from 'react';
import styled from 'styled-components';

const ContactWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.bgMain};
  top: 10vh;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contact = () => {
  return <ContactWrapper />;
};

export default Contact;
