import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
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
    <div></div>
  );
}
