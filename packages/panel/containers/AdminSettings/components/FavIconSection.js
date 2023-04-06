import React, { useState } from "react";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ImageUploader from "@saas/builder/SectionRenderer/components/ImageUploader";
function MainIconImage({ removeFile, favIcon, setFavIcon, uploadFile }) {
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return (
      <div style={{ height: 75, width: 75 }}>
        <LoadingIndicator isOpen={isLoading} />
      </div>
    );
  } else {
    return (
      <ImageUploader
        _uploadFile={(...props) => {
          setIsLoading(true);
          uploadFile(...props);
        }}
        image={favIcon.img}
        callback={(img, url) => {
          setFavIcon({
            img,
            url,
          });
          removeFile();
          setIsLoading(false);
        }}
        folderName="business_icons"
      />
    );
  }
}
export default MainIconImage;
