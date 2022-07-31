import { denormalize, schema } from 'normalizr';

export const createNormalizedSelectors = <State, Entity>(
  selectNormalizedEntities: (state: State) => Record<string, unknown>,
  schema: schema.Entity
) => ({
  selectEntity(state: State, entityId: string | undefined): Entity | undefined {
    return denormalize(entityId, schema, selectNormalizedEntities(state));
  },
  selectEntities(state: State, entityIds: string[] | undefined): Entity[] {
    return denormalize(entityIds, [schema], selectNormalizedEntities(state));
  },
});
