import { Action } from 'redux';

type PayloadAction<T, P> = Action<T> & P;

export function createAction<Type extends string>(type: Type): () => Action<Type>;

export function createAction<Type extends string, Args extends unknown[], Payload>(
  type: Type,
  getPayload: (...args: Args) => Payload
): (...args: Args) => PayloadAction<Type, Payload>;

export function createAction<Type extends string, Args extends unknown[], Payload>(
  type: Type,
  getPayload?: (...args: Args) => Payload
) {
  return (...args: Args) => ({ type, ...getPayload?.(...args) });
}
