import React, { useState, useEffect } from 'react'
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid'

const VoiceInput = ({ onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isRecording) {
      // Request microphone permission
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          // Handle successful permission
          console.log('Microphone access granted')
        })
        .catch(err => {
          setError('Microphone access denied')
          setIsRecording(false)
        })
    }
  }, [isRecording])

  const toggleRecording = () => {
    if (error) {
      setError(null)
    }
    
    setIsRecording(!isRecording)
    if (isRecording) {
      setIsProcessing(true)
      // Simulate processing delay
      setTimeout(() => {
        onTranscriptionComplete(transcription)
        setIsProcessing(false)
      }, 1500)
    } else {
      setTranscription('')
      setConfidence(0)
    }
  }

  return (
    <div className="card bg-base-200 shadow-xl p-6 h-[600px] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={toggleRecording}
          className={`btn btn-circle btn-lg ${
            isRecording ? 'btn-error animate-pulse' : 'btn-primary'
          } hover:scale-105 transition-transform`}
          disabled={isProcessing}
        >
          {isRecording ? (
            <StopIcon className="h-6 w-6" />
          ) : (
            <MicrophoneIcon className="h-6 w-6" />
          )}
        </button>

        <div className="w-full text-center">
          {isRecording && (
            <div className="animate-pulse text-primary font-semibold">
              Recording... Speak clearly
            </div>
          )}
          {isProcessing && (
            <div className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner"></span>
              Processing...
            </div>
          )}
        </div>

        {transcription && (
          <div className="card bg-base-100 w-full p-4 mt-4">
            <p className="text-lg">{transcription}</p>
            <div className="mt-2">
              <div className="text-sm text-base-content/70">Confidence</div>
              <div className="flex items-center gap-2">
                <progress
                  className="progress progress-primary flex-1"
                  value={confidence}
                  max="100"
                ></progress>
                <span className="text-sm font-medium">
                  {Math.round(confidence)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Mock data for simulation
const mockWords = [
  'hello', 'how', 'are', 'you', 'today', 'I', 'am', 'learning', 
  'to', 'speak', 'better', 'thank', 'you', 'for', 'helping'
]

export default VoiceInput 