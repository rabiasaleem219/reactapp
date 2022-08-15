import styled from 'styled-components';

export const Footer = styled.div`
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

  width: 100%;
  height: 75px;
`;
