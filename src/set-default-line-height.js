export default ({addBase, theme}) => {
  // Define the base line-height in the root.
  addBase({
    ':root': {
      '--tw-lh': theme('lineHeight')?.normal,
    },
    // Add line height for elements that have a font size set by default.
    'small,rt': {
      'line-height': 'var(--tw-lh)',
    },
  });
};
