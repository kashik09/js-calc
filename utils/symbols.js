/**
 * Symbol conversion utilities for calculator display
 * Converts internal operators to display symbols and vice versa
 */

// Convert internal operator (* /) to display symbol (× ÷)
export function toDisplaySymbol(operator) {
  const symbolMap = {
    '*': '×',
    '/': '÷',
    '+': '+',
    '-': '-',
  }
  return symbolMap[operator] || operator
}

// Convert display symbol (× ÷) to internal operator (* /)
export function toInternalOperator(symbol) {
  const operatorMap = {
    '×': '*',
    '÷': '/',
    '+': '+',
    '-': '-',
  }
  return operatorMap[symbol] || symbol
}

// Check if character is an operator
export function isOperator(char) {
  return ['+', '-', '*', '/', '×', '÷'].includes(char)
}

// Format number for display (remove trailing zeros, handle scientific notation)
export function formatDisplayNumber(num) {
  if (num === null || num === undefined || num === '') return '0'

  const number = parseFloat(num)

  if (isNaN(number)) return '0'

  // Handle very large or very small numbers with scientific notation
  if (Math.abs(number) > 999999999 || (Math.abs(number) < 0.000001 && number !== 0)) {
    return number.toExponential(6)
  }

  // Remove trailing zeros after decimal point
  const str = number.toString()
  if (str.includes('.')) {
    return parseFloat(str).toString()
  }

  return str
}
