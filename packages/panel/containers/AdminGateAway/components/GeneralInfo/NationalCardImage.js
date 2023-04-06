import React, { useState } from "react";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ImageUploader from "@saas/builder/SectionRenderer/components/ImageUploader";
function NationalCardImage({ removeFile, cover, setCover, uploadFile }) {
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
        image={cover.img}
        callback={(img, url) => {
          setCover({
            img,
            url,
          });
          removeFile();
          setIsLoading(false);
        }}
        folderName="business_legal_documents"
      />
    );
  }
}

export default NationalCardImage;
