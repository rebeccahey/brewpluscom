import React from 'react';
import PropTypes from 'prop-types';

const ProductSpecs = ({ title, description, isHtml }) => (
  <div>
    <h1>{title}</h1>
    {isHtml ? (
      <p dangerouslySetInnerHTML={{ __html: description }} />
    ) : (
      <p>{description}</p>
    )}
  </div>
);

ProductSpecs.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isHtml: PropTypes.bool
};

ProductSpecs.defaultProps = {
  isHtml: false
};

export default ProductSpecs;
