'use client'

import { useState } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import { buttonStyles, layouts, fontSizes } from '@/lib/themes'
import { exportHistoryAsJSON, exportHistoryAsCSV, clearAllData } from '@/lib/storage'

/**
 * Settings Component
 */
export default function Settings({
  theme,
  onThemeChange,
  buttonStyle,
  onButtonStyleChange,
  soundEnabled,
  onToggleSound,
  fontSize,
  onFontSizeChange,
  layout,
  onLayoutChange,
  onResetDefaults,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleExportJSON = () => {
    const url = exportHistoryAsJSON()
    const link = document.createElement('a')
    link.href = url
    link.download = `calculator-history-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    const url = exportHistoryAsCSV()
    if (url) {
      const link = document.createElement('a')
      link.href = url
      link.download = `calculator-history-${Date.now()}.csv`
      link.click()
      URL.revokeObjectURL(url)
    } else {
      alert('No history to export')
    }
  }

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This will remove history and reset all settings.')) {
      clearAllData()
      onResetDefaults()
      alert('All data cleared!')
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        style={{
          backgroundColor: 'var(--btn-function)',
          color: 'var(--btn-function-text)',
        }}
        aria-label="Open settings"
      >
        ⚙️
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Settings Panel */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl z-50"
        style={{
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl hover:opacity-70"
            aria-label="Close settings"
          >
            ×
          </button>
        </div>

        {/* Theme */}
        <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />

        {/* Button Style */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Button Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(buttonStyles).map(([key, style]) => (
              <button
                key={key}
                onClick={() => onButtonStyleChange(key)}
                className={`p-3 rounded-lg text-sm transition-all ${
                  buttonStyle === key ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: buttonStyle === key ? 'var(--btn-operator)' : 'var(--bg-secondary)',
                  color: buttonStyle === key ? 'var(--btn-operator-text)' : 'var(--text-primary)',
                }}
              >
                {style.name}
                <div className="text-xs opacity-70">{style.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Layout
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(layouts).map(([key, layoutOption]) => (
              <button
                key={key}
                onClick={() => onLayoutChange(key)}
                className={`p-3 rounded-lg text-sm transition-all ${
                  layout === key ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: layout === key ? 'var(--btn-operator)' : 'var(--bg-secondary)',
                  color: layout === key ? 'var(--btn-operator-text)' : 'var(--text-primary)',
                }}
              >
                {layoutOption.name}
                <div className="text-xs opacity-70">{layoutOption.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Font Size
          </label>
          <div className="flex gap-2">
            {Object.entries(fontSizes).map(([key, size]) => (
              <button
                key={key}
                onClick={() => onFontSizeChange(key)}
                className={`flex-1 p-2 rounded-lg text-sm transition-all ${
                  fontSize === key ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: fontSize === key ? 'var(--btn-operator)' : 'var(--bg-secondary)',
                  color: fontSize === key ? 'var(--btn-operator-text)' : 'var(--text-primary)',
                }}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Effects */}
        <div className="mb-4">
          <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer"
                 style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <span className="text-sm font-semibold">Sound Effects</span>
            <button
              onClick={onToggleSound}
              className={`w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? 'bg-green-500' : 'bg-gray-400'
              }`}
              aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>

        {/* Export Data */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Export History
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleExportJSON}
              className="flex-1 py-2 px-4 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: 'var(--btn-function)',
                color: 'var(--btn-function-text)',
              }}
            >
              JSON
            </button>
            <button
              onClick={handleExportCSV}
              className="flex-1 py-2 px-4 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: 'var(--btn-function)',
                color: 'var(--btn-function-text)',
              }}
            >
              CSV
            </button>
          </div>
        </div>

        {/* Reset & Clear */}
        <div className="flex gap-2">
          <button
            onClick={onResetDefaults}
            className="flex-1 py-2 px-4 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: 'var(--btn-function)',
              color: 'var(--btn-function-text)',
            }}
          >
            Reset Settings
          </button>
          <button
            onClick={handleClearAllData}
            className="flex-1 py-2 px-4 rounded-lg font-semibold transition-all hover:opacity-90 bg-red-500 text-white"
          >
            Clear All Data
          </button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-6 p-4 rounded-lg text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="font-semibold mb-2">Keyboard Shortcuts</div>
          <div className="space-y-1 opacity-80">
            <div>0-9: Number input</div>
            <div>+, -, *, /: Operations</div>
            <div>Enter or =: Equals</div>
            <div>Escape: Clear</div>
            <div>Backspace: Delete digit</div>
            <div>.: Decimal point</div>
          </div>
        </div>
      </div>
    </>
  )
}
