import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Divider, notification } from "antd";
import { useAuth } from "../../context/Auth";
import { Link } from "react-router-dom";
import firebase from "firebase";

export default function WriteReply({ postRef, reload }) {
  const [content, setContent] = useState("");

  const [user] = useAuth();

  const onEditorChange = content => {
    setContent(content);
  };

  const handleWriteReply = async () => {
    try {
      const data = {
        author: user.data.firstName + " " + user.data.lastName,
        authorRef: user.ref,
        content,
        createdAt: firebase.firestore.Timestamp.now()
      };
      //update replies
      await postRef.update({
        replies: firebase.firestore.FieldValue.arrayUnion(data)
      });

      notification.success({ message: "Done!" });
      reload(data);
    } catch (error) {
      notification.error({ message: error.toString() });
    }
  };

  return (
    <div>
      {user.id ? (
        <>
          <Divider>Write your reply!</Divider>
          <Editor
            onEditorChange={onEditorChange}
            apiKey="davs32c4wf30584psf5idrb5oy0cyz9x6beobu56o2hskebn"
            value={content}
            init={{
              height: 300,
              menubar: true,
              plugins: [
                "advlist autolink lists link charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount"
              ],
              toolbar: `undo redo | formatselect | bold italic forecolor backcolor removeformat xhtmlxtras | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help`
            }}
          />
          <Button onClick={handleWriteReply} style={{ float: "right", marginTop: 10 }}>
            Submit
          </Button>
        </>
      ) : (
        <Divider>
          You must
          <Button type="link" style={{ padding: "0 5px", fontWeight: 500 }}>
            <Link to="/login">Login</Link>
          </Button>
          to reply!
        </Divider>
      )}
    </div>
  );
}
