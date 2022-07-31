import { createNormalizedSelectors } from 'lib';

import { commentSchema, selectNormalizedEntities } from '../../normalization';

export const { selectEntity: selectComment, selectEntities: selectComments } = createNormalizedSelectors(
  selectNormalizedEntities,
  commentSchema
);
