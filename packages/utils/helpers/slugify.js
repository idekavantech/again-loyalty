export function slugify(text) {
  return (
    text &&
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/%/g, "-") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/g, "-")
      .replace(/‌/g, "") // Trim - from start of text
      .replace(/-+$/g, "") // Trim - from end of text
      .replace(/\//g, "-")
      .replace(/:/g, "-")
      .replace(/\./g, "-")
      .replace(/&/g, "-")
  ); // Trim - from end of text
}
