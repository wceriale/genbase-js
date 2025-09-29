import { createClient } from '../src';

describe('index', () => {
  describe('createClient', () => {
    it('should create a client and test method should return the input message', () => {
      const privateKey = 'test-private-key';
      const workflowId = 'test-workflow-id';
      const testMessage = 'hello';

      const genbase = createClient(privateKey, workflowId);
      const result = genbase.test(testMessage);

      expect(result).toBe(testMessage);
    });
  });
});
