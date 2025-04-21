import React from 'react'
import Profile from '../Profile/Profile'

const Navbar = ({ onMenuClick, onThemeChange, currentTheme, user, onLogout }) => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <button className="btn btn-ghost" onClick={onMenuClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            className="inline-block w-5 h-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <a className="btn btn-ghost normal-case text-xl">Language Learner</a>
      </div>
      
      <div className="flex-none gap-2">
        <select 
          className="select select-bordered"
          onChange={(e) => onThemeChange(e.target.value)}
          value={currentTheme}
        >
          <option value="pastel">Pastel</option>
          <option value="cupcake">Cupcake</option>
          <option value="lofi">Lo-Fi</option>
        </select>

        {user ? (
          <Profile user={user} onLogout={onLogout} />
        ) : (
          <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
