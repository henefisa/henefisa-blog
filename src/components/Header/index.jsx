import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/Auth";
import { Container } from "../Layout";
import firebase from "firebase";
import { Button, Dropdown, Menu } from "antd";

const MainHeader = styled.div`
  background-color: var(--primary-color);
  overflow: auto;
  .header-content {
    color: #fff;
    height: 80px;
    transition: 0.3s ease-in-out;
    .brand {
      font-size: 1.75rem;
      letter-spacing: 2px;
      font-weight: 600;
      color: #fff;
      margin: 0;
    }
    nav .menu {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      text-transform: uppercase;
      margin: 0;
      .menu-item {
        padding: 12px 20px;
        &:hover a::before {
          transform: scaleX(1);
          transform-origin: right;
        }
        a {
          color: #fff;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 2px;
            background: #fff;
            z-index: 999;
            transform: scaleX(0);
            transition: 0.3s ease-in-out;
            transform-origin: left;
          }
        }
      }
    }
    .user {
      a {
        color: inherit;
      }
    }
  }
`;

export default function Header(props) {
  const [user] = useAuth();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`/user/${user?.ref?.id}`}>Profile</Link>
      </Menu.Item>
      {user?.data?.role?.includes("admin") && (
        <Menu.Item>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
      )}
      <Menu.Item onClick={() => firebase.auth().signOut()}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <MainHeader {...props}>
      <Container className="header-content" flex={{ justify: "space-between", align: "center" }}>
        <h1 className="brand">
          <Link to="/" style={{ color: "inherit" }}>
            henefisa
          </Link>
        </h1>
        <nav className="navigation">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/">Home</Link>
            </li>
            <li className="menu-item">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="menu-item">
              <Link to="/about">About</Link>
            </li>
            <li className="menu-item">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="menu-item">
              <Link to="/forums">Forums</Link>
            </li>
          </ul>
        </nav>
        <div className="user">
          {user.ref ? (
            <Dropdown overlay={menu}>
              <Button ghost>{user.data.firstName + " " + user.data.lastName}</Button>
            </Dropdown>
          ) : (
            <>
              <Button ghost>
                <Link to="/login">Login</Link>
              </Button>
              <Button ghost style={{ marginLeft: 10 }}>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </Container>
    </MainHeader>
  );
}
