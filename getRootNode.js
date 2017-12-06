import R from 'ramda';

/**
 * Given a predicate node, find the root node.
 * @param treeData - [ { id: foo, childList: [{ id: bar }, { id: bloop }] } ]
 * @param selectedNode - 'bar'
 */
export default function getRootNode(treeData, selectedNode) {
  let parent = null;

  // If selected node is a root node, then return parent as null.
  if (R.find(R.propEq('id', selectedNode))(treeData)) {
    return parent;
  }

  function treeWalk(tree, predicate) {
    for(let i = 0; i < tree.length; i++) {
      if (R.has('childList', tree[i]) && R.find(R.propEq('id', predicate))(tree[i].childList)) {
        parent = tree[i].id;
        break;
      }

      if (R.has('childList', tree[i])) {
        treeWalk(tree[i].childList, predicate)
      }
    }
  }

  treeWalk(treeData, selectedNode);

  // If the parent is root node, return parent
  if (R.find(R.propEq('id', parent))(treeData)) {
    return parent;
  }

  // else recurse and find root node with current parent as the predicate
  return getRootNode(treeData, parent);
}
