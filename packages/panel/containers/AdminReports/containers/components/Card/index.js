import { Skeleton } from "@material-ui/lab";
import React from "react";

export default function Card({ cardDetail, isLoading }) {
  return (
    <div
      className="card text-center m-auto d-flex align-items-center justify-content-center"
      style={{
        width: 210,
        height: 200,
        background: "#fff",
        color: "#000",
        borderRadius: 16,
      }}
    >
      <div className="card-body p-3 ">
        {cardDetail.icon}
        <h6 className="card-subtitle  " style={{ fontSize: 36 }}>
          {isLoading ? (
            <Skeleton
              className="mx-auto"
              variant="rect"
              width={80}
              height={36}
            />
          ) : (
            cardDetail.data
          )}
        </h6>
        <h5 className="card-title" style={{ fontSize: 16 }}>
          {cardDetail.title}{" "}
          {cardDetail.isPrice && <span style={{ fontSize: 12 }}>(Toman)</span>}
        </h5>
      </div>
    </div>
  );
}
