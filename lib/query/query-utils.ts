import { Queries } from './query-types';

const compareKeys = <K>(k1: K, k2: K) => {
  if (typeof k1 !== typeof k2) {
    return false;
  }

  if (typeof k1 !== 'object' || k1 === null) {
    return k1 === k2;
  }

  for (const key in k1) {
    if (!compareKeys(k1[key], k2[key])) {
      return false;
    }
  }

  for (const key in k2) {
    if (!compareKeys(k1[key], k2[key])) {
      return false;
    }
  }

  return true;
};

export const findQuery = <K, R, E>(queries: Queries<K, R, E>, key: K) => {
  return queries.find((query) => compareKeys(query.key, key));
};
