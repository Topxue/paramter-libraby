/** Created by xwp on 2021-08-04 **/

// import '../customPopups/select';
import {sibling} from '../utils';

const SELECT_ACTIVE = 'active-select';
const SELECT_OPTION_CLASSNAME = 'select-item-x';
const SELECT_CONTAINER_CLASSNAME = 'select-item-warper-x';

const classList = [SELECT_OPTION_CLASSNAME, SELECT_CONTAINER_CLASSNAME, 'select-focus', 'select-input'];

class MySelect {
  constructor(props) {
    this.props = {
      ...props,
      // 默认单选
      multiple: false
    };
    // 当前触发元素
    // 多选value值
    this.currentTrigger = null;
    this.multiples = [];

    this.render(props);

    this.globalEventLister();
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
  }

  /**
   * 全局事件监听
   */
  globalEventLister() {
    document.querySelector('body').addEventListener('click', (event) => {
      const target = event.target;

      if (!classList.includes(...target.classList)) {
        const selectContainers = document.querySelectorAll('.' + SELECT_CONTAINER_CLASSNAME);

        selectContainers.forEach(element => element.style.display = 'none');
      }
    })
  }

  /**
   * 初始化事件
   */
  initEvent() {
    const elem = document.querySelector(this.props.elem);
    if (!elem) return;

    this.currentTrigger = elem;

    const parentNode = elem.parentNode;

    parentNode.append(this.getSelectOptions());

    this.initSelectedEvent();

    elem.addEventListener('click', () => {
      this.showHidePopup('block')
    });
  }

  /**
   * 获取下拉列表
   */
  getSelectOptions() {
    const data = this.props.data;

    const selectContainer = document.createElement('ul');
    selectContainer.className = SELECT_CONTAINER_CLASSNAME;

    const Fragment = document.createDocumentFragment();

    data.forEach(list => {
      const option = document.createElement('li');
      option.className = SELECT_OPTION_CLASSNAME;
      option.innerHTML = list.value;
      option.contentEditable = 'false';
      option.setAttribute('data-id', list.id);

      Fragment.append(option);
    })

    selectContainer.append(Fragment);
    // 设置默认隐藏
    selectContainer.style.display = 'none';

    return selectContainer;
  }

  /**
   * 显示隐藏下拉
   */
  showHidePopup(state) {
    const elem = this.currentTrigger;

    const selectContainer = elem.parentNode.lastChild;
    if (selectContainer.classList.contains(SELECT_CONTAINER_CLASSNAME)) {
      selectContainer.style.display = state;
    }

    if (state === 'block') {
      console.log(document.querySelectorAll('.' + SELECT_CONTAINER_CLASSNAME));

      this.setPosition();
    }
  }

  /**
   * 设置定位
   */
  setPosition() {
    const elem = this.currentTrigger;

    const left = elem.offsetLeft;
    const top = elem.offsetTop + elem.offsetHeight;

    const selectContainer = elem.parentNode.lastChild;

    if (selectContainer.classList.contains(SELECT_CONTAINER_CLASSNAME)) {
      selectContainer.style.left = left + 'px';
      selectContainer.style.top = top + 'px';
    }
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

    const {done, multiple} = this.props;

    // 是否多选
    if (!multiple) {
      this.singleChoice(target);

      this.showHidePopup('none');
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


const select = {
  render(props) {
    return new MySelect(props);
  }
}

// export default new MySelect;

export default select;
