export type User = {
  id: string;
  name: string;
};

export type Comment = {
  id: string;
  author: User;
  text: string;
  replies?: Comment[];
};

export type Thread = {
  id: string;
  author: User;
  text: string;
  comments: Comment[];
};

export interface ThreadGateway {
  fetchThread(threadId: string): Promise<Thread | undefined>;
  fetchThreadComments(threadId: string, sort: string): Promise<Comment[]>;
}

export type Dependencies = {
  threadGateway: ThreadGateway;
};
