import Router from "next/router";
import qs from "qs";
export function clearPushParamsToUrl(..._params) {
  let serializedParams = {};
  const baseUrl = Router.asPath.split(/\?/)[0].split("#")[0];

  _params.forEach((p) => {
    if (typeof p === "string") {
      serializedParams[p] = true;
    } else if (typeof p === "object") {
      serializedParams = { ...serializedParams, ...p };
    }
  });

  Router.push(
    `${baseUrl}?${qs.stringify(serializedParams, {
      skipNulls: true,
      encodeValuesOnly: true,
    })}`,
    null,
    { scroll: false, shallow: true }
  );
}
