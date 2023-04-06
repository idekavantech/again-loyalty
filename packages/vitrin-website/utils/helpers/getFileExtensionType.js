import videoExtensions from "video-extensions";
import imageExtensions from "image-extensions";
export function getFileExtensionType(extension) {
  if (videoExtensions.findIndex((ex) => ex === extension) > -1) return "video";
  if (imageExtensions.findIndex((ex) => ex === extension) > -1) return "image";
  return "other";
}
