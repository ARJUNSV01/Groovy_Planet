import React from 'react'
import Banner from '../../../components/user/banner/Banner'
import BottomMenu from '../../../components/user/bottomMenu/BottomMenu'
import Navbar from '../../../components/user/navbar/Navbar'

const Home = () => {
 
  
  return (
    <div>
        <Navbar color={'transparent'} position={'fixed'}/>
        <div className="">
          <Banner/>
        </div>
       <BottomMenu/>
    </div>
  )
}

export default Home