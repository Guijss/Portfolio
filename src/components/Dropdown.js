import React from 'react';
import styled from 'styled-components';
import { MdArrowDropDown } from 'react-icons/md';
import { CgCheck } from 'react-icons/cg';

const DdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 7rem;
  align-items: center;
  z-index: 10;
  &:hover {
    cursor: pointer;
  }
`;

const DdMain = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 30%;
  min-height: 1.5rem;
  color: rgb(180, 180, 180);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DdSecBox = styled.li`
  position: absolute;
  width: 8rem;
  top: calc(50% + 1rem);
  border-radius: 0.5rem;
  border: 1px solid rgba(70, 70, 70);
  background-color: ${(props) => props.theme.navMain};
  display: flex;
  flex-direction: column;
`;

const DdItem = styled.ul`
  width: 100%;
  height: 1.5rem;
  min-height: 1.5rem;
  color: rgb(180, 180, 180);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    backdrop-filter: brightness(1.2);
  }
`;

const Dropdown = (props) => {
  return (
    <DdWrapper style={props.customStyle}>
      <DdMain onClick={props.clickHandler}>
        <span>Algorithm</span>
        <MdArrowDropDown size={20} />
      </DdMain>
      {props.open && (
        <DdSecBox>
          {props.content.map((opt, i, arr) => {
            return (
              <DdItem key={i} onClick={() => props.selectionHandler(opt)}>
                <span style={{ padding: '0 0 0 10%' }}>{opt}</span>
                {props.selection === opt && (
                  <CgCheck style={{ padding: '0 2% 0 0' }} />
                )}
              </DdItem>
            );
          })}
        </DdSecBox>
      )}
    </DdWrapper>
  );
};

export default Dropdown;
