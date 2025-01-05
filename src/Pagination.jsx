import React from "react";

export default function Pagination({
  gotoNextPage,
  gotoPrevPage,
  prevPageAvailable,
}) {
  return (
    <div className="flex absolute top-[calc(50%-28px)] justify-between w-full px-2 sm:px-4 lg:justify-end lg:top-6 lg:right-20 lg:gap-4">
      <button
        className="btn"
        onClick={gotoPrevPage}
        disabled={!prevPageAvailable}
      >
        Prev
      </button>
      <button className="btn" onClick={gotoNextPage}>
        Next
      </button>
    </div>
  );
}
