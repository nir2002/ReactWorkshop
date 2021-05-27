import React, { useState } from "react";

export default function BasicInput({ onChange, type, ...rest }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <input
      value={inputValue}
      type={type ?? "text"}
      onChange={(e) => {
        setInputValue(e.target.value);
        if (onChange) onChange(e);
      }}
      {...rest}
    ></input>
  );
}

export const Search = (props) => (
  <div className="search-bar">
    <BasicInput {...props} type="search" placeholder="Search..." />
  </div>
);

export const LabeledInput = ({ label, ...rest }) => (
  <label>
    <span>{label}</span>:<BasicInput {...rest} />
  </label>
);
