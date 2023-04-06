export function getAllItemsFromMenu(menu) {
  const items = [];
  if (menu.children && menu.children.length) {
    menu.children.forEach((item) => {
      items.push({ id: item.id, name: item.name, seo: item.seo });
      items.push(...getAllItemsFromMenu(item));
    });
  }
  return items;
}
