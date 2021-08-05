/** Created by xwp on 2021-08-04 **/

import '../customPopups/image';

const UPLOAD_CONTAINER_ID = '#fr-image-upload-input';

class MyImage {
  constructor() {
    this.props = {};
  }

  /**
   * 渲染函数
   * @param props
   * @param elem 绑定元素目标
   * @param done Callback
   */
  render(props = {}) {
    if (JSON.stringify(props) === '{}') return;

    this.props = props;

    this.initEvent()
  }

  /**
   * 事件注册
   */
  initEvent() {
    const {elem} = this.props;

    const images = document.querySelectorAll(elem);

    images.forEach(element => {
      element.addEventListener('click', this.clickCurrentImage.bind(this));
    })

  }

  /**
   * 图片点击事件
   */

  clickCurrentImage(event) {
    window.$Froala['customImage'].showPopup(event);

    const uploadContainer = document.querySelector(UPLOAD_CONTAINER_ID);

    uploadContainer.addEventListener('change', this.uploadImageEvent.bind(this))
  }

  /**
   * 上传图片事件
   */
  uploadImageEvent(event) {
    const target = event.target;
    const done = this.props?.done;

    if (window.FileReader) {
      let reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onloadend = function (e) {
        const target = window.$Froala.image.get()[0];
        target.src = e.target.result;

        done && done(e.target.result);
      }

      window.$Froala['customImage'].hidePopup();
    }
  }
}

export default new MyImage;
