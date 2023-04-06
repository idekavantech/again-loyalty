let showPopUp;
if (typeof document !== "undefined") {
  let d = document,
    style,
    mainModalDiv,
    overlay;
  style = d.createElement("style");
  const closePopUp = () => {
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
    overlay.style.top = "auto";
    overlay.style.height = "0";
    d.getElementById("porsline-popup-iframe").src = "";
  };

  style.innerHTML =
    ".porsline-box {max-width: 1200px; width: 90%;margin: 0 auto;background: rgba(255, 255, 255, 0.2);padding: 35px;border: 2px solid #fff;border-radius: 20px/50px;background-clip: padding-box;text-align: center;}\
        .porsline-overlay {position: fixed;height: 0;bottom: 0;left: 0;right: 0;background: rgba(0, 0, 0, 0.7);visibility: hidden;opacity: 0;transition: all 700ms;}\
        .porsline-overlay:target {visibility: visible;opacity: 1; z-index: 10000}\
        .porsline-popup {margin: 5px auto;padding-top: 20px;border-radius: 5px;width: 90%;height: 90%;position: relative;transition: all 500ms ease-in-out;}\
        .porsline-popup .porsline-close {position: absolute;top: 0px;right: 0px;transition: all 200ms;font-size: 30px;font-weight: bold;text-decoration: none;color: #fff;margin-right: -20px}\
        .porsline-popup-header {height: 15px;}\
        .porsline-popup .porsline-content {height: 90%;overflow: show;}\
        #porsline-popup-iframe {width: 100%; height: 99%;border: none;}\
        .porsline-button {     z-index: 1000;border-radius: 8px; transform: rotate(90deg);     transform-origin: left bottom;  cursor:pointer; transition: all 0.3s ease;color: white;padding: 12px 16px;line-height: 1.4;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;background-color: #0050FF;width: auto;white-space: pre;min-height: 40px; padding-bottom: 20px}\
        .porsline-button:hover {transform: rotate(90deg) translateY(-5px);}\
        ";
  d.getElementsByTagName("head")[0].appendChild(style);
  mainModalDiv = d.createElement("div");
  mainModalDiv.id = "porsline-popup";
  mainModalDiv.className = "porsline-overlay";
  mainModalDiv.innerHTML =
    '<div class="porsline-popup">\
            <div class="porsline-popup-header">\
                <a class="porsline-close" href="javascript:void(0);">&times;</a>\
            </div>\
            <div class="porsline-content">\
                <iframe id="porsline-popup-iframe"></iframe>\
            </div>\
        </div>';

  d.getElementsByTagName("body")[0].appendChild(mainModalDiv);

  d.getElementsByClassName("porsline-popup")[0].style.height =
    window.innerHeight.toString() + "px";
  overlay = d.getElementsByClassName("porsline-overlay")[0];

  overlay.onclick = function () {
    closePopUp();
  };

  showPopUp = () => {
    overlay.style.height = "auto";
    overlay.style.top = "0";
    d.getElementsByClassName("porsline-content")[0].style.height =
      (window.innerHeight - 60).toString() + "px";
    overlay.style.visibility = "visible";
    overlay.style.opacity = 1;
  };
  var eventMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  eventer(
    messageEvent,
    function (e) {
      if (e.data == "hello") closePopUp();
    },
    false
  );
  d.getElementsByTagName("body")[0].onkeydown = function (e) {
    if (e.code == "Escape") closePopUp();
  };
}
export { showPopUp };
