import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';

import theme from './src/tokens/theme';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.object.isRequired
};
