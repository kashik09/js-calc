import { useState, useCallback } from 'react'
import { calculate } from '@/lib/calculator'
import { toInternalOperator } from '@/utils/symbols'

/**
 * Custom hook for calculator logic
 * Manages calculator state and operations
 */
export function useCalculator() {
  const [display, setDisplay] = useState('0')
  const [operand1, setOperand1] = useState(null)
  const [operand2, setOperand2] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [memory, setMemory] = useState(0)
  const [error, setError] = useState(null)

  // Input a digit
  const inputDigit = useCallback((digit) => {
    setError(null)

    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }, [display, waitingForOperand])

  // Input decimal point
  const inputDecimal = useCallback(() => {
    setError(null)

    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }, [display, waitingForOperand])

  // Clear everything
  const clearAll = useCallback(() => {
    setDisplay('0')
    setOperand1(null)
    setOperand2(null)
    setOperator(null)
    setWaitingForOperand(false)
    setError(null)
  }, [])

  // Clear entry (current display only)
  const clearEntry = useCallback(() => {
    setDisplay('0')
    setError(null)
  }, [])

  // Perform operation
  const performOperation = useCallback((nextOperator) => {
    setError(null)
    const inputValue = parseFloat(display)

    if (operand1 === null) {
      setOperand1(inputValue)
    } else if (operator) {
      const currentOperand1 = operand1 || 0
      const newOperand2 = inputValue

      try {
        // Convert display operator to internal operator
        const internalOp = toInternalOperator(operator)
        const result = calculate(currentOperand1, newOperand2, internalOp)

        setDisplay(String(result))
        setOperand1(result)
        setOperand2(newOperand2)
      } catch (err) {
        setError(err.message)
        setDisplay('Error')
        setOperand1(null)
        setOperand2(null)
        setOperator(null)
        setWaitingForOperand(false)
        return
      }
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }, [display, operand1, operator])

  // Calculate equals
  const calculateEquals = useCallback(() => {
    setError(null)
    const inputValue = parseFloat(display)

    if (operator && operand1 !== null) {
      const currentOperand1 = operand1
      const currentOperand2 = operand2 !== null ? operand2 : inputValue

      try {
        const internalOp = toInternalOperator(operator)
        const result = calculate(currentOperand1, currentOperand2, internalOp)

        return {
          operand1: currentOperand1,
          operand2: currentOperand2,
          operator: operator,
          result: result,
          timestamp: Date.now(),
        }
      } catch (err) {
        setError(err.message)
        setDisplay('Error')
        setOperand1(null)
        setOperand2(null)
        setOperator(null)
        setWaitingForOperand(false)
        return null
      }
    }

    return null
  }, [display, operand1, operand2, operator])

  // Equals button handler
  const equals = useCallback(() => {
    const calculation = calculateEquals()

    if (calculation) {
      setDisplay(String(calculation.result))
      setOperand1(calculation.result)
      setOperand2(calculation.operand2)
      setWaitingForOperand(true)
      return calculation
    }

    return null
  }, [calculateEquals])

  // Toggle sign (+/-)
  const toggleSign = useCallback(() => {
    const value = parseFloat(display)
    setDisplay(String(-value))
  }, [display])

  // Percentage
  const applyPercentage = useCallback(() => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }, [display])

  // Backspace
  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }, [display])

  // Memory functions
  const memoryAdd = useCallback(() => {
    setMemory(memory + parseFloat(display))
  }, [memory, display])

  const memorySubtract = useCallback(() => {
    setMemory(memory - parseFloat(display))
  }, [memory, display])

  const memoryRecall = useCallback(() => {
    setDisplay(String(memory))
    setWaitingForOperand(true)
  }, [memory])

  const memoryClear = useCallback(() => {
    setMemory(0)
  }, [])

  return {
    display,
    memory,
    error,
    inputDigit,
    inputDecimal,
    clearAll,
    clearEntry,
    performOperation,
    equals,
    toggleSign,
    applyPercentage,
    backspace,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
    currentOperator: operator,
  }
}
