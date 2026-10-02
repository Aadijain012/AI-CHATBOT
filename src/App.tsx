import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import { generateSmartResponse } from './helpers';
import { Conversation, Message, UserProfileData } from './types';
import { GlobeCollection } from './shaders/globe/GlobeCollection';
import './shaders/threeui.css';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'chat'>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfileData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  // ── Conversations: load from localStorage ──────────────────────────────────
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('smartchat_conversations');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [
      {
        id: 'conv-default',
        title: 'Getting Started with SmartChat',
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: 'msg-1',
            sender: 'assistant' as const,
            content:
              "Hello! Welcome to **SmartChat AI**. I'm your interactive conversation assistant. Would you like a math exercise, logical reasoning puzzle, or general knowledge quiz today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
        contextState: { mode: 'idle' },
      },
    ];
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(
    () => conversations[0]?.id || 'conv-default'
  );

  // Persist conversations
  useEffect(() => {
    localStorage.setItem('smartchat_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Restore user session
  useEffect(() => {
    const savedUser = localStorage.getItem('smartchat_user');
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch { /* ignore */ }
    }
  }, []);

  // ── Auth handlers ───────────────────────────────────────────────────────────
  const handleLoginSuccess = (user: UserProfileData) => {
    setCurrentUser(user);
    localStorage.setItem('smartchat_user', JSON.stringify(user));
    setCurrentView('chat');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('smartchat_user');
    setCurrentView('landing');
  };

  // ── Conversation handlers ───────────────────────────────────────────────────
  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      updatedAt: new Date().toISOString(),
      messages: [],
      contextState: { mode: 'idle' },
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
  };

  const handleDeleteConversation = (id: string) => {
    const updated = conversations.filter((c) => c.id !== id);
    setConversations(updated);
    if (activeConversationId === id) {
      if (updated.length > 0) {
        setActiveConversationId(updated[0].id);
      } else {
        const freshId = `conv-${Date.now()}`;
        const freshConv: Conversation = {
          id: freshId,
          title: 'New Conversation',
          updatedAt: new Date().toISOString(),
          messages: [],
          contextState: { mode: 'idle' },
        };
        setConversations([freshConv]);
        setActiveConversationId(freshId);
      }
    }
  };

  const handleClearMessages = () => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [], contextState: { mode: 'idle' } }
          : conv
      )
    );
  };

  // ── Send message ────────────────────────────────────────────────────────────
  const handleSendMessage = (text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: timeStr,
    };

    const currentConv = conversations.find((c) => c.id === activeConversationId);
    const existingMessages = currentConv?.messages || [];
    const currentContext = currentConv?.contextState || { mode: 'idle' };

    let newTitle = currentConv?.title || 'New Conversation';
    if (existingMessages.length === 0 || newTitle === 'New Conversation') {
      newTitle = text.slice(0, 28) + (text.length > 28 ? '...' : '');
    }

    const updatedMessagesWithUser = [...existingMessages, userMsg];

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, title: newTitle, messages: updatedMessagesWithUser, updatedAt: new Date().toISOString() }
          : conv
      )
    );

    setIsThinking(true);

    setTimeout(() => {
      const { responseText, newContext } = generateSmartResponse(
        text,
        updatedMessagesWithUser,
        currentContext
      );

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...updatedMessagesWithUser, aiMsg],
                contextState: newContext,
                updatedAt: new Date().toISOString(),
              }
            : conv
        )
      );

      setIsThinking(false);
    }, 600 + Math.random() * 400);
  };

  // ── Active conversation ─────────────────────────────────────────────────────
  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) ||
    conversations[0] || {
      id: 'fallback',
      title: 'New Conversation',
      messages: [],
      updatedAt: new Date().toISOString(),
      contextState: { mode: 'idle' },
    };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white">

      {currentView === 'landing' && (
        <>
          <Navbar
            onNavigate={(view) => setCurrentView(view)}
            isLoggedIn={!!currentUser}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          <LandingPage onStart={() => setCurrentView(currentUser ? 'chat' : 'login')} />
        </>
      )}

      {currentView === 'login' && (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => setCurrentView('landing')}
        />
      )}

      {currentView === 'chat' && currentUser && (
        <div className="h-screen flex overflow-hidden relative">
          {/* Energy Orb background — behind sidebar + chat window */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <GlobeCollection
              variant="energy-orb"
              speed={1.00}
              scale={1.00}
              smokeScale={1.00}
              smokeStrength={1.00}
              smokeSpeed={1.00}
              hue={0}
              saturation={1.00}
              glow={1.00}
              starDensity={1.00}
              starSpeed={1.00}
              starSize={1.00}
              brightness={1.00}
              opacity={0.45}
            />
          </div>

          <ChatSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            conversations={conversations}
            activeConversationId={activeConversation.id}
            onSelectConversation={(id) => setActiveConversationId(id)}
            onNewChat={handleNewChat}
            onDeleteConversation={handleDeleteConversation}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          <main className="w-full flex flex-col h-full">
            <ChatWindow
              conversation={activeConversation}
              onSendMessage={handleSendMessage}
              onClearMessages={handleClearMessages}
              onOpenSidebar={() => setSidebarOpen(true)}
              isThinking={isThinking}
            />
          </main>
        </div>
      )}
    </div>
  );
}
