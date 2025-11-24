'use client'

import { useEffect, useCallback } from 'react'
import Display from './Display'
import ButtonGrid from './ButtonGrid'
import History from './History'
import Settings from './Settings'
import { useCalculator } from '@/hooks/useCalculator'
import { useHistory } from '@/hooks/useHistory'
import { useTheme } from '@/hooks/useTheme'
import { toDisplaySymbol, toInternalOperator } from '@/utils/symbols'

/* Main Calculator Component */
export default function Calculator() {
  const calculator = useCalculator()
  const historyHook = useHistory()
  const themeHook = useTheme()

  // Handle keyboard input
  const handleKeyPress = useCallback((event) => {
    const key = event.key

    // Prevent default for calculator keys
    if (/^[0-9+\-*/=.]$/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
      event.preventDefault()
    }

    // Numbers
    if (/^[0-9]$/.test(key)) {
      calculator.inputDigit(parseInt(key))
    }

    // Operators
    else if (key === '+' || key === '-') {
      calculator.performOperation(key)
    }

    else if (key === '*') {
      calculator.performOperation('*')
    }

    else if (key === '/') {
      calculator.performOperation('/')
    }

    // Decimal
    else if (key === '.') {
      calculator.inputDecimal()
    }

    // Equals
    else if (key === '=' || key === 'Enter') {
      const result = calculator.equals()
      if (result) {
        historyHook.addCalculation({
          ...result,
          operator: toDisplaySymbol(result.operator),
        })
      }
    }

    // Clear
    else if (key === 'Escape') {
      calculator.clearAll()
    }

    // Backspace
    else if (key === 'Backspace') {
      calculator.backspace()
    }
  }, [calculator, historyHook])

  // Keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Handle equals with history
  const handleEquals = () => {
    const result = calculator.equals()
    if (result) {
      historyHook.addCalculation({
        ...result,
        operator: toDisplaySymbol(result.operator),
      })
    }
  }

  // Handle operator with display symbol conversion
  const handleOperator = (op) => {
    const displayOp = toDisplaySymbol(op)
    calculator.performOperation(displayOp)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Settings */}
      <Settings
        theme={themeHook.theme}
        onThemeChange={themeHook.updateTheme}
        buttonStyle={themeHook.buttonStyle}
        onButtonStyleChange={themeHook.updateButtonStyle}
        fontSize={themeHook.fontSize}
        onFontSizeChange={themeHook.updateFontSize}
        layout={themeHook.layout}
        onLayoutChange={themeHook.updateLayout}
        onResetDefaults={themeHook.resetToDefaults}
      />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Calculator */}
        <div
          className="w-full lg:w-96 p-6 rounded-3xl shadow-2xl transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          {/* Title */}
          <h1 className="text-2xl font-bold mb-4 text-center">
            JavaScript Calculator
          </h1>

          {/* Display */}
          <Display
            value={calculator.display}
            memory={calculator.memory}
            fontSize={themeHook.fontSize}
            error={calculator.error}
          />

          {/* Button Grid */}
          <ButtonGrid
            onDigit={calculator.inputDigit}
            onOperator={handleOperator}
            onEquals={handleEquals}
            onClear={calculator.clearAll}
            onClearEntry={calculator.clearEntry}
            onDecimal={calculator.inputDecimal}
            onToggleSign={calculator.toggleSign}
            onPercentage={calculator.applyPercentage}
            onBackspace={calculator.backspace}
            onMemoryAdd={calculator.memoryAdd}
            onMemorySubtract={calculator.memorySubtract}
            onMemoryRecall={calculator.memoryRecall}
            onMemoryClear={calculator.memoryClear}
            buttonStyle={themeHook.buttonStyle}
            layout={themeHook.layout}
            memory={calculator.memory}
          />

          {/* Current operation indicator */}
          {calculator.currentOperator && (
            <div className="mt-4 text-center text-sm opacity-70">
              Current operation: {toDisplaySymbol(calculator.currentOperator)}
            </div>
          )}
        </div>

        {/* History */}
        <div className="w-full lg:flex-1">
          <History
            history={historyHook.history}
            onClear={historyHook.clear}
            onDelete={historyHook.deleteItem}
            filter={historyHook.filter}
            onFilterChange={historyHook.setFilter}
            searchQuery={historyHook.searchQuery}
            onSearchChange={historyHook.setSearchQuery}
            onToggleFavorite={historyHook.toggleFavorite}
            onAddNote={historyHook.addNote}
            statistics={historyHook.statistics}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm opacity-60">
        <p className="mt-2">Press ⚙️ in the top right for settings and customization</p>
      </div>
    </div>
  )
}
