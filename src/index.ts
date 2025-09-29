import { Chat, ChatImpl } from './chat';

interface GenbaseClient {
  test(message: string): string;
  chat: Chat;
}

class GenbaseClientImpl implements GenbaseClient {
  private privateKey: string;
  private workflowId: string;
  public chat: Chat;

  constructor(privateKey: string, workflowId: string) {
    this.privateKey = privateKey;
    this.workflowId = workflowId;
    this.chat = new ChatImpl(privateKey, workflowId);
  }

  test(message: string): string {
    return message;
  }
}

export const createClient = (
  privateKey: string,
  workflowId: string
): GenbaseClient => {
  return new GenbaseClientImpl(privateKey, workflowId);
};
