import { useState, useEffect, useCallback } from 'react'
import { getPreferences, savePreferences } from '@/lib/storage'

/* Theme / Preference management */
export function useTheme() {
  const [theme, setTheme] = useState('dark')
  const [buttonStyle, setButtonStyle] = useState('rounded')
  const [fontSize, setFontSize] = useState('medium')
  const [layout, setLayout] = useState('standard')

  // Load preferences
  useEffect(() => {
    const preferences = getPreferences()
    setTheme(preferences.theme || 'dark')
    setButtonStyle(preferences.buttonStyle || 'rounded')
    setFontSize(preferences.fontSize || 'medium')
    setLayout(preferences.layout || 'standard')

    // Apply theme to document
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', preferences.theme || 'dark')
    }
  }, [])

  // Update theme
  const updateTheme = useCallback((newTheme) => {
    setTheme(newTheme)

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    const preferences = getPreferences()
    savePreferences({ ...preferences, theme: newTheme })
  }, [])

  // Update button style
  const updateButtonStyle = useCallback((newStyle) => {
    setButtonStyle(newStyle)

    const preferences = getPreferences()
    savePreferences({ ...preferences, buttonStyle: newStyle })
  }, [])

  // Update font size
  const updateFontSize = useCallback((newSize) => {
    setFontSize(newSize)

    const preferences = getPreferences()
    savePreferences({ ...preferences, fontSize: newSize })
  }, [])

  // Update layout
  const updateLayout = useCallback((newLayout) => {
    setLayout(newLayout)

    const preferences = getPreferences()
    savePreferences({ ...preferences, layout: newLayout })
  }, [])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    const defaultPrefs = {
      theme: 'dark',
      buttonStyle: 'rounded',
      soundEnabled: false,
      fontSize: 'medium',
      layout: 'standard',
    }

    setTheme(defaultPrefs.theme)
    setButtonStyle(defaultPrefs.buttonStyle)
    setFontSize(defaultPrefs.fontSize)
    setLayout(defaultPrefs.layout)

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', defaultPrefs.theme)
    }

    savePreferences(defaultPrefs)
  }, [])

  return {
    theme,
    buttonStyle,
    fontSize,
    layout,
    updateTheme,
    updateButtonStyle,
    updateFontSize,
    updateLayout,
    resetToDefaults,
  }
}
