import axios from 'axios'
import React, { useState ,useEffect} from 'react'

import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import BottomMenu from '../../../components/user/bottomMenu/BottomMenu'
import Carousel from '../../../components/user/carousel/Carousel'
import Destination from '../../../components/user/Destination/Destination'
import Navbar from '../../../components/user/navbar/Navbar'
import { setDestinationData } from '../../../features/user/destinationSlice'
import { serverURL } from '../../../serverURL'

const DestinationPage = () => {
  const dispatch = useDispatch()
    const location = useLocation()
    console.log('hi');
    useEffect(()=>{
      console.log('im here');
        const placeId = location.state._id
        console.log('im here');
       
         (async function fetchDestinationData(){
           try {
            const {data} = await axios.get(`${serverURL}/user/destination/${placeId}`)
            console.log('im here');
            dispatch(setDestinationData(data.data))
           } catch (error) {
             console.log(error);
           }
          
         
         })() 


       
     
    })
   
    

    console.log('hi');
    
  return (
    <div>
      <Navbar/>
      <Destination/>
      <Carousel/>
      <BottomMenu/>
    </div>
  )
}

export default DestinationPage