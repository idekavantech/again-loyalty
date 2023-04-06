import { useState } from "react";

export function useDownloadFile(fileName, urlToSend, token){
  const [loading, setLoading] = useState(false);
  const startDownload = () => {
    setLoading(true);
    req.send();
  };

  let req = new XMLHttpRequest();
  req.open("GET", urlToSend, true);
  req.setRequestHeader(
    "Authorization",
    token.startsWith("eyJ") ? `Bearer ${token}` : `Token ${token}`
  );

  req.responseType = "blob";
  req.onload = function () {
    let blob = req.response;
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    setLoading(false);
  };

  return { loading, startDownload };
};