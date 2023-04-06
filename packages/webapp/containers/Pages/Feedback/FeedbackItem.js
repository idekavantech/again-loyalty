import React from "react";
import Image from "next/image";
import { Collapse } from "react-collapse";

const items = [
  { id: 1, title: "خیلی ضعیف", rate: 1 },
  { id: 2, title: "ضعیف", rate: 2 },
  { id: 3, title: "متوسط", rate: 3 },
  { id: 4, title: "خوب", rate: 4 },
  { id: 5, title: "عالی", rate: 5 },
];

function FeedbackItem({
  rate,
  setRate,
  attributes,
  setSelectedAttribute,
  selectedAttribute,
}) {
  return (
    <>
      <p
        className="pt-4"
        style={{ textAlign: "center", fontSize: 12, fontWeight: 600 }}
      >
        {rate ? items.find((item) => item.rate == rate)?.title : "ثبت امتیاز"}
      </p>
      <div className="d-flex flex-row-reverse justify-content-around mt-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setRate(rate == 1 && item.rate == 1 ? 0 : item.rate)}
          >
            <Image
              alt=""
              width={24}
              height={24}
              src={
                rate >= item.rate
                  ? "/images/Star 2.svg"
                  : "/images/Star outline.svg"
              }
            />
          </div>
        ))}
      </div>
      <Collapse
        isOpened={rate && rate < 3}
        theme={{
          collapse: "w-100 ReactCollapse--collapse",
          content: "ReactCollapse--content",
        }}
      >
        <div className="d-flex flex-wrap mt-5 justify-content-between">
          {attributes.length > 0
            ? attributes?.map((attribute) => (
                <div
                  className="d-flex justify-content-center align-items-center mt-2"
                  style={{
                    height: 41,
                    width: "48%",
                    border: selectedAttribute?.includes(attribute)
                      ? "1px solid red"
                      : "1px solid #8C9196",
                    borderRadius: 8,
                    backgroundColor: selectedAttribute?.includes(attribute)
                      ? "#ff00003b"
                      : "#fff",
                    color: selectedAttribute?.includes(attribute)
                      ? "red"
                      : "#000",
                  }}
                  onClick={() => setSelectedAttribute(attribute)}
                  key={attribute.id}
                >
                  {attribute.title}
                </div>
              ))
            : null}
        </div>
      </Collapse>
    </>
  );
}

export default FeedbackItem;
