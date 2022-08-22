import './App.css';
import Home from './pages/user/home/Home';
import {BrowserRouter,Routes,Route,useLocation} from "react-router-dom"
import AdminLogin from './pages/admin/login/AdminLogin';
import Dashboard from './pages/admin/dashboard/Dashboard';

import DestinationPage from './pages/user/destination/DestinationPage';
import PlacePage from './pages/user/place/PlacePage';
import ManageUsers from './pages/admin/ManageUsers/ManageUsers';

import LoginPage from './pages/hotelOwners/login/LoginPage';





function App() {
  
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route exact path ='/' element={<Home/>}/>
        <Route path ='/search' element ={<DestinationPage/>}/>
        <Route path="/search/place/:placeId" element={<PlacePage/>}/>
      </Routes>

      <Routes>
        <Route path='/admin' >
        <Route index element={<AdminLogin/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='manage-users' element={<ManageUsers/>}>
          {/* <Route index element ={<List/>}/>
          <Route path='userId' element={<Single/>}/>
          <Route path='new' element={<New/>}/>
           */}
        </Route>
        </Route>
        
      </Routes>
      <Routes>
      <Route path='/listProperty' >
        <Route index element={<LoginPage/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
