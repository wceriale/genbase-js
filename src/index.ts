interface GenbaseClient {
  test(message: string): string;
}

class GenbaseClientImpl implements GenbaseClient {
  private privateKey: string;
  private workflowId: string;

  constructor(privateKey: string, workflowId: string) {
    this.privateKey = privateKey;
    this.workflowId = workflowId;
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
