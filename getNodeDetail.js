import R from 'ramda';

/**
 * Given a predicate node, find the node in the tree.
 * @param treeData - [ { id: foo, childList: [{ id: bar }, { id: bloop }] } ]
 * @param selectedNode - { id: bar }
 */
export default function getNode(treeData, selectedNode) {
  let node = null;

  // If selected node is a root node, then return parent as null.
  if (R.find(R.propEq('id', selectedNode.id))(treeData)) {
    return node;
  }

  function traverseTree(tree, predicate) {
    for(let i = 0; i < tree.length; i++) {
      if (R.has('childList', tree[i])) {
        node = R.find(R.propEq('id', predicate))(tree[i].childList);

        if (!R.isNil(node)) {
          break;
        }

        traverseTree(tree[i].childList, predicate)
      }
    }
  }

  traverseTree(treeData, selectedNode.id);

  return node;
}
