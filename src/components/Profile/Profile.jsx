import React, { useState } from 'react'
import { 
  UserCircleIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

const Profile = ({ user, onLogout }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        {user.avatar ? (
          <div className="w-10 rounded-full">
            <img src={user.avatar} alt="profile" />
          </div>
        ) : (
          <UserCircleIcon className="h-8 w-8" />
        )}
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <div className="px-4 py-3 border-b">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm opacity-70">{user.email}</p>
        </div>
        <li>
          <a className="py-2">
            <AcademicCapIcon className="h-4 w-4" />
            My Learning
          </a>
        </li>
        <li>
          <a className="py-2">
            <ChartBarIcon className="h-4 w-4" />
            Progress
          </a>
        </li>
        <li>
          <a className="py-2">
            <CogIcon className="h-4 w-4" />
            Settings
          </a>
        </li>
        <li>
          <button onClick={onLogout} className="py-2 text-error">
            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Profile 