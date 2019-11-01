import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import CollectionPage from '../components/CollectionPage';

const ProductPageTemplate = props => {
  const {
    data: { shopifyCollection: collection }
  } = props;

  return <CollectionPage collection={collection} />;
};

ProductPageTemplate.propTypes = {
  data: PropTypes.shape({
    shopifyCollection: PropTypes.object.isRequired
  }).isRequired
};

export default ProductPageTemplate;

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      description
      products {
        id
        title
        handle
        description
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
              fluid(maxWidth: 910, maxHeight: 910) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
