import plugin from 'tailwindcss/plugin'
import config from 'tailwindcss/stubs/config.full'

export default plugin.withOptions((
  {
    minimum = 20,
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
      addDefaults,
      addBase,
      addVariant,
      e,
    },
  ) => {
    // Add line-height to every element
    addDefaults('line-height', {
      'line-height': 'var(--tw-lh)',
    })

    // We need to add the line height to several form control selectors too
    // because their line-height is set in the css reset.
    addBase(Object.fromEntries(['button', 'input', 'optgroup', 'select', 'textarea'].map((selector) => {
      return [selector, {
        lineHeight: 'var(--tw-lh)',
      }]
    })))

    // Define the base line-height in the root.
    addBase({
      ':root': {
        '--tw-lh': theme('lineHeight').normal,
      },
    })

    // Use custom properties instead of line-heights
    matchUtilities(
      {
        leading: (value) => ({
          '--tw-lh': value,
        }),
      },
      {values: theme('lineHeight')},
    )

    addVariant('fluid', ({modifySelectors, separator, container}) => {
      container.walkDecls(decl => {

        // Turn line height modifiers in custom properties.
        if (decl.prop === 'line-height') {
          decl.prop = '--tw-lh';
        } else {
          decl.value = decl.value.replace(/(-?\d*\.?\d+)(px|rem)/g, (match, stringValue, unit) => {
            let value = Number.parseFloat(stringValue)

            // Convert to px if in rem
            if (unit === 'rem') {
              value *= remValue
            }

            // Only add responsive function if needed
            if (minimum >= Math.abs(value) || factor <= 1) {
              return `${stringValue}${unit}`
            }

            // Calculate base and difference
            let baseValue = minimum + ((Math.abs(value) - minimum) / factor)
            const diff = Math.abs(value) - baseValue

            // Divide by remValue if needed
            if (unit === 'rem') {
              baseValue /= remValue
            }

            const viewportUnit = twoDimensional ? 'vmin' : 'vw'
            const sign = value > 0 ? '+' : '-'
            const func = value > 0 ? 'min' : 'max'

            baseValue = value > 0 ? baseValue : -baseValue
            value = `${Number((unit === 'rem' ? value / remValue : value).toFixed(unitPrecision))}${unit}`
            const fluidValue = diff * 100 / breakpoint

            return `${func}(${value}, ${Number(baseValue.toFixed(unitPrecision))}${unit} ${sign} ${Number(fluidValue.toFixed(unitPrecision))}${viewportUnit})`
          })
        }
      })

      modifySelectors(({className}) => {
        return `.${e(`fluid${separator}${className}`)}`
      })
    })
  }
}, () => {

  return {
    theme: {
      // Remove line height from font sizes
      fontSize: Object.fromEntries(Object.entries(config.theme.fontSize).map(([key, value]) => {
        delete value[1]?.lineHeight
        return [key, value]
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
      // We override the default lineHeight plugin.
      lineHeight: false,
    },
  }
})

