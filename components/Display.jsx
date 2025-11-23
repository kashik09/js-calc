'use client'

import { formatDisplayNumber } from '@/utils/symbols'

/**
 * Calculator Display Component
 * Shows the current calculation or result
 */
export default function Display({ value, memory, fontSize = 'medium', error = null }) {
  const fontSizeClasses = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-5xl',
  }

  const displayValue = error || formatDisplayNumber(value)

  return (
    <div className="w-full p-6 rounded-2xl mb-4 transition-all duration-300"
         style={{
           backgroundColor: 'var(--bg-display)',
           color: 'var(--text-display)',
         }}>
      {/* Memory indicator */}
      {memory !== 0 && (
        <div className="text-sm opacity-70 mb-1">
          M: {formatDisplayNumber(memory)}
        </div>
      )}

      {/* Main display */}
      <div
        className={`font-mono text-right overflow-x-auto ${fontSizeClasses[fontSize]} ${error ? 'text-red-400' : ''}`}
        style={{ minHeight: '3rem' }}
        role="status"
        aria-live="polite"
        aria-label={`Calculator display showing ${displayValue}`}
      >
        {displayValue}
      </div>
    </div>
  )
}
