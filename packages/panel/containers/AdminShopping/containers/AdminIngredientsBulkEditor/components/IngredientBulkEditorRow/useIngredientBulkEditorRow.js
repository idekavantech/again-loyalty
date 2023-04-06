export function useIngredientsBulkEditorRow({
  ingredient,
  updatedIngredients,
  setUpdatedIngredients,
}) {
  const {
    id,
    title,

    main_image_thumbnail_url: mainImageThumbnailUrl,
  } = ingredient;
  const updatedIngredient = { ...ingredient, ...updatedIngredients[id] };
  const isMock = !id;
  const onIngredientFieldChange = (cell) => (value) => {
    setUpdatedIngredients({
      ...updatedIngredients,
      [id]: {
        ...updatedIngredient,
        [cell.id]: value,
      },
    });
  };
  return {
    id,
    mainImageThumbnailUrl,
    updatedIngredient,
    isMock,
    onIngredientFieldChange,
    title,
  };
}
