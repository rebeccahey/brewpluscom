import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import styled from '@emotion/styled';

import { ProductListingItem } from './ProductListing';
import { Flex, Box, Text } from './shared/Elements';

const ImageWrapper = styled(Box)`
  & > .gatsby-image-wrapper {
    height: 300px;
  }
`;

const CollectionPage = ({ prismicCollection, shopifyCollection }) => {
  const { products } = shopifyCollection;
  const {
    data: { title, subtitle, image }
  } = prismicCollection;

  return (
    <>
      <ImageWrapper width={1}>
        <Image fluid={image.localFile.childImageSharp.fluid} alt={image.alt} />
      </ImageWrapper>

      <Box mb={10} maxWidth="70%" mx="auto">
        <Text as="h1" color="brand" textAlign="center">
          {title}
        </Text>
        <Text as="p" color="text" textAlign="center">
          {subtitle}
        </Text>
      </Box>
      <Flex flexWrap="wrap">
        {products.map(product => (
          <ProductListingItem key={product.id} product={product} />
        ))}
      </Flex>
    </>
  );
};

CollectionPage.propTypes = {
  prismicCollection: PropTypes.object.isRequired,
  shopifyCollection: PropTypes.object.isRequired
};

export default CollectionPage;
