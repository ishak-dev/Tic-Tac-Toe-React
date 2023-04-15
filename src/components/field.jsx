import React from "react";

const Field = ({ id, field, handleClick }) => {
  return (
    <div className="grid-item" id={id} onClick={() => handleClick(id)}>
      <p>{field}</p>
    </div>
  );
};

export default Field;
