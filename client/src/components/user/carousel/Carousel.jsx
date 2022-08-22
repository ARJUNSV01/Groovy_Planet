
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import './carousel.css'



// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../../../serverURL";

const Carousel = () => {
    const[places,setPlaces] = useState([])
    const{placeData} = useSelector ((state)=> state.destination)
    console.log(placeData);
    const {payload:placeInfo} = placeData
    
    useEffect(() => {
      (async function (){
       const {data} = await axios.get(`${serverURL}/user/places`)
       setPlaces(data.data)
      
      })()
    
      
    }, [])
    // const srcs=["https://swiperjs.com/demos/images/nature-1.jpg","https://swiperjs.com/demos/images/nature-2.jpg","https://swiperjs.com/demos/images/nature-3.jpg","https://swiperjs.com/demos/images/nature-7.jpg"]
    console.log(places,'oooooooooooola');
  return (
    <div className="container mt-5">
        <p className='fs-1 fw-bolder'>Destinations  </p>
        <Swiper
      style={{width:'100%' ,paddingTop: '50px',
      paddingBottom: '50px'}}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        // className="mySwiper"
    
      >
         {places.map((place)=>
             <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px',position:'relative'}} >
             <Link  to = {`place/${place._id}`} state={{_id:place._id}} >
               <img style={{width:'100%',display:'block'}} src={place.src} alt={place.name} />
               <div style={{position:"absolute" ,bottom:'20px'}} className="placeInfo ms-5"><p className="fs-3 text-light fw-bolder">{place.name}</p></div>
             </Link>
             </SwiperSlide> 
         )} 
        {/* <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px',position:'relative'}} >
        <Link  to = "/hello" state={{_id:'munnar'}} >
          <img style={{width:'100%',display:'block'}} src="https://swiperjs.com/demos/images/nature-1.jpg" />
          <div style={{position:"absolute" ,bottom:'20px'}} className="placeInfo ms-5"><p className="fs-3 text-light fw-bolder">Kumarakom</p></div>
        </Link>
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px'}}>
          <img style={{width:'100%',display:'block'}} className="carouselImage" src="https://swiperjs.com/demos/images/nature-2.jpg" />
          <div style={{position:"absolute" ,bottom:'20px'}} className="placeInfo ms-5"><p className="fs-3 text-light fw-bolder">Kumarakom</p></div>
        </SwiperSlide  >
        <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px'}}>
          <img style={{width:'100%',display:'block'}} src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px'}}>
          <img style={{width:'100%',display:'block'}} src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px'}}>
          <img style={{width:'100%',display:'block'}} src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px'}}>
          <img style={{width:'100%',display:'block'}} src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px'}}>
          <img style={{width:'100%',display:'block'}} src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px'}}>
          <img style={{width:'100%',display:'block'}} src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{backgroundPosition:'center',backgroundSize:'cover',width:'300px',height:'300px'}}>
          <img style={{width:'100%',display:'block'}} src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </div>
  )
}

export default Carousel