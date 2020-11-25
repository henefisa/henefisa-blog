import styled from "styled-components";

export const Categories = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 200px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Category = styled.li`
  font-size: 15px;
  padding: 7px 0;
  border-bottom: 1px solid #e3e6e9;
  font-weight: 400;
  color: var(--secondary-color);
  transition: 0.3s ease-out;
  cursor: pointer;
  a {
    display: flex;
    justify-content: space-between;
  }
  &:hover {
    color: var(--primary-color);
  }
`;
