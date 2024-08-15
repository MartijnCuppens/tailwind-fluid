export default ({matchUtilities, theme}) => {
  matchUtilities(
    {
      leading: (value) => ({
        '--tw-lh': value,
      }),
    }, {values: theme('lineHeight')},
  );
};
