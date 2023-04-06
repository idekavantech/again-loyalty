import Router from "next/router";
import qs from "qs";

export function removeParamsFromUrl(param) {
  const baseUrl = Router.asPath.split(/\?/)[0].split("#")[0];
  let params = qs.parse(Router.asPath.split(/\?/)[1], {
    ignoreQueryPrefix: true,
  });
  if (param) {
    if (params[param]) {
      delete params[param];
    }
  } else {
    params = {};
  }

  if (Object.keys(params).length) {
    Router.push(
      `${baseUrl}?${qs.stringify(params, {
        skipNulls: true,
        encodeValuesOnly: true,
      })}`,
      null,
      { scroll: false, shallow: true }
    );
  } else Router.push(baseUrl, null, { scroll: false, shallow: true });
}
