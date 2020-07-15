import React from "react";

export default ({ description }) => {
  return (
    <div>
      <p>{description || "No description for this channel"}</p>
    </div>
  );
};
