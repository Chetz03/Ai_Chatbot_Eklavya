import React from 'react'
import { 
  HomeIcon, 
  BookOpenIcon, 
  ChatBubbleLeftIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline'

const Sidebar = ({ isOpen, onNavigate, activeComponent }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'lessons', name: 'Lessons', icon: BookOpenIcon },
    { id: 'chat', name: 'Practice', icon: ChatBubbleLeftIcon },
  ]

  return (
    <div className={`
      ${isOpen ? 'w-64' : 'w-0'} 
      transition-all duration-300 ease-in-out
      min-h-screen bg-base-200 shadow-lg overflow-hidden
    `}>
      <div className="p-4">
        <ul className="menu menu-vertical gap-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button 
                className={`flex items-center gap-2 p-3 rounded-lg
                  ${activeComponent === item.id ? 'bg-primary/10 text-primary' : ''}
                  hover:bg-primary/5 transition-colors`}
                onClick={() => onNavigate(item.id)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar 