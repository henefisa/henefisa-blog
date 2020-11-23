import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Author from "../../components/Author";
import { Container, Section } from "../../components/Layout";
import Comment from "../../components/Comment/index";
import WriteComment from "../../components/Comment/WriteComment";
import Loading from "../../components/Loading/index";
import moment from "moment";
import firebase from "firebase";
import getAuthor from "../../utils/getAuthor";
import { useAuth } from "../../context/Auth";

const Background = styled.div`
  background-image: url(${props => props.url || ""});
  background-size: cover;
  background-position: center;
  height: 500px;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  .content {
    text-align: center;
    color: #fff;
    .post-name {
      font-weight: 400;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    .details {
      font-weigth: 400;
      font-size: 15px;
    }
  }
`;

const PostContent = styled.article`
  padding: 100px 0;
  font-family: "Open Sans", sans-serif;
  font-size: 0.9375rem;
  font-weight: normal;
  color: var(--secondary-color);

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    img {
      max-width: 100%;
      height: auto;
    }

    .large-image {
      max-width: 700px;
      height: 440px;
      margin: 0 auto;
    }

    .small-image {
      height: 220px;
      width: 370px;
      padding: 0 15px;
    }
  }

  .blockquote {
    margin-top: 20px;
    background: #f2f5f8;
    margin-bottom: 20px;
    border-left: 4px solid rgba(0, 0, 0, 0.1);
    padding: 24px 30px;
  }
  p {
    margin-bottom: 10px;
  }

  .tag-wrapper {
    margin-top: 30px;
    h6 {
      font-size: 0.875rem;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .tags {
      .tag {
        margin-right: 5px;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
`;

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [user] = useAuth();

  const commentsRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    let isMount = true;
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get()
      .then(doc => {
        (async () => {
          const data = doc.data();
          const author = await getAuthor(data.authorRef);
          commentsRef.current = data.commentsRef;
          isMount && setPost({ ...data, author: { ...author } });
          isMount && setLoading(false);
        })();
      });
    return () => {
      isMount = false;
    };
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Background url="/blog-minimal-bg.jpg">
            <div className="content">
              <h1 className="post-name">{post?.title}</h1>
              <h4 className="details">
                <span className="date">{moment.unix(post.createdAt.seconds).format("ll")}</span> -{" "}
                <span className="author">{`${post?.author?.firstName} ${post?.author?.lastName}`}</span>
              </h4>
            </div>
          </Background>
          <Container style={{ maxWidth: 700 }}>
            <PostContent>
              {post?.content}
              {/* <div className="image-container">
                <div className="large-image">
                  <img src="/blog-minimal-post-1.jpg" alt="blog post" />
                </div>
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus autem corporis asperiores, quos
                sunt voluptatem alias dolores facilis. Temporibus iusto reiciendis voluptatum sequi autem aspernatur qui
                perspiciatis numquam explicabo illo?
              </p>
              <blockquote className="blockquote">
                <p>
                  Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                  consequat vitae, eleifend ac, enim.
                </p>
              </blockquote>
              <p>
                Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
                enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
              </p>
              <div className="image-container">
                <div className="small-image">
                  <img src="/blog-minimal-post-1.jpg" alt="blog post" />
                </div>
                <div className="small-image">
                  <img src="/blog-minimal-post-1.jpg" alt="blog post" />
                </div>
              </div>
              <p>
                You can use the mark tag to highlight text. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
              </p> */}
              <div className="tag-wrapper">
                <h6>Tags</h6>
                <div className="tags">
                  {post?.tags.map((tag, index) => (
                    <span className="tag" key={index}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </PostContent>
          </Container>
          <Author author={post?.author} />
          <Container style={{ maxWidth: 700 }}>
            <Section>
              <Comment commentsRef={commentsRef.current} />
              {user.ref ? (
                <WriteComment commentsRef={commentsRef.current} />
              ) : (
                <p>
                  You must <Link to="/login">login</Link> to write comment.
                </p>
              )}
            </Section>
          </Container>
        </>
      )}
    </>
  );
}
