// import { Link, useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import "./sidebar.css";
// import { useCookies } from "react-cookie";
// import { useDispatch } from "react-redux";
// import { setShoow } from '../../../features/auth/authSlice';

// const Sidebar = ({children}) => {
//   const dispatch = useDispatch()
//   const [show, setShow] = useState(false);
//   const [cookies,setCookie,removeCookie] = useCookies(['loggedIn'])
//   // className={show ? "space-toggle main" : null}
 
//   return (
//     // <main id="main" >
//     <div>
//       <header className={`header ${show ? "space-toggle" : null}`}>
//         <div className="header-toggle" onClick={() =>{ 
//           dispatch(setShoow(!show))
//           setShow(!show)}}>
//           <i className="fas fa-bars bar "></i>
//         </div>
//       </header>
//       <aside className={`sidebar ${show ? "show" : null}`}>
//         <nav className="nav">
//           <div>
//             <Link to="/" className="nav-logo">
//               <i className="fas fa-home-alt nav-link-icon"></i>
//               <span className="nav-logo-name">Home</span>
//             </Link>
//             <div className="nav-list">
//               <Link to="/dashboard" className="nav-link active">
//                 <i className="fas fa-tachometer nav-link-icon"></i>
//                 <span className="nav-link-name">Dashboard</span>
//               </Link>
//               <Link to="/hotel" className="nav-link">
//                 <i className="fas fa-hotel nav-link-icon"></i>
//                 <span className="nav-link-name">Hotel</span>
//               </Link>
//               <Link to="/gallery" className="nav-link">
//                 <i className="fas fa-image nav-link-icon"></i>
//                 <span className="nav-link-name">Hotel</span>
//               </Link>
//             </div>
//           </div>
//           <h6  className="nav-link">
//             <i className="fas fa-sign-out nav-link-icon" onClick={()=>{
//               // console.log('hi');
//               removeCookie('loggedIn')
//               console.log('hi');
//             }}></i>
//             <span className="nav-link-name">Logout</span>
//           </h6>
//         </nav>
//       </aside>
//       {children}
//     {/* </main> */}
//     </div>
//   );
// };

// export default Sidebar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { serverURL } from "../../../serverURL";
import { useCookies } from "react-cookie";


const Sidebar = ({children}) => {
  const [show, setShow] = useState(true);
  const navigate =useNavigate()
  const location = useLocation()
  const active = location.pathname
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log(cookies);

  const handleLogout =async()=>{
   try {
     await axios.get(`${serverURL}/auth/adminLogout`,{withCredentials:true})
     navigate('/admin')
   } catch (error) {
    console.log(error);  
   }
  }
  
  
  return (
    <main id="main" className={show ? "space-toggle main" : null}>
      <header className={`header ${show ? "space-toggle" : null}`}>
        <div className="header-toggle" style={{color:'#c4bff2'}} onClick={() => setShow(!show)}>
          <i className="fas fa-bars"></i>
        </div>
      </header>
      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            <Link to="/" className="nav-logo">
              <i className="fas fa-home-alt nav-link-icon " style={{color:'#bba4f8'}}></i>
              <span className="nav-logo-name">Home</span>
            </Link>
            <div className="nav-list">
              <Link to="/admin/dashboard" className={`nav-link ${active === '/admin/dashboard'? 'active':null}`}>
                <i className="fas fa-tachometer nav-link-icon"></i>
                <span className="nav-link-name">Dashboard</span>
              </Link>
              <Link to="/admin/manage-users" className={`nav-link ${active === '/admin/manage-users'? 'active':null}`}>
                <i className="fas fa-user nav-link-icon"></i>
                <span className="nav-link-name">Manage Users</span>
              </Link>
              <Link to="/gallery" className={`nav-link ${active === '/admin/gallery'? 'active':null}`}>
                <i className="fas fa-image nav-link-icon"></i>
                <span className="nav-link-name">Hotel</span>
              </Link>
            </div>
          </div>
          {/* <Link    className="nav-link"> */}
            <div onClick={handleLogout} className="nav-link">
            <i className="fas fa-sign-out nav-link-icon"></i>
            <span className="nav-link-name">Logout</span>
            </div>
          {/* </Link> */}
        </nav>
      </aside>
      {/* <h1>Content</h1> */}
      {children}
    </main>
  );
};

export default Sidebar;