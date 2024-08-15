import {theme} from 'tailwindcss/stubs/config.full';

export default {
  theme: {
    // Remove line height from font sizes
    fontSize: Object.fromEntries(Object.entries(theme.fontSize).map(([key, value]) => {
      delete value[1]?.lineHeight;
      return [key, value];
    })),
    // Merge line height with defaults
    lineHeight: Object.assign(theme.lineHeight, {
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
