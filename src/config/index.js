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
  },
  {
    type: 'table',
    label: '动态表格',
    iconClass: 'fa fa-table'
  }
]

/**
 * 字体
 */
export const fonts = [
  {
    font: 'Microsoft YaHei',
    fontName: '微软雅黑'
  },
  {
    font: 'SimSun, STSong',
    fontName: '宋体'
  },
  {
    font: 'SimHei, STHeiti',
    fontName: '黑体'
  },
  {
    font: 'FangSong, STFangsong',
    fontName: '仿宋'
  },
  {
    font: 'KaiTi, STKaiti',
    fontName: '楷体'
  },
  {
    font: 'Arial',
    fontName: 'Arial'
  },
  {
    font: 'Georgia',
    fontName: 'Georgia'
  },
  {
    font: 'Impact',
    fontName: 'Impact'
  },
  {
    font: 'Tahoma',
    fontName: 'Tahoma'
  },
  {
    font: 'Times New Roman',
    fontName: 'Times New Roman'
  },
  {
    font: 'Verdana',
    fontName: 'Verdana'
  }
]
