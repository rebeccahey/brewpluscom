import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import { Flex, Box, Text } from './shared/Elements';

const ImageWrapper = styled(Box)`
  margin-right: 0;
  margin-bottom: 16px;

  @media (min-width: ${themeGet('bpAliases.desktop')}) {
    margin-right: 16px;
    margin-bottom: 0;
  }
`;

const Instagram = () => {
  const { allInstaNode } = useStaticQuery(
    graphql`
      query {
        allInstaNode(limit: 4) {
          edges {
            node {
              id
              localFile {
                childImageSharp {
                  fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
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
    <Flex
      bg="light"
      p={10}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box mb={[5, 5, 5]} maxWidth={['100%', '100%', '50%']}>
        <Text fontSize={[2, 2, 3]} textAlign="center">
          Made by Brewers for Brewers
        </Text>
        <Text textAlign="center">
          All our products are designed by an experienced brewer with decades of experience in one of the worlds most well respected micro breweries.
        </Text>
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection={['column', 'column', 'row']}
      >
        {allInstaNode.edges.map(({ node }) => (
          <ImageWrapper key={node.id} width={200} height={200}>
            <Image fixed={node.localFile.childImageSharp.fixed} />
          </ImageWrapper>
        ))}
      </Flex>
    </Flex>
  );
};

export default Instagram;
