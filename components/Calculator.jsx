'use client'

import { useEffect, useCallback, useState } from 'react'
import { History as HistoryIcon, X, Settings as SettingsIcon } from 'lucide-react'
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
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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
    <div className="w-full h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Settings Modal/Panel */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSettingsOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-md p-6 rounded-2xl shadow-2xl"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all"
              aria-label="Close settings"
            >
              <X size={20} />
            </button>
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
          </div>
        </div>
      )}

      {/* Calculator Card */}
      <div
        className="relative w-full max-w-md p-6 rounded-3xl shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        {/* Top Icons Row */}
        <div className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between z-10">
          {/* Settings Icon - Top Left */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all"
            aria-label="Open settings"
          >
            <SettingsIcon size={24} />
          </button>

          {/* History Icon - Top Right */}
          <button
            onClick={() => setIsHistorySidebarOpen(!isHistorySidebarOpen)}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all"
            aria-label="Toggle history"
          >
            <HistoryIcon size={24} />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4 text-center mt-8">
          JavaScript Calculator
        </h1>

        {/* Display */}
        <Display
          value={calculator.display}
          memory={calculator.memory}
          fontSize={themeHook.fontSize}
          error={calculator.error}
          operand1={calculator.operand1}
          operator={calculator.operator}
          showResult={calculator.showResult}
          previousResult={calculator.previousResult}
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
          <div className="mt-4 text-center text-xs text-gray-500 opacity-60">
            Current operation: {toDisplaySymbol(calculator.currentOperator)}
          </div>
        )}
      </div>

      {/* History Sidebar - Slides from Right */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] md:w-[300px] shadow-2xl transition-transform duration-300 ease-in-out z-40 ${
          isHistorySidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        {/* Close Button */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => setIsHistorySidebarOpen(false)}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all float-right"
            aria-label="Close history"
          >
            <X size={20} />
          </button>
          <div className="clear-both" />
        </div>

        {/* History Content */}
        <div className="h-full overflow-y-auto pb-20">
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
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm opacity-60">
        <p>Press ⚙️ for settings • Press 🕒 for history</p>
      </div>
    </div>
  )
}
