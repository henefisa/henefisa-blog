import { UserOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import styled from "styled-components";

const Reply = styled.div`
  border-top-color: #cbcdd0;
  border-right-color: #c3c6c9;
  border-bottom-color: #b5b9bd;
  border-left-color: #c3c6c9;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  .author {
    display: flex;
    align-items: center;
    background-color: #e2e3e5;
    padding: 15px;
    .avatar {
      margin-right: 10px;
    }
  }
  .content {
    padding: 15px;
  }
  & + & {
    margin-top: 10px;
  }
`;

export default function Replies({ author, content, createdAt, ...rest }) {
  return (
    <Reply {...rest}>
      <div className="author">
        <Avatar icon={<UserOutlined />} size={64} className="avatar" />
        <Typography.Title level={5}>{author}</Typography.Title>
      </div>
      <div className="content">
        <Divider orientation="right" style={{ fontSize: 12, margin: 0 }}>
          {createdAt}
        </Divider>
        <Typography.Paragraph>{content}</Typography.Paragraph>
      </div>
    </Reply>
  );
}
