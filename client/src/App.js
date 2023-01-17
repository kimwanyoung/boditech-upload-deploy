import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Router from "./Router";

const GlobalStyles = createGlobalStyle`
        ${reset}
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