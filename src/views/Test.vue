<template>
  <div class="home">
    <p>WangEditor V5</p>
    <div id="demo2">
      <div id="toolbar-container"></div>
      <div id="editor-container"></div>
    </div>
    <button type="button" class="btn" @click="getEditorData">
      获取当前内容
    </button>
  </div>
</template>

<script>
// 引入 wangEditor
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar, IEditorConfig, IDomEditor } from '@wangeditor/editor'
import createKityformula from './components/kityformula'

export default {
  data () {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      const editorConfig = {}
      editorConfig.placeholder = '请输入内容'
      editorConfig.onChange = (editor) => {
        // 当编辑器选区、内容变化时，即触发
        console.log('content', editor.children)
        console.log('html', editor.getHtml())
      }

      // 工具栏配置
      const toolbarConfig = {}

      // 创建编辑器
      const editor = createEditor({
        selector: '#editor-container',
        config: editorConfig,
        mode: 'default' // 或 'simple' 参考下文
      })
      // 创建工具栏
      const toolbar = createToolbar({
        editor,
        selector: '#toolbar-container',
        config: toolbarConfig,
        mode: 'default' // 或 'simple' 参考下文
      })
    },
    getEditorData () {
      // 通过代码获取编辑器内容
      // const data = this.editor.txt.html()
      // alert(data)
    }
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    // this.editor.destroy()
    this.editor = null
  }
}
</script>
