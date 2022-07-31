import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createReduxStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { commentsReducer } from './slices/comment';
import { threadsReducer } from './slices/thread';
import { usersReducer } from './slices/user';
import { Dependencies } from './types';

export const createStore = (deps: Dependencies) => {
  return createReduxStore(
    combineReducers({
      users: usersReducer,
      comments: commentsReducer,
      threads: threadsReducer,
    }),
    applyMiddleware(thunk.withExtraArgument(deps))
  );
};

export type Store = ReturnType<typeof createStore>;

export type GetState = Store['getState'];
export type Dispatch = Store['dispatch'];

export type State = ReturnType<GetState>;

export type Thunk<ReturnType = void | Promise<void>> = ThunkAction<
  ReturnType,
  State,
  Dependencies,
  AnyAction
>;
