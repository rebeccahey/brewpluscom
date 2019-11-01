import React from 'react';

export const defaultInterfaceContext = {
  cartStatus: 'initial',
  toggleCart: () => {},
  menuStatus: 'initial',
  toggleMenu: () => {}
};

export default React.createContext(defaultInterfaceContext);
