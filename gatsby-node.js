const path = require('path');
const helpers = require('./src/utils/helpers');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
      allPrismicBlogpost {
        edges {
          node {
            id
            uid
          }
        }
      }
      allPrismicCollection {
        edges {
          node {
            id
            uid
            data {
              handle
              parent {
                document {
                  uid
                }
              }
            }
          }
        }
      }
    }
  `);

  const productPageTemplate = path.resolve(
    './src/templates/ProductPageTemplate.js'
  );
  const collectionPageTemplate = path.resolve(
    './src/templates/CollectionPageTemplate.js'
  );
  const blogPostTemplate = path.resolve('./src/templates/BlogpostTemplate.js');

  const collectionTemplate = path.resolve(
    './src/templates/CollectionTemplate.js'
  );

  // Create Product pages
  pages.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/product/${node.handle}`,
      component: productPageTemplate,
      context: {
        id: node.id,
        handle: node.handle
      }
    });
  });

  // Create Blog post pages
  pages.data.allPrismicBlogpost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.uid}`,
      component: blogPostTemplate,
      context: {
        uid: node.uid
      }
    });
  });

  // pages.data.allPrismicCollection.edges.forEach(({ node }) => {
  //   createPage({
  //     path: `/c/${node.uid}`,
  //     component: collectionTemplate,
  //     context: {
  //       uid: node.uid,
  //       handle: node.data.handle
  //     }
  //   });
  // });

  const collections = pages.data.allPrismicCollection.edges.map(
    ({ node }) => node
  );
  const collectionsTree = helpers.unflattenCollections(collections);

  const createCollectionsPages = (elements, root) => {
    elements.forEach(collection => {
      const collectionPath = `${root}/${collection.uid}`;
      createPage({
        path: collectionPath,
        component: collectionTemplate,
        context: {
          uid: collection.uid,
          handle: collection.data.handle
        }
      });
      if (collection.children && collection.children.length > 0) {
        createCollectionsPages(collection.children, collectionPath);
      }
    });
  };

  createCollectionsPages(collectionsTree, '');
};
