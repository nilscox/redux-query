import { Normalized, normalized } from 'lib';
import { combineReducers } from 'redux';

import { schemas } from '../../normalization';
import { Thread } from '../../types';
import { getThreadQuery } from './queries/get-thread-query';

type NormalizedThread = Normalized<Thread, 'author' | 'comments'>;

export const threadsReducer = combineReducers({
  entities: normalized<NormalizedThread>(schemas, 'thread'),
  queries: combineReducers({
    getThread: getThreadQuery.reducer,
  }),
});
