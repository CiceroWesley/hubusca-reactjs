import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Users from './pages/Users/Users'
import Navbar from './Components/Navbar/Navbar'


function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
