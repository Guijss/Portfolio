import {
  PageWrapper,
  PageCentered,
  TitleWrapper,
  Title,
  Separator,
} from './commonStyledComponents';

const Contact = (props) => {
  return (
    <PageWrapper ref={props.fRef}>
      <TitleWrapper>
        <Title>Contact</Title>
        <Separator />
      </TitleWrapper>
      <PageCentered />
    </PageWrapper>
  );
};

export default Contact;
