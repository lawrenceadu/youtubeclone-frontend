import styled from "styled-components";

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 2rem;

  @media screen and (max-width: 1980px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 870px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export default VideoGrid;
