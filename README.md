# redux-query

⚠️ This is a work in progress. You should not it.

> If you're looking for a library to store the network requests in a redux store, take a look at the existing
> (and supported) packages from
> [redux's documentation](https://redux.js.org/introduction/ecosystem#entities-and-collections).

## Goals

This project is a small library allowing to manage the state of async flows (like XHRs) with redux.

Basically, it reduces the boilerplate of handling async states (pending, success, error) and their associated
results. It also allows to easily store and manipulate normalized entities.

## Examples

For a more complete example, take a look at the [app](./app) folder.

### Query

```ts
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { query } from '<this library>';

type Post = {
  id: string;
  text: string;
};

// this is the type of a query key, will be used to differentiate calls to the same query with different parameters
type FetchPostKey = {
  postId: string;
};

// we declare a query, which creates a reducer, some actions and some selectors
const fetchPostQuery = query<FetchPostKey, Post>('fetchPost');

const fetchPostReducer = fetchPostQuery.reducer;
const fetchPostActions = fetchPostQuery.actions();
const fetchPostSelectors = fetchPostQuery.selectors((state: State) => state.fetchPost);

// let's create the redux store
const store = createStore(
  combineReducers({
    fetchPost: fetchPostReducer,
  })
);

type State = ReturnType<typeof store.getState>;

// we can set the query for the post id "123" in pending state
store.dispatch(fetchPostActions.setPending({ postId: '123' }));

// the query's state for the key "123" can be retrieved using a selector
fetchPostSelectors.selectState(store.getState(), { postId: '123' }); // QueryState.pending

// ...
// let's assume we're doing an async call to retrieve the post's data
// ...

// we can now set this query's result
store.dispatch(fetchPostActions.setSuccess({ postId: '123' }, { id: '123', text: 'Hello!' }));

// and we can retrieve this result using a selector
fetchPostSelectors.selectState(store.getState(), { postId: '123' }); // QueryState.success
fetchPostSelectors.selectResult(store.getState(), { postId: '123' }); // { id: '123', text: 'Hello!' }

// same goes with the error state
store.dispatch(fetchPostActions.setError({ postId: '123' }, 'oh no...'));
fetchPostSelectors.selectState(store.getState(), { postId: '123' }); // QueryState.error
fetchPostSelectors.selectError(store.getState(), { postId: '123' }); // "oh no..."

// using different query keys allows to store different occurrences of the same query, but with different parameters
store.dispatch(fetchPostActions.setSuccess({ postId: '999' }, { id: '999', text: 'Like it?' }));
```

The store's state is now

```json
{
  "fetchPost": [
    {
      "key": { "postId": "123" },
      "state": "error",
      "error": "oh no..."
    },
    {
      "key": { "postId": "999" },
      "state": "success",
      "result": {
        "id": "999",
        "text": "Like it?"
      }
    }
  ]
}
```

### Normalization

This library also allows to store normalized entities using
[normalizr](https://github.com/paularmstrong/normalizr).

```ts
import { schema } from 'normalizr';
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { createNormalizedActions, createNormalizedSelectors, Normalized, normalized } from '<this library>';

type User = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  author: User;
  text: string;
};

// first, we define the entities schemas using normalizr
const userSchema = new schema.Entity('user');
const postSchema = new schema.Entity('post', { author: userSchema });

const schemas = {
  user: userSchema,
  post: postSchema,
};

// then we create some actions that we can dispatch to save entities in a normalized state
const { setEntity: setPost } = createNormalizedActions<Post>('post');

// we need a selector to transform the state in a normalized representation of our entities
const selectNormalizedEntities = (state: State) => ({
  user: state.users,
  post: state.posts.entities,
});

// to create selectors to retrieve regular (denormalized) entities
const { selectEntity: selectPost } = createNormalizedSelectors(selectNormalizedEntities, postSchema);

// using normalized, we can create a reducer that will handle the setPost action
const userReducer = normalized<User>(schemas, 'user');

// Normalized<T> allows to transform our type into its normalized representation, replacing the "author" key with a string
const postEntitiesReducer = normalized<Normalized<Post, 'author'>>(schemas, 'post');

const store = createStore(
  combineReducers({
    users: userReducer,
    posts: combineReducers({
      entities: postEntitiesReducer,
      queries: combineReducers({
        // ...
      }),
    }),
  })
);

type State = ReturnType<typeof store.getState>;

// we can now dispatch setPost to store a normalized post and a normalized user (the author) at the same time
store.dispatch(setPost({ id: '123', author: { id: '42', name: 'mano' }, text: 'hello!' }));

// using our selector, we can retrieve the regular post entity
selectPost(store.getState(), '123'); // { id: '123', author: { id: '42', name: 'mano' }, text: 'hello!' }
```

The store's state is now

```jsonc
{
  "users": {
    "42": {
      "id": "42",
      "name": "mano"
    }
  },
  "posts": {
    "entities": {
      "123": {
        "id": "123",
        "author": "42",
        "text": "hello!"
      }
    },
    "queries": {
      // ...
    }
  }
}
```

### Real world example

This is an example usage of this library from
[the app folder](./app/slices/comment/queries/get-thread-comments.ts), using
[redux-thunk](https://github.com/reduxjs/redux-thunk).

```ts
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
      dispatch(getThreadCommentsActions.setError(key, error.message));
    }
  };
};
```

## API

[La doc, c'est l'code](./lib).

## Why not using redux toolkit query?

[RTK Query](https://redux-toolkit.js.org/rtk-query) is a great library, but it is also a _big_ library. Using
it to manage an app's state (an app's core logic) would create some tight coupling between the two. This is
something you might want to avoid when you don't need everything that's included in RTK Query.

Plus, it's always good to have multiple options to address the same problem, especially when the options are
opinionated!

## Any question?

Feel free to open an issue :)
