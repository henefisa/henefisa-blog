import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { toast } from "react-toastify";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  padding: 15px;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
  .field-error {
    color: red;
    text-align: center;
    margin-top: 5px;
  }
  .wrap {
    width: 100%;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 50px 15px 10px;
    picture {
      display: none;
      img {
        max-width: 100%;
        height: auto;
      }
    }
    .form {
      width: 100%;
      .form-header {
        font-size: 24px;
        color: #333;
        line-height: 1.2;
        text-align: center;
        width: 100%;
        display: block;
        padding-bottom: 54px;
        font-weight: 600;
      }
      .input-wrapper {
        position: relative;
        width: 100%;
        z-index: 1;
        margin-bottom: 10px;
        .field-input {
          border: none;
          font-size: 15px;
          line-height: 1.5;
          color: #666;
          display: block;
          width: 100%;
          background: #e6e6e6;
          height: 50px;
          border-radius: 25px;
          padding: 0 30px 0 68px;
        }
        .input-icon {
          position: absolute;
          display: flex;
          align-items: center;
          top: 0;
          left: 0;
          width: 100%;
          height: 50px;
          padding-left: 35px;
          font-size: 0.9375rem;
          border-radius: 25px;
          pointer-events: none;
          transition: 0.4s;
          color: #666;
        }
      }
    }
    .button-submit {
      font-size: 15px;
      margin-top: 50px;
      color: #fff;
      text-transform: uppercase;
      width: 100%;
      height: 50px;
      border-radius: 25px;
      background: #57b846;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 25px;
      transition: 0.4s;
      border: none;
      &:hover {
        background: #e3e3e3;
        color: #333;
      }
    }
    .link {
      display: block;
      text-align: center;
      font-size: 0.75rem;
      padding-top: 130px;
    }
    @media screen and (min-width: 992px) {
      width: 960px;
      .login {
        width: 316px;
      }
      .form-login {
        width: 290px;
      }
    }

    @media screen and (min-width: 768px) {
      padding: 177px 90px 33px 85px;
      .login {
        width: 35%;
        display: block;
      }
      .form {
        width: 50%;
      }
    }
  }
`;

export default function Register() {
  const history = useHistory();
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const { firstName, lastName, email, password } = values;
    setSubmitting(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebase
          .firestore()
          .collection("users")
          .add({
            firstName,
            lastName,
            email
          })
          .then(() => {
            toast.success("Register success!");
            resetForm();
            setSubmitting(false);
            history.push("/");
          });
      })
      .catch(error => {
        setSubmitting(false);
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Email is already used!");
            break;
          default:
            toast.error("Something went wrong!");
            break;
        }
      });
  };
  return (
    <Container>
    </Container>
  );
}
