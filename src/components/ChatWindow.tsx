import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Bot,
  User,
  RotateCcw,
  Check,
  Copy,
  Send,
  ArrowRight,
} from 'lucide-react';
import { Conversation } from '../types';
import { QUICK_PROMPTS } from '../constants';

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (text: string) => void;
  onClearMessages: () => void;
  onOpenSidebar: () => void;
  isThinking: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  onSendMessage,
  onClearMessages,
  onOpenSidebar,
  isThinking,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages, isThinking]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!inputText.trim() || isThinking) return;
    onSendMessage(inputText);
    setInputText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent text-slate-100 overflow-hidden relative" style={{ zIndex: 1 }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="h-16 border-b border-slate-700/50 bg-slate-900/40 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 text-white/50 hover:text-white rounded-lg transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-semibold text-white">
              {conversation.title || 'SmartChat Assistant'}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SmartChat v2.5 Contextual</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {conversation.messages.length > 0 && (
            <button
              onClick={onClearMessages}
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              title="Clear all messages"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Messages ───────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-transparent">
        {conversation.messages.length === 0 ? (
          /* Empty state */
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-12 px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 mb-6">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Welcome to SmartChat AI!</h3>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              I can assist with calculations, answer conceptual questions, guide you through
              interactive puzzles, or write structured responses.
            </p>

            <div className="w-full text-left space-y-2.5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Suggested Prompts
              </div>
              {QUICK_PROMPTS.slice(0, 4).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(prompt)}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/60 hover:border-indigo-500/50 hover:bg-slate-800/60 text-xs sm:text-sm text-slate-300 transition-all flex items-center justify-between group"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          conversation.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 max-w-3xl ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md ${
                    isUser
                      ? 'bg-slate-700 text-slate-200'
                      : 'bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className="relative group max-w-[85%] sm:max-w-xl">
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/20'
                        : 'bg-slate-900/60 backdrop-blur-sm border border-slate-700/60 text-slate-200 rounded-tl-sm shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                    <div
                      className={`text-[10px] mt-2 flex items-center gap-2 ${
                        isUser ? 'text-indigo-200 justify-end' : 'text-slate-500 justify-start'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-300 inline-flex items-center gap-1"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {isThinking && (
          <div className="flex gap-3 sm:gap-4 max-w-3xl mr-auto items-end">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-700/60 rounded-tl-sm shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ─────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 border-t border-slate-700/50 bg-slate-900/40 backdrop-blur-xl flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all p-2 flex items-end gap-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or request a practice problem..."
              className="flex-1 bg-transparent border-0 text-white placeholder-slate-400 text-sm focus:outline-none resize-none px-3 py-1.5 max-h-36 overflow-y-auto"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isThinking}
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
                inputText.trim() && !isThinking
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
              }`}
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-3">
            <span>
              Press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                Enter
              </kbd>{' '}
              to send,{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                Shift + Enter
              </kbd>{' '}
              for newline
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
