import { Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import SignUpFlow from './pages/SignUpFlow';
import Map from './pages/Map/Map';
import Post from './pages/Post/Post';
import PostGetAll from './pages/Post/PostGetAll';



function App() {
  return (
    <Routes>
      <Route path='/' element={<div>메인페이지로 이동</div>} />
      <Route path='/login' element={<Login></Login>} />
      <Route path='/signup' element={<SignUpFlow></SignUpFlow>} />
      <Route path='/map' element={<Map></Map>} />
      <Route path='/post' element={<Post></Post>} />
      <Route path='/post/getall' element={<PostGetAll></PostGetAll>} />
    </Routes>


  )
}




export default App;
