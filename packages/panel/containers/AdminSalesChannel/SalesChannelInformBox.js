import { useResponsive } from "@saas/utils/hooks/useResponsive";


const SalesChannelInformBox = () => {
  const { maxWidth430: isMobile } = useResponsive();
  return (
    <div className={"col-12 mb-5"}>
      <div
        className={`d-flex justify-content-center`}
        style={{
          backgroundColor: "#fff",
          borderRadius: "6px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          className={` ${
            isMobile ? `flex-col align-items-center text-center` : ""
          } d-flex col-12 col-md-12 py-5`}
          style={{
            paddingRight: 32,
            paddingLeft: 32,
          }}
        >
          {!isMobile && (
            <div
              className={"d-flex align-items-center"}
              style={{ marginLeft: "3%" }}
            >
              <img
                style={{
                  width: 70,
                  height: 70,
                }}
                src={`/images/channel_icon.svg`}
                alt={"Recovery channel icon"}
              />
            </div>
          )}
          <div>
            <h2
              className={"mb-3"}
              style={{ color: "#002880", fontWeight: 500, fontSize: 18 }}
            >
              an important question
            </h2>
            <p style={{ fontSize: 16 }}>
              Now that you have built your own site, how should traffic be high
              take?On this page we have introduced ways with which
              You can increase your site visit. Training videos
              See to get acquainted with the importance and how to use any method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChannelInformBox;
