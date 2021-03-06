import React from 'react';

import SEO from '../components/shared/SEO';
import ProductListing from '../components/ProductListing';
import LatestBlogposts from '../components/Blog/LatestBlogposts';
import FeaturedCollections from '../components/FeaturedCollections';

const IndexPage = () => (
  <>
    <SEO title="Brewing Equipment, Systems, Tanks & Fittings" />
    <FeaturedCollections />
    <ProductListing />
    <LatestBlogposts />
  </>
);

export default IndexPage;
