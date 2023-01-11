/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const NewSearchDD = ({ data, handleSearch, handleSelect }) => {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedFilter = useCallback(
    debounce((q) => handleSearch(q), 400),
    []
  );

  const handleChange = (e) => {
    let q = e.target.value;
    setQuery(q);
    debouncedFilter(q);
  };

  const toggleDropDown = () => {
    setVisible(!visible);
  };

  return (
    <div className="dropdown w-100">
      <button onClick={toggleDropDown} className="dropbtn w-100">
        Select a customer
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
              <a onClick={() => handleSelect(d.value)} key={i}>
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
