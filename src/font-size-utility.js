import isPlainObject from 'tailwindcss/lib/util/isPlainObject';

export default ({matchUtilities, theme}) => {
  matchUtilities(
    {
      text: (value, {modifier}) => {
        const [fontSize, options] = Array.isArray(value) ? value : [value];

        if (modifier) {
          return {
            'font-size': fontSize,
            'line-height': modifier,
          };
        }

        const {lineHeight, letterSpacing, fontWeight} = isPlainObject(options)
          ? options
          : {lineHeight: options};

        return {
          'font-size': fontSize,
          // We always need to set the line height, either with the line height
          // that is defined, or we recalculate the line height with the custom property.
          'line-height': lineHeight === undefined ? 'var(--tw-lh)' : lineHeight,
          ...(letterSpacing === undefined ? {} : {'letter-spacing': letterSpacing}),
          ...(fontWeight === undefined ? {} : {'font-weight': fontWeight}),
        };
      },
    },
    {
      values: theme('fontSize'),
      modifiers: theme('lineHeight'),
      type: ['absolute-size', 'relative-size', 'length', 'percentage'],
    },
  );
};
