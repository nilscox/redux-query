import { query } from 'lib';

import { setComments } from '../actions';
import { getIds } from '../../../utils/get-ids';
import { selectComments } from '../selectors';
import type { State, Thunk } from '../../../store';

type Key = {
  threadId: string;
  sort: 'relevance' | 'date';
};

export const getThreadComments = query<Key, string[]>('getThreadComments');

export const getThreadCommentsActions = getThreadComments.actions();
export const getThreadCommentsSelectors = getThreadComments.selectors(
  (state: State) => state.comments.queries.getThreadComments
);

export const fetchThreadComments = (threadId: string, sort: Key['sort']): Thunk => {
  return async (dispatch, getState, { threadGateway }) => {
    const key: Key = { threadId, sort };

    try {
      dispatch(getThreadCommentsActions.setPending(key));

      const comments = await threadGateway.fetchThreadComments(threadId, sort);

      dispatch(getThreadCommentsActions.setSuccess(key, getIds(comments)));
      dispatch(setComments(comments));
    } catch (error) {
      dispatch(getThreadCommentsActions.setError(key, error));
    }
  };
};

export const selectThreadComments = (state: State, key: Key) => {
  return selectComments(state, getThreadCommentsSelectors.selectResult(state, key));
};
