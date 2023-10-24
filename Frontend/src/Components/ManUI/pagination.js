// Pagination.js

import React from "react";

const Pagination = ({ rowsPerPage, totalRecords, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecords / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className="page-link"
              style={{
                marginRight: "5px",
                backgroundColor: "#1E90FF",
                color: "white",
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
