import styled from "styled-components";

export const SelectSwitch = styled.div`
  display: flex;
  padding-top: 0rem;
  justify-content: center;
  align-items: center;
`;

export const SelectedSwitchTextLeft = styled.div`
  font-size: 1.5rem;
  color: ${(props) => (props.status ? "#C6C6C6" : "#6385B8")};

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    text-align: end;
  }
`;

export const SelectedSwitchTextRight = styled.div`
  font-size: 1.5rem;
  color: ${(props) => (props.status ? "#6385B8" : "#C6C6C6")};
`;
