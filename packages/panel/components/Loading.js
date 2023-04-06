import LoadingSVGs from "configs/loadingSVGs";

const Loading = ({ isLoading }) => {
  const Comp = LoadingSVGs[process.env.NEXT_PUBLIC_APP_NAME];
  return (
    <div>
      <style jsx>
        {`
          @keyframes heartbeat {
            0% {
              opacity: 0.8;
              transform: scale(1);
            }

            50% {
              opacity: 1;
              transform: scale(1.1);
            }

            100% {
              opacity: 0.8;
              transform: scale(1);
            }
          }

          .loading {
            pointer-events: none;
          }

          .loading.hide {
            opacity: 0 !important;
            transition: opacity 0.5s ease-in-out !important;
          }

          .moving-loading-icon {
            animation: heartbeat 1s infinite;
          }
        `}
      </style>
      <div
        className={isLoading ? "loading" : "loading hide"}
        style={{
          background: "white",
          width: "100vw",
          height: "100vh",
          maxHeight: "unset",
          top: "0",
          left: "0",
          position: "fixed",
          transition: "opacity 0.5s ease-in-out",
          zIndex: "2000",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          opacity: 1,
        }}
      >
        <div className="moving-loading-icon">
          {Comp ? (
            <Comp
              style={{ width: 200, transition: "opacity 0.3s ease-in-out" }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Loading;
