import postcssFluid from './postcss-fluid';

const moduleIsAvailable = (path) => {
  try {
    require.resolve(path);
    return true;
  } catch (e) {
    return false;
  }
};

export default ({ matchVariant, minimum, remValue, breakpoint, unitPrecision, matchUtilities }) => {
  // To avoid duplicate @container
  if (!moduleIsAvailable('@tailwindcss/container-queries')) {
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
  }

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
