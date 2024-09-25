export default ({ decl, minimum, remValue, breakpoint, unitPrecision, unit = 'vw' }) => {
  decl.value = decl.value.replace(/(-?\d*\.?\d+)rem/g, (match, stringValue) => {
    const value = Number.parseFloat(stringValue);

    // Only add responsive function if needed
    if (minimum >= Math.abs(value)) {
      return `${stringValue}rem`;
    }

    const fluidValue = (Math.abs(value) - minimum) * remValue * 100 / breakpoint;

    if (value > 0) {
      return `min(${value}rem, ${minimum}rem + ${Number(fluidValue.toFixed(unitPrecision))}${unit})`;
    }
    return `max(${value}rem, -${minimum}rem - ${Number(fluidValue.toFixed(unitPrecision))}${unit})`;
  });
};
