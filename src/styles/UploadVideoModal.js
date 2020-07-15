import styled, { keyframes } from "styled-components";

const openModal = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 330;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .modal-content {
    width: 600px;
    margin: 4rem auto;
    background: ${(props) => props.theme.grey};
    border-radius: 3px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .modal-header-left {
    display: flex;
    align-items: center;
  }

  .modal-header-left svg {
    margin-right: 1rem;
    position: relative;
    fill: ${(props) => props.theme.red};
    top: -1px;
  }

  .video-form {
    border-top: 1px solid ${(props) => props.theme.darkGrey};
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    padding: 0.5rem 1rem;
  }

  .video-form h2 {
    margin: 1rem 0;
  }

  .video-form input,
  .video-form textarea {
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.darkGrey};
    color: ${(props) => props.theme.primaryColor};
    padding: 0.6rem 1.2rem;
    margin-bottom: 1.2rem;
    border-radius: 3px;
    width: 100%;
  }

  .video-form input {
    height: 60px;
  }

  .video-form textarea {
    padding-bottom: 16px;
    padding-top: 16px;
    min-height: 120px;
  }

  .modal-footer {
    display: flex;
    height: 70px;
    padding: 1rem;
  }

  button {
    margin-left: auto;
  }

  img {
    width: 100%;
    height: 340px;
    object-fit: cover;
  }

  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.red};
  }

  @media screen and (max-width: 835px) {
    .modal-content,
    .modal-content input,
    .modal-content textarea {
      width: 90%;
    }

    .modal-content {
      margin-top: 7rem;
    }
  }

  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;

export default Wrapper;
