import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import firebase from "firebase";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";
import { Button, Input, Form, Tag, notification } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";

function uuid() {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}

async function handleUploadImage(blob) {
  try {
    const file = await blob.blob();
    const snapshot = await firebase
      .storage()
      .ref(`images/${blob.filename() + "_" + uuid()}`)
      .put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  } catch (error) {
    throw error;
  }
}

export default function Post({ data, closeModal }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState({
    value: "",
    visible: false
  });
  const [user] = useAuth();

  useEffect(() => {
    setContent(data?.post?.content || "");
    setTags(data?.post?.tags || []);
  }, [data]);

  const onFinish = async values => {
    let ref = {};
    if (data?.post?.type === "edit") {
      ref = firebase.firestore().collection("posts").doc(data?.post?.key);
    } else {
      ref = await firebase.firestore().collection("posts").add({});
    }
    const hasComment = await firebase.firestore().collection("comments").doc(ref.id).get();
    let commentsRef = null;
    if (!hasComment.exists) {
      commentsRef = firebase.firestore().collection("comments").doc(ref.id);
      commentsRef.set({
        listComments: [],
        total: 0
      });
    } else {
      commentsRef = hasComment.ref;
    }

    const tagsRef = await Promise.all(
      tags.map(async tag => await firebase.firestore().collection("tags").where("name", "==", tag).get())
    );

    tagsRef.forEach((ref, index) => {
      if (ref.empty) {
        firebase.firestore().collection("tags").add({
          frequency: 1,
          name: tags[index]
        });
      } else {
        ref.docs[0].ref.update({
          frequency: firebase.firestore.FieldValue.increment(1)
        });
      }
    });

    ref
      .set({
        authorRef: user.ref,
        commentsRef,
        content,
        createdAt: firebase.firestore.Timestamp.now(),
        title: values.title,
        description: values.description,
        tags
      })
      .then(
        () => notification.success({ message: "Post success!" }),
        () => notification.error({ message: "Something went wrong. Please try again!" })
      );
    closeModal();
  };

  const onEditorChange = content => {
    setContent(content);
  };

  const handleCloseTag = removedTag => {
    setTags(prevState => prevState.filter(tag => tag !== removedTag));
  };

  const showInput = () => {
    setInput(prevState => ({ ...prevState, visible: tags.length < 4 }));
  };

  const handleInputChange = e => setInput(prevState => ({ ...prevState, value: e.target.value }));

  const handleInputConfirm = e => {
    if (e.key === "Enter") e.preventDefault();
    if (input.value && !tags.includes(input.value)) {
      setTags(prevState => [...prevState, input.value]);
    }
    setInput({ value: "", visible: false });
  };

  const forMap = tag => {
    const tagElement = (
      <Tag
        closable
        style={{ marginBottom: 8, display: "inline-flex", alignItems: "center" }}
        onClose={e => {
          e.preventDefault();
          handleCloseTag(tag);
        }}
      >
        {tag}
      </Tag>
    );

    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElement}
      </span>
    );
  };

  return (
    <Form onFinish={onFinish} initialValues={{ title: data?.post?.title, description: data?.post?.description }}>
      <Form.Item label="Title" labelCol={{ span: 24 }} name="title">
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item label="Description" labelCol={{ span: 24 }} name="description">
        <Input placeholder="Description" />
      </Form.Item>
      <div style={{ margin: "16px 0" }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: "from",
            duration: 100,
            onComplete: e => {
              e.target.style = "";
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tags.map(forMap)}
        </TweenOneGroup>
        {input.visible && (
          <Input
            type="text"
            size="small"
            style={{ width: 78, marginTop: 10 }}
            value={input.value}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!input.visible && (
          <Tag
            onClick={showInput}
            style={{ background: "#fff", borderStyle: "dashed", display: "flex", alignItems: "center", width: 100 }}
          >
            <PlusOutlined style={{ marginRight: 5 }} /> New Tag
          </Tag>
        )}
      </div>
      <Editor
        onEditorChange={onEditorChange}
        apiKey="davs32c4wf30584psf5idrb5oy0cyz9x6beobu56o2hskebn"
        value={content}
        init={{
          images_upload_handler: (blob, success, failed) => {
            handleUploadImage(blob).then(success).catch(failed);
          },
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image imagetools charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar: `undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help`
        }}
      />
      <div style={{ textAlign: "right", marginTop: 10 }}>
        <Button htmlType="submit">Submit</Button>
        <Button htmlType="button" danger style={{ marginLeft: 10 }} onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
