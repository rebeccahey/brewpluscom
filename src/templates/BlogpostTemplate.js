import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import BlogpostPage from '../components/BlogpostPage';

const BlogpostTemplate = ({ data }) => {
  const { prismicBlogpost: post } = data;

  return <BlogpostPage post={post} />;
};

BlogpostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default BlogpostTemplate;

export const query = graphql`
  query PostBySlug($uid: String!) {
    prismicBlogpost(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        body {
          html
        }
        excerpt {
          text
        }
        image {
          alt
          copyright
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        author {
          document {
            data {
              name
            }
          }
        }
        categories {
          category {
            document {
              data {
                name
              }
            }
          }
        }
      }
    }
  }
`;
