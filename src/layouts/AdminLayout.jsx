import React, { memo, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  FileOutlined,
  BarChartOutlined,
  WechatOutlined
} from "@ant-design/icons";

import firebase from "firebase";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function AdminLayout(props) {
  const [collapsed, setCollapse] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item
          key="logout"
          onClick={() => {
            firebase.auth().signOut().then(history.push("/login"));
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    ),
    [history]
  );

  const toggle = collapsed => setCollapse(prevState => !prevState);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: "100vh" }}>
        <h1
          style={{
            color: "white",
            fontSize: 24,
            letterSpacing: "1px",
            textAlign: "center",
            margin: 0,
            height: 80,
            lineHeight: "80px"
          }}
        >
          {collapsed ? "" : "Henefisa"}
        </h1>
        <Menu
          theme="dark"
          mode="inline"
          onClick={target => history.push(target.key)}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item icon={<BarChartOutlined />} key="/admin/dashboard">
            Dashboard
          </Menu.Item>
          <SubMenu title="Users" key="users" icon={<UserOutlined />}>
            <Menu.Item key="/admin/users">All Users</Menu.Item>
            <Menu.Item key="/admin/users/create">Create User</Menu.Item>
          </SubMenu>
          <SubMenu title="Posts" key="posts" icon={<FileOutlined />}>
            <Menu.Item key="/admin/posts">All Posts</Menu.Item>
            <Menu.Item key="/admin/posts/create">Create Post</Menu.Item>
          </SubMenu>
          <SubMenu title="Message" key="message" icon={<WechatOutlined />}>
            <Menu.Item key="/admin/messages">All Messages</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ height: 80, lineHeight: "80px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: toggle,
              style: {
                color: "white",
                fontSize: 24
              }
            })}
            <Dropdown overlay={menu} placement="bottomCenter">
              <div>
                <Avatar size="large" icon={<UserOutlined />} style={{ display: "inline-grid", placeItems: "center" }} />
                <span style={{ fontSize: 16, marginLeft: 10, color: "white" }}>Admin</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content>{props.children}</Content>
        <Footer>
          <h3 style={{ textAlign: "center" }}>Henefisa dashboard - Created by Trần Văn Nghĩa</h3>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default memo(AdminLayout);
