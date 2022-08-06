import { Action } from 'redux';

type PayloadAction<T, P> = Action<T> & P;

type ActionCreator<Type> = () => Action<Type>;
type PayloadActionCreator<Type, Args extends unknown[], Payload> = (
  ...args: Args
) => PayloadAction<Type, Payload>;

type ActionTypeGuard<ActionType extends Action> = (action: Action) => action is ActionType;

export function createAction<Type extends string>(
  type: Type
): [ActionCreator<Type>, ActionTypeGuard<Action<Type>>];

export function createAction<Type extends string, Args extends unknown[], Payload>(
  type: Type,
  getPayload: (...args: Args) => Payload
): [PayloadActionCreator<Type, Args, Payload>, ActionTypeGuard<PayloadAction<Type, Payload>>];

export function createAction<Type extends string, Args extends unknown[], Payload>(
  type: Type,
  getPayload?: (...args: Args) => Payload
) {
  return [(...args: Args) => ({ type, ...getPayload?.(...args) }), (action: Action) => action.type === type];
}
