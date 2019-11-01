import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';
import { Link } from 'gatsby';

import { Flex, Box, Text } from '../shared/Elements';
import CollectionsMenu from './CollectionsMenu';
import { media } from '../../utils/media';
import theme from '../../tokens/theme';

const SideBarRoot = styled(Box)`
  position: fixed;
  top: ${themeGet('dimensions.headerHeight')};
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow-y: auto;
  z-index: 10;
  background-color: ${themeGet('colors.brand')};

  transform: translateX(-100%);
  transition: transform 0.1s ease-in-out;
  will-change: transform;

  &.open {
    transform: translateX(0%);
  }

  &.closed {
    transform: translateX(-100%);
  }

  ${media.desktop`
    width: ${theme.dimensions.sideBarWidth};
    transform: translateX(0%);
    transition: 0s;

    &.closed {
      transform: translateX(0%);
    }
  `}
`;

const Caption = styled('div')`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 20px;
  color: ${themeGet('colors.text')};
  text-align: center;
  margin-top: 16px;
  color: ${themeGet('colors.lightest')};

  ${media.desktop`
    color: #fff;
    background-color: #d7d7d;
    text-align: left;
    margin-top: 0;
  `}
`;

const PageLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
  text-transform: uppercase;
  color: ${themeGet('colors.lightest')};
  background-color: ${themeGet('colors.brand')};

  &:hover {
    background-color: ${themeGet('colors.grey')};
  }

  ${media.desktop`
    text-align: left;
    text-transform: none;
  `}
`;

const SideBar = ({ status }) => {
  const [className, setClassName] = useState('closed');
  useEffect(() => {
    setClassName(status);
  }, [status]);

  return (
    <SideBarRoot className={className}>
      <Caption>Collections</Caption>
      <CollectionsMenu />
      <PageLink to="/">Home</PageLink>
      <PageLink to="/">FAQ</PageLink>
      <PageLink to="/">About</PageLink>
      <PageLink to="/blog">Blog</PageLink>
    </SideBarRoot>
  );
};

export default SideBar;
