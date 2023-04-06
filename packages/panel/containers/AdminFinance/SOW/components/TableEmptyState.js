import React, { memo } from "react";


function TableEmptyState() {
  return (
    <div className="mt-4 p-5 d-flex align-items-center justify-content-center w-100">
      <div className="d-flex flex-column align-items-center my-5">
        <img
          alt=""
          width={50}
          height={70}
          src={`/images/tableEmptyState.svg`}
        />
        <div className="mt-4">The report is not recorded!</div>
      </div>
    </div>
  );
}

export default memo(TableEmptyState);
