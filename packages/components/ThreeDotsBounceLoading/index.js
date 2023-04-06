import React from "react";

const ThreeDotsBounceLoading = ({ size = 12, color = "#333" , className , nameOfComponent="threeDots" }) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      /*Huge thanks to @tobiasahlin at http://tobiasahlin.com/spinkit/ */
      .spinner {
        // margin: 100px auto 0;
        width: max-content;
        text-align: center;
      }
      
      .spinner div.${nameOfComponent} {
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
      
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      }
      
      .spinner .bounce1.${nameOfComponent} {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      
      .spinner .bounce2.${nameOfComponent} {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
      
      @-webkit-keyframes sk-bouncedelay {
        0%, 80%, 100% { -webkit-transform: scale(0) }
        40% { -webkit-transform: scale(1.0) }
      }
      
      @keyframes sk-bouncedelay {
        0%, 80%, 100% { 
          -webkit-transform: scale(0);
          transform: scale(0);
        } 40% { 
          -webkit-transform: scale(1.0);
          transform: scale(1.0);
        }
      }
      `,
        }}
      ></style>
      <div className={`spinner ${className}`}>
        <div className={`bounce1 ${nameOfComponent}`}></div>
        <div className={`bounce2 ${nameOfComponent}`}></div>
        <div className={`bounce3 ${nameOfComponent}`}></div>
      </div>
    </>
  );
};

export default ThreeDotsBounceLoading;
