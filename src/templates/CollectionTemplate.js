import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import CollectionPage from '../components/CollectionPage';

const CollectionPage2Template = ({ data }) => {
  const { prismicCollection, shopifyCollection } = data;

  return (
    <CollectionPage
      prismicCollection={prismicCollection}
      shopifyCollection={shopifyCollection}
    />
  );
};

CollectionPage2Template.propTypes = {
  data: PropTypes.object.isRequired
};

export default CollectionPage2Template;

export const query = graphql`
  query CollectionBySlug($uid: String!, $handle: String!) {
    prismicCollection(uid: { eq: $uid }) {
      id
      data {
        handle
        title
        subtitle
        overview {
          html
        }
        image {
          alt
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
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
