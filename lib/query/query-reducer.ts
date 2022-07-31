import { AnyAction } from 'redux';

import { isSetPendingAction, isSetSuccessAction, isSetErrorAction } from './query-actions';
import { findQuery } from './query-utils';
import { Queries, Query, QueryState } from './query-types';

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

export const queryReducer = <K, R, E>(name: string) => {
  return (state: Queries<K, R, E> = [], action: AnyAction) => {
    if (isSetPendingAction<K>(name, action)) {
      return updateQuery<K, R, E>(state, action.key, { state: QueryState.pending });
    }

    if (isSetSuccessAction<K, R>(name, action)) {
      return updateQuery<K, R, E>(state, action.key, { state: QueryState.success, result: action.result });
    }

    if (isSetErrorAction<K, E>(name, action)) {
      return updateQuery<K, R, E>(state, action.key, { state: QueryState.error, error: action.error });
    }

    return state;
  };
};
