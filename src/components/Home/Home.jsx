import React from 'react'
import { 
  MicrophoneIcon, 
  ChatBubbleBottomCenterTextIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

// Animated floating shapes
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>
  )
}

const Home = ({ onLogin, onSignup }) => {
  const features = [
    {
      icon: MicrophoneIcon,
      title: "Real-time Voice Recognition",
      description: "Practice pronunciation with instant feedback and accuracy scoring."
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: "AI Conversation Partner",
      description: "Engage in natural conversations with our AI language partner."
    },
    {
      icon: AcademicCapIcon,
      title: "Personalized Learning",
      description: "Adaptive lessons tailored to your skill level and goals."
    },
    {
      icon: ChartBarIcon,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics and insights."
    }
  ]

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Language Learner",
      content: "This app has transformed how I learn languages. The AI conversations feel so natural!",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael R.",
      role: "Business Professional",
      content: "Perfect for improving my business English. The pronunciation feedback is invaluable.",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Watermark */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <GlobeAltIcon className="w-full h-full text-primary" />
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section with Animation */}
        <div className="hero min-h-screen bg-gradient-to-br from-base-100/50 to-base-200/50 backdrop-blur-sm">
          <div className="hero-content text-center">
            <div className="max-w-3xl">
              <div className="inline-block animate-bounce mb-8">
                <SparklesIcon className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Master Any Language with AI
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Experience the future of language learning with our AI-powered platform.
                Practice speaking, improve pronunciation, and gain confidence through
                natural conversations.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  className="btn btn-primary btn-lg glass hover:glass-0 transition-all duration-300"
                  onClick={onSignup}
                >
                  Get Started Free
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
                <button 
                  className="btn btn-outline btn-lg hover:glass transition-all duration-300"
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section with Cards */}
        <section className="py-20 px-6 bg-gradient-to-b from-base-100/50 to-base-200/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-center mb-12 text-lg opacity-70">
              Unlock your potential with our innovative features
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} 
                  className="card bg-base-100/50 backdrop-blur-sm shadow-lg hover:shadow-xl 
                    transition-all duration-300 hover:-translate-y-2 border border-primary/10"
                >
                  <div className="card-body items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="card-title">{feature.title}</h3>
                    <p className="opacity-70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section with Animation */}
        <section className="py-20 px-6 bg-gradient-to-t from-base-200/50 to-base-100/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              How It Works
            </h2>
            <p className="text-center mb-12 text-lg opacity-70">
              Start your journey in just a few simple steps
            </p>
            <div className="steps steps-vertical lg:steps-horizontal">
              <div className="step step-primary">Create Account</div>
              <div className="step step-primary">Choose Your Level</div>
              <div className="step step-primary">Start Learning</div>
              <div className="step">Track Progress</div>
            </div>
          </div>
        </section>

        {/* Testimonials with Hover Effects */}
        <section className="py-20 px-6 bg-gradient-to-b from-base-100/50 to-base-200/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              What Our Users Say
            </h2>
            <p className="text-center mb-12 text-lg opacity-70">
              Join thousands of satisfied learners
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} 
                  className="card bg-base-100/50 backdrop-blur-sm shadow-lg hover:shadow-xl 
                    transition-all duration-300 hover:-translate-y-1 border border-primary/10"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={testimonial.avatar} alt={testimonial.name} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm opacity-70">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic">{testimonial.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section with Gradient Cards */}
        <section className="py-20 px-6 bg-gradient-to-t from-base-200/50 to-base-100/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-center mb-12 text-lg opacity-70">
              Choose the plan that fits your needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title">Free</h3>
                  <p className="text-3xl font-bold">$0<span className="text-sm font-normal">/month</span></p>
                  <ul className="my-4 space-y-2">
                    {['Basic conversations', 'Limited exercises', 'Community support'].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-5 w-5 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-outline w-full">Get Started</button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="card bg-primary text-primary-content shadow-lg">
                <div className="card-body">
                  <h3 className="card-title">Pro</h3>
                  <p className="text-3xl font-bold">$15<span className="text-sm font-normal">/month</span></p>
                  <ul className="my-4 space-y-2">
                    {[
                      'Unlimited conversations',
                      'All exercises',
                      'Priority support',
                      'Progress tracking',
                      'Custom learning path'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-5 w-5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-secondary w-full">Choose Pro</button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title">Enterprise</h3>
                  <p className="text-3xl font-bold">Custom</p>
                  <ul className="my-4 space-y-2">
                    {[
                      'Everything in Pro',
                      'Custom integrations',
                      'Dedicated support',
                      'Team management'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-5 w-5 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-outline w-full">Contact Us</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section with Gradient Background */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Language Learning Journey?
            </h2>
            <p className="mb-8 text-lg opacity-70">
              Join thousands of learners who are already improving their language skills.
            </p>
            <button 
              className="btn btn-primary btn-lg glass hover:glass-0 transition-all duration-300"
              onClick={onSignup}
            >
              Get Started Now
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </section>

        {/* Footer with Gradient */}
        <footer className="footer footer-center p-10 bg-gradient-to-b from-base-200/50 to-base-300/50 text-base-content">
          <div>
            <GlobeAltIcon className="h-10 w-10 text-primary mb-4" />
            <p className="font-bold">
              Language Learning App <br/>
              Providing reliable language education since 2024
            </p>
            <p>Copyright © 2024 - All rights reserved</p>
          </div>
          <div>
            <div className="grid grid-flow-col gap-4">
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Privacy Policy</a>
              <a className="link link-hover">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home 