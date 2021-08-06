/** Created by xwp on 2021-08-06 **/

import Dom from '../utils/Dom';

/**
 * 创建身份证模板
 */
function idCard() {
  const outWarper = Dom.create('<div></div>');

  const Fragment = document.createDocumentFragment();

  const span = Dom.create(`<span class="param-person" id="idCard" contenteditable="false" data-param-type="idCard"></span>&nbsp;`)

  for (let i = 0; i < 18; i++) {
    const input = Dom.create(`<input class="person-card-item" type="text" value="" maxlength="1">`);

    Fragment.append(input);
  }

  span.append(Fragment);

  outWarper.append(span);

  return outWarper;
}


export default idCard;
