import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AfterPaymentRedirectPage() {
  const router = useRouter();
  const { id, data } = router.query;
  function post() {
    const form = document.createElement("form");
    form.method = "post";
    form.action = `https://api.behtarino.com/api/v1/order_transactions/${id}/mellat_callback/`;
    const params = JSON.parse(data);

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement("input");
        hiddenField.type = "hidden";
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }
  useEffect(() => {
    post();
  }, []);

  return (
    <div>
      <Head>
        <title>در حال انتقال...</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div
        className={
          "w-100 d-flex h-80-vh justify-content-center align-items-center"
        }
      >
        <p style={{ fontSize: 19 }}>در حال انتقال...</p>
      </div>
    </div>
  );
}
AfterPaymentRedirectPage.layoutConfig = {
  noHeader: true,
  noFooter: true,
  noCopyRightFooter: true,
  noSharedComponents: true,
};
