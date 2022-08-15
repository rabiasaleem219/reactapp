import styled from 'styled-components';

export const MenuBarContainer = styled.div`
  height: 85px;
  padding-right: 3rem;
  display: flex;
  margin-top: -2px;
  align-items: center;
  justify-content: flex-end;
  background: ${(props) => props.theme.gradient.blueGradientMain};
  background: -moz-linear-gradient(
    90deg,
    ${(props) => props.theme.gradient.blueGradient[0]},
    ${(props) => props.theme.gradient.blueGradient[1]},
    ${(props) => props.theme.gradient.blueGradient[2]}
  );
  background: -webkit-linear-gradient(
    90deg,
    ${(props) => props.theme.gradient.blueGradient[0]},
    ${(props) => props.theme.gradient.blueGradient[1]},
    ${(props) => props.theme.gradient.blueGradient[2]}
  );
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.gradient.blueGradient[0]},
    ${(props) => props.theme.gradient.blueGradient[1]},
    ${(props) => props.theme.gradient.blueGradient[2]}
  );

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    height: 50px;
  }
`;
