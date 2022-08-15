import styled from "styled-components";

export const ItemList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0px 10px 0px;
  width: 100%;
  height: 100px;
  border-radius: 25px;
`;

export const ImgItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

export const TextItem = styled.div`
  width: 55%;
  margin-left: 10px;
  & > h5 {
    margin: 0;
    color: #555555;
    font-size: 1.1rem;
    font-weight: 200;
  }
  & > p {
    margin: 5px 0 0 0;
    color: #a7a4a4;
    font-size: small;
    font-size: 0.9rem;
  }
`;
