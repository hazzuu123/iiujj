import './App.css';
import Login from './pages/Login';
import SignUpFlow from './pages/SignUpFlow';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Routes>
      <Route path='/' element={<div>메인페이지로 이동</div>} />
      <Route path='/login' element={<Login></Login>} />
      <Route path='/signup' element={<SignUpFlow></SignUpFlow>} />
    </Routes>


  )
}




export default App;
