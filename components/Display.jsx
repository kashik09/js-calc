'use client'

import { formatDisplayNumber } from '@/utils/symbols'

export default function Display({
  value,
  memory,
  fontSize = 'medium',
  error = null,
  operand1 = null,
  operator = null,
  showResult = false,
  previousResult = null,
}) {
  const fontSizeClasses = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  }

  // Build equation history (smaller text at top)
  let equationHistory = ''
  // Build current value display (large text)
  let currentDisplay = ''

  if (error) {
    currentDisplay = error
    equationHistory = ''
  } else if (showResult && previousResult) {
    // After pressing =, show full equation
    equationHistory = `${formatDisplayNumber(previousResult.operand1)} ${previousResult.operator} ${formatDisplayNumber(previousResult.operand2)} =`
    currentDisplay = formatDisplayNumber(previousResult.result)
  } else if (operand1 !== null && operator) {
    // Building equation: show "5 +" at top, current input at bottom
    equationHistory = `${formatDisplayNumber(operand1)} ${operator}`
    currentDisplay = formatDisplayNumber(value)
  } else {
    // Just show current value
    currentDisplay = formatDisplayNumber(value)
  }

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

      {/* Equation history - smaller text at top */}
      {equationHistory && (
        <div className="text-sm opacity-70 mb-1 font-mono text-right">
          {equationHistory}
        </div>
      )}

      {/* Main display - current operand */}
      <div
        className={`font-mono text-right overflow-x-auto ${fontSizeClasses[fontSize]} ${error ? 'text-red-400' : ''}`}
        style={{ minHeight: '3rem' }}
        role="status"
        aria-live="polite"
        aria-label={`Calculator display showing ${currentDisplay}`}
      >
        {currentDisplay}
      </div>
    </div>
  )
}
