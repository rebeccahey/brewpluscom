import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../components/shared/SEO';

import ProductPage from '../components/ProductPage';

const ProductPageTemplate = props => {
  const {
    data: { shopifyProduct: product }
  } = props;

  // Extract SEO meta fields
  const seo = {};
  if (product.metafields.length) {
    const seoMetafields = product.metafields.filter(
      field => field.namespace === 'seo'
    );
    seoMetafields.forEach(field => {
      seo[field.key] = field.value;
    });
  }

  return (
    <>
      <SEO
        title={seo.title || product.title}
        description={seo.description || product.description}
      />
      <ProductPage product={product} />
    </>
  );
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
      metafields {
        key
        value
        namespace
      }
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
