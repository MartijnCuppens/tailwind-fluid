import postcssFluid from './postcss-fluid';

export default ({ matchVariant, minimum, remValue, breakpoint, unitPrecision, matchUtilities }) => {
  // TODO: find a way to test if `@tailwindcss/container-queries` is enabled as plugin.
  matchUtilities(
    {
      '@container': (value, { modifier }) => {
        return {
          'container-type': value,
          'container-name': modifier,
        };
      },
    },
    {
      values: {
        DEFAULT: 'inline-size',
        normal: 'normal',
      },
      modifiers: 'any',
    }
  );

  matchVariant(
    '@container',
    (_, { modifier, container }) => {
      container.walkDecls(decl => {
        if (decl.prop !== 'line-height') {
          postcssFluid({ decl, minimum, remValue, breakpoint, unitPrecision, unit: 'cqw' });
        }
      });
      return modifier ? `@container ${modifier} (min-width: 0)` : '@container (min-width: 0)';
    },
    {
      values: {
        DEFAULT: '',
      },
    },
  );
};
