import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { Flex, Box, Text } from './shared/Elements';
import { Button } from './shared/Buttons';
import {
  unflattenCollections,
  createCollectionsPaths,
  fetchFeaturedCollections
} from '../utils/helpers';

const Collection = ({ title, subtitle, image, linkURL }) => (
  <Flex
    flexDirection={['column', 'column', 'row']}
    alignItems="center"
    bg="light"
  >
    <Box width={[1, 1, 1 / 2]}>
      <Image fluid={image.localFile.childImageSharp.fluid} alt={image.alt} />
    </Box>
    <Flex
      width={[1, 1, 1 / 2]}
      p={3}
      alignItems="center"
      flexDirection="column"
    >
      <Text as="h2" textAlign="center">
        {title}
      </Text>
      <Text as="p" textAlign="center">
        {subtitle}
      </Text>
      <Button to={`/${linkURL}`} inverse>
        Shop now
      </Button>
    </Flex>
  </Flex>
);

const FeaturedCollections = () => {
  const { allPrismicCollection } = useStaticQuery(
    graphql`
      query {
        allPrismicCollection {
          edges {
            node {
              id
              uid
              data {
                featured
                handle
                title
                subtitle
                parent {
                  document {
                    uid
                  }
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
          }
        }
      }
    `
  );
  const collections = allPrismicCollection.edges.map(({ node }) => node);
  const collectionsTree = unflattenCollections(collections);
  const collectionsTreePath = createCollectionsPaths(collectionsTree, '');
  const featuredCollections = fetchFeaturedCollections(collectionsTreePath);

  return (
    <>
      {featuredCollections.map(collection => (
        <Collection
          key={collection.id}
          title={collection.data.title}
          subtitle={collection.data.subtitle}
          image={collection.data.image}
          linkURL={collection.linkURL}
        />
      ))}
    </>
  );
};

export default FeaturedCollections;
