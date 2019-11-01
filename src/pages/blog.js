import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import SEO from '../components/shared/SEO';
import BlogpostListing from '../components/Blog/BlogpostListing';
import { Text } from '../components/shared/Elements';

const BlogPage = ({ data }) => {
  const {
    allPrismicBlogpost: { edges: posts }
  } = data;

  return (
    <>
      <SEO title="Blog" />
      <Text as="h1" textAlign="center">
        Blog
      </Text>
      <BlogpostListing posts={posts} />
    </>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    allPrismicBlogpost: PropTypes.object.isRequired
  }).isRequired
};

export default BlogPage;

export const query = graphql`
  query BlogIndexQuery {
    allPrismicBlogpost(sort: { fields: first_publication_date, order: DESC }) {
      edges {
        node {
          id
          uid
          first_publication_date
          data {
            title {
              text
            }
            excerpt {
              text
            }
            image {
              alt
              copyright
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
