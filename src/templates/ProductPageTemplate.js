import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import ProductPage from '../components/ProductPage';

const ProductPageTemplate = props => {
  const {
    data: { shopifyProduct: product }
  } = props;

  return <ProductPage product={product} />;
};

ProductPageTemplate.propTypes = {
  data: PropTypes.shape({
    shopifyProduct: PropTypes.object.isRequired
  }).isRequired
};

export default ProductPageTemplate;

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      variants {
        shopifyId
        title
        price
        availableForSale
      }
      images {
        id
        altText
        localFile {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
