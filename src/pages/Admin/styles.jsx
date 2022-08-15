import styled from 'styled-components';

export const OutletBox = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  background: ${(props) => props.theme.colors.lightGrayBackground};
`;
