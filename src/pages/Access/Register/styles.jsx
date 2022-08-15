import styled from 'styled-components';
import { Container } from '../Login/style';

export const ContainerRegistro = styled(Container)`
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 4rem 0.5rem 4rem 0.5rem;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
