/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const NewSearchDD = ({ data, handleSearch, handleSelect, placeHolder }) => {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedFilter = useCallback(
    debounce((q) => handleSearch(q), 600),
    []
  );

  const handleChange = (e) => {
    let q = e.target.value;
    setQuery(q);
    debouncedFilter(q);
  };

  const handlePick = (d) => {
    handleSelect(d.value, d.label);
    setVisible(false);
  };

  const toggleDropDown = () => {
    setVisible(!visible);
  };

  return (
    <div className="dropdown w-100">
      <button onClick={toggleDropDown} className="dropbtn w-100">
        {placeHolder}
      </button>
      {visible && (
        <div id="myDropdown" className="dropdown-content w-100">
          <input
            className="w-100"
            type="text"
            placeholder="Search.."
            id="myInput"
            value={query}
            onChange={handleChange}
          />
          {data.map((d, i) => {
            return (
              <a onClick={() => handlePick(d)} key={i}>
                {d.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewSearchDD;
