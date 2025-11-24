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

  // Build equation display
  let equationDisplay = ''

  if (error) {
    equationDisplay = error
  } else if (showResult && previousResult) {
    // After pressing =, show: "5 + 2 = 7"
    equationDisplay = `${formatDisplayNumber(previousResult.operand1)} ${previousResult.operator} ${formatDisplayNumber(previousResult.operand2)} = ${formatDisplayNumber(previousResult.result)}`
  } else if (operand1 !== null && operator) {
    // Building equation: "5 +" or "5 + 2"
    if (value !== '0' || operand1 === null) {
      equationDisplay = `${formatDisplayNumber(operand1)} ${operator} ${value}`
    } else {
      equationDisplay = `${formatDisplayNumber(operand1)} ${operator}`
    }
  } else {
    // Just show current value
    equationDisplay = formatDisplayNumber(value)
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

      {/* Main display */}
      <div
        className={`font-mono text-right overflow-x-auto ${fontSizeClasses[fontSize]} ${error ? 'text-red-400' : ''}`}
        style={{ minHeight: '3rem' }}
        role="status"
        aria-live="polite"
        aria-label={`Calculator display showing ${equationDisplay}`}
      >
        {equationDisplay}
      </div>
    </div>
  )
}
