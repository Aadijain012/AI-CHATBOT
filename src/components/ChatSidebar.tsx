import React from 'react';
import { Sparkles, Plus, MessageSquare, Trash2, X, LogOut } from 'lucide-react';
import { Conversation, UserProfileData } from '../types';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  currentUser: UserProfileData;
  onLogout: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  currentUser,
  onLogout,
}) => {
  return (
    <>
      {/* Backdrop — all screen sizes */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-black/70 backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & close */}
        <div className="h-16 px-4 border-b border-slate-800/60 flex items-center justify-between bg-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base tracking-tight">SmartChat AI</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-3">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-sm font-medium flex items-center justify-center gap-2 transition-all group"
          >
            <Plus className="w-4 h-4 text-indigo-400 group-hover:rotate-90 transition-transform" />
            <span>New Conversation</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 px-2 py-1">
            Recent Conversations
          </div>

          {conversations.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 px-2">
              No conversations yet. Hit "New Conversation" to start chatting!
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <MessageSquare
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isActive ? 'text-indigo-400' : 'text-slate-500'
                      }`}
                    />
                    <span className="truncate">{conv.title || 'Untitled Chat'}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-slate-500 rounded transition-opacity"
                    title="Delete Chat"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-slate-800/60 bg-slate-900/40 backdrop-blur-sm">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700/50 transition-colors ml-1"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
