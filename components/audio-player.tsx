'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react'
import { Button } from './ui/button'
import { trackAudioPlay, trackAudioPartComplete, trackAudioSeriesComplete } from '@/lib/analytics'

interface AudioPart {
  title: string
  url: string
  duration: string
  description: string
}

interface AudioPlayerProps {
  narrator: string
  totalDuration: string
  parts: AudioPart[]
  postSlug?: string
  postTitle?: string
  className?: string
}

export function AudioPlayer({ narrator, totalDuration, parts, postSlug = 'unknown', postTitle = 'Unknown Post', className = "" }: AudioPlayerProps) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [hasTrackedPlay, setHasTrackedPlay] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentPart = parts[currentPartIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      const partNumber = currentPartIndex + 1
      const partTitle = parts[currentPartIndex]?.title || 'Unknown'
      
      // Track part completion
      trackAudioPartComplete(postSlug, postTitle, partNumber, partTitle, Math.round(audio.duration))
      
      if (currentPartIndex < parts.length - 1) {
        // Move to next part
        setCurrentPartIndex(currentPartIndex + 1)
      } else {
        // Series complete - track it!
        trackAudioSeriesComplete(postSlug, postTitle, parts.length)
        
        // Reset player
        setIsPlaying(false)
        setCurrentPartIndex(0)
        setCurrentTime(0)
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentPartIndex, parts.length, postSlug, postTitle])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = currentPart.url
    audio.load()
    
    if (isPlaying) {
      audio.play().catch(console.error)
    }
  }, [currentPartIndex, currentPart.url])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    // Track first play
    if (!isPlaying && !hasTrackedPlay) {
      const partNumber = currentPartIndex + 1
      trackAudioPlay(postSlug, postTitle, partNumber, currentPart.title)
      setHasTrackedPlay(true)
    }
    
    setIsPlaying(!isPlaying)
  }

  // Simple spacebar pause when playing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If audio is playing and spacebar is pressed (not in input fields)
      if (isPlaying && 
          e.code === 'Space' && 
          e.target instanceof HTMLElement && 
          !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault() // Prevent page scroll
        setIsPlaying(false) // Pause playback
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying])

  const skipToPart = (index: number) => {
    setCurrentPartIndex(index)
    setCurrentTime(0)
  }

  const handlePartClick = (index: number) => {
    if (index === currentPartIndex) {
      // If clicking the current part, toggle play/pause
      togglePlay()
    } else {
      // If clicking a different part, switch to it and start playing
      setCurrentPartIndex(index)
      setCurrentTime(0)
      
      // Track first play for this new part
      if (!hasTrackedPlay) {
        trackAudioPlay(postSlug, postTitle, index + 1, parts[index]?.title || 'Unknown')
        setHasTrackedPlay(true)
      }
      
      setIsPlaying(true)
    }
  }

  const skipForward = () => {
    if (currentPartIndex < parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
    }
  }

  const skipBack = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(currentPartIndex - 1)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:sticky lg:top-6 ${className}`}
      role="region"
      aria-label="Audio player for article narration. Navigate with Tab, use arrows on timeline and volume, spacebar to pause when playing."
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Listen to Article
        </h3>
        {/* Total duration seems broken so commenting out for now */}
        {/* <p className="text-sm text-gray-600">
          Total duration: {totalDuration}
        </p> */}
      </div>

      <audio ref={audioRef} preload="metadata" />

      {/* Current Part Info */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-1">
          Part {currentPartIndex + 1}: {currentPart.title}
        </h4>
        <p className="text-sm text-gray-600 mb-2">
          {currentPart.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div 
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative"
          onClick={handleSeek}
          role="progressbar"
          aria-label={`Audio progress: ${formatTime(currentTime)} of ${formatTime(duration)}. Use left and right arrows to scrub 10 seconds.`}
          aria-valuenow={currentTime}
          aria-valuemin={0}
          aria-valuemax={duration}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              const audio = audioRef.current
              if (!audio) return
              const step = 10 // 10 seconds
              const newTime = e.key === 'ArrowLeft' 
                ? Math.max(0, currentTime - step)
                : Math.min(duration, currentTime + step)
              audio.currentTime = newTime
              setCurrentTime(newTime)
            }
          }}
        >
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-150"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 mb-4" role="group" aria-label="Audio playback controls">
        <Button
          variant="ghost"
          size="sm"
          onClick={skipBack}
          disabled={currentPartIndex === 0}
          className="p-2"
          aria-label={`Previous part${currentPartIndex > 0 ? `: ${parts[currentPartIndex - 1]?.title}` : ' (unavailable)'}`}
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700"
          aria-label={isPlaying ? `Pause: ${currentPart.title}. Spacebar also pauses anywhere on page.` : `Play: ${currentPart.title}. Spacebar pauses when playing.`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={skipForward}
          disabled={currentPartIndex === parts.length - 1}
          className="p-2"
          aria-label={`Next part${currentPartIndex < parts.length - 1 ? `: ${parts[currentPartIndex + 1]?.title}` : ' (unavailable)'}`}
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-4 h-4 text-gray-500" aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          aria-label={`Volume: ${Math.round(volume * 100)}%. Use left and right arrows to adjust.`}
        />
      </div>

      {/* Part List */}
      <div className="space-y-2" role="group" aria-label="Article parts. Press Enter on any chapter to play or pause.">
        {parts.map((part, index) => (
          <button
            key={index}
            onClick={() => handlePartClick(index)}
            className={`w-full text-left p-2 rounded text-sm transition-colors ${
              index === currentPartIndex
                ? 'bg-blue-50 text-blue-900 border border-blue-200'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
            aria-label={`Part ${index + 1}: ${part.title} - Duration: ${part.duration}${
              index === currentPartIndex 
                ? ` (currently ${isPlaying ? 'playing' : 'paused'} - press to ${isPlaying ? 'pause' : 'play'})`
                : ' - press to play'
            }`}
            aria-current={index === currentPartIndex ? 'true' : 'false'}
          >
            <div className="font-medium">
              {part.title}
              {index === currentPartIndex && (
                <span className="sr-only">
                  {isPlaying ? ' (currently playing - press to pause)' : ' (currently paused - press to play)'}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>


    </div>
  )
}
