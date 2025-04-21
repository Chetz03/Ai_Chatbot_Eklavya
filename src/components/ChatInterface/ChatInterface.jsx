import React, { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputText.trim() || isProcessing) return

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, newMessage])
    setInputText('')
    setIsProcessing(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: "I understood your message. Let's continue practicing!",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <div className="card bg-base-100 shadow-lg h-[600px] flex flex-col">
      <div className="card-body p-0 flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="card-title">Chat Practice</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} 
              className={`chat ${message.sender === 'user' ? 'chat-end' : 'chat-start'}`}
            >
              <div className={`chat-bubble ${
                message.sender === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'
              }`}>
                {message.text}
              </div>
              <div className="chat-footer opacity-50 text-xs">
                {message.timestamp}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-center">
              <span className="loading loading-dots loading-md"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..." 
              className="input input-bordered flex-1"
              disabled={isProcessing}
            />
            <button 
              className="btn btn-primary"
              onClick={handleSend}
              disabled={!inputText.trim() || isProcessing}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface 