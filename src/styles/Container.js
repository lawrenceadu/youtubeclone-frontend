import styled from "styled-components";

const Container = styled.div`
  margin-top: ${(props) => (props.hide ? 0 : "60px")};
  transition: ease all 0.25s;
  margin-left: 240px;

  @media screen and (max-width: 1093px) {
    margin-left: 0;
  }
`;

export default Container;
