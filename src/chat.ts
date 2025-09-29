// OpenAI-compatible types
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'developer';
  content: string;
}

export interface ChatCompletionChoice {
  index: number;
  message: ChatMessage;
  finish_reason: 'stop' | 'length' | 'content_filter' | null;
}

export interface ChatCompletionUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatCompletion {
  id: string;
  object: 'chat.completion';
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage?: ChatCompletionUsage;
}

export interface ChatCompletionCreateParams {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string | string[];
  stream?: boolean;
}

export interface ChatCompletions {
  create(params: ChatCompletionCreateParams): Promise<ChatCompletion>;
}

export interface Chat {
  completions: ChatCompletions;
}

export class ChatCompletionsImpl implements ChatCompletions {
  private privateKey: string;
  private workflowId: string;

  constructor(privateKey: string, workflowId: string) {
    this.privateKey = privateKey;
    this.workflowId = workflowId;
  }

  create(params: ChatCompletionCreateParams): Promise<ChatCompletion> {
    // Mock implementation for now - in a real implementation, this would make an API call
    const completion: ChatCompletion = {
      id: `chatcmpl-${Math.random().toString(36).substring(2, 11)}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: params.model,
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content:
              'This is a mock response from the genbase chat completion API.',
          },
          finish_reason: 'stop',
        },
      ],
      usage: {
        prompt_tokens: 20,
        completion_tokens: 12,
        total_tokens: 32,
      },
    };

    return Promise.resolve(completion);
  }
}

export class ChatImpl implements Chat {
  public completions: ChatCompletions;

  constructor(privateKey: string, workflowId: string) {
    this.completions = new ChatCompletionsImpl(privateKey, workflowId);
  }
}
