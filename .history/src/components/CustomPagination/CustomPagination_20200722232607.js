import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

export default function CustomPagination({ handlePageClick, maxPages, active }) {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    let arr = [];
    for (let number = 1; number <= maxPages; number++) {
      arr.push(
        <Pagination.Item key={number} data-page={number} active={number === parseInt(active)}>
          {number}
        </Pagination.Item>
      );
    }
    setPages(arr);
  }, [maxPages, active]);
  return (
    <div className="my-5">
      <Pagination style={{ justifyContent: "center" }} onClick={(e) => handlePageClick(e)}>
        <Pagination.First disabled={pages.length === 1} key={1} data-page={1} />
        {pages}
        <Pagination.Last disabled={pages.length === 1} key={maxPages} data-page={maxPages} />
      </Pagination>
    </div>
  );
}
