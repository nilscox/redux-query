import { AnyAction } from 'redux';
import { List } from './list-types';
import {
  isPrependAction,
  isAppendAction,
  isInsertAction,
  isRemoveAction,
  isClearAction,
  isAppendManyAction,
} from './list-actions';

export const listReducer = (name: string) => {
  return (state: List = [], action: AnyAction) => {
    if (isPrependAction(name, action)) {
      return [action.id, ...state];
    }

    if (isAppendAction(name, action)) {
      return [...state, action.id];
    }

    if (isAppendManyAction(name, action)) {
      return [...state, ...action.ids];
    }

    if (isInsertAction(name, action)) {
      return [...state.slice(0, action.index), action.id, ...state.slice(action.index + 1)];
    }

    if (isRemoveAction(name, action)) {
      const index = state.indexOf(action.id);

      if (index < 0) {
        console.warn(`Cannot remove element "${action.id}" from list "${name}": element does not exist`);
      }

      return [...state.slice(0, index), ...state.slice(index + 1)];
    }

    if (isClearAction(name, action)) {
      return [];
    }

    return state;
  };
};
