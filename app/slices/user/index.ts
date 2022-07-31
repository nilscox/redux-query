import { createNormalizedActions, createNormalizedSelectors, normalized } from 'lib';

import { schemas, selectNormalizedEntities, userSchema } from '../../normalization';
import { User } from '../../types';

type NormalizedUser = User;

export const usersReducer = normalized<NormalizedUser>(schemas, 'user', (state, action) => {
  if (action.type === 'user/set-name') {
    const { userId, name } = action;

    return { ...state, [userId]: { ...state[userId], name } };
  }

  return state;
});

export const { setEntity: setUser } = createNormalizedActions('user');

export const { selectEntity: selectUser, selectEntities: selectUsers } = createNormalizedSelectors(
  selectNormalizedEntities,
  userSchema
);
