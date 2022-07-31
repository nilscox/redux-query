import { query } from 'lib';

import { setThread } from '../actions';
import { selectThread } from '../selectors';
import type { State, Thunk } from '../../../store';

type Key = {
  threadId: string;
};

export const getThreadQuery = query<Key, string>('getThread');

export const getThreadActions = getThreadQuery.actions();
export const getThreadSelectors = getThreadQuery.selectors((state: State) => state.threads.queries.getThread);

export const fetchThread = (threadId: string): Thunk => {
  return async (dispatch, getState, { threadGateway }) => {
    const key = { threadId };

    dispatch(getThreadActions.setPending(key));

    try {
      const thread = await threadGateway.fetchThread(threadId);

      if (!thread) {
        dispatch(getThreadActions.setError(key, 'not found'));
        return;
      }

      dispatch(getThreadActions.setSuccess(key, thread.id));
      dispatch(setThread(thread));
    } catch (error) {
      dispatch(getThreadActions.setError(key, error));
    }
  };
};

export const selectThreadQueryResults = (state: State, key: Key) => {
  return selectThread(state, getThreadSelectors.selectResult(state, key));
};
