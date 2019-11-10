const DESCRIPTION_LIMIT = 90;

const trimString = (string, limit) => {
  if (string.length > limit) {
    return `${string.slice(0, limit).trim()}...`;
  }

  return string;
};

// TODO: Dummy deep copy implementation.
const deepCopy = obj => JSON.parse(JSON.stringify(obj));

const unflattenCollections = (array, parent) => {
  let tree = [];
  const aParent = typeof parent !== 'undefined' ? parent : { uid: null };

  const children = array.filter(child =>
    aParent.uid
      ? child.data.parent && child.data.parent.document[0].uid === aParent.uid
      : child.data.parent === aParent.uid
  );

  if (children.length !== 0) {
    // Create a copy of children
    const newChildren = deepCopy(children);
    if (aParent.uid === null) {
      tree = newChildren;
    } else {
      aParent.children = newChildren;
    }
    newChildren.forEach(child => unflattenCollections(array, child));
  }

  return tree;
};

const createCollectionsPaths = (array, root) =>
  array.map(collection => {
    const newCollection = deepCopy(collection);
    const collectionPath = `${root}/${newCollection.uid}`;
    newCollection.linkURL = collectionPath;
    if (newCollection.children && newCollection.children.length > 0) {
      newCollection.children = createCollectionsPaths(
        newCollection.children,
        collectionPath
      );
    }
    return newCollection;
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
