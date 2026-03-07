/**
 * Returns a greeting message with support for different styles and languages
 * @param {string} name - The name to greet
 * @param {Object} options - Optional configuration
 * @param {string} options.style - Greeting style ('normal' or 'formal')
 * @param {string} options.language - Language code ('en', 'es', or 'fr')
 * @returns {string} The greeting message
 */
export function greet(name, options = {}) {
  const { style = 'normal', language = 'en' } = options;
  
  // Handle invalid/empty name
  const displayName = (!name || typeof name !== 'string') ? 'World' : name;
  
  // Greeting templates organized by language and style
  const greetings = {
    en: {
      normal: `Hello, ${displayName}!`,
      formal: `Good day, ${displayName}`
    },
    es: {
      normal: `Hola, ${displayName}!`,
      formal: `Buenos días, ${displayName}`
    },
    fr: {
      normal: `Bonjour, ${displayName}!`,
      formal: `Bonjour, ${displayName}`
    }
  };
  
  // Return the appropriate greeting, defaulting to English normal if invalid options
  return greetings[language]?.[style] || greetings.en.normal;
}
