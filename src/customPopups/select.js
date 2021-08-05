/** Created by xwp on 2021-08-04 **/

import FroalaEditor from 'froala-editor';

const COMMAND_NAME = 'customSelect.popup';

FroalaEditor['POPUP_TEMPLATES'][COMMAND_NAME] = '[_CUSTOM_LAYER_]';

FroalaEditor['PLUGINS'].customSelect = function (editor) {
  const $ = editor.$;

  function initPopup(custom_layer) {
    const template = {
      custom_layer
    }

    const $popup = editor.popups.create(COMMAND_NAME, template)

    return $popup
  }

  function showPopup(event) {
    const target = event.target
    let $popup = editor.popups.get(COMMAND_NAME)

    if (!$popup) $popup = initPopup()

    editor.popups.setContainer(COMMAND_NAME, editor.$tb)

    const {left, top, bottom} = target.getBoundingClientRect()

    const scrollLeft = document.documentElement.scrollLeft, scrollTop = document.documentElement.scrollTop;

    const tops = top + (editor.opts.toolbarBottom ? 10 : top - 10)

    editor.popups.show(COMMAND_NAME, left + scrollLeft, bottom + scrollTop + 5, tops)
  }

  function hidePopup() {
    editor.popups.hide(COMMAND_NAME)
  }

  return {
    initPopup,
    showPopup,
    hidePopup
  }
}


