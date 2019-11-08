import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import StoreContext from '../../context/StoreContext';
import { Flex } from '../shared/Elements';
import Logo from './Logo';
import HamburgerButton from './HamburgerButton';
import { media } from '../../utils/media';

const HeaderRoot = styled(Flex)`
  background-color: ${themeGet('colors.lightest')};
  border-bottom: 1px solid ${themeGet('colors.brandLight')};
  height: ${themeGet('dimensions.headerHeight')};
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const HomeLink = styled(Link)`
  display: block;
  line-height: 0;
  color: ${themeGet('colors.brand')};
`;

const Menu = styled(Flex)`
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
`;

const MenuItem = styled(Flex)`
  padding-left: 12px;
  padding-right: 12px;
  height: 100%;
  border-bottom: 2px solid ${themeGet('colors.lightest')};

  & > a {
    color: ${themeGet('colors.brand')};
    text-decoration: none;
    text-transform: uppercase;
    padding-bottom: 1px;
  }

  :hover {
    border-bottom: 2px solid ${themeGet('colors.accent')};
    background-color: ${themeGet('colors.brandLight')};
  }
`;

MenuItem.defaultProps = { as: 'li', alignItems: 'center' };

const Hamburger = styled(HamburgerButton)`
  display: inline-block;
  ${media.desktop`display: none;`}
`;

const Header = ({ menuStatus, toggleMenu, siteTitle, ...props }) => {
  const { checkout } = useContext(StoreContext);

  const itemsInCart = checkout.lineItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <HeaderRoot justifyContent="space-between" px={3} alignItems="center">
      <Hamburger
        width={28}
        rotate={0}
        height={18}
        color="#515151"
        isOpen={menuStatus === 'open'}
        strokeWidth={3}
        borderRadius={1}
        animationDuration={0.2}
        menuClicked={toggleMenu}
      />
      <HomeLink to="/">
        <Logo />
      </HomeLink>

      {/* <Menu as="ul">
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/">Top 10</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/">Discover</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/">Blog</Link>
        </MenuItem>
      </Menu> */}
      <div />
    </HeaderRoot>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
