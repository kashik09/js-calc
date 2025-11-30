'use client'

import { useState } from 'react'
import { Moon, Sun, Waves, Sunrise } from 'lucide-react'
import { layouts, fontSizes } from '@/lib/themes'
import { clearAllData } from '@/lib/storage'
import ConfirmationModal from './ConfirmationModal'

export default function Settings({
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  layout,
  onLayoutChange,
  onResetDefaults,
}) {
  const [confirmModal, setConfirmModal] = useState(null) // 'clearData' | 'resetSettings' | null

  const handleClearAllData = () => {
    clearAllData()
    onResetDefaults()
  }

  const handleResetSettings = () => {
    onResetDefaults()
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
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
          onClick={() => setConfirmModal('resetSettings')}
          className="flex-1 py-2 px-4 rounded-lg font-semibold transition-all hover:opacity-90"
          style={{
            backgroundColor: 'var(--btn-function)',
            color: 'var(--btn-function-text)',
          }}
        >
          Reset Settings
        </button>
        <button
          onClick={() => setConfirmModal('clearData')}
          className="flex-1 py-2 px-4 rounded-lg font-semibold transition-all hover:opacity-90 bg-red-500 text-white"
        >
          Clear All Data
        </button>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={confirmModal === 'clearData'}
        onClose={() => setConfirmModal(null)}
        onConfirm={handleClearAllData}
        title="Clear All Data"
        message="This will remove all calculation history and reset all settings to defaults. This action cannot be undone."
        confirmText="Yes, clear my data"
        cancelText="No, keep my data"
        confirmStyle="danger"
      />

      <ConfirmationModal
        isOpen={confirmModal === 'resetSettings'}
        onClose={() => setConfirmModal(null)}
        onConfirm={handleResetSettings}
        title="Reset Settings"
        message="This will reset theme, layout, and font size to default values. Your calculation history will not be affected."
        confirmText="Yes, reset my setting"
        cancelText="No, keep my data"
        confirmStyle="warning"
      />
    </div>
  )
}