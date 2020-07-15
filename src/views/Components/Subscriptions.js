import React, { useGlobal } from "reactn";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

const Wrapper = styled.div`
  h4 {
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    letter-spacing: 1.2px;
    color: ${(props) => props.theme.secondaryColor};
    padding-left: 1.5rem;
  }

  .channel {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
  }

  .channel:hover {
    cursor: pointer;
    background: ${(props) => props.theme.darkGrey};
  }

  .channel img {
    margin-right: 1rem;
    width: 22px;
    height: 22px;
    object-fit: cover;
    border-radius: 11px;
  }
`;

export default () => {
  const [user] = useGlobal("user");
  const [, setSidebar] = useGlobal("sidebar");
  const { data: profile } = useSWR(`/users/${user?.id}`);

  return (
    <Wrapper>
      {profile?.channels?.length > 0 && <h4>Subscriptions</h4>}
      {profile?.channels?.map((channel) => (
        <Link
          key={channel.id}
          to={`/channel/${channel.id}`}
          onClick={() => setSidebar(false)}
        >
          <div className="channel">
            <img src={channel.avatar} alt="avatar" />
            <span>{channel.username}</span>
          </div>
        </Link>
      ))}
    </Wrapper>
  );
};
