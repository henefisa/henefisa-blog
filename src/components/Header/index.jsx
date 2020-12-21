import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/Auth";
import { Container } from "../Layout";
import firebase from "firebase";
import { Button, Dropdown, Menu } from "antd";
import clsx from "clsx";

const { SubMenu } = Menu;

const MainHeader = styled.div`
  background-color: var(--primary-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  .header-content {
    color: #fff;
    height: 80px;
    .brand {
      font-size: 1.75rem;
      letter-spacing: 2px;
      font-weight: 600;
      color: #fff;
      margin: 0;
    }

    .navigation {
      display: none;
      .menu {
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
    }
    
    .navigation-toggle {
      background: transparent;
      border: none;
      outline none;
      width: 30px;
      height: 30px;
      font-size: 20px;
      cursor: pointer;
    }
    .mobile-navigation {
      position: fixed;
      overflow: auto;
      top: 0;
      left: -100%;
      bottom: 0;
      z-index: 9999;
      width: 200px;
      transition: 0.3s ease-in-out;
      &.show {
        left: 0px;
      }
    }
    
    .user {
      display: none;
      a {
        color: inherit;
      }
    }

    @media screen and (min-width: 992px) {
      .navigation {
        display: block;
      }
      .navigation-toggle {
        display: none;
      }
      .user {
        display: block;
      }
    }
  }
`;

export default function Header(props) {
  const [user] = useAuth();
  const [isToggle, setIsToggle] = useState(false);
  const history = useHistory();

  const menu = (
    <Menu theme="dark" style={{ background: "var(--primary-color)", zIndex: 9999 }}>
      <Menu.Item key={`/user/${user?.ref?.id}`}>
        <Link to={`/user/${user?.ref?.id}`}>Profile</Link>
      </Menu.Item>
      {user?.data?.role?.includes("admin") && (
        <Menu.Item key="/admin/dashboard">
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
      )}
      <Menu.Item onClick={() => firebase.auth().signOut()}>Logout</Menu.Item>
    </Menu>
  );

  const handleToggleMenu = () => {
    if (window.innerWidth > 992) return;
    setIsToggle(prevState => !prevState);
  };

  return (
    <MainHeader {...props}>
      <Container className="header-content" flex={{ justify: "space-between", align: "center" }}>
        <h1 className="brand">
          <Link to="/" style={{ color: "inherit" }}>
            henefisa
          </Link>
        </h1>
        <div className="not-mobile">
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
        </div>
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
        <button className="navigation-toggle" onClick={handleToggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <nav className={clsx("mobile-navigation", { show: isToggle })}>
          <Menu
            theme="dark"
            mode="inline"
            style={{ height: "100%", paddingTop: 20, background: "var(--primary-color)" }}
            defaultSelectedKeys={[window.location.pathname.split("/").slice(0, 2).join("/")]}
            onClick={e => {
              history.push(e.key);
              setIsToggle(false);
            }}
          >
            <Menu.Item key="/">Home</Menu.Item>
            <Menu.Item key="/blog">Blog</Menu.Item>
            <Menu.Item key="/about">About</Menu.Item>
            <Menu.Item key="/contact">Contact</Menu.Item>
            <Menu.Item key="/forums">Forums</Menu.Item>
            <Menu.Item key="/login">Login</Menu.Item>
            <Menu.Item key="/register">Register</Menu.Item>
            {user.ref && <SubMenu title={user.data.firstName + " " + user.data.lastName}>{menu}</SubMenu>}
          </Menu>
        </nav>
      </Container>
    </MainHeader>
  );
}
