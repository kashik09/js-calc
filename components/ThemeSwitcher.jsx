'use client'

import { themes } from '@/lib/themes'

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="theme-select" className="block text-sm font-semibold mb-2">
        Theme
      </label>
      <select
        id="theme-select"
        value={currentTheme}
        onChange={(e) => onThemeChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border transition-colors"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)',
        }}
        aria-label="Select theme"
      >
        {Object.entries(themes).map(([key, theme]) => (
          <option key={key} value={key}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  )
}
