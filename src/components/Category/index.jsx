import styled from "styled-components";

export const Categories = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const Category = styled.li`
  font-size: 15px;
  padding: 7px 0;
  border-bottom: 1px solid #e3e6e9;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  color: var(--secondary-color);
  transition: 0.3s ease-out;
  cursor: pointer;
  &:hover {
    color: var(--primary-color);
  }
`;
