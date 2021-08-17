import React from 'react';
import styled from 'styled-components';

const ContactWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: rgb(30, 30, 30);
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: row;
`;

const Contact = () => {
  return <ContactWrapper />;
};

export default Contact;
