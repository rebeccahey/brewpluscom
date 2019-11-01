import colors from './colors';

/**
 * This is our custom theme where we define global styles.
 * It should serve as a guideline for styling, but not all styles *have* to be taken from here.
 */
const breakpoints = ['40em', '52em', '64em', '80em'];

// Aliases
/* eslint-disable */
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
/* eslint-enable */

const bpAliases = {
  phone: breakpoints[0],
  tablet: breakpoints[1],
  desktop: breakpoints[2],
  large: breakpoints[3]
};

/**
 * Space is used for margin and padding scales.
 * It's recommended to use powers of two to ensure alignment across the entire project
 */
// const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];
const space = [
  '0',
  '0.25rem',
  '0.5rem',
  '0.75rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '2rem',
  '2.5rem',
  '3rem',
  '4rem',
  '6rem',
  '8rem',
  '12rem',
  '16rem'
];

/**
 * Typographic scale
 */
// const fontSizes = [14, 18, 20, 24, 32, 48, 64, 96, 128];
const fontSizes = [
  '1rem',
  '1.2rem',
  '1.44rem',
  '1.728rem',
  '2.074rem',
  '2.488rem'
];

const lineHeights = [1, 1.125, 1.25, 1.5];

const fontWeights = {
  normal: 400,
  semibold: 600,
  bold: 700
};

/**
 * Letter-spacing should vary, depending on usage of text
 */
const letterSpacings = {
  normal: 'normal',
  caps: '0.25em',
  labels: '0.05em'
};

/**
 * Border-radius
 */
const radii = [0, 2, 4, 8, 16];

const i18n = {
  selectLanguage: {
    selected: {
      backgroundColor: colors.primary
    }
  }
};

const dimensions = {
  headerHeight: '60px',
  sideBarWidth: '180px'
};

const theme = {
  name: 'Default',
  breakpoints,
  bpAliases,
  colors,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  radii,
  i18n,
  dimensions
};

export default theme;
