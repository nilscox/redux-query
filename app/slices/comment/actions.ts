import { createNormalizedActions } from 'lib';

export const {
  setEntity: setComment,
  setEntities: setComments,
  updateEntity: updateComment,
} = createNormalizedActions('comment');

export const setCommentText = (commentId: string, text: string) => {
  return updateComment(commentId, { text });
};
