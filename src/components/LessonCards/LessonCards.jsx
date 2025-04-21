import React, { useState, useEffect, useCallback } from 'react'
import { 
  BookOpenIcon, 
  ClockIcon, 
  StarIcon, 
  MagnifyingGlassIcon,
  HeartIcon,
  BookmarkIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
const BookmarkButton = ({ isBookmarked, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="absolute top-4 right-4 p-2 rounded-full hover:bg-base-200 transition-colors"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <BookmarkIcon 
        className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''}`} 
      />
    </button>
  )
}


const lessons = [
  {
    id: 1,
    title: 'Basic Grammar',
    description: 'Learn fundamental grammar rules and sentence structures',
    type: 'grammar',
    level: 'Beginner',
    duration: '30 min',
    tags: ['basics', 'grammar', 'essential'],
    rating: 4.5,
    completionRate: 85,
    isNew: true
  },
  {
    id: 2,
    title: 'Daily Conversations',
    description: 'Practice common everyday conversations and phrases',
    type: 'speaking',
    level: 'Intermediate',
    duration: '45 min',
    tags: ['speaking', 'practical', 'daily'],
    rating: 4.8,
    completionRate: 92,
    isNew: false
  },
  {
    id: 3,
    title: 'Business English',
    description: 'Professional vocabulary and email writing',
    type: 'vocabulary',
    level: 'Advanced',
    duration: '60 min',
    tags: ['business', 'professional', 'email'],
    rating: 4.6,
    completionRate: 78,
    isNew: true
  },
  {
    id: 4,
    title: 'Pronunciation Practice',
    description: 'Master difficult sounds and word stress',
    type: 'pronunciation',
    level: 'Intermediate',
    duration: '25 min',
    tags: ['speaking', 'pronunciation', 'accent'],
    rating: 4.7,
    completionRate: 88,
    isNew: false
  }
]

const LessonCards = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [favorites, setFavorites] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [activeLesson, setActiveLesson] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const loadSavedState = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
      const savedRecent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
      
      setFavorites(savedFavorites)
      setBookmarks(savedBookmarks)
      setRecentlyViewed(savedRecent)
    }

    loadSavedState()
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
  }, [favorites, bookmarks, recentlyViewed])

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term)
      setLoading(false)
    }, 500),
    []
  )

  const handleSearchChange = (e) => {
    setLoading(true)
    debouncedSearch(e.target.value)
  }

  const toggleFavorite = (lessonId) => {
    setFavorites(prev => 
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    )
  }

  const toggleBookmark = (lessonId) => {
    setBookmarks(prev => 
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    )
  }

  const handleLessonStart = (lesson) => {
    setActiveLesson(lesson)
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== lesson.id)
      return [lesson.id, ...filtered].slice(0, 5)
    })
    // Show modal or navigate to lesson
    document.getElementById(`lesson-modal-${lesson.id}`).showModal()
  }

  const filterLessons = () => {
    return lessons
      .filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesLevel = selectedLevel === 'all' || lesson.level.toLowerCase() === selectedLevel
        const matchesType = selectedType === 'all' || lesson.type === selectedType
        const matchesTags = selectedTags.length === 0 || 
                          selectedTags.every(tag => lesson.tags.includes(tag))
        return matchesSearch && matchesLevel && matchesType && matchesTags
      })
      .sort((a, b) => {
        switch(sortBy) {
          case 'rating': return b.rating - a.rating
          case 'duration': return parseInt(a.duration) - parseInt(b.duration)
          case 'completion': return b.completionRate - a.completionRate
          case 'recent': return recentlyViewed.indexOf(a.id) - recentlyViewed.indexOf(b.id)
          default: return 0
        }
      })
  }

  // Get all unique tags from lessons
  const allTags = Array.from(new Set(lessons.flatMap(lesson => lesson.tags)))

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-base-100 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Search */}
          <div className="form-control lg:col-span-2">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search lessons..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-square">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Level Filter */}
          <select
            className="select select-bordered w-full"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Type Filter */}
          <select
            className="select select-bordered w-full"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="grammar">Grammar</option>
            <option value="speaking">Speaking</option>
            <option value="vocabulary">Vocabulary</option>
            <option value="pronunciation">Pronunciation</option>
          </select>

          {/* Filter Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-block">
              <FunnelIcon className="h-5 w-5 mr-2" />
              Apply Filters
            </label>
            <div tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-72 mt-4">
              <div className="font-bold mb-2">Select Tags</div>
              <div className="space-y-2">
                {allTags.map(tag => (
                  <label key={tag} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedTags.includes(tag)}
                      onChange={() => {
                        setSelectedTags(prev =>
                          prev.includes(tag)
                            ? prev.filter(t => t !== tag)
                            : [...prev, tag]
                        )
                      }}
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
              </div>
              <div className="divider"></div>
              <div className="font-bold mb-2">Sort By</div>
              <select
                className="select select-bordered w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Duration</option>
                <option value="completion">Completion Rate</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filterLessons().map(lesson => (
          <div key={lesson.id} 
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="card-body p-6">
              {/* Card Header */}
              <div className="flex justify-between items-start gap-2">
                <h3 className="card-title text-lg flex-1">
                  <BookOpenIcon className="h-5 w-5 text-primary shrink-0" />
                  <span className="truncate">{lesson.title}</span>
                  {lesson.isNew && (
                    <div className="badge badge-sm badge-secondary ml-1">NEW</div>
                  )}
                </h3>
                <div className="flex gap-1 shrink-0">
                  <button 
                    onClick={() => toggleFavorite(lesson.id)}
                    className={`btn btn-ghost btn-sm btn-square ${
                      favorites.includes(lesson.id) ? 'text-error' : ''
                    }`}
                  >
                    <HeartIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => toggleBookmark(lesson.id)}
                    className={`btn btn-ghost btn-sm btn-square ${
                      bookmarks.includes(lesson.id) ? 'text-primary' : ''
                    }`}
                  >
                    <BookmarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-base opacity-70 mt-4">{lesson.description}</p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5" />
                  <span className="text-base">{lesson.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-warning" />
                  <span className="text-base">{lesson.rating}</span>
                </div>
                <div className="badge badge-lg">{lesson.level}</div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-base mb-2">
                  <span>Completion Rate</span>
                  <span>{lesson.completionRate}%</span>
                </div>
                <progress
                  className="progress progress-primary w-full h-3"
                  value={lesson.completionRate}
                  max="100"
                ></progress>
              </div>

              {/* Actions */}
              <div className="card-actions justify-end mt-6">
                <button 
                  className="btn btn-outline"
                  onClick={() => document.getElementById(`preview-modal-${lesson.id}`).showModal()}
                >
                  Preview
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleLessonStart(lesson)}
                >
                  Start Lesson
                </button>
              </div>
            </div>

            {/* Preview Modal */}
            <dialog id={`preview-modal-${lesson.id}`} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">{lesson.title}</h3>
                <p className="py-4">{lesson.description}</p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            {/* Lesson Modal */}
            <dialog id={`lesson-modal-${lesson.id}`} className="modal">
              <div className="modal-box max-w-3xl">
                <h3 className="font-bold text-lg">{lesson.title}</h3>
                {/* Add your lesson content here */}
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filterLessons().length === 0 && (
        <div className="text-center py-12">
          <div className="text-2xl font-bold mb-3">No lessons found</div>
          <p className="text-base-content/70 text-lg">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
    </div>
  )
}

// Debounce utility function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default LessonCards 