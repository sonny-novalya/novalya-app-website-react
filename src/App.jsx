
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import IndexRoutes from './app/routes/routes'

function App() {

  return (
    <>
   <BrowserRouter>
    <IndexRoutes/>
   </BrowserRouter>
    </>
  )
}

export default App
