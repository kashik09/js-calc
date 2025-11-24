/* Core functions */

/**
 * Addition function
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} Sum of a and b
 */
export function add(a, b) {
  return Number(a) + Number(b)
}

/**
 * Subtraction function
 * @param {number} a - First operand (minuend)
 * @param {number} b - Second operand (subtrahend)
 * @returns {number} Difference of a and b
 */
export function subtract(a, b) {
  return Number(a) - Number(b)
}

/**
 * Multiplication function
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} Product of a and b
 */
export function multiply(a, b) {
  return Number(a) * Number(b)
}

/**
 * Division function
 * @param {number} a - First operand (dividend)
 * @param {number} b - Second operand (divisor)
 * @returns {number} Quotient of a divided by b
 * @throws {Error} If divisor is zero
 */
export function divide(a, b) {
  const divisor = Number(b)
  if (divisor === 0) {
    throw new Error('Division by zero')
  }
  return Number(a) / divisor
}

/**
 * Calculate result based on operator
 * @param {number} operand1 - First number
 * @param {number} operand2 - Second number
 * @param {string} operator - Operator (+, -, *, /)
 * @returns {number} Calculated result
 */

export function calculate(operand1, operand2, operator) {
  switch (operator) {
    case '+':
      return add(operand1, operand2)
    case '-':
      return subtract(operand1, operand2)
    case '*':
      return multiply(operand1, operand2)
    case '/':
      return divide(operand1, operand2)
    default:
      throw new Error(`Invalid operator: ${operator}`)
  }
}

/* Additional functions */

// Percentage calculation
export function percentage(value, percent) {
  return (Number(value) * Number(percent)) / 100
}

// Square root
export function squareRoot(value) {
  const num = Number(value)
  if (num < 0) {
    throw new Error('Cannot calculate square root of negative number')
  }
  return Math.sqrt(num)
}

// Power function
export function power(base, exponent) {
  return Math.pow(Number(base), Number(exponent))
}

// Negate (change sign)
export function negate(value) {
  return -Number(value)
}

// Reciprocal (1/x)
export function reciprocal(value) {
  const num = Number(value)
  if (num === 0) {
    throw new Error('Cannot calculate reciprocal of zero')
  }
  return 1 / num
}
