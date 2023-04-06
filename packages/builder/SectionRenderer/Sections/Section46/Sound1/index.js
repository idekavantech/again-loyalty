import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import { AudioPlayerControlSprite, Audio } from "react-audio-player-pro";
import "react-audio-player-pro/dist/style.css";
import styled from "styled-components";

const StyledAudio = styled(Audio)(({ width }) => ({
  "&.custom-audio": {
    width: width || "1140px",
  },
}));
function Sound1({
  isDragging,
  dragHandleProps,
  isActive,
  _updateSection,
  isEditMode,
  onClick,
  content,
  customization,
}) {
  const {
    sound: { value },
  } = content;

  return (
    <AdminSection
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
      isActive={isActive}
      _updateSection={_updateSection}
      isEditMode={!!isEditMode}
      onClick={onClick}
    >
      <div className="d-flex align-items-center justify-content-center py-3">
        <AudioPlayerControlSprite />
        <StyledAudio
          src={value}
          className="custom-audio"
          width={
            customization?.width?.isCustomValue
              ? customization?.width?.value
              : undefined
          }
        />
      </div>
    </AdminSection>
  );
}

export default memo(Sound1);
