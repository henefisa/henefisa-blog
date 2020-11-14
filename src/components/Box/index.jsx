import styled from "styled-components";

const Box = styled.div`
  padding: 30px;
  ${({ center }) => center && `text-align: center;`}
`;

export default Box;
