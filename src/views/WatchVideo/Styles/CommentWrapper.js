import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1rem 0;

  .heading {
    margin-bottom: 0.8rem;

    h3 {
      margin-bottom: 0px;
    }

    i {
      display: none;
    }
  }

  .add-comment {
    margin-bottom: 2.3rem;

    .form-group {
      width: calc(100% - 40px - 1rem);

      textarea {
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.darkGrey};
        color: ${(props) => props.theme.primaryColor};
        padding-bottom: 16px;
        background: inherit;
        min-height: 40px;
        height: 100%;
        width: 100%;
      }
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      object-fit: cover;
      margin-right: 1rem;
    }

    .action {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      span {
        margin-right: 16px;
        display: block;
        color: #666;
      }

      button {
        border-color: rgb(62, 166, 255);
        background-color: rgb(62, 166, 255);
        color: #333;

        &:disabled {
          background-color: #555;
          color: #f2f3f5;
        }
      }
    }
  }
  .comment {
    display: flex;
    margin-bottom: 1rem;
    font-size: 0.9rem;

    img {
      width: 40px;
      object-fit: cover;
      height: 40px;
      border-radius: 20px;
      position: relative;
      top: 2px;
      margin-right: 1rem;
    }
  }

  @media screen and (max-width: 930px) {
    .heading {
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      display: flex;

      i {
        display: block;
      }
    }

    .content {
      height: 0px;
      overflow: hidden;
      transition: height ease 0.25s;

      &.active {
        height: auto;
        transition: height ease 0.5s;
      }
    }
  }
`;

export default Wrapper;
