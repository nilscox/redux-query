import { AnyAction, Reducer } from 'redux';

import { isSetErrorAction, isSetPendingAction, isSetSuccessAction } from './query-actions';
import { Queries, Query, QueryState } from './query-types';
import { findQuery } from './query-utils';

const defaultQuery = <K, R, E>(key: K): Query<K, R, E> => ({
  key,
  state: QueryState.pending,
  error: undefined,
  result: undefined,
});

const updateQuery = <K, R, E>(queries: Queries<K, R, E>, key: K, updates: Partial<Query<K, R, E>>) => {
  const query = findQuery(queries, key) ?? defaultQuery(key);
  const index = queries.indexOf(query);
  const updated = { ...query, ...updates };

  if (index >= 0) {
    return [...queries.slice(0, index), updated, ...queries.slice(index + 1)];
  } else {
    return [...queries, updated];
  }
};

export const queryReducer = <K, R, E>(
  name: string,
  fallbackReducer?: QueryFallbackReducer<K, R, E>
): Reducer<Queries<K, R, E>, AnyAction> => {
  return (state = [], action) => {
    if (isSetPendingAction<K>(name, action)) {
      return updateQuery<K, R, E>(state, action.key, { state: QueryState.pending });
    }

    if (isSetSuccessAction<K, R>(name, action)) {
      return updateQuery<K, R, E>(state, action.key, { state: QueryState.success, result: action.result });
    }

    if (isSetErrorAction<K, E>(name, action)) {
      return updateQuery<K, R, E>(state, action.key, { state: QueryState.error, error: action.error });
    }

    if (fallbackReducer) {
      const next: Queries<K, R, E> = state.slice();

      for (let i = 0; i < state.length; ++i) {
        next[i] = fallbackReducer(state[i] as Query<K, R, E>, action);
      }

      return next;
    }

    return state;
  };
};

export type QueryFallbackReducer<K, R, E> = (query: Query<K, R, E>, action: AnyAction) => Query<K, R, E>;
