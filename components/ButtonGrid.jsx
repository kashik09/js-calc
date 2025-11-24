'use client'

import { toDisplaySymbol } from '@/utils/symbols'

/* Calculator Button */
function CalcButton({ children, onClick, type = 'number', style = 'rounded', className = '', ariaLabel }) {
  const styleClasses = {
    rounded: 'rounded-2xl',
  }

  const typeStyles = {
    number: {
      backgroundColor: 'var(--btn-number)',
      color: 'var(--btn-number-text)',
    },
    operator: {
      backgroundColor: 'var(--btn-operator)',
      color: 'var(--btn-operator-text)',
    },
    function: {
      backgroundColor: 'var(--btn-function)',
      color: 'var(--btn-function-text)',
    },
    equals: {
      backgroundColor: 'var(--btn-equals)',
      color: 'var(--btn-equals-text)',
    },
  }

  return (
    <button
      onClick={onClick}
      className={`
        ${styleClasses[style]}
        ${className}
        p-4 text-xl font-semibold
        transition-all duration-150
        hover:opacity-90 hover:scale-105
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        shadow-md hover:shadow-lg
        animate-press
      `}
      style={typeStyles[type]}
      aria-label={ariaLabel || children}
    >
      {children}
    </button>
  )
}

/* Button Grid Component */
export default function ButtonGrid({
  onDigit,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onDecimal,
  onToggleSign,
  onPercentage,
  onBackspace,
  onMemoryAdd,
  onMemorySubtract,
  onMemoryRecall,
  onMemoryClear,
  buttonStyle = 'rounded',
  layout = 'standard',
  memory = 0,
}) {
  const isCompact = layout === 'compact'
  const isSpacious = layout === 'spacious'
  const isScientific = layout === 'scientific'

  const gridGap = isCompact ? 'gap-1' : isSpacious ? 'gap-4' : 'gap-2'

  if (isScientific) {
    return (
      <div className={`grid grid-cols-5 ${gridGap}`}>
        {/* memory + advanced functions */}
        {/* Row 1: Memory functions */}
        <CalcButton onClick={onMemoryClear} type="function" style={buttonStyle} ariaLabel="Memory Clear">
          MC
        </CalcButton>
        <CalcButton onClick={onMemoryRecall} type="function" style={buttonStyle} ariaLabel="Memory Recall">
          MR
        </CalcButton>
        <CalcButton onClick={onMemoryAdd} type="function" style={buttonStyle} ariaLabel="Memory Add">
          M+
        </CalcButton>
        <CalcButton onClick={onMemorySubtract} type="function" style={buttonStyle} ariaLabel="Memory Subtract">
          M-
        </CalcButton>
        <CalcButton onClick={onClear} type="function" style={buttonStyle} ariaLabel="Clear All">
          AC
        </CalcButton>

        {/* Row 2: Functions */}
        <CalcButton onClick={onPercentage} type="function" style={buttonStyle} ariaLabel="Percentage">
          %
        </CalcButton>
        <CalcButton onClick={onToggleSign} type="function" style={buttonStyle} ariaLabel="Plus Minus">
          ±
        </CalcButton>
        <CalcButton onClick={onBackspace} type="function" style={buttonStyle} ariaLabel="Backspace">
          ⌫
        </CalcButton>
        <CalcButton onClick={onClearEntry} type="function" style={buttonStyle} ariaLabel="Clear Entry">
          CE
        </CalcButton>
        <CalcButton onClick={() => onOperator('/')} type="operator" style={buttonStyle} ariaLabel="Divide">
          {toDisplaySymbol('/')}
        </CalcButton>

        {/* Row 3: 7, 8, 9, × */}
        <CalcButton onClick={() => onDigit(7)} type="number" style={buttonStyle}>7</CalcButton>
        <CalcButton onClick={() => onDigit(8)} type="number" style={buttonStyle}>8</CalcButton>
        <CalcButton onClick={() => onDigit(9)} type="number" style={buttonStyle}>9</CalcButton>
        <CalcButton onClick={() => onOperator('*')} type="operator" style={buttonStyle} ariaLabel="Multiply">
          {toDisplaySymbol('*')}
        </CalcButton>
        <CalcButton onClick={() => onOperator('-')} type="operator" style={buttonStyle} ariaLabel="Subtract">
          -
        </CalcButton>

        {/* Row 4: 4, 5, 6 */}
        <CalcButton onClick={() => onDigit(4)} type="number" style={buttonStyle}>4</CalcButton>
        <CalcButton onClick={() => onDigit(5)} type="number" style={buttonStyle}>5</CalcButton>
        <CalcButton onClick={() => onDigit(6)} type="number" style={buttonStyle}>6</CalcButton>
        <CalcButton onClick={() => onOperator('+')} type="operator" style={buttonStyle} ariaLabel="Add" className="row-span-2">
          +
        </CalcButton>
        <CalcButton onClick={onEquals} type="equals" style={buttonStyle} ariaLabel="Equals" className="row-span-2">
          =
        </CalcButton>

        {/* Row 5: 1, 2, 3 */}
        <CalcButton onClick={() => onDigit(1)} type="number" style={buttonStyle}>1</CalcButton>
        <CalcButton onClick={() => onDigit(2)} type="number" style={buttonStyle}>2</CalcButton>
        <CalcButton onClick={() => onDigit(3)} type="number" style={buttonStyle}>3</CalcButton>

        {/* Row 6: 0, . */}
        <CalcButton onClick={() => onDigit(0)} type="number" style={buttonStyle} className="col-span-2">
          0
        </CalcButton>
        <CalcButton onClick={onDecimal} type="number" style={buttonStyle} ariaLabel="Decimal point">
          .
        </CalcButton>
      </div>
    )
  }

  // Standard layout
  return (
    <div className={`grid grid-cols-4 ${gridGap}`}>
      {/* Row 1: Clear, CE, %, ÷ */}
      <CalcButton onClick={onClear} type="function" style={buttonStyle} ariaLabel="Clear All">
        AC
      </CalcButton>
      <CalcButton onClick={onClearEntry} type="function" style={buttonStyle} ariaLabel="Clear Entry">
        CE
      </CalcButton>
      <CalcButton onClick={onPercentage} type="function" style={buttonStyle} ariaLabel="Percentage">
        %
      </CalcButton>
      <CalcButton onClick={() => onOperator('/')} type="operator" style={buttonStyle} ariaLabel="Divide">
        {toDisplaySymbol('/')}
      </CalcButton>

      {/* Row 2: 7, 8, 9, × */}
      <CalcButton onClick={() => onDigit(7)} type="number" style={buttonStyle}>7</CalcButton>
      <CalcButton onClick={() => onDigit(8)} type="number" style={buttonStyle}>8</CalcButton>
      <CalcButton onClick={() => onDigit(9)} type="number" style={buttonStyle}>9</CalcButton>
      <CalcButton onClick={() => onOperator('*')} type="operator" style={buttonStyle} ariaLabel="Multiply">
        {toDisplaySymbol('*')}
      </CalcButton>

      {/* Row 3: 4, 5, 6, - */}
      <CalcButton onClick={() => onDigit(4)} type="number" style={buttonStyle}>4</CalcButton>
      <CalcButton onClick={() => onDigit(5)} type="number" style={buttonStyle}>5</CalcButton>
      <CalcButton onClick={() => onDigit(6)} type="number" style={buttonStyle}>6</CalcButton>
      <CalcButton onClick={() => onOperator('-')} type="operator" style={buttonStyle} ariaLabel="Subtract">
        -
      </CalcButton>

      {/* Row 4: 1, 2, 3, + */}
      <CalcButton onClick={() => onDigit(1)} type="number" style={buttonStyle}>1</CalcButton>
      <CalcButton onClick={() => onDigit(2)} type="number" style={buttonStyle}>2</CalcButton>
      <CalcButton onClick={() => onDigit(3)} type="number" style={buttonStyle}>3</CalcButton>
      <CalcButton onClick={() => onOperator('+')} type="operator" style={buttonStyle} ariaLabel="Add">
        +
      </CalcButton>

      {/* Row 5: ±, 0, ., = */}
      <CalcButton onClick={onToggleSign} type="function" style={buttonStyle} ariaLabel="Plus Minus">
        ±
      </CalcButton>
      <CalcButton onClick={() => onDigit(0)} type="number" style={buttonStyle}>0</CalcButton>
      <CalcButton onClick={onDecimal} type="number" style={buttonStyle} ariaLabel="Decimal point">
        .
      </CalcButton>
      <CalcButton onClick={onEquals} type="equals" style={buttonStyle} ariaLabel="Equals">
        =
      </CalcButton>
    </div>
  )
}
