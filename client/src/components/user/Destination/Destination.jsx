import React, { useRef } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css';
import { Navigation,EffectFade, Pagination, Autoplay } from 'swiper';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'

import './destination.css'
import './destination.scss'
import { useSelector } from 'react-redux';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
const Destination = () => {
  const swiperNavPrefRef = useRef(null)
  const swiperNavNextRef = useRef(null)
  const{destinationData} = useSelector ((state)=> state.destination)
  const {payload:placeInfo} = destinationData
  console.log(placeInfo);
  const photos =['goa.jpg,shell.jpg,green.jpg']
  const [pic1,pic2,pic3] =['goa.jpg','shell.jpg','green.jpg']
  return (
    <div className='container'> 
        <div className="mt-5 ms-3">
       <h1 id="heading" className='text-danger  '>Explore <p className='text-dark d-inline'>{placeInfo?placeInfo.name:''}</p> </h1>
       </div>
       <div  className="carousel mt-5">
      <Swiper
      modules={[Navigation,EffectFade,Pagination,Autoplay]}
      navigation ={{
        prevEl:swiperNavPrefRef.current,
        nextEl:swiperNavNextRef.current
      }}
      pagination={{clickable:true}}
      autoplay={{delay:2000}}
      effect='fade'
      speed={800}
      slidesperview={1}
      loop
      className='mySwiper'
      >
       {/* {photos.map((photo,i) =>
         <SwiperSlide className='swiperSlide'>
         <img src={`../../../../${pic1}`} alt=''/>
       </SwiperSlide>
       )}    */}
       <SwiperSlide className='swiperSlide' >
         <img src={`../../../../${pic1}`} alt=''/>
       </SwiperSlide>
       <SwiperSlide className='swiperSlide'>
         <img src={`../../../../${pic2}`} alt=''/>
       </SwiperSlide>
       <SwiperSlide className='swiperSlide'>
         <img src={`../../../../${pic3}`} alt=''/>
       </SwiperSlide>
          {/* <SwiperSlide className='swiperSlide'>
           <img src={`../../../goa.jpg`} alt=''/>
         </SwiperSlide>
  
        <SwiperSlide className='swiperSlide'>
          <img src='../../../green.jpg' alt=''/>
        </SwiperSlide>
        <SwiperSlide className='swiperSlide'>
          <img src='../../../shell.jpg' alt=''/>
        </SwiperSlide>  */}
      <div className="swiperNavPrev" ref={swiperNavPrefRef}></div>
      <div className="swiperNavNext" ref={swiperNavNextRef}></div>
      </Swiper>
       </div>
       <div className="about col-lg-6 col-12 mt-5 ">
         <p className='fs-1 fw-bolder'>About {placeInfo?placeInfo.name:''} </p>
         <p style={{fontFamily: 'Georgia, Times, "Times New Roman", serif',lineHeight: '26.4px'}} className='fs-4'>{placeInfo?placeInfo.about:''}</p>
       </div>

    </div>
  )
}

export default Destination