import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  .title {
    display: flex;
    align-items: center;
    & > * {
      margin-right: 10px;
    }
    & > *:last-child {
      margin-right: 0;
    }
  }
  .options {
    position: absolute;
    z-index: 9990;
    top: 100%;
    left: 0;
    width: 100%;
    text-align: right;
    background: var(--primary-color);
    max-height: 0;
    overflow: hidden;
    transition: 0.3s ease-in-out;
    margin-top: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    &.visible {
      max-height: 20rem;
    }
    .option {
      padding: 10px 15px;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        background: #ddd;
        color: #333;
      }
    }
  }
`;

export default function Dropdown({ title, options, style }) {
  const ref = useRef(null);
  const optionRef = useRef(null);
  const handleClick = event => {
    optionRef.current.classList.toggle("visible");
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = e => {
    if (!ref.current.contains(e.target)) {
      optionRef.current.classList.remove("visible");
    }
  };

  return (
    <Wrapper {...style} onClick={handleClick} ref={ref}>
      <span className="title">{title}</span>
      <ul className="options" ref={optionRef}>
        {options.map((option, index) => (
          <li className="option" key={index} onClick={option.onClick ? option.onClick : undefined}>
            {option.name}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
