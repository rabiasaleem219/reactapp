import styled from 'styled-components';

export const MainButton = styled.button`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.headerBlue};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius || '35px'};
  color: ${(props) => props.color || props.theme.colors.white};
  font-family: 'Lato', sans-serif;
  font-size: ${(props) => props.fontSize || '1.2rem'};
  font-weight: ${(props) => props.fontWeight || '400'};
  width: ${(props) => props.width || ''};
  height: ${(props) => props.height || '3rem'};
  padding: ${(props) => props.padding || '0.5rem 1rem'};
  margin: ${(props) => props.margin || ' 1rem 0'};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.shadow || '0px 13px 99px  rgba(4, 12, 105, 0.01)'};
  transition: all 0.3s ease-in-out;
  display: ${(props) => props.display || ''};
  align-self: ${(props) => props.alignSelf || ''};
  justify-content: ${(props) => props.justifyContent || ''};
  align-items: ${(props) => props.alignItems || ''};
  font-size: ${(props) => props.fontSize || '1.2rem'};
  display: ${(props) => props.display || ''};
  &:hover {
    background-color: ${(props) =>
      props.backgroundColorHover || props.theme.colors.navBlueHover};
  }
`;
