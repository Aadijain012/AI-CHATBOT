// ─── AI Response Generator ───────────────────────────────────────────────────
// Simulates context-aware, multi-turn conversational AI responses locally.

import { Message, Conversation } from './types';

type ContextState = Conversation['contextState'];

export function generateSmartResponse(
  rawInput: string,
  history: Message[],
  currentContext: ContextState = { mode: 'idle' }
): { responseText: string; newContext: ContextState } {
  const input = rawInput.trim().toLowerCase();
  const ctx = { ...currentContext };

  // ── 1. Active quiz/practice context ──────────────────────────────────────
  if (ctx.mode === 'math_quiz') {
    if (input.includes('stop') || input.includes('exit') || input.includes('cancel')) {
      return {
        responseText:
          "No problem! We've wrapped up the math session. Let me know what you'd like to explore next!",
        newContext: { mode: 'idle' },
      };
    }

    if (ctx.expectedAnswer && input.includes(ctx.expectedAnswer.toLowerCase())) {
      return {
        responseText: `🎉 Spot on! That's correct (${ctx.expectedAnswer}). You nailed it!\n\nReady for another? Try this one: **What is 15 × 8?**`,
        newContext: { mode: 'math_quiz', expectedAnswer: '120', stage: 2 },
      };
    } else if (ctx.stage === 2 && ctx.expectedAnswer === '120' && input.includes('120')) {
      return {
        responseText: `🔥 Excellent! 15 × 8 is indeed **120**! You have sharp mental math skills.\n\nWould you like a third challenge, or would you like to explore logic puzzles or riddles?`,
        newContext: { mode: 'idle' },
      };
    } else {
      return {
        responseText: `Not quite! Give it another shot. (Hint: recalculate step by step, or reply "stop" to finish). What's your answer?`,
        newContext: ctx,
      };
    }
  }

  if (ctx.mode === 'riddle_quiz') {
    if (input.includes('stop') || input.includes('exit')) {
      return {
        responseText: 'Riddle challenge ended! What else can I assist you with?',
        newContext: { mode: 'idle' },
      };
    }
    if (input.includes('towel') || input.includes('sponge')) {
      return {
        responseText: `🎯 Fantastic thinking! A **towel** gets wetter as it dries!\n\nHere's another one: **What has hands but cannot clap?**`,
        newContext: { mode: 'riddle_quiz', expectedAnswer: 'clock', stage: 2 },
      };
    } else if (ctx.stage === 2 && (input.includes('clock') || input.includes('watch'))) {
      return {
        responseText: `🌟 Brilliant! A **clock**! You are a master of riddles.\n\nType **"another riddle"** anytime if you want to keep playing!`,
        newContext: { mode: 'idle' },
      };
    } else {
      return {
        responseText: `Good guess, but not quite! Think about things you use in the bathroom or around the house. Want another try or the answer?`,
        newContext: ctx,
      };
    }
  }

  // ── 2. Practice / Exercise requests ──────────────────────────────────────
  if (input.includes('practice') || input.includes('exercise') || input.includes('quiz')) {
    if (input.includes('math')) {
      return {
        responseText:
          "Great! Let's warm up your arithmetic.\n\n**Question:** What is **25 × 4**?",
        newContext: { mode: 'math_quiz', expectedAnswer: '100', stage: 1 },
      };
    }
    if (input.includes('riddle') || input.includes('logic')) {
      return {
        responseText:
          'Here is a classic teaser:\n\n**Riddle:** What gets wetter and wetter the more it dries?',
        newContext: { mode: 'riddle_quiz', expectedAnswer: 'towel', stage: 1 },
      };
    }
    return {
      responseText:
        'Sure! What type of practice would you like?\n\n• **Math Exercise** (Arithmetic & logic)\n• **Riddle Challenge** (Lateral thinking)\n• **Trivia Quiz** (General science & tech)\n\nJust reply with your choice!',
      newContext: { mode: 'idle' },
    };
  }

  // ── 3. Inline math expressions (e.g. "45 * 2", "12 + 88") ───────────────
  const mathRegex = /(\d+)\s*([\+\-\*\/])\s*(\d+)/;
  const match = input.match(mathRegex);
  if (match) {
    const a = parseFloat(match[1]);
    const op = match[2];
    const b = parseFloat(match[3]);
    let result = 0;
    if (op === '+') result = a + b;
    if (op === '-') result = a - b;
    if (op === '*') result = a * b;
    if (op === '/') result = b !== 0 ? Math.round((a / b) * 100) / 100 : Infinity;

    return {
      responseText: `The result of **${a} ${op} ${b}** is **${result}**. Let me know if you need step-by-step working!`,
      newContext: { mode: 'idle' },
    };
  }

  // ── 4. Weather queries ────────────────────────────────────────────────────
  if (input.includes('weather') || input.includes('rain') || input.includes('forecast')) {
    return {
      responseText:
        "While I don't have direct satellite radar connected in this preview, here is a general tip: if skies are overcast, carrying a compact umbrella and wearing water-resistant footwear will keep you prepared! If you're planning outdoor activities, morning is usually the clearest window. Is there a specific region you're curious about?",
      newContext: { mode: 'idle' },
    };
  }

  // ── 5. Greetings & small talk ─────────────────────────────────────────────
  if (/^(hi|hello|hey|greetings|good day|sup)\b/i.test(input)) {
    return {
      responseText:
        "Hello there! Welcome to **SmartChat AI**. I'm ready to help you brainstorm, calculate, practice exercises, or answer queries. What's on your agenda today?",
      newContext: { mode: 'idle' },
    };
  }

  // ── 6. Quantum computing ──────────────────────────────────────────────────
  if (input.includes('quantum') && input.includes('computing')) {
    return {
      responseText:
        "Here is quantum computing in plain terms:\n\n1. **Classical computers** use bits that are either **0 or 1** (like a regular light switch).\n2. **Quantum computers** use **qubits**, which can be 0, 1, or both at the same time thanks to *superposition* (like a spinning coin).\n3. Because of this and *entanglement*, they can evaluate millions of possibilities concurrently—revolutionary for cryptography, drug discovery, and logistics!",
      newContext: { mode: 'idle' },
    };
  }

  // ── 7. Productivity tip ───────────────────────────────────────────────────
  if (input.includes('productivity') || input.includes('tip') || input.includes('focus')) {
    return {
      responseText:
        "Here is a high-impact productivity method: **The 2-Minute Rule + Pomodoro**:\n\n• If a task takes less than 2 minutes, do it right now.\n• For deep work, dedicate a 25-minute sprint with all notifications muted, followed by a mandatory 5-minute stretch.\n\nTry it for your next work block!",
      newContext: { mode: 'idle' },
    };
  }

  // ── 8. Help / Capabilities ────────────────────────────────────────────────
  if (
    input.includes('help') ||
    input.includes('what can you do') ||
    input.includes('features')
  ) {
    return {
      responseText:
        "Here are some things we can do together:\n\n• **Adaptive Exercises:** Ask for a math challenge or riddle.\n• **Quick Math:** Try typing `144 / 12` or `25 * 18`.\n• **Explanations:** Ask me to simplify complex concepts.\n• **Writing & Coding:** Generate snippets, refine text, or outline projects.\n\nGive one a spin!",
      newContext: { mode: 'idle' },
    };
  }

  // ── 9. Default fallback ───────────────────────────────────────────────────
  return {
    responseText: `I hear you regarding "${rawInput}". As an intelligent conversation assistant, I can break this down further, generate practical solutions, or offer related practice questions. What angle would you like to explore?`,
    newContext: { mode: 'idle' },
  };
}
