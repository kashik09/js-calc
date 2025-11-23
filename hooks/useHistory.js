import { useState, useEffect, useCallback } from 'react'
import { getHistory, saveHistory, addToHistory, clearHistory, deleteHistoryItem } from '@/lib/storage'

/**
 * Custom hook for managing calculation history
 */
export function useHistory() {
  const [history, setHistory] = useState([])
  const [filter, setFilter] = useState('all') // all, +, -, ×, ÷
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(new Set())

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = getHistory()
    setHistory(savedHistory)
  }, [])

  // Add calculation to history
  const addCalculation = useCallback((calculation) => {
    // Add unique ID to calculation
    const calcWithId = {
      ...calculation,
      id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isFavorite: false,
      note: '',
    }

    const newHistory = addToHistory(calcWithId)
    setHistory(newHistory)
    return calcWithId
  }, [])

  // Clear all history
  const clear = useCallback(() => {
    clearHistory()
    setHistory([])
    setFavorites(new Set())
  }, [])

  // Delete single history item
  const deleteItem = useCallback((id) => {
    const newHistory = deleteHistoryItem(id)
    setHistory(newHistory)

    // Remove from favorites if it was favorited
    if (favorites.has(id)) {
      const newFavorites = new Set(favorites)
      newFavorites.delete(id)
      setFavorites(newFavorites)
    }
  }, [favorites])

  // Toggle favorite
  const toggleFavorite = useCallback((id) => {
    const newFavorites = new Set(favorites)

    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }

    setFavorites(newFavorites)

    // Update history item
    const newHistory = history.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    )
    setHistory(newHistory)
    saveHistory(newHistory)
  }, [favorites, history])

  // Add note to calculation
  const addNote = useCallback((id, note) => {
    const newHistory = history.map(item =>
      item.id === id ? { ...item, note } : item
    )
    setHistory(newHistory)
    saveHistory(newHistory)
  }, [history])

  // Filter history
  const filteredHistory = useCallback(() => {
    let filtered = history

    // Filter by operator
    if (filter !== 'all') {
      filtered = filtered.filter(item => item.operator === filter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => {
        const searchStr = `${item.operand1} ${item.operator} ${item.operand2} = ${item.result}`
        return searchStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
               (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase()))
      })
    }

    return filtered
  }, [history, filter, searchQuery])

  // Get display history (max 50 items)
  const displayHistory = filteredHistory().slice(0, 50)

  // Get statistics
  const statistics = useCallback(() => {
    return {
      total: history.length,
      additions: history.filter(h => h.operator === '+').length,
      subtractions: history.filter(h => h.operator === '-').length,
      multiplications: history.filter(h => h.operator === '×').length,
      divisions: history.filter(h => h.operator === '÷').length,
      favorites: favorites.size,
    }
  }, [history, favorites])

  return {
    history: displayHistory,
    allHistory: history,
    addCalculation,
    clear,
    deleteItem,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    favorites,
    toggleFavorite,
    addNote,
    statistics: statistics(),
  }
}
