import React, { useState } from "react";

export default function Search({onChange}) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="search-bar">
      <input
        value={searchValue}
        class="searchBox"
        type="search"
        name="search"
        placeholder="Search..."
        onChange={(e) => {
          setSearchValue(e.target.value);
          onChange(e.target.value);
        }}
      ></input>
    </div>
  );
}
