'use client'

import { useState } from 'react'
import { Moon, Sun, Waves, Sunrise } from 'lucide-react'
import { buttonStyles, layouts, fontSizes } from '@/lib/themes'
import { clearAllData } from '@/lib/storage'

export default function Settings({
  theme,
  onThemeChange,
  buttonStyle,
  onButtonStyleChange,
  fontSize,
  onFontSizeChange,
  layout,
  onLayoutChange,
  onResetDefaults,
}) {
  const [isOpen, setIsOpen] = useState(false)

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
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Theme
          </label>

          {/* Icon button grid */}
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => onThemeChange('dark')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                theme === 'dark'
                  ? 'ring-2 ring-offset-2'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: theme === 'dark' ? 'var(--btn-operator)' : 'var(--bg-secondary)',
                borderColor: theme === 'dark' ? 'var(--btn-operator)' : 'var(--border-color)',
                color: theme === 'dark' ? 'var(--btn-operator-text)' : 'var(--text-primary)',
              }}
              aria-label="Dark theme"
            >
              <Moon className="w-6 h-6" />
              <span className="text-xs font-medium">Dark</span>
            </button>

            <button
              onClick={() => onThemeChange('light')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                theme === 'light'
                  ? 'ring-2 ring-offset-2'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: theme === 'light' ? 'var(--btn-operator)' : 'var(--bg-secondary)',
                borderColor: theme === 'light' ? 'var(--btn-operator)' : 'var(--border-color)',
                color: theme === 'light' ? 'var(--btn-operator-text)' : 'var(--text-primary)',
              }}
              aria-label="Light theme"
            >
              <Sun className="w-6 h-6" />
              <span className="text-xs font-medium">Light</span>
            </button>

            <button
              onClick={() => onThemeChange('ocean')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                theme === 'ocean'
                  ? 'ring-2 ring-offset-2'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: theme === 'ocean' ? 'var(--btn-operator)' : 'var(--bg-secondary)',
                borderColor: theme === 'ocean' ? 'var(--btn-operator)' : 'var(--border-color)',
                color: theme === 'ocean' ? 'var(--btn-operator-text)' : 'var(--text-primary)',
              }}
              aria-label="Ocean theme"
            >
              <Waves className="w-6 h-6" />
              <span className="text-xs font-medium">Ocean</span>
            </button>

            <button
              onClick={() => onThemeChange('sunset')}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                theme === 'sunset'
                  ? 'ring-2 ring-offset-2'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: theme === 'sunset' ? 'var(--btn-operator)' : 'var(--bg-secondary)',
                borderColor: theme === 'sunset' ? 'var(--btn-operator)' : 'var(--border-color)',
                color: theme === 'sunset' ? 'var(--btn-operator-text)' : 'var(--text-primary)',
              }}
              aria-label="Sunset theme"
            >
              <Sunrise className="w-6 h-6" />
              <span className="text-xs font-medium">Sunset</span>
            </button>
          </div>
        </div>

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
      </div>
    </>
  )
}
