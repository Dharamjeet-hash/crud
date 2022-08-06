import './App.css';
import { Route, BrowserRouter, Routes,Navigate } from 'react-router-dom'  
import Login from './components/login'
import Register from './components/register'
import User from './components/user'
import Chat from './components/chat'
import CreateCar from './components/createCar'
import ViewCar from './components/viewCar';




function App() {
  const token = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <Routes>  
          <Route path="/" element={ <Login /> } />  
          <Route path="/register" element={ <Register /> } />
          <Route path="/user" element={ token ?  <User /> : <Navigate to="/" />} /> 
          <Route path="/chat" element={ token ?  <Chat /> : <Navigate to="/" />} /> 
          <Route path="/create-car" element={ token ?  <CreateCar /> : <Navigate to="/" />} /> 
          <Route path="/view-car/:id" element={ token ?  <ViewCar /> : <Navigate to="/" />} />  
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
