import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BottomMenu from '../../../components/user/bottomMenu/BottomMenu';
import Carousel from '../../../components/user/carousel/Carousel';
import Carousel2 from '../../../components/user/carousel2/Carousel2';
import Navbar from '../../../components/user/navbar/Navbar';
import Place from '../../../components/user/place/Place';
import { setPlaceData } from '../../../features/user/destinationSlice';
import { serverURL } from '../../../serverURL';

const PlacePage = () => {
    let { placeId } = useParams();
    const dispatch = useDispatch()

    console.log(placeId);

    useEffect(() => {
      try {
          (async () => {
            const {data} = await axios.get(`${serverURL}/user/placeDetails/${placeId}`)
            console.log(data.data);
            dispatch(setPlaceData(data.data))
          })()
      } catch (error) {
          console.log(error);
      }
     
    }, [])
    
  return (
    <div>
        <Navbar/>
        <Place/>
        <div className="container">
        <p className='fs-1 fw-bolder mb-5 mt-5'>Attractions  </p> 
        </div>
        <Carousel2 heading={'Do'} body={'Places to see, ways to wander, and signature experiences that define'}/>
        <Carousel2 heading={'Stay'} body={'A mix of the charming, iconic, and modern.'}/>
        <BottomMenu/>
    </div>
  )
}

export default PlacePage