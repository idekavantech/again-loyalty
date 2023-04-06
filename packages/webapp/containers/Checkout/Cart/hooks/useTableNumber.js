import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { TABLE_NUMBER_SESSION_STORAGE } from "@saas/plugins/Shopping/constants";

export const useTableNumber = () => {
  const router = useRouter();
  const routerQueryTableNumber = router?.query?.table_number;
  const [tableNumber, setTableNumber] = useState(routerQueryTableNumber);
  useEffect(() => {
    if (routerQueryTableNumber) {
      sessionStorage.setItem(
        TABLE_NUMBER_SESSION_STORAGE,
        routerQueryTableNumber
      );
    } else if (sessionStorage.getItem(TABLE_NUMBER_SESSION_STORAGE)) {
      setTableNumber(sessionStorage.getItem(TABLE_NUMBER_SESSION_STORAGE));
    }
  }, [routerQueryTableNumber]);
  return {
    tableNumber,
  };
};
