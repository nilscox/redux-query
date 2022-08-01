import { List } from './list-types';

export const createSelectors = <State>(selectList: (state: State) => List) => ({
  selectAll(state: State) {
    return selectList(state);
  },

  selectOne(state: State, index: number) {
    return selectList(state)[index];
  },
});
