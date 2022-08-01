import { AnyAction } from 'redux';

export type PrependAction = {
  type: `list/${string}/prepend`;
  id: string;
};

export const isPrependAction = (name: string, action: AnyAction): action is PrependAction => {
  return action.type === `list/${name}/prepend`;
};

export type AppendAction = {
  type: `list/${string}/append`;
  id: string;
};

export const isAppendAction = (name: string, action: AnyAction): action is AppendAction => {
  return action.type === `list/${name}/append`;
};

export type AppendManyAction = {
  type: `list/${string}/append-many`;
  ids: string[];
};

export const isAppendManyAction = (name: string, action: AnyAction): action is AppendManyAction => {
  return action.type === `list/${name}/append-many`;
};

export type InsertAction = {
  type: `list/${string}/insert`;
  id: string;
  index: number;
};

export const isInsertAction = (name: string, action: AnyAction): action is InsertAction => {
  return action.type === `list/${name}/insert`;
};

export type RemoveAction = {
  type: `list/${string}/remove`;
  id: string;
};

export const isRemoveAction = (name: string, action: AnyAction): action is RemoveAction => {
  return action.type === `list/${name}/remove`;
};

export type ClearAction = {
  type: `list/${string}/clear`;
};

export const isClearAction = (name: string, action: AnyAction): action is ClearAction => {
  return action.type === `list/${name}/clear`;
};

export const createListActions = (name: string) => ({
  prepend(id: string): PrependAction {
    return {
      type: `list/${name}/prepend`,
      id,
    };
  },

  append(id: string): AppendAction {
    return {
      type: `list/${name}/append`,
      id,
    };
  },

  appendMany(ids: string[]): AppendManyAction {
    return {
      type: `list/${name}/append-many`,
      ids,
    };
  },

  insert(id: string, index: number): InsertAction {
    return {
      type: `list/${name}/insert`,
      id,
      index,
    };
  },

  remove(id: string): RemoveAction {
    return {
      type: `list/${name}/remove`,
      id,
    };
  },

  clear(): ClearAction {
    return {
      type: `list/${name}/clear`,
    };
  },
});
