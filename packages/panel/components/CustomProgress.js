import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { border, surface, white } from "@saas/utils/colors";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function CustomProgress({
  progress = 0,
  size = 53,
  text = "",
  badge = null,
}) {
  const {minWidth768} = useResponsive()

  if (minWidth768) {
    return (
      <div className="position-relative align-items-center d-flex w-100 mb-4">
        <div
          style={{ color: border.default, marginTop: 2 }}
          className="d-flex align-items-center justify-content-center ml-2"
        >
          {text}
        </div>

        <LinearProgress
          style={{ height: 8, backgroundColor: border.subdued }}
          className="flex-1 u-border-radius-4"
          variant="determinate"
          value={100 - progress}
        />

        {badge ? (
          <div
            className="position-absolute left-0 d-flex align-items-center justify-content-center u-border-radius-50-percent u-width-32 u-height-32"
            style={{
              background: white,
              border: `1px solid ${border.subdued}`,
            }}
          >
            {badge}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="position-relative" style={{ width: size, height: size }}>
      <CircularProgress
        size={53}
        className="position-absolute u-top-0 bottom-0 right-0 left-0"
        variant="static"
        value={100}
        style={{ color: border.subdued }}
      />

      <CircularProgress
        size={53}
        style={{ color: surface.highlight.default }}
        className="position-absolute u-top-0 bottom-0 right-0 left-0"
        variant="static"
        value={progress}
      />
      <div
        style={{ color: border.default, marginTop: 2 }}
        className="d-flex align-items-center justify-content-center position-absolute u-top-0 bottom-0 right-0 left-0"
      >
        {text}
      </div>

      {badge ? (
        <div
          className="position-absolute left-0 m-auto d-flex align-items-center justify-content-center u-border-radius-50-percent w-24 u-height-24"
          style={{
            top: -9,
            right: 20,
            background: white,
            border: `1px solid ${border.subdued}`,
          }}
        >
          {badge}
        </div>
      ) : null}
    </div>
  );
}
