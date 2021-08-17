import React from 'react';
import styled from 'styled-components';

const DdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
  &:hover {
    cursor: pointer;
  }
`;

const DdMain = styled.div`
  position: relative;
  width: 10rem;
  height: 30%;
  min-height: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(70, 70, 70);
  background: rgb(30, 30, 30);
`;

const DdSecBox = styled.li`
  position: absolute;
  top: calc(50% + 0.8rem);
  border-radius: 0.5rem;
  border: 1px solid rgba(70, 70, 70);
  background: rgb(30, 30, 30);
  display: flex;
  flex-direction: column;
`;

const DdItem = styled.ul`
  width: 10rem;
  height: 30%;
  min-height: 1.5rem;
  color: rgb(180, 180, 180);
  margin: 0 0 0 10%;
  padding: 0;
`;

const Dropdown = (props) => {
  return (
    <DdWrapper>
      <DdMain onClick={props.clickHandler}>
        <DdItem></DdItem>
      </DdMain>
      {props.open && (
        <DdSecBox>
          {props.content.map((opt) => {
            return <DdItem>{opt}</DdItem>;
          })}
        </DdSecBox>
      )}
    </DdWrapper>
  );
};

export default Dropdown;
