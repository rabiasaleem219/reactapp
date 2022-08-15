import styled from 'styled-components';

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems || 'center'};
  margin: 10px 0;
`;

export const Container = styled.div``;

export const SelectInput = styled.select`
  padding: ${(props) => props.padding || '0px 25px'};
  border: none;
  border-radius: 45px;
  width: ${(props) => props.width || '75%'};
  height: ${(props) => props.heigth || '50px'};
  margin: ${(props) => props.margin || '40px 0px 5px 0px'};
  background-color: ${(props) => props.backgroundColor || '#f5f5f5'};
  color: #838383;

  &:focus {
    outline: none;
  }
`;
