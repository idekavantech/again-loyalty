import ProductCard from "../ProductCard";
import React, { useEffect, useRef, useState } from "react";
import Flickity from "../Flickity";

export default function ProductSlider({
  title,
  productCardOptions,
  orders,
  products,
}) {
  const flickityOptions = {
    rightToLeft: true,
    pageDots: false,
    cellAlign: "right",
    freeScroll: true,
    contain: true,
    autoPlay: true,
  };
  const dragging = useRef();
  const flkty = useRef();
  const [productsCount, setProductsCount] = useState(
    products
      ? products.map((_product) => {
          const arr = orders?.filter((item) => item.product.id === _product.id)
            ? orders
                ?.filter((item) => item.product.id === _product.id)
                .map((item) => item.count)
            : 0;
          return arr && arr.length
            ? arr.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )
            : 0;
        })
      : []
  );
  useEffect(() => {
    setProductsCount(
      products
        ? products.map((_product) => {
            const arr = orders?.filter(
              (item) => item.product.id === _product.id
            )
              ? orders
                  ?.filter((item) => item.product.id === _product.id)
                  .map((item) => item.count)
              : 0;
            return arr && arr.length
              ? arr.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )
              : 0;
          })
        : []
    );
  }, [JSON.stringify(orders)]);
  return (
    <div className="p-3">
      <div className="u-fontWeightBold mb-2">{title}</div>
      <Flickity
        elementType="div"
        options={flickityOptions}
        disableImagesLoaded={false}
        dragging={dragging}
        flickityRef={flkty}
      >
        {products.map((p, i) => (
          <div key={p?.id} className="col-6 col-md-4 col-lg-3 col-xl-2 px-1">
            <ProductCard
              orders={orders}
              product={p}
              count={productsCount[i]}
              fixedWidth
              {...productCardOptions}
              altImage={p.title}
            />
          </div>
        ))}
      </Flickity>
    </div>
  );
}
