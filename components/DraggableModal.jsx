'use client'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'

export default function DraggableModal({
  isOpen,
  onClose,
  title,
  children,
  defaultPosition = { x: 100, y: 100 },
}) {
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const modalRef = useRef(null)
  const previousIsOpen = useRef(false) // Start with false to detect first open

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Only reset position when transitioning from closed to open (not on every render)
  useEffect(() => {
    if (isOpen && !previousIsOpen.current) {
      // Modal just opened, reset to default position
      setPosition(defaultPosition)
    }
    previousIsOpen.current = isOpen
  }, [isOpen])

  const handleMouseDown = (e) => {
    // Only drag if clicking on title bar
    if (e.target.closest('.modal-title-bar')) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !modalRef.current) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // Get modal dimensions
    const modalRect = modalRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Keep modal within viewport bounds
    const boundedX = Math.max(0, Math.min(newX, viewportWidth - modalRect.width))
    const boundedY = Math.max(0, Math.min(newY, viewportHeight - modalRect.height))

    setPosition({ x: boundedX, y: boundedY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add/remove mouse event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart, position])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300 z-40"
        style={{ opacity: 0.3 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed z-50 rounded-2xl shadow-2xl overflow-hidden transition-shadow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: 'var(--bg-secondary)',
          maxWidth: '90vw',
          maxHeight: '90vh',
          cursor: isDragging ? 'grabbing' : 'default',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Title Bar - Draggable */}
        <div
          className="modal-title-bar px-6 py-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            cursor: 'grab',
          }}
        >
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {children}
        </div>
      </div>
    </>
  )
}
