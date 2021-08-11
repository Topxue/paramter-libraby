import './style/index.scss';

import FroalaEditor from 'froala-editor';
import 'froala-editor/js/languages/zh_cn';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/plugins/draggable.min';

import textTpl from './template/text';
import imageTemplate from './template/image';
import {select, selects} from './template/select';
import idCard from './template/id-card';

import MyText from './library/Text';
import MyImage from './library/Image';
import MySelect from './library/Select';
import MyIdNumber from './library/IDcard';

import Dom from './utils/Dom';
import {fonts, froalaConfig, libraryArray} from './config';

const catchMap = new Map();

class EditorLibrary {
  constructor() {
    this.Froala = null;

    // 当前选择元素
    this.target = null;

    this.initLibrary();
    this.initFroalaEditor();
    this.initTestDataEvent();
    this.initFontSizeSelect();
    this.initFontFamilySelect();
    this.initControlAttrEvent();
  }

  /**
   * 测试方法
   */
  initTestDataEvent() {
    document.querySelector('#submitData').addEventListener('click', () => {
      console.log(this.Froala.html.get())
    })

    document.querySelector('#insertData').addEventListener('click', () => {
      this.Froala.html.insert(textTpl);
    })


    document.querySelector('#registerEvent').addEventListener('click', () => {
      MyText.render({
        elem: '.my-text',
        done: function (value) {
          console.log(value)
        }
      })

      // 图片
      MyImage.render({
        elem: '#images',
        done: function (img) {
          console.log(img)
        }
      })

      // 单选
      MySelect.render({
        elem: '#select',
        data: [{id: '1', value: '测试'}, {id: 2, value: '单选'}],
        done: function (value) {
          console.log(value, 'select')
        }
      })

      // 多选
      MySelect.render({
        elem: '#selects',
        multiple: true,
        data: [{id: '1', value: '测试'}, {id: 2, value: '多选'}],
        done: function (value) {
          console.log(value, 'selects')
        }
      })

      // 身份证
      MyIdNumber.render({
        elem: '.param-person',
        done: function (idcard) {
          console.log(idcard, 'idcard')
        }
      })
    })

    console.log(this.Froala)
  }

  /**
   * 初始化字体
   */
  initFontFamilySelect() {
    const Fragment = document.createDocumentFragment();

    const label = Dom.create('<p>字体</p>');
    Fragment.append(label);

    const select = Dom.create('<select></select>');

    fonts.forEach(item => {
      const option = Dom.create(`<option style="font-family: ${item.font}" value="${item.font}">${item.fontName}</option>`);

      select.append(option);
    })

    Fragment.append(select);

    const fontContainer = Dom.find('.font-container')[0];

    fontContainer.append(Fragment);

    select.addEventListener('change', this.selectedFontFamily.bind(this));
  }

  /**
   * 初始化字体大小选择
   */
  initFontSizeSelect() {
    const Fragment = document.createDocumentFragment();
    const select = Dom.find('.font-size-select')[0];

    let count = 10;

    for (let i = 0; i < 22; i++) {
      let value = count += 2;
      const option = Dom.create(`<option value="${value}">${value}</option>`);

      Fragment.append(option);
    }

    select.append(Fragment);

    select.addEventListener('change', this.selectFontSize.bind(this));
  }

  /**
   * 初始化在线文本编辑器
   */
  initFroalaEditor() {
    const _this = this;
    this.Froala = new FroalaEditor('#center-container', {
      ...froalaConfig,
      events: {
        'click': function (event) {
          const isParameter = event.target.getAttribute('data-param-type');
          if (isParameter) {
            _this.target = event.target;
          }
        }
      }
    })

    window.$Froala = this.Froala;
  }


  /**
   * 初始化参数库
   */
  initLibrary() {
    const Fragment = document.createDocumentFragment();
    const libraryContainer = Dom.create(`<div class="library-container"></div>`);

    libraryArray.forEach(item => {
      const libraryItem = Dom.create(`<div data-param-type="${item.type}" class="library-item"><i class="fa ${item.iconClass}"></i><span>${item.label}</span></div>`);

      Fragment.append(libraryItem);
    })

    libraryContainer.append(Fragment);

    Dom.on(libraryContainer, 'click', this.inertLibraryTemp.bind(this));

    Dom.find('#control-panel')[0].append(libraryContainer);
  }

  /**
   * 插入参数库模板
   */
  inertLibraryTemp(event) {
    let target = event.target;

    if (target.tagName.toLowerCase() !== 'div') {
      target = target.parentNode
    }
    const paramType = target.getAttribute('data-param-type');

    this.insetTemplate(paramType)
  }

  insetTemplate(paramType) {
    const _this = this;
    const froala = _this.Froala;

    const func = {
      // 文本
      'text': () => froala.html.insert(textTpl),
      // 图片
      'image': () => froala.html.insert(imageTemplate),
      // 单选
      'select': () => froala.html.insert(select),
      // 多选
      'selects': () => froala.html.insert(selects),
      // 身份证
      'idCard': () => froala.html.insert(idCard().innerHTML),
      // 动态表格
      'table': () => {
        // froala.commands.tableInsert()
        // console.log(froala['commands.after'])
        // froala.commands.show();
        froala.table.insert(2, 5)
        // froala.popups.show('insert.table')
        // console.log(froala.popups.show('insert.table'))
      }
    }

    return func[paramType] && func[paramType]()
  }

  /**
   *  初始化参数设置属性事件
   */
  initControlAttrEvent() {
    // 参数名称
    Dom.getElem('#param-name').addEventListener('input', (event) => {
      catchMap.set('param-name', event.target.value);

      this.updateAttr('placeholder', event.target.value);
    });

    // 默认值
    Dom.getElem('#default-value').addEventListener('focus', (event) => {
      const Max = catchMap.get('max-length');
      Max && event.target.setAttribute('maxlength', Max);
    });
    Dom.getElem('#default-value').addEventListener('input', (event) => {
      catchMap.set('default-value', event.target.value);

      this.updateAttr('value', event.target.value);
    });

    // 字符限制
    Dom.getElem('#max-length').addEventListener('input', (event) => {
      catchMap.set('max-length', event.target.value);

      this.updateAttr('data-max-len', event.target.value);
    });

    // 字体粗细
    Dom.getElem('#font-weight').addEventListener('change', (event) => {
      const selectedIndex = event.target.selectedIndex, options = event.target.children;

      this.target.style.fontWeight = options[selectedIndex].value;
    })

    // 字体颜色
    Dom.getElem('#select-color').addEventListener('change', (event) => {
      this.target.style.color = event.target.value;
    })
  }

  /**
   * 更新属性值
   * @param attr
   * @param value
   */
  updateAttr(attr, value) {
    return this.target.setAttribute(attr, value);
  }

  /**
   * 字体选择
   */
  selectedFontFamily(event) {
    const selectIndex = event.target.selectedIndex, value = fonts[selectIndex];

    this.target.style.fontFamily = value.font;
  }

  /**
   * 字体大小选择
   */
  selectFontSize(event) {
    const selectIndex = event.target.selectedIndex, options = event.target.children;

    const value = +options[selectIndex].value;

    this.target.style.fontSize = value + 'px';
  }

}


new EditorLibrary()
