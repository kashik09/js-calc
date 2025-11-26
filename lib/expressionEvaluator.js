/**
 * Expression Evaluator with PEMDAS Support
 * Implements Shunting Yard algorithm for infix to postfix conversion
 * Supports: +, -, ×, ÷, and parentheses ( )
 */

import { add, subtract, multiply, divide } from './calculator'

/**
 * Tokenize an expression string into an array of tokens
 * @param {string} expression - The expression to tokenize (e.g., "3+4*2")
 * @returns {Array} - Array of tokens [{type: 'number', value: 3}, {type: 'operator', value: '+'}, ...]
 */
export function tokenize(expression) {
  const tokens = []
  let currentNumber = ''

  // Normalize operators to internal format
  const normalized = expression.replace(/×/g, '*').replace(/÷/g, '/')

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i]

    if (char === ' ') {
      continue // Skip whitespace
    }

    if (char >= '0' && char <= '9' || char === '.') {
      currentNumber += char
    } else if (char === '+' || char === '-' || char === '*' || char === '/') {
      if (currentNumber) {
        tokens.push({ type: 'number', value: parseFloat(currentNumber) })
        currentNumber = ''
      }
      tokens.push({ type: 'operator', value: char })
    } else if (char === '(' || char === ')') {
      if (currentNumber) {
        tokens.push({ type: 'number', value: parseFloat(currentNumber) })
        currentNumber = ''
      }
      tokens.push({ type: 'parenthesis', value: char })
    }
  }

  // Add final number if exists
  if (currentNumber) {
    tokens.push({ type: 'number', value: parseFloat(currentNumber) })
  }

  return tokens
}

/**
 * Validate parentheses are balanced
 * @param {Array} tokens - Array of tokens
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateParentheses(tokens) {
  let count = 0
  for (const token of tokens) {
    if (token.type === 'parenthesis') {
      if (token.value === '(') count++
      else if (token.value === ')') count--

      if (count < 0) return false // Closing before opening
    }
  }
  return count === 0 // All opened must be closed
}

/**
 * Get operator precedence
 * Higher number = higher precedence
 */
function getPrecedence(operator) {
  switch (operator) {
    case '+':
    case '-':
      return 1
    case '*':
    case '/':
      return 2
    default:
      return 0
  }
}

/**
 * Convert infix tokens to postfix using Shunting Yard algorithm
 * @param {Array} tokens - Array of tokens in infix notation
 * @returns {Array} - Array of tokens in postfix notation
 */
export function infixToPostfix(tokens) {
  const output = []
  const operatorStack = []

  for (const token of tokens) {
    if (token.type === 'number') {
      output.push(token)
    } else if (token.type === 'operator') {
      // Pop operators with higher or equal precedence
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type === 'operator' &&
        getPrecedence(operatorStack[operatorStack.length - 1].value) >= getPrecedence(token.value)
      ) {
        output.push(operatorStack.pop())
      }
      operatorStack.push(token)
    } else if (token.type === 'parenthesis' && token.value === '(') {
      operatorStack.push(token)
    } else if (token.type === 'parenthesis' && token.value === ')') {
      // Pop until we find the matching opening parenthesis
      while (
        operatorStack.length > 0 &&
        !(operatorStack[operatorStack.length - 1].type === 'parenthesis' &&
          operatorStack[operatorStack.length - 1].value === '(')
      ) {
        output.push(operatorStack.pop())
      }
      // Remove the opening parenthesis
      if (operatorStack.length > 0) {
        operatorStack.pop()
      }
    }
  }

  // Pop remaining operators
  while (operatorStack.length > 0) {
    output.push(operatorStack.pop())
  }

  return output
}

/**
 * Evaluate postfix expression
 * @param {Array} postfix - Array of tokens in postfix notation
 * @returns {number} - Result of evaluation
 */
export function evaluatePostfix(postfix) {
  const stack = []

  for (const token of postfix) {
    if (token.type === 'number') {
      stack.push(token.value)
    } else if (token.type === 'operator') {
      const b = stack.pop()
      const a = stack.pop()

      let result
      switch (token.value) {
        case '+':
          result = add(a, b)
          break
        case '-':
          result = subtract(a, b)
          break
        case '*':
          result = multiply(a, b)
          break
        case '/':
          result = divide(a, b)
          break
        default:
          throw new Error(`Unknown operator: ${token.value}`)
      }

      stack.push(result)
    }
  }

  return stack[0]
}

/**
 * Evaluate an expression string with PEMDAS
 * @param {string} expression - The expression to evaluate
 * @returns {number|null} - Result or null if invalid
 */
export function evaluateExpression(expression) {
  try {
    // Tokenize
    const tokens = tokenize(expression)

    if (tokens.length === 0) return null

    // Validate parentheses
    if (!validateParentheses(tokens)) {
      throw new Error('Unbalanced parentheses')
    }

    // Convert to postfix
    const postfix = infixToPostfix(tokens)

    // Evaluate
    const result = evaluatePostfix(postfix)

    return result
  } catch (error) {
    console.error('Expression evaluation error:', error)
    return null
  }
}
