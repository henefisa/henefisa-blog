import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/Auth";
import { Container } from "../Layout";
import firebase from "firebase";
import Avatar from "react-avatar";
import Dropdown from "../Dropdown";

const MainHeader = styled.div`
  background-color: var(--primary-color);
  &.fixed {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    .header-content {
      height: 60px;
    }
  }
  .header-content {
    color: #fff;
    height: 80px;
    transition: 0.3s ease-in-out;
    .brand {
      font-size: 1.75rem;
      letter-spacing: 2px;
      font-weight: 600;
    }
    nav .menu {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      text-transform: uppercase;
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
  const [fixed, setFixed] = useState(false);
  const [user] = useAuth();
  const history = useHistory();
  useEffect(() => {
    function handleScroll() {
      const fixed = window.scrollY > 0;
      setFixed(fixed);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const options = [
    { name: "Profile", onClick: () => history.push(`/user/${user.ref.id}`) },
    { name: "Logout", onClick: () => firebase.auth().signOut() }
  ];

  if (user?.data?.role?.includes("admin")) {
    options.splice(1, 0, {
      name: "Dashboard",
      onClick: () => history.push("/admin/dashboard")
    });
  }

  return (
    <MainHeader {...props} className={clsx({ fixed: fixed })}>
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
          </ul>
        </nav>
        <div className="user">
          {user.ref ? (
            <Dropdown
              title={
                <>
                  <Avatar name={user.data.firstName + " " + user.data.lastName} round size={50} />
                  <h3 style={{ fontWeight: 400 }}>{user.data.firstName + " " + user.data.lastName}</h3>
                </>
              }
              options={options}
            />
          ) : (
            <>
              <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </Container>
    </MainHeader>
  );
}
