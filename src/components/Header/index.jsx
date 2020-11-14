import React from "react";
import styled from "styled-components";
import { Container } from "../Layout";

const MainHeader = styled.div`
  background-color: var(--primary-color);
  .header-content {
    color: #fff;
    height: 80px;
    .brand {
      font-size: 2rem;
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
      }
    }
    .social {
      display: flex;
      justify-content: center;
      align-items: center;
      .social-item {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
        margin: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

export default function Header() {
  return (
    <MainHeader>
      <Container className="header-content" flex={{ justify: "space-between", align: "center" }}>
        <h1 className="brand">henefisa</h1>
        <nav className="navigation">
          <ul className="menu">
            <li className="menu-item">Home</li>
            <li className="menu-item">Blog</li>
            <li className="menu-item">About</li>
            <li className="menu-item">Contact</li>
          </ul>
        </nav>
        <div className="social">
          <div className="social-item"></div>
          <div className="social-item"></div>
          <div className="social-item"></div>
        </div>
      </Container>
    </MainHeader>
  );
}
