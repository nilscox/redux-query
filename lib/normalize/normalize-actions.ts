import { AnyAction } from 'redux';
import { Id } from './normalize-types';

export type SetEntityAction<E> = {
  type: `${string}/set-entity`;
  entity: E;
};

export const isSetEntityAction = <E>(name: string, action: AnyAction): action is SetEntityAction<E> => {
  return action.type === `${name}/set-entity`;
};

export type SetEntitiesAction<E> = {
  type: `${string}/set-entities`;
  entities: E[];
};

export const isSetEntitiesAction = <E>(name: string, action: AnyAction): action is SetEntitiesAction<E> => {
  return action.type === `${name}/set-entities`;
};

export type UpdateEntityAction<E> = {
  type: `${string}/update-entity`;
  id: Id;
  changes: Partial<E>;
};

export const isUpdateEntityAction = <E>(name: string, action: AnyAction): action is UpdateEntityAction<E> => {
  return action.type === `${name}/update-entity`;
};

export const createNormalizedActions = <E>(name: string) => ({
  setEntity(entity: E): SetEntityAction<E> {
    return {
      type: `${name}/set-entity`,
      entity,
    };
  },

  setEntities(entities: E[]): SetEntitiesAction<E> {
    return {
      type: `${name}/set-entities`,
      entities,
    };
  },

  updateEntity(id: Id, changes: Partial<E>): UpdateEntityAction<E> {
    return {
      type: `${name}/update-entity`,
      id,
      changes,
    };
  },
});
