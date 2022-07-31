import 'module-alias/register';

import { createStore } from './store';
import { fetchThreadComments, selectThreadComments, setCommentText } from './slices/comment';
import { fetchThread, selectThreadQueryResults } from './slices/thread';
import { StubThreadGateway } from './StubThreadGateway';

const main = async () => {
  const store = createStore({
    threadGateway: new StubThreadGateway(),
  });

  const threadId = 't1';

  await store.dispatch(fetchThread(threadId));
  await store.dispatch(fetchThreadComments(threadId, 'relevance'));

  await store.dispatch(fetchThread('nope'));

  await store.dispatch(fetchThreadComments(threadId, 'date'));

  store.dispatch(setCommentText('c3', 'Are you crazy?!'));
  store.dispatch({ type: 'user/set-name', userId: 'u1', name: 'nilscox' });

  console.log('thread');
  console.dir(selectThreadQueryResults(store.getState(), { threadId }), { depth: null });
  console.log();

  console.log('comments relevance');
  console.dir(selectThreadComments(store.getState(), { threadId, sort: 'relevance' }), { depth: null });
  console.log();

  console.log('comments date');
  console.dir(selectThreadComments(store.getState(), { threadId, sort: 'date' }), { depth: null });

  console.dir(store.getState(), { depth: null });
};

main().catch(console.error);
