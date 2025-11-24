'use client'

import { useState } from 'react'
import { formatDisplayNumber } from '@/utils/symbols'

function HistoryItem({ calculation, onDelete, onToggleFavorite, onAddNote }) {
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [noteText, setNoteText] = useState(calculation.note || '')

  const date = new Date(calculation.timestamp)
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dateStr = date.toLocaleDateString()

  const handleSaveNote = () => {
    onAddNote(calculation.id, noteText)
    setShowNoteInput(false)
  }

  return (
    <div
      className="p-3 rounded-lg mb-2 border transition-all duration-200 hover:shadow-md animate-fade-in"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">

          {/* Calculation */}
          <div className="font-mono text-lg">
            {formatDisplayNumber(calculation.operand1)} {calculation.operator} {formatDisplayNumber(calculation.operand2)} = <span className="font-bold">{formatDisplayNumber(calculation.result)}</span>
          </div>

          {/* Timestamp */}
          <div className="text-xs opacity-60 mt-1">
            {timeStr} · {dateStr}
          </div>

          {/* Note */}
          {calculation.note && !showNoteInput && (
            <div className="text-sm mt-2 italic opacity-80">
              Note: {calculation.note}
            </div>
          )}

          {/* Note input */}
          {showNoteInput && (
            <div className="mt-2">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note..."
                className="w-full px-2 py-1 rounded text-sm border"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                autoFocus
              />

              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleSaveNote}
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: 'var(--btn-equals)', color: 'var(--btn-equals-text)' }}
                >
                  Save
                </button>
                <button
                  onClick={() => setShowNoteInput(false)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: 'var(--btn-function)', color: 'var(--btn-function-text)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => onToggleFavorite(calculation.id)}
            className="text-lg hover:scale-110 transition-transform"
            aria-label={calculation.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {calculation.isFavorite ? '⭐' : '☆'}
          </button>
          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Add note"
          >
            📝
          </button>
          <button
            onClick={() => onDelete(calculation.id)}
            className="text-sm opacity-60 hover:opacity-100 hover:text-red-500 transition-all"
            aria-label="Delete calculation"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default function History({
  history,
  onClear,
  onDelete,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onToggleFavorite,
  onAddNote,
  statistics,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className="w-full max-w-md rounded-2xl p-4 transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">History</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sm opacity-60 hover:opacity-100"
          aria-label={isCollapsed ? 'Expand history' : 'Collapse history'}
        >
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="p-2 rounded" style={{ backgroundColor: 'var(--bg-primary)' }}>
              Total: {statistics.total}
            </div>
            <div className="p-2 rounded" style={{ backgroundColor: 'var(--bg-primary)' }}>
              Favorites: {statistics.favorites}
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search calculations..."
            className="w-full px-3 py-2 rounded-lg mb-3 text-sm"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          />

          {/* Filter buttons */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {['all', '+', '-', '×', '÷'].map((op) => (
              <button
                key={op}
                onClick={() => onFilterChange(op)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  filter === op ? 'ring-2' : 'opacity-60'
                }`}
                style={{
                  backgroundColor: filter === op ? 'var(--btn-operator)' : 'var(--bg-primary)',
                  color: filter === op ? 'var(--btn-operator-text)' : 'var(--text-primary)',
                }}
                aria-label={`Filter by ${op === 'all' ? 'all operations' : op}`}
              >
                {op === 'all' ? 'All' : op}
              </button>
            ))}
          </div>

          {/* History list */}
          <div className="max-h-96 overflow-y-auto mb-3">
            {history.length === 0 ? (
              <div className="text-center py-8 opacity-60">
                No calculations yet
              </div>
            ) : (
              history.map((calc, index) => (
                <HistoryItem
                  key={calc.id || index}
                  calculation={calc}
                  onDelete={onDelete}
                  onToggleFavorite={onToggleFavorite}
                  onAddNote={onAddNote}
                />
              ))
            )}
          </div>

          {/* Clear button */}
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="w-full py-2 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: 'var(--btn-function)',
                color: 'var(--btn-function-text)',
              }}
              aria-label="Clear all history"
            >
              Clear History
            </button>
          )}
        </>
      )}
    </div>
  )
}
