/**
 * Returns a greeting message
 * @param {string} name - The name to greet
 * @returns {string} The greeting message
 */
export function greet(name) {
  if (!name || typeof name !== 'string') {
    return 'Hello, World!';
  }
  return `Hello, ${name}!`;
}
