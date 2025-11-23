/**
 * LocalStorage utility functions for persisting calculator data
 */

const STORAGE_KEYS = {
  HISTORY: 'calculator_history',
  PREFERENCES: 'calculator_preferences',
  MEMORY: 'calculator_memory',
}

/**
 * Check if localStorage is available
 */
function isStorageAvailable() {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Get item from localStorage with fallback
 */
function getItem(key, defaultValue = null) {
  if (!isStorageAvailable()) return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Set item in localStorage
 */
function setItem(key, value) {
  if (!isStorageAvailable()) return false

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error)
    return false
  }
}

/**
 * Remove item from localStorage
 */
function removeItem(key) {
  if (!isStorageAvailable()) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error)
    return false
  }
}

/**
 * Clear all calculator data from localStorage
 */
export function clearAllData() {
  Object.values(STORAGE_KEYS).forEach(key => removeItem(key))
}

/**
 * History management functions
 */

export function getHistory() {
  return getItem(STORAGE_KEYS.HISTORY, [])
}

export function saveHistory(history) {
  return setItem(STORAGE_KEYS.HISTORY, history)
}

export function addToHistory(calculation) {
  const history = getHistory()
  const newHistory = [calculation, ...history].slice(0, 100) // Keep last 100 calculations
  saveHistory(newHistory)
  return newHistory
}

export function clearHistory() {
  return setItem(STORAGE_KEYS.HISTORY, [])
}

export function deleteHistoryItem(id) {
  const history = getHistory()
  const newHistory = history.filter(item => item.id !== id)
  saveHistory(newHistory)
  return newHistory
}

/**
 * Preferences management functions
 */

export function getPreferences() {
  return getItem(STORAGE_KEYS.PREFERENCES, {
    theme: 'light',
    buttonStyle: 'rounded',
    soundEnabled: false,
    fontSize: 'medium',
    layout: 'standard',
  })
}

export function savePreferences(preferences) {
  return setItem(STORAGE_KEYS.PREFERENCES, preferences)
}

export function updatePreference(key, value) {
  const preferences = getPreferences()
  preferences[key] = value
  savePreferences(preferences)
  return preferences
}

/**
 * Memory management functions
 */

export function getMemoryValue() {
  return getItem(STORAGE_KEYS.MEMORY, 0)
}

export function saveMemoryValue(value) {
  return setItem(STORAGE_KEYS.MEMORY, value)
}

export function clearMemoryValue() {
  return setItem(STORAGE_KEYS.MEMORY, 0)
}

/**
 * Export data functions
 */

export function exportHistoryAsJSON() {
  const history = getHistory()
  const dataStr = JSON.stringify(history, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  return URL.createObjectURL(blob)
}

export function exportHistoryAsCSV() {
  const history = getHistory()

  if (history.length === 0) {
    return null
  }

  // CSV header
  const headers = ['Date', 'Time', 'Calculation', 'Result']
  const csvRows = [headers.join(',')]

  // CSV data
  history.forEach(item => {
    const date = new Date(item.timestamp)
    const dateStr = date.toLocaleDateString()
    const timeStr = date.toLocaleTimeString()
    const calculation = `${item.operand1} ${item.operator} ${item.operand2}`
    const row = [dateStr, timeStr, calculation, item.result]
    csvRows.push(row.join(','))
  })

  const csvStr = csvRows.join('\n')
  const blob = new Blob([csvStr], { type: 'text/csv' })
  return URL.createObjectURL(blob)
}
