import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Skeleton from "@material-ui/lab/Skeleton";

function SkeletonRenderer({ isMobile }) {
  const {maxWidth768} = useResponsive()
  const mobileMatches = typeof isMobile === "boolean" ? isMobile : maxWidth768;

  return (
    <div className="d-flex align-items-center overflow-hidden">
      <div
        style={{ marginRight: 32 }}
        className="d-flex flex-column align-items-center justify-content-center ml-4"
      >
        <Skeleton
          variant="circle"
          animation="wave"
          width={mobileMatches ? 30 : 40}
          height={mobileMatches ? 30 : 40}
        />
        <Skeleton variant="text" animation="wave" height={25} width="100%" />
      </div>

      {/** Map 12 skeleton items */}
      {Array(12)
        .fill("")
        .map((_) => (
          <div
            className="d-flex flex-column align-items-center justify-content-center mx-4"
            key={_}
          >
            <Skeleton
              variant="circle"
              animation="wave"
              width={mobileMatches ? 30 : 40}
              height={mobileMatches ? 30 : 40}
            />
            <Skeleton
              variant="text"
              animation="wave"
              height={25}
              width="100%"
            />
          </div>
        ))}
    </div>
  );
}

export default SkeletonRenderer;
