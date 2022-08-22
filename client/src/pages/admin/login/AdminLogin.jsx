import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Login from "../../../components/admin/Login/Login"


function AdminLogin() {
  const navigate = useNavigate()
  const [cookies, setCookie,removeCookie] = useCookies()
  useEffect(()=>{
    
      if (cookies.loggedIn){
        navigate('/admin/dashboard')
      }
      
    },[])
  return (
    <div>
        <Login/>
    </div>
  )
}

export default AdminLogin