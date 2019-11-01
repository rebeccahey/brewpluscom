import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import Carousel from 'nuka-carousel';

import { Flex, Box } from './shared/Elements';
import ProductForm from './ProductForm';
import { ProductSpecs } from './ProductDetails';

const ProductPage = ({ product }) => {
  const { title, description, descriptionHtml, images } = product;

  return (
    <Flex>
      <Flex width={1 / 2} justifyContent="center" alignItems="flex-start">
        <Carousel width="400px">
          {images.map(image => (
            <Image
              key={image.id}
              fluid={image.localFile.childImageSharp.fluid}
              alt={image.altText}
            />
          ))}
        </Carousel>
      </Flex>
      <Box width={1 / 2} px={4}>
        <ProductSpecs title={title} description={descriptionHtml} isHtml />
        <ProductForm id={product.id} variants={product.variants} />
      </Box>
    </Flex>
  );
};

ProductPage.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductPage;
