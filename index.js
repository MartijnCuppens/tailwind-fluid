import plugin from 'tailwindcss/plugin';
import config from 'tailwindcss/stubs/config.full';
import isPlainObject from 'tailwindcss/lib/util/isPlainObject';

export default plugin.withOptions((
  {
    minimum = 1.25,
    breakpoint = 1200,
    factor = 10,
    twoDimensional = false,
    unitPrecision = 5,
    remValue = 16,
  } = {}) => {
  return (
    {
      matchUtilities,
      theme,
      addBase,
      addVariant,
      e,
    },
  ) => {
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

    // We need to override the existing font size utility, to make the line heights work.
    matchUtilities(
      {
        text: (value, { modifier }) => {
          const [fontSize, options] = Array.isArray(value) ? value : [value];

          if (modifier) {
            return {
              'font-size': fontSize,
              'line-height': modifier,
            };
          }

          const { lineHeight, letterSpacing, fontWeight } = isPlainObject(options)
            ? options
            : { lineHeight: options };

          return {
            'font-size': fontSize,
            // We always need to set the line height, either with the line height
            // that is defined, or we recalculate the line height with the custom property.
            'line-height': lineHeight === undefined ? 'var(--tw-lh)' : lineHeight,
            ...(letterSpacing === undefined ? {} : { 'letter-spacing': letterSpacing }),
            ...(fontWeight === undefined ? {} : { 'font-weight': fontWeight }),
          };
        },
      },
      {
        values: theme('fontSize'),
        modifiers: theme('lineHeight'),
        type: ['absolute-size', 'relative-size', 'length', 'percentage'],
      },
    );

    // Use custom properties instead of line-heights.
    matchUtilities(
      {
        leading: (value) => ({
          '--tw-lh': value,
        }),
      }, { values: theme('lineHeight') },
    );

    addVariant('fluid', ({ modifySelectors, separator, container }) => {
      container.walkDecls(decl => {
        // Exclude line-height modifiers.
        if (decl.prop !== 'line-height') {
          decl.value = decl.value.replace(/(-?\d*\.?\d+)(px|rem)/g, (match, stringValue, unit) => {
            let value = Number.parseFloat(stringValue);

            // Convert to px if in rem
            if (unit === 'px') {
              value /= remValue;
            }

            // Only add responsive function if needed
            if (minimum >= Math.abs(value) || factor <= 1) {
              return `${stringValue}${unit}`;
            }

            // Calculate base and difference
            let baseValue = minimum + ((Math.abs(value) - minimum) / factor);
            const diff = Math.abs(value) - baseValue;

            // Divide by remValue if needed
            if (unit === 'px') {
              baseValue *= remValue;
            }

            const viewportUnit = twoDimensional ? 'vmin' : 'vw';
            const sign = value > 0 ? '+' : '-';
            const func = value > 0 ? 'min' : 'max';

            baseValue = value > 0 ? baseValue : -baseValue;
            value = `${Number((unit === 'px' ? value * remValue : value).toFixed(unitPrecision))}${unit}`;
            const fluidValue = diff * remValue * 100 / breakpoint;

            return `${func}(${value}, ${Number(baseValue.toFixed(unitPrecision))}${unit} ${sign} ${Number(fluidValue.toFixed(unitPrecision))}${viewportUnit})`;
          });
        }
      });

      modifySelectors(({ className }) => {
        return `.${e(`fluid${separator}${className}`)}`;
      });
    });
  };
}, () => {
  return {
    theme: {
      // Remove line height from font sizes
      fontSize: Object.fromEntries(Object.entries(config.theme.fontSize).map(([key, value]) => {
        delete value[1]?.lineHeight;
        return [key, value];
      })),
      // Merge line height with defaults
      lineHeight: Object.assign(config.theme.lineHeight, {
        tight: 'min(1.25em, 1em + .25rem)',
        snug: 'min(1.375em, 1em + .375rem)',
        normal: 'min(1.5em, 1em + .5rem)',
        relaxed: 'min(1.625em, 1em + .625rem)',
        loose: 'min(2em, 1em + 1rem)',
      }),
    },
    corePlugins: {
      // We override the default lineHeight & font size utilities.
      lineHeight: false,
      fontSize: false,
    },
  };
});
