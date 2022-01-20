import styled from 'styled-components';

const ContactWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.bgMain} 20%,
    ${(props) => props.theme.navMain} 80%
  );
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contact = (props) => {
  return <ContactWrapper ref={props.fRef}></ContactWrapper>;
};

export default Contact;
