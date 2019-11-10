import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';
import { Link, useStaticQuery, graphql } from 'gatsby';

import { MdExpandMore } from 'react-icons/md';

import { media } from '../../utils/media';
import theme from '../../tokens/theme';
import {
  unflattenCollections,
  createCollectionsPaths
} from '../../utils/helpers';
import { Flex, Box } from '../shared/Elements';

const CollectionsMenuRoot = styled(Box)`
  width: 100%;
`;

const Menu = styled(Box)`
  width: 100%;
  color: ${themeGet('colors.brand')};
  background-color: ${themeGet('colors.lightest')};
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 16px;

  ${media.desktop`
    background-color: ${themeGet('colors.brandLight')};
    margin-top: 0;
  `}
`;

const Action = styled(Flex)`
  cursor: pointer;
  width: 2em;
  font-size: 24px;
  border-left: 1px solid #e2e2e2;

  &:hover {
    color: ${theme.colors.accent};
  }

  & > svg {
    transition: transform 0.25s;
    transform: rotate(${props => (props.open ? 180 : 0)}deg);
  }
`;

const Content = styled(Box)`
  max-height: ${props => (props.open ? '100vh' : '0')};
  background: white;
  transition: all 0.25s;
`;

const MenuItemHeader = styled(Flex)`
  ${media.desktop`
    border-bottom: 1px solid #e2e2e2;
  `}
`;

const MenuItem = styled(Box)`
  overflow: hidden;

  a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    justify-content: center;
    text-transform: uppercase;
    font-weight: bold;
  }

  ${media.desktop`
    // border-bottom: 1px solid #e2e2e2;

    &:hover {
      background-color: ${theme.colors.light};
    }

    a {
      justify-content: flex-start;
      text-transform: none;
      font-weight: 400;
    }

    & li {
      padding-left: 20px;
    }

    & li li {
      padding-left: 20px;
    }
  `}
`;

const CollectionsMenu = () => {
  const { allPrismicCollection } = useStaticQuery(
    graphql`
      query {
        allPrismicCollection {
          edges {
            node {
              id
              uid
              data {
                handle
                title
                parent {
                  document {
                    uid
                  }
                }
              }
            }
          }
        }
      }
    `
  );
  const collections = allPrismicCollection.edges.map(({ node }) => node);
  const collectionsTree = unflattenCollections(collections);
  const collectionsTreeWithPath = createCollectionsPaths(collectionsTree, '');

  return (
    <CollectionsMenuRoot>
      <RenderMenu collections={collectionsTreeWithPath} />
    </CollectionsMenuRoot>
  );
};

const RenderMenu = ({ collections }) => (
  <Menu as="ul">
    {collections.map(collection => (
      <CollectionMenuItem key={collection.id} collection={collection} />
    ))}
  </Menu>
);

RenderMenu.propTypes = {
  collections: PropTypes.array.isRequired
};

const CollectionMenuItem = ({ collection }) => {
  const hasChildren = collection.children && collection.children.length > 0;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <MenuItem as="li">
      <MenuItemHeader>
        <Box flex={1}>
          <Link to={`${collection.linkURL}`}>{collection.data.title}</Link>
        </Box>
        {hasChildren && (
          <Action
            alignItems="center"
            justifyContent="center"
            onClick={handleClick}
            open={open}
          >
            <MdExpandMore />
          </Action>
        )}
      </MenuItemHeader>
      {hasChildren && (
        <>
          <Content open={open}>
            <RenderMenu collections={collection.children} />
          </Content>
        </>
      )}
    </MenuItem>
  );
};

CollectionMenuItem.propTypes = {
  collection: PropTypes.object.isRequired
};

export default CollectionsMenu;
