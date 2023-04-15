import React from "react";

const Field = ({ id, field, handleClick }) => {
  return (
    <div className="grid-item" id={id} onClick={() => handleClick(id, field)}>
      <p className={`field-${field}`}>{field}</p>
    </div>
  );
};

export default Field;
