'use client'

import { X } from 'lucide-react'

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  confirmStyle = 'danger', // 'danger' | 'warning' | 'primary'
}) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const getConfirmButtonStyle = () => {
    switch (confirmStyle) {
      case 'danger':
        return {
          backgroundColor: '#dc2626',
          color: '#ffffff',
        }
      case 'warning':
        return {
          backgroundColor: '#f59e0b',
          color: '#ffffff',
        }
      case 'primary':
      default:
        return {
          backgroundColor: 'var(--btn-operator)',
          color: 'var(--btn-operator-text)',
        }
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black z-50 transition-opacity"
        style={{ opacity: 0.5 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-2xl shadow-2xl overflow-hidden transition-all"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          width: 'clamp(300px, 90vw, 420px)',
        }}
      >
        {/* Title Bar */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-all"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm mb-6 leading-relaxed">{message}</p>

          {/* Action Buttons - FIXED: Equal width grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-lg text-sm font-medium transition-all hover:opacity-80 border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
              }}
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className="py-3 px-4 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={getConfirmButtonStyle()}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}