<template>
  <div class="home">
    <p>v4版本</p>
    <button type="button" class="btn" @click="getEditorData">
      获取当前内容
    </button>
    <div id="demo1"></div>
  </div>
</template>

<script>
// 引入 wangEditor
import WangEditor from 'wangeditor'
import createKityformula from './components/kityformula'

export default {
  data () {
    return {
      dbClickImgLatex: '',
      editor: null,
      editorData: ''
    }
  },
  mounted () {
    const editor = new WangEditor('#demo1')
    // editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']
    const { PanelMenu, Panel } = WangEditor
    class Kityformula extends PanelMenu {
      // 公式输入插件
      constructor (editors) {
        const $elem = WangEditor.$(
          '<div id=\'kityformulaKey\' class=\'w-e-menu\'>公式</div>'
        )
        super($elem, editors)
      }

      // 菜单点击事件
      clickHandler () {
        const conf = createKityformula(editor)
        const panel = new Panel(this, conf)
        panel.create()
      }

      tryChangeActive () {} // 必须有，不然报错
    }

    // 注册菜单
    const kityformulaKey = 'kityformulaKey' // 菜单 key ，各个菜单不能重复
    editor.menus.extend('kityformulaKey', Kityformula)
    editor.config.placeholder = ''
    // 将菜单加入到 editor.config.menus 中
    // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
    editor.config.menus = editor.config.menus.concat(kityformulaKey)
    editor.config.uploadImgShowBase64 = true
    editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      this.editorData = newHtml
    }

    editor.txt.eventHooks.imgClickEvents.push(this.imgClick)
    window.addEventListener('dblclick', function (e) {
      this.dbclick(e)
    }.bind(this))

    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    getEditorData () {
      // 通过代码获取编辑器内容
      const data = this.editor.txt.html()
      console.log('data', data)
    },
    dbclick (e) {
      let { target } = e
      // 双击图片
      if (target.className === 'w-e-img-drag-mask') {
        sessionStorage.setItem('Latex', this.dbClickImgLatex)
        // 触发菜单栏公式按钮点击事件，打开弹窗
        let target = this.editor.$toolbarElem.elems[0].querySelector('#kityformulaKey')
        target.click()
      }
    },
    // 点击图片获取，若是公式图片获取其公式内容
    imgClick (e) {
      let { selector } = e
      let latex = selector?.dataset?.latex || ''
      this.dbClickImgLatex = latex
    }
  }
}
</script>

<style lang="scss">
.home {
  width: 1200px;
  margin: auto;
  position: relative;
  .btn {
    padding: 5px 10px;
    cursor: pointer;
  }
  h3 {
    margin: 30px 0 15px;
  }
}
</style>
