export default function (editor) {
  // panel 中需要用到的id
  const inputIFrameId = 'kityformula_' + Math.ceil(Math.random() * 10)
  const btnOkId = 'kityformula-btn' + Math.ceil(Math.random() * 10)
  const conf = {
    width: 900,
    height: 560,
    tabs: [
      {
        // tab 的标题
        title: editor.i18next.t('menus.panelMenus.formula.插入公式2'),
        // 模板
        tpl: `<div>
                <iframe
                  id="${inputIFrameId}"
                  class="iframe"
                  height="500px"
                  width="100%"
                  frameborder="0"
                  scrolling="no"
                  src="/kityformula-editor/kityformula.html"
                ></iframe>
                <div class="w-e-button-container">
                  <button id="${btnOkId}" class="right">
                    ${editor.i18next.t('确认插入')}
                  </button>
                </div>
              </div>`,
        // 事件绑定
        events: [
          {
            selector: '#' + btnOkId,
            type: 'click',
            fn: () => {
              // 执行插入公式
              const node = document.getElementById(inputIFrameId)
              const kfe = node.contentWindow.kfe
              let latex = kfe.execCommand('get.source')
              latex = latex.replace(/\s/g, '') // 去掉空格
              if (latex === '\\placeholder') return

              kfe.execCommand('get.image.data', function (data) {
                let { img } = data
                editor.cmd.do(
                  'insertHTML',
                  `<img class="formula" src=${img} data-latex=${latex} />`
                )
                // 关闭弹窗
                let close = document.getElementsByClassName('w-e-icon-close w-e-panel-close')[0]
                close.click()
              })
            }
          }
        ]
      }
    ]
  }

  return conf
}
