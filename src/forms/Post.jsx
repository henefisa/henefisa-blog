import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import firebase from "firebase";
import { useAuth } from "../context/Auth";
import { Button, Input, Form, Tag, notification, Upload } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

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

export default function PostForm({ data }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [input, setInput] = useState({
    value: "",
    visible: false
  });
  const [user] = useAuth();

  useEffect(() => {
    setContent(data?.post?.content || "");
    setTags(data?.post?.tags || []);
    data?.post?.cover && setFileList([{ uid: "this-will-never-got-another-one", thumbUrl: data?.post?.cover }]);
  }, [data]);

  const onFinish = async values => {
    setLoading(true);
    try {
      let ref = {};
      if (data?.type === "edit") {
        ref = firebase.firestore().collection("posts").doc(data?.id);
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
      let cover_url;
      if (fileList[0] && fileList[0].originFileObj) {
        const snapshot = await firebase
          .storage()
          .ref(`cover_images/${fileList[0].uid + "_" + fileList[0].name}`)
          .put(fileList[0].originFileObj);

        cover_url = await snapshot.ref.getDownloadURL();
      } else {
        cover_url = data?.post?.cover || "/blog-minimal-bg.jpg";
      }
      ref.set({
        authorRef: user.ref,
        commentsRef,
        content,
        createdAt: data?.post?.createdAt || firebase.firestore.Timestamp.now(),
        cover: cover_url,
        title: values.title,
        description: values.description,
        tags
      });
      notification.success({ message: "Success!" });
      history.push("/admin/posts");
    } catch (err) {
      console.log(err);
      notification.error({ message: "Something went wrong. Please try again!" });
    } finally {
      setLoading(false);
    }
  };

  const onEditorChange = content => {
    setContent(content);
    console.log(content);
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
      setTags(prevState => [...prevState, input.value.replace(/\s\s+/g, " ").trim()]);
    }
    setInput({ value: "", visible: false });
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
    console.log(fileList);
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

  return data.post ? (
    <Form onFinish={onFinish} initialValues={{ title: data?.post?.title, description: data?.post?.description }}>
      <Form.Item
        label="Title"
        labelCol={{ span: 24 }}
        name="title"
        rules={[{ required: true, message: "Title is required!" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label="Description"
        labelCol={{ span: 24 }}
        name="description"
        rules={[{ required: true, message: "Description is required!" }]}
      >
        <Input placeholder="Description" />
      </Form.Item>
      <p>Cover Background</p>
      <Upload
        name="cover-background"
        beforeUpload={() => false}
        onChange={handleUpload}
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
      >
        {fileList.length < 1 && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
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
          toolbar: `undo redo | formatselect | bold italic forecolor backcolor removeformat xhtmlxtras | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help`
        }}
      />
      <div style={{ textAlign: "right", marginTop: 10 }}>
        <Button htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  ) : null;
}
