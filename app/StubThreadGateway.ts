import { Comment, Thread, ThreadGateway, User } from './types';

export class StubThreadGateway implements ThreadGateway {
  private nils: User = { id: 'u1', name: 'nils' };
  private tom: User = { id: 'u2', name: 'tom' };

  private comments: Comment[] = [
    {
      id: 'c1',
      text: 'Yes.',
      author: this.nils,
      replies: [
        {
          id: 'c3',
          author: this.tom,
          text: 'What makes you think that?',
        },
      ],
    },
    {
      id: 'c2',
      text: 'No, because we can dig in it very deep.',
      author: this.tom,
    },
  ];

  private thread: Thread = {
    id: 't1',
    author: this.nils,
    text: 'Is the earth flat?',
    comments: this.comments,
  };

  async fetchThread(threadId: string): Promise<Thread | undefined> {
    if (threadId !== this.thread.id) {
      return;
    }

    return this.thread;
  }

  async fetchThreadComments(threadId: string, sort: string): Promise<Comment[]> {
    if (threadId !== this.thread.id) {
      return [];
    }

    if (sort === 'date') {
      return this.comments.slice().reverse();
    }

    return this.comments;
  }
}
