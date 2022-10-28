import NavBar from './views/navbar/NavBar'
import RouterConfig from './router'
import styled from 'styled-components'
const AppStyle = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  background: url('/bg.jpg') no-repeat center/cover;
`
const App = () => {
  return (
    <AppStyle id="app">
      <NavBar></NavBar>
      <RouterConfig></RouterConfig>
    </AppStyle>
  )
}

export default App
