import { useState, useCallback } from 'react'
import { evaluateExpression } from '@/lib/expressionEvaluator'
import { toInternalOperator, toDisplaySymbol } from '@/utils/symbols'

/* Calculator logic with PEMDAS support */
export function useCalculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('') // Full expression being built
  const [memory, setMemory] = useState(0)
  const [error, setError] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [previousResult, setPreviousResult] = useState(null)

  // Legacy state for display compatibility
  const [operand1, setOperand1] = useState(null)
  const [operator, setOperator] = useState(null)

  // digit
  const inputDigit = useCallback((digit) => {
    setError(null)
    setShowResult(false)
    setPreviousResult(null)

    if (showResult) {
      // Starting new calculation after result
      setExpression('')
      setDisplay(String(digit))
    } else if (display === '0') {
      setDisplay(String(digit))
    } else {
      setDisplay(display + digit)
    }
  }, [display, showResult])

  // decimal point
  const inputDecimal = useCallback(() => {
    setError(null)

    if (showResult) {
      setExpression('')
      setDisplay('0.')
      setShowResult(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }, [display, showResult])

  // Clear
  const clearAll = useCallback(() => {
    setDisplay('0')
    setExpression('')
    setOperand1(null)
    setOperator(null)
    setError(null)
    setShowResult(false)
    setPreviousResult(null)
  }, [])

  // Clear entry (current display only)
  const clearEntry = useCallback(() => {
    setDisplay('0')
    setError(null)
  }, [])

  // Perform operation - Build expression with PEMDAS
  const performOperation = useCallback((nextOperator) => {
    setError(null)
    setShowResult(false)
    setPreviousResult(null)

    // Convert operator to internal format for expression
    const internalOp = toInternalOperator(nextOperator)

    // Add current display value to expression
    const newExpression = expression + display + internalOp
    setExpression(newExpression)

    // Show the expression in display
    setDisplay('0')
    setOperator(nextOperator) // For legacy display support

    // Store first operand for display component compatibility
    if (!operand1 && expression === '') {
      setOperand1(parseFloat(display))
    }
  }, [display, expression, operand1])

  // Calculate equals - Evaluate full expression with PEMDAS
  const calculateEquals = useCallback(() => {
    setError(null)

    // Build complete expression with current display
    const fullExpression = expression + display

    if (!fullExpression || fullExpression === '0') {
      return null
    }

    try {
      // Check for unbalanced parentheses first
      const openCount = (fullExpression.match(/\(/g) || []).length
      const closeCount = (fullExpression.match(/\)/g) || []).length

      if (openCount !== closeCount) {
        const msg = openCount > closeCount
          ? `Missing ${openCount - closeCount} closing parenthesis${openCount - closeCount > 1 ? 'es' : ''}`
          : `Extra ${closeCount - openCount} closing parenthesis${closeCount - openCount > 1 ? 'es' : ''}`
        throw new Error(msg)
      }

      // Evaluate using PEMDAS
      const result = evaluateExpression(fullExpression)

      if (result === null || isNaN(result)) {
        throw new Error('Invalid expression')
      }

      return {
        operand1: null, // Not applicable for multi-operation expressions
        operand2: null,
        operator: null,
        expression: fullExpression, // Store full expression
        result: result,
        timestamp: Date.now(),
      }
    } catch (err) {
      const errorMsg = err.message || 'Invalid expression'
      setError(errorMsg)
      setDisplay('Error')
      setExpression('')
      setOperand1(null)
      setOperator(null)
      return null
    }
  }, [display, expression])

  // Equals button handler
  const equals = useCallback(() => {
    const calculation = calculateEquals()

    if (calculation) {
      setDisplay(String(calculation.result))
      setExpression(String(calculation.result)) // Result becomes new starting point
      setOperand1(null)
      setOperator(null)
      setShowResult(true)
      setPreviousResult(calculation)
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
    if (showResult) {
      // After showing result, backspace clears
      clearAll()
    } else if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }, [display, showResult])

  // Input parenthesis (for scientific mode)
  const inputParenthesis = useCallback((paren) => {
    setError(null)
    setShowResult(false)
    setPreviousResult(null)

    if (paren === '(') {
      // Opening parenthesis
      if (display === '0' || showResult) {
        setExpression(expression + '(')
        setDisplay('0')
      } else {
        // After a number, add operator first (implicit multiplication)
        setExpression(expression + display + '*(')
        setDisplay('0')
      }
    } else if (paren === ')') {
      // Closing parenthesis
      const fullExpr = expression + display + ')'
      setExpression(fullExpr)
      setDisplay('0')
    }
  }, [display, expression, showResult])

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
    operand1,
    operator,
    expression, // Full expression being built
    showResult,
    previousResult,
    inputDigit,
    inputDecimal,
    clearAll,
    clearEntry,
    performOperation,
    equals,
    toggleSign,
    applyPercentage,
    backspace,
    inputParenthesis, // For scientific mode
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
    currentOperator: operator,
  }
}
