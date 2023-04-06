import axios from "axios";

export const getPages = async (url) => {
  const _pages = [];
  const {
    data: {
      data: pages,
      pagination: { next },
    },
  } = await axios.get(url);
  _pages.push(...pages);
  if (next) {
    const nextPages = await getPages(next);
    _pages.push(...nextPages);
  }
  return _pages;
};
