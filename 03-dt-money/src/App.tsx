import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { Transactions } from "./pages/transactions";
import { GlobalStyle } from './styles/global'
import { Summary } from "./components/Summary";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>

      <Transactions />
      <Summary />

      <GlobalStyle />
      
    </ThemeProvider>
  )
}

