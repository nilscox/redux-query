import { Id } from './normalize-types';

export const createNormalizedUpdater = (name: string) => {
  return <T extends { id: Id }>(items: Record<string, T>) => {
    return (id: string, updater: (item: T) => Partial<T>) => {
      const item = items[id];

      if (!item) {
        console.warn(`${name} with id "${id}" does not exist`);
        return items;
      }

      return {
        ...items,
        [id]: { ...item, ...updater(item) },
      };
    };
  };
};
