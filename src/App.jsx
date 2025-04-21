import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Navbar from './components/Navigation/Navbar.jsx'
import ChatInterface from './components/ChatInterface/ChatInterface.jsx'
import VoiceInput from './components/VoiceInput/VoiceInput.jsx'
import LessonCards from './components/LessonCards/LessonCards.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Home from './components/Home/Home'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentTheme, setCurrentTheme] = useState('pastel')
  const [activeComponent, setActiveComponent] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'pastel'
    setCurrentTheme(savedTheme)
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const renderMainContent = () => {
    switch(activeComponent) {
      case 'dashboard':
        return <Dashboard />
      case 'lessons':
        return <LessonCards />
      case 'chat':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChatInterface />
            <VoiceInput onTranscriptionComplete={(text) => console.log(text)} />
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  const renderAuthPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />
      case 'signup':
        return <Signup onSignup={handleLogin} onSwitchToLogin={() => setCurrentPage('login')} />
      case 'home':
        return <Home 
          onLogin={() => setCurrentPage('login')} 
          onSignup={() => setCurrentPage('signup')} 
        />
      default:
        return <Home 
          onLogin={() => setCurrentPage('login')} 
          onSignup={() => setCurrentPage('signup')} 
        />
    }
  }

  if (!user) {
    return renderAuthPage()
  }

  return (
    <div className="min-h-screen bg-base-100" data-theme={currentTheme}>
      <Navbar 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onThemeChange={setCurrentTheme}
        currentTheme={currentTheme}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onNavigate={setActiveComponent}
          activeComponent={activeComponent}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="container mx-auto space-y-6">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App 