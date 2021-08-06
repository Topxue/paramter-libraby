/** Created by xwp on 2021-08-04 **/


/**
 * 文本编辑器配置
 */
export const froalaConfig = {
  language: 'zh_cn',
  height: 800,
  // fontSizeDefaultSelection: '14',
  // fontSize: ['12', '14', '18', '30', '60', '96'],
  // fontFamily: {
  //   'Arial,Helvetica,sans-serif': 'Font 1',
  //   'Impact,Charcoal,sans-serif': 'Font 2',
  // },
  quickInsertEnabled: false,
  // toolbarButtons: ['undo', 'redo', 'eraser', '|', 'bold', 'clear', 'insert', 'insertTable', 'insertImage', 'fontFamily'],
  // toolbarContainer: '#toolbarContainer',
  // formEditButtons: [],
  imageEditButtons: [],
  // fontFamilySelection: true,
}

/**
 * 参数库测试数据
 */
export const libraryArray = [
  {
    type: 'text',
    label: '文本',
    iconClass: 'fa fa-text-width'
  },
  {
    type: 'image',
    label: '图片',
    iconClass: 'fa fa-image'
  },
  {
    type: 'date',
    label: '日期',
    iconClass: 'fa fa-calendar'
  },
  {
    type: 'select',
    label: '单选',
    iconClass: 'fa fa-check-circle'
  },
  {
    type: 'selects',
    label: '多选',
    iconClass: 'fa fa-check-square'
  },
  {
    type: 'idCard',
    label: '身份证',
    iconClass: 'fa fa-id-card'
  }
]
