import React, { useState } from "react";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ImageUploader from "@saas/builder/SectionRenderer/components/ImageUploader";
function ReceiptUploader({
  img,
  removeFile,
  uploadFile,
  setImage,
  errorMessage,
}) {
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
        noAddButton={!img}
        width={"100%"}
        title={"آپلود تصویر رسید"}
        image={img}
        errorMessage={errorMessage}
        callback={(img, url) => {
          setImage({ img, url });
          removeFile();
          setIsLoading(false);
        }}
      />
    );
  }
}
export default ReceiptUploader;
