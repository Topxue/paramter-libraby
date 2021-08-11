/** Created by xwp on 2021-08-06 **/

// 数字正则
const Reg = /^[0-9]+.?[0-9]*$/;

class MyIdNumber {
  constructor() {
    this.props = {};
    // 当前选择的元素目标
    this.target = null;
  }

  /**
   * 渲染函数
   * @param elem 绑定元素目标
   */
  render(props = {}) {
    if (JSON.stringify(props) === '{}') return;

    this.props = props;

    this.initEvent();
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

    // window.$Froala.events = {
    //   'contentChanged': function () {
    //     console.log('    console.log(window.$Froala.events[\'contentChanged\'])\n')
    //   }
    // }
  }

  /**
   * 获取身份证号
   */
  getIdCardNumber() {
    const {done} = this.props;

    const target = this.target;

    const inputs = [...target.parentNode.children];

    const value = inputs.map(element => element.value).join('');

    done && done(value);
  }

  /**
   * 键盘抬起事件
   */
  handleKeyUp(event) {
    const target = event.target;

    this.target = target;

    this.getIdCardNumber();

    if (!Reg.test(event.key)) return;

    target.value = +event.key;
    target.setAttribute('value', +event.key);

    target.nextSibling && target.nextSibling.focus();

  }

  /**
   * 键盘按下事件
   * @param event
   */
  handleKeyDown(event) {
    const target = event.target;

    if (event.code === 'Backspace') {
      if (target.value) {
        target.value = '';
        target.setAttribute('value', '');
      }

      target.previousSibling && target.previousSibling.focus();
    }

  }
}

export default new MyIdNumber;
