import { ThemeProvider } from "styled-components";
import AppRouter from "./routes/AppRouter";
import StyledGlobal from "./globalStyles";
import { colors, breakpoints, gradient } from "./const";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "tachyons";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const theme = {
  colors,
  gradient,
  breakpoints,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledGlobal />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
