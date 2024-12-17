import React from "react";

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      {gotoPrevPage && (
        <button
          className="fixed top-[calc(50%-28px)] left-8 lg:top-8 lg:left-[80%] btn"
          onClick={gotoPrevPage}
        >
          Prev
        </button>
      )}
      {gotoNextPage && (
        <button
          className="fixed top-[calc(50%-28px)] right-8 lg:top-8 lg:right-32 btn"
          onClick={gotoNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
}
