export const getIds = (array: Array<{ id: string }>) => {
  return array.map(({ id }) => id);
};
