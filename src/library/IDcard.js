/** Created by xwp on 2021-08-06 **/

// 数字正则
const Reg = /^[0-9]+.?[0-9]*$/;

class MyIdNumber {
  constructor() {
    this.props = {};

  }

  /**
   * 渲染函数
   * @param elem 绑定元素目标
   */
  render(props = {}) {
    if (JSON.stringify(props) === '{}') return;

    this.props = props;

    this.initEvent();
    console.log(props)
  }

  /**
   * 初始化事件
   */
  initEvent() {
    const elem = document.querySelectorAll(this.props.elem);

    elem.forEach(element => {
      element.addEventListener('keyup', this.handleKeyUp.bind(this));
      element.addEventListener('keydown', this.handleKeyDown.bind(this));
    })
  }

  /**
   * 键盘抬起事件
   */
  handleKeyUp(event) {
    const target = event.target;

    if (!Reg.test(event.key)) return;

    target.value = +event.key;
    target.setAttribute('value', +event.key);

    if (target.nextSibling) {
      target.nextSibling.focus();
    }
  }

  /**
   * 键盘按下事件
   * @param event
   */
  handleKeyDown(event) {
    const target = event.target;

    if (event.code === 'Backspace') {
      target.value = '';
      target.setAttribute('value', '');

      if (target.previousSibling) {
        target.previousSibling.focus();
      }
    }

  }
}

export default new MyIdNumber;
