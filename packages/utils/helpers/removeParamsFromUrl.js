import Router from "next/router";
import qs from "qs";

export function removeParamsFromUrl(param, ctx = null) {
  const asPath = ctx ? ctx.asPath : Router.asPath;
  const baseUrl = asPath.split(/\?/)[0].split("#")[0];
  let params = qs.parse(asPath.split(/\?/)[1], {
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
    const url = `${baseUrl}?${qs.stringify(params, {
      skipNulls: true,
      encodeValuesOnly: true,
    })}`;
    if (!ctx) {
      Router.push(url, null, { scroll: false, shallow: true });
    } else {
      ctx.res
        .writeHead(302, {
          Location: encodeURI(url),
        })
        .end();
    }
  } else if (ctx) {
    ctx.res
      .writeHead(302, {
        Location: encodeURI(baseUrl),
      })
      .end();
  } else Router.push(baseUrl, null, { scroll: false, shallow: true });
}
