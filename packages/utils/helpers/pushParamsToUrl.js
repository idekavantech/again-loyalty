import Router from "next/router";
import qs from "qs";
export function pushParamsToUrl(..._params) {
  let serializedParams = {};
  const baseUrl = Router.asPath.split(/\?/)[0].split("#")[0];

  _params.forEach((p) => {
    if (typeof p === "string") {
      serializedParams[p] = true;
    } else if (typeof p === "object") {
      serializedParams = { ...serializedParams, ...p };
    }
  });
  let params = qs.parse(Router.asPath.split(/\?/)[1], {
    ignoreQueryPrefix: true,
  });
  const searchParams = { ...params, ...serializedParams };
  if (Object.keys(searchParams).length)
    Router.push(
      `${baseUrl}?${qs.stringify(searchParams, {
        skipNulls: true,
        encodeValuesOnly: true,
      })}`,
      null,
      { scroll: false, shallow: true }
    );
  else Router.push(Router.asPath, Router.asPath, { scroll: false });
}
