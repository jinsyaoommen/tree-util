import R from 'ramda';

/**
 * Given a predicate node, find the parent node.
 * @param treeData - [ { id: foo, childList: [{ id: bar }, { id: bloop }] } ]
 * @param selectedNode - { id: bar }
 */
export default function getParentNode(treeData, selectedNode) {
  let parent = null;

  // If selected node is a root node, then return parent as null.
  if (R.find(R.propEq('id', selectedNode.id))(treeData)) {
    return parent;
  }

  function traverseTree(tree, predicate) {
    for(let i = 0; i < tree.length; i++) {
      if (R.has('childList', tree[i]) && R.find(R.propEq('id', predicate))(tree[i].childList)) {
        parent = { [tree[i].id]: tree[i] };
        break;
      }

      if (R.has('childList', tree[i])) {
        traverseTree(tree[i].childList, predicate)
      }
    }
  }

  traverseTree(treeData, selectedNode.id);

  return parent;
}
