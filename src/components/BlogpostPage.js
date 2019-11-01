import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';

import { Box } from './shared/Elements';

const BlogpostPage = ({ post }) => {
  const {
    data: { title, image, body, author, categories }
  } = post;

  return (
    <Box>
      <Image fluid={image.localFile.childImageSharp.fluid} alt={image.alt} />
      <Box px={3}>
        <h1>{title.text}</h1>
        <div>by {author.document[0].data.name}</div>
        <div dangerouslySetInnerHTML={{ __html: body.html }} />
      </Box>
    </Box>
  );
};

BlogpostPage.propTypes = {
  post: PropTypes.object.isRequired
};

export default BlogpostPage;
