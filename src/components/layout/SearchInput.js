import React from "react";
import seacrIcon from "../../assets/search.svg";

const SearchInput = ({ value, setValue }) => {
  return (
    <div className="d-flex justify-content-between flex-wrap">
      <div className="searchInputContainer d-flex px-2 py-1">
        <input
          placeholder="search"
          className="border-0 bg-transparent"
          value={value}
          onChange={(e) => setValue(e)}
        />
        <img src={seacrIcon} alt="searchIcon" />
      </div>
    </div>
  );
};

export default SearchInput;
