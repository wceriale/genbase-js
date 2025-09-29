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

    it('should support chat completions API', async () => {
      const privateKey = 'test-private-key';
      const workflowId = 'test-workflow-id';

      const genbase = createClient(privateKey, workflowId);

      const completion = await genbase.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'developer', content: 'Talk like a pirate.' },
          { role: 'user', content: 'Are semicolons optional in JavaScript?' },
        ],
      });

      expect(completion).toBeDefined();
      expect(completion.object).toBe('chat.completion');
      expect(completion.model).toBe('gpt-4o');
      expect(completion.choices).toHaveLength(1);
      expect(completion.choices[0].message.role).toBe('assistant');
      expect(completion.choices[0].message.content).toBeDefined();
      expect(completion.choices[0].finish_reason).toBe('stop');
      expect(completion.usage).toBeDefined();
      expect(completion.id).toMatch(/^chatcmpl-/);
    });
  });
});
