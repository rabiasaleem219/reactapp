import React from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';

const Container = styled.div`
  & .ql-align-center {
    text-align: center;
  }

  & .ql-align-right {
    text-align: right;
  }

  & .ql-align-justify {
    text-align: justify;
  }

  & .ql-align-left {
    text-align: left;
  }
`;
export const Description = ({ description }) => {
  return <Container>{parse(description)}</Container>;
};
