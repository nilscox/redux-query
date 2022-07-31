import { Queries, QueryState } from './query-types';
import { queryReducer } from './query-reducer';
import { queryActions } from './query-actions';
import { querySelectors } from './query-selectors';

export { QueryState };

export const query = <K, R, E = unknown>(name: string) => ({
  reducer: queryReducer<K, R, E>(name),

  actions() {
    return queryActions<K, R, E>(name);
  },

  selectors<S>(selectQuery: (state: S) => Queries<K, R, E>) {
    return querySelectors<K, R, E, S>(selectQuery);
  },
});
