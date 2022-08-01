import { createSelectors } from './list-selectors';
import { createListActions } from './list-actions';
import { listReducer } from './list-reducer';
import { List } from './list-types';

export const list = (name: string) => ({
  reducer() {
    return listReducer(name);
  },

  actions() {
    return createListActions(name);
  },

  selectors<State>(selectList: (state: State) => List) {
    return createSelectors(selectList);
  },
});
