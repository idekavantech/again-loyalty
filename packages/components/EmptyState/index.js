import React from "react";
import LazyImage from "../LazyImage";

function EmptyState({ srcImage, description }) {
  return (
    <div className="container text-center m-h-35 d-flex justify-content-center align-items-center">
      <div>
        <div>
          <LazyImage src={srcImage} />
        </div>
        <div className="u-text-dark-grey mt-4">{description}</div>
      </div>
    </div>
  );
}

export default EmptyState;
