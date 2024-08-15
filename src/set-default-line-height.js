export default ({addBase, theme}) => {
  // Define the base line-height in the root.
  addBase({
    ':root': {
      '--tw-lh': theme('lineHeight')?.normal ?? 'min(1.5em, 1em + .5rem)', // Fail-safe when normal is line height is removed from config
    },
    // Add line height for elements that have a font size set by default.
    'small,rt': {
      'line-height': 'var(--tw-lh)',
    },
  });
};
