import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { toast } from "react-toastify";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().trim("First name is required!").required("First name is required!"),
  lastName: Yup.string().trim("Last name is required!").required("Last name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .min(6, "Your password too weak!")
    .max(30, "You reach the limit!")
    .required("Password is required!")
});

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
      <div className="wrap">
        <div className="picture">
          <img src="/img-01.webp" alt="Computer" />
        </div>
        <Formik
          initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="form">
              <h1 className="form-header">Register</h1>
              <div className="input-wrapper">
                <div>
                  <Field name="firstName" className="field-input" placeholder="First name" />
                  <span className="input-icon">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                {errors.firstName && touched.firstName && <p className="field-error">{errors.firstName}</p>}
              </div>
              <div className="input-wrapper">
                <div>
                  <Field name="lastName" className="field-input" placeholder="Last name" />
                  <span className="input-icon">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                {errors.lastName && touched.lastName && <p className="field-error">{errors.lastName}</p>}
              </div>
              <div className="input-wrapper">
                <div>
                  <Field name="email" className="field-input" placeholder="Email" />
                  <span className="input-icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
                {errors.email && touched.email && <p className="field-error">{errors.email}</p>}
              </div>
              <div className="input-wrapper">
                <div>
                  <Field name="password" type="password" className="field-input" placeholder="Password" />
                  <span className="input-icon">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
                {errors.password && touched.password && <p className="field-error">{errors.password}</p>}
              </div>
              <button type="submit" className="button-submit">
                Register
              </button>
              <Link to="/login" className="link">
                Login to your account!
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
