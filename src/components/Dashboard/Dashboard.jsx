import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, AcademicCapIcon, FireIcon } from '@heroicons/react/24/solid'

const topics = [
  { name: 'Basic Conversations', completed: true },
  { name: 'Grammar Fundamentals', completed: true }, 
  { name: 'Vocabulary Building', completed: false },
  { name: 'Advanced Speaking', completed: false }
]

const levels = {
  beginner: 'Completed',
  intermediate: 'In Progress',
  advanced: 'Locked'
}

const calculateTotalScore = (scores) => {
  return Math.round((scores.reduce((a, b) => a + b, 0) / (scores.length * 100)) * 100)
}

const Dashboard = () => {
  const [scores, setScores] = useState({
    grammar: 89,
    vocabulary: 75,
    speaking: 92
  })

  const [streak, setStreak] = useState(7)

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title">Learning Progress</h2>
          <div className="flex items-center gap-2">
            <FireIcon className="h-6 w-6 text-error" />
            <span className="font-bold">{streak} Day Streak!</span>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title flex items-center gap-2">
              Grammar Score
              <CheckCircleIcon className="h-5 w-5 text-success" />
            </div>
            <div className="stat-value">{scores.grammar}%</div>
            <progress 
              className="progress progress-primary" 
              value={scores.grammar} 
              max="100"
            />
          </div>

          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title">Vocabulary</div>
            <div className="stat-value">{scores.vocabulary}%</div>
            <progress 
              className="progress progress-secondary" 
              value={scores.vocabulary} 
              max="100"
            />
          </div>

          <div className="stat bg-base-200 rounded-box p-4">
            <div className="stat-title">Speaking</div>
            <div className="stat-value">{scores.speaking}%</div>
            <progress 
              className="progress progress-accent" 
              value={scores.speaking} 
              max="100"
            />
          </div>
        </div>

        {/* Topics Progress */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">Topics Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                <CheckCircleIcon 
                  className={`h-6 w-6 ${
                    topic.completed ? 'text-success' : 'text-base-300'
                  }`} 
                />
                <span>{topic.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level Progress */}
        <div>
          <h3 className="text-lg font-bold mb-3">Level Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(levels).map(([level, status], index) => (
              <div key={level} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                <AcademicCapIcon className={`h-6 w-6 ${
                  status === 'Completed' ? 'text-success' :
                  status === 'In Progress' ? 'text-warning' : 'text-base-300'
                }`} />
                <div>
                  <div className="font-semibold capitalize">{level}</div>
                  <div className="text-sm opacity-70">{status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Score */}
        <div className="mt-6 text-center">
          <div className="text-sm opacity-70">Total Progress</div>
          <div className="text-2xl font-bold">
            {calculateTotalScore([scores.grammar, scores.vocabulary, scores.speaking])}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
