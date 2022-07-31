import { createNormalizedSelectors } from 'lib';

import { selectNormalizedEntities, threadSchema } from '../../normalization';

export const { selectEntity: selectThread } = createNormalizedSelectors(
  selectNormalizedEntities,
  threadSchema
);
