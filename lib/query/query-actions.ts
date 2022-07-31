import { AnyAction } from 'redux';

type SetPendingAction<K> = {
  type: `query/${string}/set-pending`;
  key: K;
};

export const isSetPendingAction = <K>(name: string, action: AnyAction): action is SetPendingAction<K> => {
  return action.type === `query/${name}/set-pending`;
};

type SetSuccessAction<K, R> = {
  type: `query/${string}/set-success`;
  key: K;
  result: R;
};

export const isSetSuccessAction = <K, R>(
  name: string,
  action: AnyAction
): action is SetSuccessAction<K, R> => {
  return action.type === `query/${name}/set-success`;
};

type SetErrorAction<K, E> = {
  type: `query/${string}/set-error`;
  key: K;
  error: E;
};

export const isSetErrorAction = <K, E>(name: string, action: AnyAction): action is SetErrorAction<K, E> => {
  return action.type === `query/${name}/set-error`;
};

export const queryActions = <K, R, E>(name: string) => ({
  setPending(key: K): SetPendingAction<K> {
    return {
      type: `query/${name}/set-pending`,
      key,
    };
  },

  setSuccess(key: K, result: R): SetSuccessAction<K, R> {
    return {
      type: `query/${name}/set-success`,
      key,
      result,
    };
  },

  setError(key: K, error: E): SetErrorAction<K, E> {
    return {
      type: `query/${name}/set-error`,
      key,
      error,
    };
  },
});
