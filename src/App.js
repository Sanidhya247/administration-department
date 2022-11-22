import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom'  
import UserLogin from './Components/UserLogin';
import ManagerLogin from './Components/ManagerLogin';
import MainHome from './Components/MainHome';
import Alert from './Components/Alert';
import { useState } from 'react';
function App() {
  const [alert , setAlert] = useState(null);
  function showAlert  (message  ,type ){
    setAlert({
      message : message,
      type : type
    })
    setTimeout(()=>{
      setAlert('')
    },3000)
  }
  return (
    <Router>
  <div>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert}/>
      <Routes>
      <Route path='/' element={<Home showAlert={showAlert} />}></Route>
      <Route path='/loginuser' element={<UserLogin showAlert={showAlert} />}></Route>
      <Route path='/loginmanager' element={<ManagerLogin showAlert={showAlert} />}></Route>
      <Route path='/users' element={<MainHome showAlert={showAlert} />}></Route>
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
