import React, { useState } from 'react'
import { 
  UserIcon,
  EnvelopeIcon, 
  LockClosedIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSignup({ email, name })
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Create Account</h2>
          
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <div className="input-group">
                <span className="bg-base-200 px-4 flex items-center">
                  <UserIcon className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="input-group">
                <span className="bg-base-200 px-4 flex items-center">
                  <EnvelopeIcon className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="input-group">
                <span className="bg-base-200 px-4 flex items-center">
                  <LockClosedIcon className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Creating account...' : (
                <>
                  Sign up
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="btn btn-outline w-full">
            Sign up with Google
          </button>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <button 
              onClick={onSwitchToLogin}
              className="link link-primary"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup