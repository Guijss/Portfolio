import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const ProjectsContainer = styled.div`
  height: 100vh;
  width: calc(100vw - 6rem);
  margin-left: 6rem;
  background: ${(props) => props.theme.primaryBgCol};
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;
`;

const Projects = () => {
  return (
    <ProjectsContainer>
      <Card />
    </ProjectsContainer>
  );
};
export default Projects;
