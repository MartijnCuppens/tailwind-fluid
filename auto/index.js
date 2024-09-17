module.exports = ({
  properties = ['margin', 'padding', 'gap', 'font-size'],
  minimum = 1.5,
  remValue = 16,
  breakpoint = 1200,
  unitPrecision = 5,
} = {}) => {
  // Plugin creator to check options or prepare caches
  return {
    postcssPlugin: 'tailwindcss-fluid-auto',
    Declaration (decl) {
      // Exclude line-height modifiers.
      // Exclude css functions (contains bracket), because this is probably
      // not intended to be resized. Also, they can trigger infinite loops
      // because PostCSS re-evaluates changed values.
      if (properties.some(property => decl.prop.startsWith(property)) && !decl.value.includes('(')) {
        decl.value = decl.value.replace(/(-?\d*\.?\d+)rem/g, (match, stringValue) => {
          const value = Number.parseFloat(stringValue);

          // Only add responsive function if needed
          if (minimum >= Math.abs(value)) {
            return `${stringValue}rem`;
          }

          const fluidValue = (Math.abs(value) - minimum) * remValue * 100 / breakpoint;

          if (value > 0) {
            return `min(${value}rem, ${minimum}rem + ${Number(fluidValue.toFixed(unitPrecision))}vw)`;
          }
          return `max(${value}rem, -${minimum}rem - ${Number(fluidValue.toFixed(unitPrecision))}vw)`;
        });
      }
    }
  };
};
module.exports.postcss = true;
