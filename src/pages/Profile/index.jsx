import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import * as Yup from "yup";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 330px);
  padding: 100px 0 50px;
  background: url("https://picsum.photos/1920/1080");
  background-size: cover;
  background-repeat: no-repeat;
  .profile {
    max-width: 900px;
    text-align: center;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 15px 6px rgba(0, 0, 0, 0.4);
    .avatar {
      margin-top: -25px;
      border: 1px solid #fff;
    }
    .infomation {
      max-width: 300px;
      margin: 0 auto;
      .user-form {
        text-align: left;
        margin-top: 50px;
        padding: 10px;
        .form-field {
          display: block;
          width: 100%;
          margin: 0 auto;
          margin-bottom: 10px;
          font-size: 20px;
          border: 1px solid #ddd;
          padding: 5px;
        }
        .form-button {
          float: right;
          font-size: 20px;
          background: #dedede;
          border: none;
          padding: 10px 20px;
          color: #333;
          border-radius: 5px;
          transition: 0.3s ease-in;
          &:hover {
            color: #dedede;
            background: #333;
          }
        }
      }
    }
  }
`;

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  firstName: Yup.string().required("First name is required!"),
  lastName: Yup.string().required("Last name is required!")
});

export default function Profile() {
  const { userId } = useParams();
  const [user] = useAuth();
  const [userData, setUserData] = useState({
    data: {},
    id: ""
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .onSnapshot(doc => setUserData({ id: doc.id, data: doc.data() }));
  }, [userId]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        ...values
      })
      .then(() => {
        toast.success("Update profile success!");
        setSubmitting(false);
      })
      .catch(error => {
        toast.error("Something went wrong! Please try again");
        setSubmitting(false);
      });
  };

  return (
    <ProfileWrapper>
      {userData.id && (
        <div className="profile">
          <div className="meta">
            <Avatar
              name={userData.data.firstName + " " + userData.data.lastName}
              round
              className="avatar"
              src={userData.data.avatar}
            />
            <h3 className="name">{userData.data.firstName + " " + userData.data.lastName}</h3>
            <p>{userData.description}</p>
          </div>
          <div className="infomation">
            <Formik
              validationSchema={schema}
              initialValues={{
                email: userData.data.email,
                firstName: userData.data.firstName,
                lastName: userData.data.lastName
              }}
              onSubmit={handleSubmit}
            >
              {({ errors, isSubmitting }) => (
                <Form className="user-form">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field name="email" className="form-field" id="email" />
                  {errors.email && <p>{errors.email}</p>}
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <Field name="firstName" className="form-field" id="firstName" />
                  {errors.firstName && <p>{errors.firstName}</p>}
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <Field name="lastName" className="form-field" id="lastName" />
                  {errors.lastName && <p>{errors.lastName}</p>}
                  {user.id === userData.id && (
                    <button type="submit" className="form-button" disabled={isSubmitting}>
                      Save
                    </button>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </ProfileWrapper>
  );
}
