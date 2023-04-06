import React, { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const FlatShoppingProductList1 = dynamic(() =>
  import("./Flat/FlatShoppingProductList1")
);
const FlatShoppingProductList2 = dynamic(() =>
  import("./Flat/FlatShoppingProductList2")
);
const NestedShoppingProductList1 = dynamic(() =>
  import("./Nested/NestedShoppingProductList1")
);
const FlatShoppingProductListComponents = {
  type_1: FlatShoppingProductList1,
  type_2: FlatShoppingProductList2,
};
const NestedShoppingProductListComponents = {
  type_3: NestedShoppingProductList1,
};
const categoriesTypes = {
  flat: FlatShoppingProductListComponents,
  nested: NestedShoppingProductListComponents,
};
const urlsKeyValueForCategoriesType = {
  "/l/": "flat",
  "/c/": "nested",
};
const urlsKeyValueForCategoriesTypeLayout = {
  "/l/": "type_1",
  "/c/": "type_3",
};
function ProductList({ customization, ...props }) {
  const router = useRouter();
  const categoriesTypeByUrl = useMemo(() => {
    return (
      Object.entries(urlsKeyValueForCategoriesType).find(
        ([key]) => router.asPath.search(key) > -1
      )?.[1] || null
    );
  }, [router.asPath]);
  const categoriesTypeLayoutByUrl = useMemo(() => {
    return (
      Object.entries(urlsKeyValueForCategoriesTypeLayout).find(
        ([key]) => router.asPath.search(key) > -1
      )?.[1] || null
    );
  }, [router.asPath]);

  if (!customization) {
    return null;
  }

  const categoriesTypeLayouts =
    categoriesTypes[
      categoriesTypeByUrl || customization.layout.categories_type || "flat"
    ];
  const Comp =
    categoriesTypeLayouts[
      categoriesTypeLayoutByUrl || customization.layout.type
    ];
  if (!Comp) {
    return null;
  }
  return <Comp customization={customization} {...props} />;
}

export default memo(ProductList);
