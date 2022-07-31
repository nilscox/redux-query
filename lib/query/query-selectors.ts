import { findQuery } from './query-utils';
import { Queries } from './query-types';

export const querySelectors = <K, R, E, S>(selectQuery: (state: S) => Queries<K, R, E>) => ({
  selectState(state: S, key: K) {
    return findQuery(selectQuery(state), key)?.state;
  },

  selectResult(state: S, key: K) {
    return findQuery(selectQuery(state), key)?.result;
  },

  selectError(state: S, key: K) {
    return findQuery(selectQuery(state), key)?.error;
  },
});
