import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./carousel2.css";

// import required modules
import { Pagination, Navigation  } from "swiper";

const Carousel2 = ({heading,body}) => {
  return (
    <div className="container mb-5 pb-5">
        
        <div className="row">
          <div className="col-12 col-md-2 ">
          <p className='fs-4 fw-bold mb-0 mt-3'>{heading}</p>
          <p className="fs-6">{body}</p>
          </div>
          <div className="col-12 col-md-10 ">
       <Swiper
        slidesPerView={1}
        spaceBetween={10}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
        <div>
        <SwiperSlide>
          <div>
        <img className="" src="../../../../bg-hom.jpg" alt=''/>
        </div>
        </SwiperSlide>
        <div>
        <h1>asdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
        </div>
        </div>
        <SwiperSlide>
        <img src="../../../../bg-home.jpg" alt=''/>
        </SwiperSlide>
        <SwiperSlide>
        <img src="../../../../bg-hom.jpg" alt=''/>
        </SwiperSlide>
        <SwiperSlide>
        <img src="../../../../bg-home.jpg" alt=''/>
        </SwiperSlide>
        <SwiperSlide>
        <img src="../../../../bg-hom.jpg" alt=''/>
        </SwiperSlide>
        <SwiperSlide>
        <img src="../../../../bg-home.jpg" alt=''/>
        </SwiperSlide>
        <SwiperSlide>
            <img src="../../../../bg-hom.jpg" alt=''/>
        </SwiperSlide>
        <SwiperSlide>
            <img src="../../../../bg-home.jpg" alt=''/>
            </SwiperSlide>
        <SwiperSlide>
        <img src="../../../../bg-hom.jpg" alt=''/>
        </SwiperSlide>
      </Swiper>
    </div>
    </div>
    </div>
  )
}

export default Carousel2