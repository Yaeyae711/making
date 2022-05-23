import React from "react";

const Likes = (props) => {
  return (
    <div>
      <h1>Liked items have given below</h1>
      {props.data}
    </div>
  );
};

export default Likes;
