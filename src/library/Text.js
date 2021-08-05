/** Created by xwp on 2021-08-04 **/

class MyText {
  constructor() {
    this.props = {}
  }

  /**
   * 渲染函数
   * @param props
   * @param elem 绑定元素目标
   * @param done 回调函数
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
    const targets = document.querySelectorAll(this.props.elem);

    targets.forEach(element => {
      element.addEventListener('input', this.handleOninput.bind(this))
    })
  }

  /**
   * input事件
   */
  handleOninput(event) {
    const {done} = this.props;
    const target = event.target;

    target.setAttribute('value', target.value)

    done && done(target.value)
  }
}


export default new MyText;

