const DESCRIPTION_LIMIT = 90;

const trimString = (string, limit) => {
  if (string.length > limit) {
    return `${string.slice(0, limit).trim()}...`;
  }

  return string;
};

const unflattenCollections = (array, parent) => {
  let tree = [];
  const aParent = typeof parent !== 'undefined' ? parent : { uid: null };

  const children = array.filter(child =>
    aParent.uid
      ? child.data.parent && child.data.parent.document[0].uid === aParent.uid
      : child.data.parent === aParent.uid
  );

  if (children.length !== 0) {
    if (aParent.uid === null) {
      tree = children;
    } else {
      aParent.children = children;
    }
    children.forEach(child => unflattenCollections(array, child));
  }

  return tree;
};

const createCollectionsPaths = (array, root) =>
  array.map(collection => {
    const collectionPath = `${root}/${collection.uid}`;
    collection.linkURL = collectionPath;
    if (collection.children && collection.children.length > 0) {
      collection.children = createCollectionsPaths(
        collection.children,
        collectionPath
      );
    }
    return collection;
  });

const fetchFeaturedCollections = array => {
  const result = [];
  array.forEach(item => {
    if (item.data.featured === 'Yes') {
      result.push(item);
    }
    if (item.children && item.children.length > 0) {
      result.push(...fetchFeaturedCollections(item.children));
    }
  });
  return result;
};

module.exports = {
  trimString,
  unflattenCollections,
  createCollectionsPaths,
  fetchFeaturedCollections
};
