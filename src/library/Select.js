/** Created by xwp on 2021-08-04 **/

import '../customPopups/select';
import {sibling} from '../utils';

const SELECT_ACTIVE = 'active-select';
const SELECT_OPTION_CLASSNAME = 'select-item-x';
const SELECT_CONTAINER_CLASSNAME = 'select-item-warper-x';

class MySelect {
  constructor(props) {
    this.props = {
      ...props,
      // 默认单选
      multiple: false
    };
    // 当前触发元素
    this.currentTrigger = null;
    // 多选value值
    this.multiples = [];

    this.render(props);
  }


  /**
   * 渲染函数
   * @param props
   * @param {Array} data 下拉列表数据
   * @param {boolean} multiple 是否多选
   * @param {Function} done Callback
   */
  render(props = {}) {
    if (JSON.stringify(props) === '{}') return;

    this.props = props;

    this.initEvent();

    if (this.props?.data.length) {
      this.initPopups(this.getSelectOptions());
      this.initSelectedEvent();
    }

    console.log(props)
  }

  /**
   * 获取下拉列表
   */
  getSelectOptions() {
    const data = this.props.data;

    const outWarper = document.createElement('div');

    const selectContainer = document.createElement('ul');
    selectContainer.className = SELECT_CONTAINER_CLASSNAME;

    const Fragment = document.createDocumentFragment();

    data.forEach(list => {
      const option = document.createElement('li');
      option.className = SELECT_OPTION_CLASSNAME;
      option.setAttribute('data-id', list.id);
      option.innerHTML = list.value;

      Fragment.append(option);
    })

    selectContainer.append(Fragment);

    outWarper.append(selectContainer);

    return outWarper;
  }

  /**
   * 初始化Popups内容
   */
  initPopups(customLayer) {
    return window.$Froala['customSelect'].initPopup(customLayer.innerHTML);
  }

  /**
   * 初始化事件
   */
  initEvent() {
    const selects = document.querySelectorAll(this.props.elem);

    selects.forEach(element => {
      element.addEventListener('click', this.handlePopups.bind(this));
    })
  }

  /**
   * Popup事件
   */
  handlePopups(event) {
    this.currentTrigger = event.target;

    this.setEchoSelectOption(event.target);

    window.$Froala['customSelect'].showPopup(event);
  }

  /**
   * 初始化下拉选择事件
   */
  initSelectedEvent() {
    const selectContainers = document.querySelectorAll('.' + SELECT_CONTAINER_CLASSNAME);
    if (!selectContainers?.length) return;

    const current = selectContainers[selectContainers.length - 1];

    current.addEventListener('click', this.selectedOption.bind(this));
  }

  /**
   * 下拉选中事件
   */
  selectedOption(event) {
    const target = event.target;

    if (target.tagName.toLowerCase() !== 'li') return;

    const {done} = this.props;

    // 是否多选
    const isMultiple = this.currentTrigger.getAttribute('multiple');

    if (!isMultiple) {
      this.singleChoice(target);
      window.$Froala['customSelect'].hidePopup();
    } else {
      this.multipleChoice(target);
    }

    done && done(this.multiples);
  }

  /**
   * 单选
   */
  singleChoice(target) {
    target.classList.add(SELECT_ACTIVE);

    const siblings = sibling(target);
    siblings.forEach(element => {
      element.classList.remove(SELECT_ACTIVE);
    })

    this.currentTrigger.setAttribute('value', target.innerHTML);

    this.multiples = [target.innerHTML];

    return this.multiples;
  }

  /**
   * 多选
   */
  multipleChoice(target) {
    if (target.classList.contains(SELECT_ACTIVE)) {
      const index = [].indexOf.call(this.multiples, target.innerHTML);
      this.multiples.splice(index, 1);

      target.classList.remove(SELECT_ACTIVE);
    } else {
      this.multiples.push(target.innerHTML);

      target.classList.add(SELECT_ACTIVE);
    }

    this.currentTrigger.setAttribute('value', this.multiples.join());

    return this.multiples;
  }

  /**
   * 下拉数据回显
   */
  setEchoSelectOption(target) {
    let values = target.value;
    if (values) {
      values = values.split(',')
    } else {
      values = [];
    }

    this.multiples = values;

    const selectors = [...document.querySelector('.' + SELECT_CONTAINER_CLASSNAME).children];

    if (selectors?.length) {
      selectors.forEach(element => {
        if (values.includes(element.innerHTML)) {
          if (!element.classList.contains(SELECT_ACTIVE)) {
            element.classList.add(SELECT_ACTIVE);
          }
        } else {
          element.classList.remove(SELECT_ACTIVE);
        }
      })
    }
  }

}

// export default new MySelect;

export default MySelect;
