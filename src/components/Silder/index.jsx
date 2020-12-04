import React from "react";
import styled from "styled-components";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Navigation, Autoplay, Pagination]);

const Background = styled.div`
  background-image: url(${props => props.url});
  background-position: center center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.5);
  height: 100%;
  .slide-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;

    .tags {
      text-transform: uppercase;
      font-weight: normal;
      font-size: 0.875rem;
      margin-bottom: 20px;
      color: #fff;
    }

    .title {
      font-weight: 600;
      margin-bottom: 10px;
      font-size: 2.5rem;
      color: #fff;
    }

    .read-more {
      background: none;
      outline: none;
      border: 2px solid rgba(255, 255, 255, 0.3);
      padding: 16px 42px;
      color: #fff;
      text-transform: uppercase;
      font-size: 0.875rem;
      margin-top: 20px;
      border-radius: 4px;
      transition: 0.3s ease-in-out;
      &:hover {
        border-color: #e5e8eb;
      }
    }
  }
`;

export default function Slider() {
  return (
    <Swiper navigation autoplay={{ delay: 5000 }} loop style={{ height: 600 }} pagination>
      <SwiperSlide>
        <Background url="/blog-classic-slider-1.jpg">
          <div className="container slide-content mx-auto">
            <h6 className="tags">Lifestyle, Travel</h6>
            <h1 className="title">Working remotely</h1>
            <button className="read-more">Read more</button>
          </div>
        </Background>
      </SwiperSlide>
      <SwiperSlide>
        <Background url="/blog-classic-slider-2.jpg">
          <div className="container slide-content mx-auto">
            <h6 className="tags">Lifestyle, Travel</h6>
            <h1 className="title">Working remotely</h1>
            <button className="read-more">Read more</button>
          </div>
        </Background>
      </SwiperSlide>
    </Swiper>
  );
}
