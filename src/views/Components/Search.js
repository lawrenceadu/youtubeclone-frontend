import React, { useGlobal } from "reactn";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const Wrapper = styled.div`
  input.search {
    background: ${(props) => props.theme.black};
    padding: 0.4rem 1rem;
    border: 1px solid ${(props) => props.theme.darkGrey};
    height: 31px;
    color: ${(props) => props.theme.primaryColor};
  }

  @media screen and (max-width: 700px) {
    input.search {
      display: none;
    }
  }
`;

export default () => {
  const history = useHistory();
  const [search, setSearch] = useGlobal("search");

  /**
   * handle search
   * @param {*} e
   */
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      if (!search.trim()) return toast.dark("Please enter the searchterm");

      return history.push(`/results/${search}`);
    }
  };

  return (
    <Wrapper>
      <input
        type="search"
        className="search"
        placeholder="Search"
        value={search || ""}
        onKeyDown={handleSearch}
        onChange={({ currentTarget: { value } }) => setSearch(value)}
      />
    </Wrapper>
  );
};
