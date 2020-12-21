import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Divider } from "antd";
import { useAuth } from "../../context/Auth";
import { Link } from "react-router-dom";

export default function WriteReply({ thread, post }) {
  const [content, setContent] = useState("");

  const [user] = useAuth();

  const onEditorChange = content => {
    setContent(content);
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
        </>
      ) : (
        <Divider>
          You must
          <Button type="link" style={{padding: "0 5px", fontWeight: 500}}>
            <Link to="/login">Login</Link>
          </Button>
          to reply!
        </Divider>
      )}
    </div>
  );
}
