import './App.css';
import Home from './pages/user/home/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminLogin from './pages/admin/login/AdminLogin';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path ='/' element={<Home/>}/>
      </Routes>
      <Routes>
        <Route path='/admin' element={<AdminLogin/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
