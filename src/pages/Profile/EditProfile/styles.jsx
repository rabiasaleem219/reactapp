import styled from 'styled-components';

export const Formulario = styled.div`
  width: 100%;
  padding: 20px 0 0 0px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;

    div {
      width: 100%;
    }

    button {
      width: 80%;
    }
  }
`;

export const LeftSide = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: 0 15px 0 0px;
`;

export const RightSide = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0px 0 15px;
  justify-content: center;
`;

export const BoxButton = styled.div`
  margin: 2rem 0 4rem 0;
  width: 80%;
  display: flex;
  justify-content: center;
`;
