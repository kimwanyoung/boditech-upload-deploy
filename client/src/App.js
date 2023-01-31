import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Router from "./Router";

const GlobalStyles = createGlobalStyle`
        ${reset}

        *,body {
          font-family: 'Courier New, 16pt', 'Gulim' !important;
        }
`

const App = () => {
  return (
    <>
      <GlobalStyles/>
      <Router/>
    </>
  )
}

export default App;