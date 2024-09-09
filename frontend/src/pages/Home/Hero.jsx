import React from "react";

import imgOne from "../../assets/multer.jpg";
import imgTwo from "../../assets/optional-chaining.png";
import imgThree from "../../assets/react-context.jpg";
import imgFour from "../../assets/react-redux.png";
import imgFive from "../../assets/react-useEffect.jpg";
import imgSix from "../../assets/useState.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./hero.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-8 gap-8">
      {/* left */}
      <div className="sm:w-1/2 w-full text-center">
        <h1 className="md:text-4xl text-3xl font-bold">
          Unlock the Secrets of JavaScript and Full Stack Development
        </h1>
        <p className="py-4">
          Disfill in-depth guides, tips, and insights on JavaScript and MERN
          stack development. Stay ahead with the latest trends and best
          practices to master full stack programming.
        </p>
      </div>

      {/* image */}
      <div className="sm:w-1/2 w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src={imgOne}
              alt=""
              className="w-full lg:h-[420px] sm:h-96 h-96 object-fill"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgTwo}
              alt=""
              className="w-full lg:h-[420px] sm:h-96 h-96 object-fill"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgThree}
              alt=""
              className="w-full lg:h-[420px] sm:h-96 h-96 object-fill"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgFour}
              alt=""
              className="w-full lg:h-[420px] sm:h-96 h-96 object-fill"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgFive}
              alt=""
              className="w-full lg:h-[420px] sm:h-96 h-96 object-fill"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgSix}
              alt=""
              className="w-full lg:h-[420px] sm:h-96 h-96 object-fill"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
