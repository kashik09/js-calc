import { useState, useEffect, useCallback } from 'react'
import { getPreferences, savePreferences } from '@/lib/storage'

/**
 * Custom hook for managing theme and preferences
 */
export function useTheme() {
  const [theme, setTheme] = useState('light')
  const [buttonStyle, setButtonStyle] = useState('rounded')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [fontSize, setFontSize] = useState('medium')
  const [layout, setLayout] = useState('standard')

  // Load preferences from localStorage on mount
  useEffect(() => {
    const preferences = getPreferences()
    setTheme(preferences.theme || 'light')
    setButtonStyle(preferences.buttonStyle || 'rounded')
    setSoundEnabled(preferences.soundEnabled || false)
    setFontSize(preferences.fontSize || 'medium')
    setLayout(preferences.layout || 'standard')

    // Apply theme to document
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', preferences.theme || 'light')
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

  // Toggle sound
  const toggleSound = useCallback(() => {
    const newSoundEnabled = !soundEnabled
    setSoundEnabled(newSoundEnabled)

    const preferences = getPreferences()
    savePreferences({ ...preferences, soundEnabled: newSoundEnabled })
  }, [soundEnabled])

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
      theme: 'light',
      buttonStyle: 'rounded',
      soundEnabled: false,
      fontSize: 'medium',
      layout: 'standard',
    }

    setTheme(defaultPrefs.theme)
    setButtonStyle(defaultPrefs.buttonStyle)
    setSoundEnabled(defaultPrefs.soundEnabled)
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
    soundEnabled,
    fontSize,
    layout,
    updateTheme,
    updateButtonStyle,
    toggleSound,
    updateFontSize,
    updateLayout,
    resetToDefaults,
  }
}
