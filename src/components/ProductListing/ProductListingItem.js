import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { MdShoppingCart } from 'react-icons/md';
import { Button } from '../shared/Buttons';
import { Flex } from '../shared/Elements';
import { trimString } from '../../utils/helpers';

const DESCRIPTION_LIMIT = 90;
const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(Link)`
  background-color: ${props => props.theme.colors.lightest};
  border-radius: ${props => props.theme.radii[2]}px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: ${props => props.theme.space[2]};
  overflow: hidden;
  text-decoration: none;

  @media (min-width: ${props => props.theme.bpAliases.tablet}) {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
  }

  @media (min-width: ${props => props.theme.bpAliases.desktop}) {
    flex-basis: 300px;
    justify-content: center;
  }

  @media (hover: hover) {
    :hover {
      background: ${props => props.theme.colors.brandLighter};
    }
  }
`;

const Item = styled(`article`)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${props => props.theme.space[5]};
`;

const Preview = styled(`div`)`
  border-bottom: 1px solid ${props => props.theme.colors.brandLighter};
  border-radius: ${props => props.theme.radii[2]}px
    ${props => props.theme.radii[2]}px 0 0;
  margin: -${props => props.theme.space[5]};
  margin-bottom: ${props => props.theme.space[5]};
  overflow: hidden;
  position: relative;

  .gatsby-image-wrapper {
    transition: all ${TRANSITION_DURATION};
  }

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
`;

const Name = styled(`h1`)`
  color: ${props => props.theme.colors.brand};
  font-size: ${props => props.theme.fontSizes[3]};
  margin: 0;
`;

const Description = styled(`p`)`
  color: ${props => props.theme.colors.text};
  flex-grow: 1;
  font-size: ${props => props.theme.fontSizes[0]};
  line-height: 1.5;
`;

const Price = styled(`div`)`
  color: ${props => props.theme.colors.brand};
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.02em;

  span {
    color: ${props => props.theme.colors.textLight};
  }
`;

const ProductListingItem = props => {
  const {
    product: {
      title,
      handle,
      description,
      variants: [firstVariant],
      images: [firstImage]
    }
  } = props;

  const { price } = firstVariant;
  const {
    localFile: {
      childImageSharp: { fluid }
    }
  } = firstImage;

  return (
    <ProductListingItemLink to={`/product/${handle}`}>
      <Item>
        <Preview>
          <Image fluid={fluid} />
        </Preview>

        <Name>{title}</Name>
        <Description>{trimString(description, DESCRIPTION_LIMIT)}</Description>
        <Flex mt={3} justifyContent="space-between" alignItems="center">
          <Price>
            <span>USD</span> {price}
          </Price>
          <Button inverse>
            Add <MdShoppingCart />
          </Button>
        </Flex>
      </Item>
    </ProductListingItemLink>
  );
};

ProductListingItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductListingItem;
