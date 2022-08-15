import { createGlobalStyle } from 'styled-components';

const StyledGlobal = () => <GlobalStyle />;

const GlobalStyle = createGlobalStyle`

  /* @font-face {
    font-family: 'Helvetica';
    src: url('./assets/fonts/Helvetica.ttc') format('truetype');
  } */

  

  body {
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Helvetica', 'PlantageneCherokee', 'Arial', 'sans-serif';
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 1px;

      &-track {
        background: #f8f8f8;
      }
      
      &-thumb {
        background: #5571B2;
        border-radius: 0.5rem;
            }
    }
  }
`;

// @font-face {
//   font-family: 'PlantagenetCherokee';
//   src: url('./assets/fonts/plantc.ttf') format('truetype');
// }

export default StyledGlobal;
