import postcssFluid from './postcss-fluid.js';

export default ({ addVariant, minimum, remValue, breakpoint, unitPrecision }) => {
  addVariant('fluid', ({ container }) => {
    container.walkDecls(decl => {
      if (decl.prop !== 'line-height') {
        postcssFluid({ decl, minimum, remValue, breakpoint, unitPrecision });
      }
    });
  });
};
