import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import Carousel from 'nuka-carousel';

import { Flex, Box } from './shared/Elements';
import ProductForm from './ProductForm';
import { ProductSpecs } from './ProductDetails';

const ProductPage = ({ product }) => {
  const { title, description, descriptionHtml, images, reverse } = product;

  return (
    <Flex
      flexDirection={['column', 'column', reverse ? 'row-reverse' : 'row']}
      alignItems="left"
    >
      <Box width={[1, 1, 1 / 2]} p={[0, 0, 3]}>
      <Carousel>
          {images.map(image => (
            <Image
              key={image.id}
              fluid={image.localFile.childImageSharp.fluid}
              alt={image.altText}
            />
          ))}
        </Carousel>
        </Box>
        <Box width={[1, 1, 1 / 2]} p={3}>
        <ProductSpecs title={title} />
        <ProductForm id={product.id} variants={product.variants} />
        <ProductSpecs description={descriptionHtml} isHtml />
      </Box>
    </Flex>

  );
};

ProductPage.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductPage;
