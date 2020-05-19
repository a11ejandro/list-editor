/* eslint no-param-reassign: [
  "error",
  {
    "props": true,
    "ignorePropertyModificationsFor": ["state"]
  }
] */

// Replase children with objects
export const childrenToTree = (state, children) => {
  const result = [];
  children.forEach((childId) => {
    const item = state[childId];
    const itemChildren = item.children;

    if (itemChildren && itemChildren.length !== 0) {
      result.push({ ...item, children: childrenToTree(state, itemChildren) });
    } else {
      result.push(item);
    }
  });

  return result;
};

export const removeChildren = (state, children) => {
  children.forEach((key) => {
    const item = state[key];
    const itemChildren = item.children;

    if (itemChildren && itemChildren.length !== 0) {
      removeChildren(state, itemChildren);
    }

    delete state[key];
  });

  return state;
};
