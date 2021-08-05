/**
 * 获取其他兄弟元素
 * @param elem
 * @returns {*[]}
 */
export function sibling(elem) {
  let r = [];
  let n = elem.parentNode.firstChild;
  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== elem) {
      r.push(n);
    }
  }
  return r
}
