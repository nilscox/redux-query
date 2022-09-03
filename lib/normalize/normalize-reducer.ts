import { normalize } from 'normalizr';
import { AnyAction, Reducer } from 'redux';

import { isClearReduxQueryAction } from '../utils/clear-redux-query';

import {
  isSetEntitiesAction,
  isSetEntityAction,
  isUpdateEntityAction,
  UpdateEntityAction,
} from './normalize-actions';
import { Schemas } from './normalize-types';

export class EntityNotFoundError extends Error {
  constructor(
    public readonly action: UpdateEntityAction<unknown>,
    public readonly name: string,
    public readonly state: Record<string, unknown>,
    public readonly schemas: Schemas
  ) {
    super(`${action.type}: ${name} entity with id ${action.id} does not exist`);
  }
}

export const normalized = <E>(
  schemas: Schemas,
  name: string,
  defaultReducer?: (state: Record<string, E>, action: AnyAction) => Record<string, E>
) => {
  const getNormalized = (state: Record<string, E>, action: AnyAction) => {
    for (const key in schemas) {
      if (isSetEntityAction(key, action)) {
        return normalize(action.entity, schemas[key]!);
      }

      if (isSetEntitiesAction(key, action)) {
        return normalize(action.entities, [schemas[key]!]);
      }
    }

    if (isUpdateEntityAction(name, action)) {
      const entity = state[action.id];

      if (!entity) {
        throw new EntityNotFoundError(action, name, state, schemas);
      }

      return normalize({ ...entity, ...action.changes }, schemas[name]!);
    }
  };

  const reducer: Reducer<Record<string, E>> = (state = {}, action) => {
    if (isClearReduxQueryAction(action)) {
      return {};
    }

    const normalized = getNormalized(state, action);

    if (normalized?.entities[name]) {
      return { ...state, ...normalized.entities[name] };
    }

    if (defaultReducer) {
      return defaultReducer(state, action);
    }

    return state;
  };

  return reducer;
};
