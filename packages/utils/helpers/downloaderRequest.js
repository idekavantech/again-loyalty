export const downloaderRequest = (fileName, urlToSend, token) => {
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
  };
  req.send();
};
