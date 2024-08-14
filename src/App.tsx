import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>

      </Routes>
    </>
  )
}

export default App
