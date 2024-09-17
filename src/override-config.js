import { theme } from 'tailwindcss/stubs/config.full';

const calculatedLineHeight = (lineHeight) => {
  return `max(1em, ${lineHeight} * min(4em / 9 + 2rem / 3, min((2em + 1rem) / 3, (4em - 1rem) / 3)))`;
};

export default {
  theme: {
    // Remove line height from font sizes
    fontSize: Object.fromEntries(Object.entries(theme.fontSize).map(([key, value]) => {
      delete value[1]?.lineHeight;
      return [key, value];
    })),
    // Merge line height with defaults
    lineHeight: Object.assign(theme.lineHeight, {
      tight: calculatedLineHeight(1.25),
      snug: calculatedLineHeight(1.375),
      normal: calculatedLineHeight(1.5),
      relaxed: calculatedLineHeight(1.625),
      loose: calculatedLineHeight(2),
    }),
  },
  corePlugins: {
    // We override the default lineHeight & font size utilities.
    lineHeight: false,
    fontSize: false,
  },
};
