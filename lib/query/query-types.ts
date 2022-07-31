export enum QueryState {
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export type Query<K, R, E> = {
  key: K;
  state: QueryState;
  result: R | undefined;
  error: E | undefined;
};

export type Queries<K, R, E> = Array<Query<K, R, E>>;
