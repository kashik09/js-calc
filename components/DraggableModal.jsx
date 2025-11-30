'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

export default function DraggableModal({
  isOpen,
  onClose,
  title,
  children,
  defaultPosition = { x: 100, y: 100 },
  resizable = false,
  defaultWidth = 400,
  defaultHeight = 500,
  minWidth = 400,
  maxWidth = null, // Will use 80vw
  minHeight = 400,
  maxHeight = null, // Will use 90vh
}) {
  const [position, setPosition] = useState(defaultPosition)
  const [width, setWidth] = useState(defaultWidth)
  const [height, setHeight] = useState(defaultHeight)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, position: { x: 0, y: 0 } })
  const [isClosing, setIsClosing] = useState(false)
  const [ctrlPressed, setCtrlPressed] = useState(false)
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  const previousIsOpen = useRef(false)
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768

  // Smooth close animation handler
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 350)
  }, [onClose])

  // Handle ESC key and Ctrl key for aspect ratio locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        handleClose()
      }
      if (e.key === 'Control' || e.key === 'Meta') {
        setCtrlPressed(true)
      }
    }
    const handleKeyUp = (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        setCtrlPressed(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isOpen, isClosing, handleClose])

  // Load saved position from localStorage on mount (desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      const savedPosition = localStorage.getItem(`modal-position-${title}`)
      if (savedPosition) {
        try {
          const parsedPosition = JSON.parse(savedPosition)
          const viewportWidth = window.innerWidth
          const viewportHeight = window.innerHeight
          if (
            parsedPosition.x >= 0 &&
            parsedPosition.y >= 0 &&
            parsedPosition.x < viewportWidth - 200 &&
            parsedPosition.y < viewportHeight - 100
          ) {
            setPosition(parsedPosition)
          }
        } catch (e) {
          // Invalid JSON, ignore
        }
      }
    }
  }, [title])

  useEffect(() => {
    if (isOpen && !previousIsOpen.current) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setPosition(defaultPosition)
      }
      if (!resizable) {
        setWidth(defaultWidth)
        setHeight(defaultHeight)
      }
    }
    previousIsOpen.current = isOpen
  }, [isOpen])

  // Load width and height from localStorage on mount (for resizable modals)
  useEffect(() => {
    if (resizable && typeof window !== 'undefined') {
      const savedWidth = localStorage.getItem(`modal-width-${title}`)
      const savedHeight = localStorage.getItem(`modal-height-${title}`)

      const effectiveMaxWidth = maxWidth || window.innerWidth * 0.8
      const effectiveMaxHeight = maxHeight || window.innerHeight * 0.9

      if (savedWidth) {
        const parsedWidth = parseInt(savedWidth, 10)
        if (parsedWidth >= minWidth && parsedWidth <= effectiveMaxWidth) {
          setWidth(parsedWidth)
        }
      }

      if (savedHeight) {
        const parsedHeight = parseInt(savedHeight, 10)
        if (parsedHeight >= minHeight && parsedHeight <= effectiveMaxHeight) {
          setHeight(parsedHeight)
        }
      }
    }
  }, [resizable, title, minWidth, maxWidth, minHeight, maxHeight])

  // Save width and height to localStorage when they change
  useEffect(() => {
    if (resizable && typeof window !== 'undefined') {
      localStorage.setItem(`modal-width-${title}`, width.toString())
      localStorage.setItem(`modal-height-${title}`, height.toString())
    }
  }, [width, height, resizable, title])

  const handleMouseDown = (e) => {
    // Don't drag if clicking inside content area
    if (contentRef.current && contentRef.current.contains(e.target)) {
      return
    }
    
    // Only drag if clicking on title bar
    if (e.target.closest('.modal-title-bar') && !e.target.closest('.resize-handle')) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleTouchStart = (e) => {
    // Don't drag if touching inside content area
    if (contentRef.current && contentRef.current.contains(e.target)) {
      return
    }
    
    if (e.target.closest('.modal-title-bar') && !e.target.closest('.resize-handle')) {
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      })
    }
  }

  const handleResizeStart = (direction) => (e) => {
    if (!resizable) return
    e.stopPropagation()
    e.preventDefault() // Prevent text selection during resize
    setIsResizing(true)
    setResizeDirection(direction)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: width,
      height: height,
      position: { ...position },
    })
  }

  const handleResizeTouchStart = (direction) => (e) => {
    if (!resizable) return
    e.stopPropagation()
    const touch = e.touches[0]
    setIsResizing(true)
    setResizeDirection(direction)
    setResizeStart({
      x: touch.clientX,
      y: touch.clientY,
      width: width,
      height: height,
      position: { ...position },
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging && modalRef.current) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      const modalRect = modalRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const boundedX = Math.max(0, Math.min(newX, viewportWidth - modalRect.width))
      const boundedY = Math.max(0, Math.min(newY, viewportHeight - modalRect.height))

      setPosition({ x: boundedX, y: boundedY })
    }

    if (isResizing && resizable && resizeDirection) {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y

      const effectiveMaxWidth = maxWidth || window.innerWidth * 0.8
      const effectiveMaxHeight = maxHeight || window.innerHeight * 0.9

      let newWidth = resizeStart.width
      let newHeight = resizeStart.height
      let newPosition = { ...resizeStart.position }

      if (resizeDirection.includes('e')) {
        newWidth = resizeStart.width + deltaX
      }
      if (resizeDirection.includes('w')) {
        newWidth = resizeStart.width - deltaX
      }
      if (resizeDirection.includes('s')) {
        newHeight = resizeStart.height + deltaY
      }
      if (resizeDirection.includes('n')) {
        newHeight = resizeStart.height - deltaY
      }

      if (ctrlPressed) {
        const aspectRatio = resizeStart.width / resizeStart.height
        if (resizeDirection.includes('e') || resizeDirection.includes('w')) {
          newHeight = newWidth / aspectRatio
        } else {
          newWidth = newHeight * aspectRatio
        }
      }

      newWidth = Math.max(minWidth, Math.min(newWidth, effectiveMaxWidth))
      newHeight = Math.max(minHeight, Math.min(newHeight, effectiveMaxHeight))

      if (resizeDirection.includes('w')) {
        newPosition.x = resizeStart.position.x + (resizeStart.width - newWidth)
      }
      if (resizeDirection.includes('n')) {
        newPosition.y = resizeStart.position.y + (resizeStart.height - newHeight)
      }

      setWidth(newWidth)
      setHeight(newHeight)
      setPosition(newPosition)
    }
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]

    if (isDragging && modalRef.current) {
      const newX = touch.clientX - dragStart.x
      const newY = touch.clientY - dragStart.y

      const modalRect = modalRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const boundedX = Math.max(0, Math.min(newX, viewportWidth - modalRect.width))
      const boundedY = Math.max(0, Math.min(newY, viewportHeight - modalRect.height))

      setPosition({ x: boundedX, y: boundedY })
    }

    if (isResizing && resizable && resizeDirection) {
      const deltaX = touch.clientX - resizeStart.x
      const deltaY = touch.clientY - resizeStart.y

      const effectiveMaxWidth = maxWidth || window.innerWidth * 0.8
      const effectiveMaxHeight = maxHeight || window.innerHeight * 0.9

      let newWidth = resizeStart.width
      let newHeight = resizeStart.height
      let newPosition = { ...resizeStart.position }

      if (resizeDirection.includes('e')) {
        newWidth = resizeStart.width + deltaX
      }
      if (resizeDirection.includes('w')) {
        newWidth = resizeStart.width - deltaX
      }
      if (resizeDirection.includes('s')) {
        newHeight = resizeStart.height + deltaY
      }
      if (resizeDirection.includes('n')) {
        newHeight = resizeStart.height - deltaY
      }

      newWidth = Math.max(minWidth, Math.min(newWidth, effectiveMaxWidth))
      newHeight = Math.max(minHeight, Math.min(newHeight, effectiveMaxHeight))

      if (resizeDirection.includes('w')) {
        newPosition.x = resizeStart.position.x + (resizeStart.width - newWidth)
      }
      if (resizeDirection.includes('n')) {
        newPosition.y = resizeStart.position.y + (resizeStart.height - newHeight)
      }

      setWidth(newWidth)
      setHeight(newHeight)
      setPosition(newPosition)
    }
  }

  const handleMouseUp = () => {
    if (isDragging && typeof window !== 'undefined' && window.innerWidth >= 768) {
      localStorage.setItem(`modal-position-${title}`, JSON.stringify(position))
    }

    setIsDragging(false)
    setIsResizing(false)
    setResizeDirection(null)
  }

  const handleTouchEnd = () => {
    if (isDragging && typeof window !== 'undefined' && window.innerWidth >= 768) {
      localStorage.setItem(`modal-position-${title}`, JSON.stringify(position))
    }

    setIsDragging(false)
    setIsResizing(false)
    setResizeDirection(null)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchEnd)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, isResizing, dragStart, position, resizeStart, width, height, resizeDirection, ctrlPressed])

  const getResizeCursor = () => {
    if (isDragging) return 'grabbing'
    if (!isResizing || !resizeDirection) return 'default'

    const cursorMap = {
      n: 'ns-resize',
      s: 'ns-resize',
      e: 'ew-resize',
      w: 'ew-resize',
      ne: 'nesw-resize',
      nw: 'nwse-resize',
      se: 'nwse-resize',
      sw: 'nesw-resize',
    }
    return cursorMap[resizeDirection] || 'default'
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black z-40 transition-opacity"
        style={{
          opacity: isClosing ? 0 : 0.3,
          transitionDuration: '350ms',
        }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed z-50 rounded-2xl shadow-2xl overflow-hidden transition-all"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: resizable ? `${width}px` : 'auto',
          height: resizable ? `${height}px` : 'auto',
          backgroundColor: 'var(--bg-secondary)',
          cursor: isDragging || isResizing ? getResizeCursor() : 'default',
          opacity: isClosing ? 0 : 1,
          transform: isClosing ? 'translateY(-20px)' : 'translateY(0)',
          transitionDuration: '350ms',
          transitionProperty: 'opacity, transform',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Resize Handles - ONLY on edges, with pointer-events-none on content */}
        {resizable && (
          <>
            {/* Edge Handles - Made thinner and more intentional */}
            {/* Top */}
            <div
              className="resize-handle absolute left-0 right-0 top-0 h-1 cursor-ns-resize hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
              onMouseDown={handleResizeStart('n')}
              onTouchStart={handleResizeTouchStart('n')}
              style={{ zIndex: 10 }}
            />
            {/* Bottom */}
            <div
              className="resize-handle absolute left-0 right-0 bottom-0 h-1 cursor-ns-resize hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
              onMouseDown={handleResizeStart('s')}
              onTouchStart={handleResizeTouchStart('s')}
              style={{ zIndex: 10 }}
            />
            {/* Left */}
            <div
              className="resize-handle absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
              onMouseDown={handleResizeStart('w')}
              onTouchStart={handleResizeTouchStart('w')}
              style={{ zIndex: 10 }}
            />
            {/* Right */}
            <div
              className="resize-handle absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
              onMouseDown={handleResizeStart('e')}
              onTouchStart={handleResizeTouchStart('e')}
              style={{ zIndex: 10 }}
            />

            {/* Corner Handles - Made smaller */}
            {/* Top-Left */}
            <div
              className="resize-handle absolute left-0 top-0 w-3 h-3 cursor-nwse-resize hover:bg-opacity-30 hover:bg-gray-500 transition-colors"
              onMouseDown={handleResizeStart('nw')}
              onTouchStart={handleResizeTouchStart('nw')}
              style={{ zIndex: 11 }}
            />
            {/* Top-Right */}
            <div
              className="resize-handle absolute right-0 top-0 w-3 h-3 cursor-nesw-resize hover:bg-opacity-30 hover:bg-gray-500 transition-colors"
              onMouseDown={handleResizeStart('ne')}
              onTouchStart={handleResizeTouchStart('ne')}
              style={{ zIndex: 11 }}
            />
            {/* Bottom-Left */}
            <div
              className="resize-handle absolute left-0 bottom-0 w-3 h-3 cursor-nesw-resize hover:bg-opacity-30 hover:bg-gray-500 transition-colors"
              onMouseDown={handleResizeStart('sw')}
              onTouchStart={handleResizeTouchStart('sw')}
              style={{ zIndex: 11 }}
            />
            {/* Bottom-Right */}
            <div
              className="resize-handle absolute right-0 bottom-0 w-3 h-3 cursor-nwse-resize hover:bg-opacity-30 hover:bg-gray-500 transition-colors"
              onMouseDown={handleResizeStart('se')}
              onTouchStart={handleResizeTouchStart('se')}
              style={{ zIndex: 11 }}
            />
          </>
        )}
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
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - CRITICAL: Add ref here and pointer-events */}
        <div
          ref={contentRef}
          className="overflow-y-auto"
          style={{
            height: resizable ? `calc(100% - 64px)` : 'auto',
            maxHeight: resizable ? 'none' : 'calc(90vh - 80px)',
            cursor: 'auto', // Force default cursor in content
            userSelect: 'text', // Allow text selection
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
