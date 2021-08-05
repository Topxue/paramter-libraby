/** Created by xwp on 2021-08-04 **/
const custom_layer = '<div class="fr-popup fr-desktop fr-ltr fr-above fr-active" ><span class="fr-arrow" ></span>\n' +
  '                <div class="fr-image-upload-layer fr-active fr-layer">\n' +
  '                    <strong>拖入图片</strong>\n' +
  '                    <br>\n' +
  '                    或点击\n' +
  '                    <div class="fr-form">\n' +
  '                        <input id="fr-image-upload-input" type="file" accept="image/jpeg, image/jpg, image/png, image/gif" tabindex="-1" aria-labelledby="fr-image-upload-layer-5" role="button" dir="ltr" class="fr-not-empty upload-file-ipt">\n' +
  '                    </div>\n' +
  '                </div>\n' +
  '            <div class="fr-image-progress-bar-layer fr-layer"><h3 tabindex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabindex="2" role="button">OK</button></div></div></div>';

import FroalaEditor from 'froala-editor';

const COMMAND_NAME = 'customImage.popup'

FroalaEditor['POPUP_TEMPLATES'][COMMAND_NAME] = '[_CUSTOM_LAYER_]';

FroalaEditor['PLUGINS'].customImage = function (editor) {

  function initPopup() {

    const template = {
      custom_layer
    }


    let $popup = editor.popups.create(COMMAND_NAME, template)

    return $popup
  }

  function showPopup(event) {
    const target = event.target
    let $popup = editor.popups.get(COMMAND_NAME)

    if (!$popup) $popup = initPopup()

    editor.popups.setContainer(COMMAND_NAME, editor.$tb)

    const {left, top, bottom, width} = target.getBoundingClientRect()

    const scrollLeft = document.documentElement.scrollLeft, scrollTop = document.documentElement.scrollTop;

    const tops = top + (editor.opts.toolbarBottom ? 10 : top - 10)

    editor.popups.show(COMMAND_NAME, left - width + scrollLeft + 20, bottom + scrollTop + 5, tops)
  }

  // Hide the custom popup.
  function hidePopup() {
    editor.popups.hide(COMMAND_NAME)
  }

  return {
    showPopup,
    hidePopup
  }
}


