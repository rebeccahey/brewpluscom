import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import BlogpostListing from './BlogpostListing';

const LatestBlogposts = () => {
  const {
    allPrismicBlogpost: { edges: posts }
  } = useStaticQuery(
    graphql`
      query {
        allPrismicBlogpost(
          sort: { fields: first_publication_date, order: DESC }
          limit: 2
        ) {
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
    `
  );

  return (
    <>
      <BlogpostListing posts={posts} zigzag />
    </>
  );
};

export default LatestBlogposts;
