import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';

import { Flex, Box } from '../shared/Elements';
import { Button } from '../shared/Buttons';

const BlogpostItem = ({ title, image, excerpt, slug, reverse }) => (
  <Flex
    flexDirection={['column', 'column', reverse ? 'row-reverse' : 'row']}
    alignItems="center"
  >
    <Box width={[1, 1, 1 / 2]} p={[0, 0, 3]}>
      <Image fluid={image.localFile.childImageSharp.fluid} alt={image.alt} />
    </Box>
    <Box width={[1, 1, 1 / 2]} p={3}>
      <h2>{title}</h2>
      <p>{excerpt}</p>
      <Button to={`/blog/${slug}`}>Read more</Button>
    </Box>
  </Flex>
);

BlogpostItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  reverse: PropTypes.bool
};

BlogpostItem.defaultProps = {
  reverse: false
};

export default BlogpostItem;
