import './style/index.scss';

import FroalaEditor from 'froala-editor';
import 'froala-editor/js/languages/zh_cn';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/plugins/draggable.min';

import textTpl from './template/text';
import imageTemplate from './template/image';
import {select, selects} from './template/select'

import MyText from './library/Text';
import MyImage from './library/Image';
import MySelect from './library/Select';

import Dom from './utils/Dom';
import {libraryArray, froalaConfig} from './config';

class EditorLibrary {
  constructor() {
    this.Froala = null;

    this.initLibrary();
    this.initFroalaEditor();
    this.initTestDataEvent();
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
      // new MySelect().render({
      //   elem: '.select-input',
      //   data: [{id: '1', value: '测试'}, {id: 2, value: '测试1'}],
      //   done: function (value) {
      //     console.log(value, 'done...')
      //   }
      // })

      new MySelect({
        elem: '.select-input',
        data: [{id: '1', value: '测试'}, {id: 2, value: '测试1'}],
        done: function (value) {
          console.log(value, 'done...')
        }
      })

      // 多选
      // new MySelect({
      //   elem: '.select-input',
      //   // multiple: true,
      //   data: [{id: '1', value: '测试'}, {id: 2, value: '测试1'}],
      //   done: function (value) {
      //     console.log(value, 'done2...')
      //   }
      // })
      // new MySelect().render({
      //   elem: '.select-input',
      //   multiple: true,
      //   data: [{id: '1', value: '测试'}, {id: 2, value: '测试1'}],
      //   done: function (value) {
      //     console.log(value, 'done...')
      //   }
      // })
    })

    console.log(this.Froala)
  }

  /**
   * 初始化在线文本编辑器
   */
  initFroalaEditor() {
    this.Froala = new FroalaEditor('#center-container', {
      ...froalaConfig
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

    Dom.find('#right-container')[0].append(libraryContainer);
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
    }

    return func[paramType] && func[paramType]()
  }

}


new EditorLibrary()
