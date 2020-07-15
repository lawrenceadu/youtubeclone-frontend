import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  padding: 16px;

  .content {
    background: ${(props) => props.theme.grey};
    padding: 3rem 1.5rem;
    border-radius: 4px;
    max-width: 450px;
    margin: auto;
    width: 100%;
  }

  h2 {
    margin-bottom: 1.3rem;
  }

  .input-group {
    justify-content: space-between;
    margin-right: -8px;
    margin-left: -8px;
    display: flex;
  }
  .form-group {
    margin-bottom: 32px;
    padding-right: 8px;
    padding-left: 8px;
    width: 100%;
  }

  input {
    border-radius: 3px;
    width: 100%;
    padding: 0.6rem 1.2rem;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    color: ${(props) => props.theme.primaryColor};
  }

  .action {
    margin-right: 0px;
    margin-left: 0px;
  }

  button {
    padding: 0.4rem 1rem;
    background: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.red};
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  span {
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.secondaryColor};
  }
`;

export default Wrapper;
