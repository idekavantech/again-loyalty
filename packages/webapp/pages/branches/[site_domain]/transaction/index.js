import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { TRANSACTION_ZIBAL_API } from "@saas/utils/api";
import axios from "axios";
import LoadingIndicator from "@saas/components/LoadingIndicator";

function postData(url = "", data = {}) {
  const form = document.createElement("form");
  form.style.setProperty("visibility", "hidden");
  form.setAttribute("method", "POST");
  form.setAttribute("action", url);
  Object.entries(data).forEach(([key, value]) => {
    const hiddenField = document.createElement("input");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", value);
    form.appendChild(hiddenField);
  });
  form.setAttribute("target", "_self");
  document.body.appendChild(form);
  form.submit();
}
export default function TransactionPage() {
  const router = useRouter();

  const payTransaction = async (transactionId) => {
    const {
      data: { data: paymentData },
    } = await axios.get(TRANSACTION_ZIBAL_API(transactionId));
    if (paymentData) {
      const { url, data } = paymentData;
      if (data) {
        postData(url, data);
      } else {
        window.location.href = url;
      }
    } else {
      router.replace("/");
    }
  };
  useEffect(() => {
    const transactionId = router.query.t_id;
    if (transactionId) {
      payTransaction(router.query.t_id);
    } else router.replace("/");
  }, []);
  return <LoadingIndicator />;
}

TransactionPage.onlyClient = true;
