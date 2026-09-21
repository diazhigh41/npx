"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Send, Trash2 } from "lucide-react";

export default function MessagesPage() {
  // Data chat sesuai persis dengan screenshot aslinya
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Admin",
      preview: "Adorable animals photo pack",
      time: "3 days ago",
      avatar: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/profile_300x300_68b1aede09f500-26161786.webp",
      status: "Offline",
      messages: [
        { sender: "them", text: "hi", time: "10 days ago" },
        { sender: "me", text: "Hello", time: "9 days ago" },
        { sender: "them", text: "hi", time: "3 days ago" },
      ]
    },
    {
      id: 2,
      name: "Admin",
      preview: "Modern grey couch and pillows",
      time: "13 days ago",
      avatar: "https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/profile_300x300_68b1aede09f500-26161786.webp",
      status: "Offline",
      messages: [
        { sender: "them", text: "Available?", time: "13 days ago" },
        { sender: "me", text: "Sold out.", time: "13 days ago" },
      ]
    }
  ]);

  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeChat = chats.find(c => c.id === selectedChatId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChatId) return;

    setChats(chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          preview: messageInput,
          time: "Just now",
          messages: [...chat.messages, { sender: "me", text: messageInput, time: "Just now" }]
        };
      }
      return chat;
    }));

    setMessageInput("");
  };

  const handleDeleteChat = () => {
    if (!selectedChatId) return;
    setChats(chats.filter(c => c.id !== selectedChatId));
    setSelectedChatId(null);
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumb persis aslinya */}
      <div className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link> / <span className="text-gray-900 font-normal">Messages</span>
      </div>

      {/* Container Utama */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* ================= SIDEBAR KIRI ================= */}
        <div className="lg:col-span-4 border-r border-gray-200 flex flex-col bg-white">
          
          {/* Profil User (Peter Jone) */}
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://odykmbdferwvcgtxzzpe.supabase.co/storage/v1/object/public/products/profile_300x300_68b9697dcac325-71870421.webp" 
                alt="Peter Jone" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Peter Jone</h3>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Section Recent Chats */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            <div className="px-4 py-2.5 text-xs font-medium text-gray-500">
              Recent Chats
            </div>

            {filteredChats.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${
                  selectedChatId === chat.id ? "bg-gray-50" : "hover:bg-gray-50/50"
                }`}
              >
                <img 
                  src={chat.avatar} 
                  alt={chat.name} 
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs">{chat.name}</h4>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{chat.preview}</p>
                  <span className="text-[11px] text-gray-400 mt-1 block">{chat.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= AREA KANAN ================= */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          
          {selectedChatId && activeChat ? (
            <>
              {/* Header Chat yang Dipilih */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-gray-900 text-sm">{activeChat.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
                    <span>{activeChat.status}</span>
                  </div>
                  <p className="text-xs text-gray-600 pt-0.5">{activeChat.preview}</p>
                </div>

                <button 
                  onClick={handleDeleteChat}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Chat"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Riwayat Chat Bubbles */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
                {activeChat.messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex items-end gap-2.5 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "them" && (
                      <img src={activeChat.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover shrink-0 mb-1" />
                    )}

                    <div className={`space-y-0.5 max-w-md ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                      <div className={`inline-block px-3.5 py-2 rounded-lg text-xs ${
                        msg.sender === "me" 
                          ? "bg-indigo-600 text-white" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="block text-[10px] text-gray-400">{msg.time}</span>
                    </div>

                    {msg.sender === "me" && (
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" alt="Avatar" className="w-7 h-7 rounded-full object-cover shrink-0 mb-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Input Kirim Pesan di Bawah */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white flex items-center gap-3">
                <input 
                  type="text" 
                  placeholder="Write a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
                <button 
                  type="submit"
                  className="text-gray-600 hover:text-teal-600 p-2.5 transition-colors cursor-pointer shrink-0"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          ) : (
            /* Tampilan Awal Sebelum Chat Dipilih (Persis Screenshot 1) */
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-3 rounded-full text-xs font-medium shadow-2xs">
                Select a chat to start messaging
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}