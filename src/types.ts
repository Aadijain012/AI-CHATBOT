// ─── Shared TypeScript interfaces ───────────────────────────────────────────

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
  contextState?: {
    mode?: 'idle' | 'math_quiz' | 'riddle_quiz' | 'trivia_quiz';
    expectedAnswer?: string;
    stage?: number;
    score?: number;
  };
}

export interface UserProfileData {
  name: string;
  email: string;
  avatarUrl?: string;
  plan: string;
}
