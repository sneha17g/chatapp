
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Signup from './component/signup.jsx';
import UserLogin from './component/userlogin.jsx';
import { Routes, Route } from 'react-router-dom'
import Home from './component/home.jsx';
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>


    </>
  )
}

export default App
