import React from 'react';
import PropTypes from 'prop-types';

import BlogpostItem from './BlogpostItem';

const BlogpostListing = ({ posts, zigzag }) => (
  <div>
    {posts.map(({ node }, i) => (
      <BlogpostItem
        key={node.id}
        title={node.data.title.text}
        image={node.data.image}
        excerpt={node.data.excerpt.text}
        slug={node.uid}
        reverse={zigzag ? i % 2 === 0 : false}
      />
    ))}
  </div>
);

BlogpostListing.propTypes = {
  posts: PropTypes.array.isRequired,
  zigzag: PropTypes.bool
};

BlogpostListing.defaultProps = {
  zigzag: false
};

export default BlogpostListing;
