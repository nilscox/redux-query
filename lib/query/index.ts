import { queryActions } from './query-actions';
import { QueryFallbackReducer, queryReducer } from './query-reducer';
import { querySelectors } from './query-selectors';
import { Queries, QueryState } from './query-types';

export { QueryState };

export const query = <K, R, E = unknown>(name: string) => ({
  reducer(fallbackReducer?: QueryFallbackReducer<K, R, E>) {
    return queryReducer<K, R, E>(name, fallbackReducer);
  },

  actions() {
    return queryActions<K, R, E>(name);
  },

  selectors<S>(selectQuery: (state: S) => Queries<K, R, E>) {
    return querySelectors<K, R, E, S>(selectQuery);
  },
});
