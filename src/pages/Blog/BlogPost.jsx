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

    .post-name {
      font-weight: 400;
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: #fff;
    }
    .details {
      font-weigth: 400;
      font-size: 15px;
      color: #fff;
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
        color: var(--secondary-color);
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
          <Background url={post?.cover || "/blog-minimal-bg.jpg"}>
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
              <div dangerouslySetInnerHTML={{ __html: post?.content }} style={{ wordBreak: "break-word" }}></div>
              <div className="tag-wrapper">
                <h6>Tags</h6>
                <div className="tags">
                  {post?.tags.map((tag, index) => (
                    <Link className="tag" key={index} to={`/tags?filter=${tag}`}>
                      {tag}
                    </Link>
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
