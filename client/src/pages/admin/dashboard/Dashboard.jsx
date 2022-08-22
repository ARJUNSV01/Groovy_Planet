

import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import Navbar from "../../../components/admin/navbar/Navbar"
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import ViewUsers from "../../../components/admin/viewUsers/ViewUsers"

import Widget from "../../../components/admin/widgets/Widget"


import "./dashboard.scss"

function Dashboard() {
 
  const navigate = useNavigate()
  const [cookies] = useCookies()
   useEffect(()=>{
    
    if (!cookies.loggedIn){
      navigate('/admin')
    }
  },[])
  return (
    
      <Sidebar>
      a
      </Sidebar>
      
    
      
    
  )
}

export default Dashboard