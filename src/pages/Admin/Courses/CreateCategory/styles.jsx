import styled from "styled-components";

export const Modal = styled.div`
  & > .p-dialog-content {
    overflow-y: hidden !important;
  }
`;

export const Title = styled.span`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0rem 0;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

export const TableContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
