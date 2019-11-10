import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import ProductListingItem from './ProductListingItem';
import { Flex } from '../shared/Elements';

const ProductListing = () => (
  <StaticQuery
    query={queryListProducts}
    render={({ products }) => (
      <Flex flexWrap="wrap">
        {products.edges.map(({ node: product }) => (
          <ProductListingItem key={product.id} product={product} />
        ))}
      </Flex>
    )}
  />
);

export default ProductListing;

const queryListProducts = graphql`
  query ProductListingQuery {
    products: allShopifyProduct(
      sort: { fields: [publishedAt], order: ASC }
      filter: { tags: { eq: "popular" } }
    ) {
      edges {
        node {
          id
          handle
          title
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
  }
`;
