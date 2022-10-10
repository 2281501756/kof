import NavBar from './views/navbar/NavBar'
import RouterConfig from './router'
import Home from './views/home/Home'

const App = () => {
  return (
    <div id="app">
      <NavBar></NavBar>
      <Home>
        <RouterConfig></RouterConfig>
      </Home>
    </div>
  )
}

export default App
