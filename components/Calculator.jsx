'use client'

import { useEffect, useCallback, useState } from 'react'
import { History as HistoryIcon, Settings as SettingsIcon } from 'lucide-react'
import Display from './Display'
import ButtonGrid from './ButtonGrid'
import History from './History'
import Settings from './Settings'
import DraggableModal from './DraggableModal'
import { useCalculator } from '@/hooks/useCalculator'
import { useHistory } from '@/hooks/useHistory'
import { useTheme } from '@/hooks/useTheme'
import { toDisplaySymbol, toInternalOperator } from '@/utils/symbols'

/* Main Calculator Component */
export default function Calculator() {
  const calculator = useCalculator()
  const historyHook = useHistory()
  const themeHook = useTheme()
  const [activeModal, setActiveModal] = useState(null) // 'settings' | 'history' | null

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
    <div className="w-full h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      {/* Settings Modal */}
      <DraggableModal
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
        title="Settings"
        defaultPosition={{ x: typeof window !== 'undefined' ? window.innerWidth / 2 + 50 : 500, y: 100 }}
      >
        <div className="p-6">
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
      </DraggableModal>

      {/* History Modal */}
      <DraggableModal
        isOpen={activeModal === 'history'}
        onClose={() => setActiveModal(null)}
        title="History"
        defaultPosition={{ x: typeof window !== 'undefined' ? window.innerWidth - 450 : 600, y: 100 }}
        resizable={true}
        defaultWidth={400}
        defaultHeight={500}
        minWidth={400}
        minHeight={400}
      >
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
      </DraggableModal>

      {/* Calculator Card */}
      <div
        className="relative w-full max-w-[95vw] sm:max-w-md p-4 sm:p-6 rounded-3xl shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          width: 'clamp(320px, 95vw, 28rem)',
        }}
      >
        {/* Top Icons Row */}
        <div className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between z-10">
          {/* Settings Icon - Top Left */}
          <button
            onClick={() => setActiveModal(activeModal === 'settings' ? null : 'settings')}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all"
            aria-label="Open settings"
          >
            <SettingsIcon size={24} />
          </button>

          {/* History Icon - Top Right */}
          <button
            onClick={() => setActiveModal(activeModal === 'history' ? null : 'history')}
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
          expression={calculator.expression}
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
          onParenthesis={calculator.inputParenthesis}
          onMemoryAdd={calculator.memoryAdd}
          onMemorySubtract={calculator.memorySubtract}
          onMemoryRecall={calculator.memoryRecall}
          onMemoryClear={calculator.memoryClear}
          buttonStyle={themeHook.buttonStyle}
          layout={themeHook.layout}
          memory={calculator.memory}
        />

      </div>

      {/* Footer */}
      <div className="fixed bottom-2 sm:bottom-4 left-0 right-0 text-center text-xs sm:text-sm opacity-60 px-2">
        <p className="hidden sm:block">Click ⚙️ for settings • Click 🕒 for history • Drag modal title bars to reposition</p>
        <p className="sm:hidden">⚙️ Settings • 🕒 History</p>
      </div>
    </div>
  )
}
