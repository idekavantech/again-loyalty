import dynamic from "next/dynamic";

dynamic(() => import("url-search-params-polyfill"), { ssr: false });
export function getQueryParams(query, url) {
  const urlParams = new URLSearchParams(url);
  return urlParams.get(query);
}
