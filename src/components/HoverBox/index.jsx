import styled from "styled-components";

const HoverBox = styled.div`
  position: relative;
  overflow: hidden;
  height: ${props => props.boxHeight || "100%"};
  width: ${props => props.boxWidth || "100%"};
  cursor: pointer;
  &:hover {
    &::before {
      transform: scale(1.04);
      box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.2);
    }
  }
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url(${props => props.url || ""});
    background-position: ${props => props.position || "center"};
    background-size: ${props => props.size || "cover"};
    z-index: 100;
    transition: 0.3s ease-out;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 101;
  height: 100%;
  width: 100%;
  ${({ center }) =>
    center &&
    `
    display: grid;
    grid-template-columns: 1fr;
    place-items:center;

  `}
`;

HoverBox.Content = Content;

export default HoverBox;
