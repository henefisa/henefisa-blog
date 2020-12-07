import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import firebase from "firebase";
import "swiper/swiper-bundle.min.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

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
  }
`;

function Slider() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    let isMount = true;
    firebase
      .firestore()
      .collection("posts")
      .limit(3)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => data.push({ id: doc.id, data: doc.data() }));
        isMount && setPosts(data);
      });
    return () => {
      isMount = false;
    };
  }, []);
  return posts ? (
    <Swiper navigation autoplay={{ delay: 5000 }} loop style={{ height: 600 }} pagination>
      {posts.map(post => (
        <SwiperSlide key={post.id}>
          <Background url={post.data.cover || "/blog-classic-slider-1.jpg"}>
            <div className="container slide-content mx-auto">
              <h6 className="tags">
                {post.data.tags.map(tag => (
                  <span style={{ marginRight: 5 }}>{tag}</span>
                ))}
              </h6>
              <h1 className="title">{post.data.title}</h1>
              <Button ghost>
                <Link to={`/blog/${post.id}`}>Read more</Link>
              </Button>
            </div>
          </Background>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : null;
}
export default memo(Slider);
