'use client'

import { formatDisplayNumber } from '@/utils/symbols'

export default function Display({
  value,
  memory,
  fontSize = 'medium',
  error = null,
  operand1 = null,
  operator = null,
  expression = '',
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
    // After pressing =, show full expression with result
    if (previousResult.expression) {
      // PEMDAS expression
      equationHistory = `${previousResult.expression} =`
      currentDisplay = formatDisplayNumber(previousResult.result)
    } else {
      // Simple two-operand calculation
      equationHistory = `${formatDisplayNumber(previousResult.operand1)} ${previousResult.operator} ${formatDisplayNumber(previousResult.operand2)} =`
      currentDisplay = formatDisplayNumber(previousResult.result)
    }
  } else if (expression) {
    // Building PEMDAS expression: show full expression including current number
    equationHistory = expression + (value !== '0' ? formatDisplayNumber(value) : '')
    currentDisplay = formatDisplayNumber(value)
  } else if (operand1 !== null && operator) {
    // Legacy: Building simple equation - show full equation including current number
    equationHistory = `${formatDisplayNumber(operand1)} ${operator} ${formatDisplayNumber(value)}`
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
