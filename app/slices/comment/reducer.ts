import { Normalized, normalized } from 'lib';
import { combineReducers } from 'redux';

import { schemas } from '../../normalization';
import { Comment } from '../../types';
import { getThreadComments } from './queries/get-thread-comments';

type NormalizedComment = Normalized<Comment, 'author' | 'replies'>;

export const commentsReducer = combineReducers({
  entities: normalized<NormalizedComment>(schemas, 'comment'),
  queries: combineReducers({
    getThreadComments: getThreadComments.reducer,
  }),
});
