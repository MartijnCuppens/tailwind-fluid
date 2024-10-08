import plugin from 'tailwindcss/plugin';
import config from './src/override-config.js';
import fluidVariant from './src/fluid-variant.js';
import fontSizeUtility from './src/font-size-utility.js';
import leadingUtility from './src/leading-utility.js';
import setDefaultLineHeight from './src/set-default-line-height.js';
import containerQueryVariant from './src/container-query-variant.js';

export default plugin.withOptions((
  {
    minimum = 1.5,
    breakpoint = 1200,
    unitPrecision = 5,
    remValue = 16,
  } = {}) => {
  return (
    {
      matchUtilities,
      theme,
      addBase,
      addVariant,
      matchVariant,
    },
  ) => {
    // Define the base line-height in the root.
    setDefaultLineHeight({ addBase, theme });

    // We need to override the existing font size utility,
    // to make the line heights work with custom properties.
    fontSizeUtility({ matchUtilities, theme });

    // Use custom properties instead of line-heights in leading utilities.
    leadingUtility({ matchUtilities, theme });

    // Add fluid variant.
    fluidVariant({ addVariant, minimum, unitPrecision, remValue, breakpoint });

    // Container queries variant.
    containerQueryVariant({ matchUtilities, matchVariant, minimum, unitPrecision, remValue, breakpoint });
  };
}, () => config);
