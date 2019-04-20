import menu from '/static/html/components/component_modules/varan-menu/varan-menu.js'
import matcher from '/static/html/components/component_modules/matcher/module.js'
let timeStamp = {}
timeStamp['staticProperty'] = 0
let store = {}

customElements.define('varan-menu',
  class extends HTMLElement {
    static get observedAttributes () {
      return ['mode']
    }
    constructor () {
      super()
      let white = []
      let property = []
      let typeSupported = []
      let words = []

      property.push('component-id')
      property.push('script')
      property.push('component-action')
      typeSupported.push('h1')
      typeSupported.push('innerText')
      words.push('shadowRoot')
      words.push('head')
      words.push('shadow')
      words.push('light')
      words.push('lightDom')
      words.push('editor')
      words.push('слайдер')
      words.push('swap')
      white['this'] = this
      white['type-supported'] = typeSupported

      function style (obj) {
        return new Promise(function (resolve, reject) {
          let styleS = document.createElement('style')
          let styleL = document.createElement('style')
          for (let key = 0; key < obj['type'].length; key++) {
            if (obj['type'][key] === 'swap') {
              if (obj['type'][key] === 'scoped') {
                styleS.setAttribute('scoped', '')
              }
            } else {
              if (obj['type'][key] === 'scoped') {
                styleL.setAttribute('scoped', '')
              }
            }
          }
          for (let state = 0; state < obj['state'].length; state++) {
            obj[`path-style-${obj['state'][state]}`] = `@import '/static/html/components/${obj['component']}/${obj['state'][state]}/${obj['component']}.css'; @import '/static/html/components/${obj['component']}/${obj['state'][state]}/${obj['component']}-custom.css';`
            switch (obj['state'][state]) {
              case 'shadow':
                styleS.innerText = obj[`path-style-${obj['state'][state]}`]
                break
              case 'light':
                styleL.innerText = obj[`path-style-${obj['state'][state]}`]
                break
              default:
                // //console.log(`новый тип`, obj['state'][state])
                break
            }
            if (obj['state'][state] === 'swap') {
              if (obj['shadowRoot'] === true) {
                obj['this']['shadowRoot'].appendChild(styleL)
                obj['this'].appendChild(styleS)
                resolve(obj)
              } else {
                obj['this'].appendChild(styleS)
              }
            } else {
              if (obj['shadowRoot'] === true) {
                obj['this']['shadowRoot'].appendChild(styleS)
                obj['this'].appendChild(styleL)
                resolve(obj)
              } else {
                obj['this'].appendChild(styleL)
              }
            }
          }
          resolve(obj)
        })
      }
      function objectProperty (obj) {
        return new Promise(function (resolve, reject) {
          let black = []
          black['indexeddb'] = null
          black['firebase'] = null
          black['localStorage'] = null
          black['mongo'] = null
          black['mySql'] = null
          black['state'] = []
          black['state'].push('shadow')
          black['state'].push('light')
          black['words'] = words
          black[`type-swap`] = false
          black[`type-external`] = false
          black[`document-offsetWidth`] = document['body'].offsetWidth
          let verifyLight = false
          black[`getAttribute`] = (obj, type, property) => {
            if (property === 'template') {
              if (!obj.getAttribute('type')) {
                // //console.log('не установлен тип ставим default')
                obj.setAttribute('type', 'default')
                return false
              } else {
                for (let key = 0; key < obj.getAttribute('type').split('-').length; key++) {
                  if (obj.getAttribute('type').split('-')[key] === type) {
                    verifyLight = true
                  }
                }
              }
              return verifyLight
            } else {
              // //console.log(obj['this'].getAttribute('type'))
              obj[`verify-${type}`] = false
              if (obj['this'].getAttribute('type').split('-').length === 0) {
                return false
              } else {
                for (let key = 0; key < obj['this'].getAttribute('type').split('-').length; key++) {
                  if (obj['this'].getAttribute('type').split('-')[key] === type) {
                    obj[`verify-${type}`] = true
                  } else {
                    obj[`verify-${type}`] = false
                  }
                }
              }
              return obj[`verify-${type}`]
            }
          }
          if (!obj.tagName.toLowerCase()) {
            // //console.log('что то пошло не так middleware js objectProperty', '')
          } else {
            black[`component`] = obj.tagName.toLowerCase()
          }
          if (typeof (obj) !== 'object') {
            // //console.log('objectProperty middleware.js пришёл не объект')
          } else {
            if (!obj.getAttribute('type')) {
              black[`type`] = ['default']
              // //console.log('нет типа ставим default')
              obj.setAttribute('type', 'default')
            } else {
              black[`type`] = obj.getAttribute('type').split('-')
              for (let type = 0; type < black[`type`].length; type++) {
                black[`type`][type] = black[`type`][type].replace(/:/g, '-')
              }
              for (let key in black[`type`]) {
                switch (black[`type`][key]) {
                  case 'swap':
                    black[`type-swap`] = true
                    break
                  case 'external':
                    black[`type-external`] = true
                    break
                  default:
                    // //console.log(`дополнительные типы`, black[`type`][key])
                    break
                }
              }
            }
            if (!obj.slot) {
              // //console.log('отсутствует слот, ставится- по тегу ', obj.tagName.toLowerCase())
              obj.slot = obj.tagName.toLowerCase()
              black[`slot`] = obj.slot
            } else {
              black[`slot`] = obj.slot
            }
            if (!obj.getAttribute('type')) {
              // //console.log(' почему то нет атрибутов')
            } else {
              let veryfiStyle = false
              for (let key in obj.getAttribute('type').split('-')) {
                if (obj.getAttribute('type').split('-')[key].indexOf('style:') !== -1) {
                  // //console.log('устанавливаются пути к стилям')
                  veryfiStyle = true
                }
              }
              if (veryfiStyle === true) {
                black['style-custom'] = 'not-default'
              } else {
                // //console.log('устанавливается стиль по default')
                black['style-custom'] = 'default'
              }
            }
          }
          black['shadowRoot'] = false
          black['this'] = obj
          // black['this'] = matcher['proxy'](black['this'])
          // black['this'] = 'ssss'
          // //console.log('222222222222222222222222222222', black)
          // 222222

          resolve(black)
        })
      }

      function externalProperty (obj) {
        return new Promise(function (resolve, reject) {
          obj['external-property'] = white['external-property']
          let object = []
          let component = []
          let a = []
          for (let key = 0; key < obj['external'].length; key++) {
            for (let type = 0; type < obj['external'][key].children.length; type++) {
              switch (obj['external'][key].children[type].tagName) {
                case 'SCRIPT':
                  if (!obj['external'][key].getAttribute('id')) {
                    // //console.log('у компонента нет id нужно в external property script  получить id для загрузки скрипта')
                  } else {
                    component['script'] = obj['external'][key]['children'][type]
                  }
                  break
                case 'COMPONENT-ID':
                  component['id'] = obj['external'][key]['children'][type].innerText
                  break
                case 'COMPONENT-ACTION':
                  for (let action = 0; action < obj['external'][key]['children'][type]['children'].length; action++) {
                    a.push(obj['external'][key]['children'][type]['children'][action].innerText)
                  }
                  component['actions'] = a
                  break
                default:
                  // //console.log(`Не отслеживается, по мере надобности добавляются [${obj['external'][key].children[type].tagName.toLowerCase()}]`)
                  break
              }
            }
            object.push(component)
            component = []
          }
          obj['external-property'] = object
          resolve(obj)
        })
          .catch(error => {
            // //console.log('здесь я перехватывал отсутствие страницы но это убрал', error)
          })
      }

      function getTemplate (obj, swap, external) {
        return new Promise(function (resolve, reject) {
          let doc = []
          obj['template-shadow'] = []
          obj['template-light'] = []
          let verify = []
          verify['swap'] = false
          verify['external'] = false
          verify['light'] = false
          verify['slider'] = false
          verify['one'] = false
          verify['addBtn'] = false
          for (let type = 0; type < obj['type'].length; type++) {
            if (obj['type'][type].indexOf('slider') !== -1) {
              if (obj['type'][type].split('-').length > 1) {
                verify['slider'] = true
                for (let key in obj['type'][type].split('-')) {
                  switch (obj['type'][type].split('-')[key]) {
                    case 'one':
                      verify['one'] = true
                      break
                    default:
                      // //console.log(`~~~дополнительное свойство~~~`, obj['type'][type].split('-')[key])
                      break
                  }
                }
              }
            }
            if (obj['type'][type].length) {
              switch (obj['type'][type]) {
                case 'swap':
                  verify['swap'] = true
                  break
                case 'external':
                  verify['external'] = true
                  break
                case 'light':
                  verify['light'] = true
                  break
                case 'slider':
                  verify['slider'] = true
                  break
                case 'addBtn':
                  verify['addBtn'] = true
                  break
                default:
                  // //console.log(`типы не отслеживаются`, obj['type'][type])
                  break
              }
            }
          }
          /**
             * цикл this
             * цикл template
             */
          if (verify['swap'] === true) {
            for (let key = 0; key < obj['this'].children.length; key++) {
              // //console.log('~~~~~~this~~~~~~~', obj['this'].children[key].tagName)
              if (obj['this'].children[key].tagName.split('-').length === 1) {
                if (obj['this'].children[key].slot === 'view') {
                  obj['this'].children[key].className = 'wall'
                }
                obj['template-light'].push(obj['this'].children[key])
              } else {
                if (obj['getAttribute'](obj['this'].children[key], 'light', 'template') === true) {
                  obj['this'].children[key].setAttribute('type', `${obj['this'].children[key].getAttribute('type')}-external`)
                  scriptTemplate(obj['this'].children[key])
                  obj['template-light'].push(obj['this'].children[key])
                } else {
                  obj['this'].children[key].setAttribute('type', `${obj['this'].children[key].getAttribute('type')}-external`)
                  scriptTemplate(obj['this'].children[key])
                  obj['template-shadow'].push(obj['this'].children[key])
                }
              }
            }
            for (let key = 0; key < obj['template'].children.length; key++) {
              // //console.log('~~~~~~template~~~~~~~', obj['template'].children[key].tagName)
              if (obj['template'].children[key].tagName.split('-').length === 1) {
                if (obj['template'].children[key].slot === 'view') {
                  obj['template'].children[key].className = 'wall'
                }
                obj['template-light'].push(obj['template'].children[key])
              } else {
                if (obj['getAttribute'](obj['template'].children[key], 'light', 'template') === true) {
                  obj['template'].children[key].setAttribute('type', `${obj['template'].children[key].getAttribute('type')}-external`)
                  scriptTemplate(obj['template'].children[key])
                  obj['template-light'].push(obj['template'].children[key])
                } else {
                  obj['template'].children[key].setAttribute('type', `${obj['template'].children[key].getAttribute('type')}-external`)
                  scriptTemplate(obj['template'].children[key])
                  obj['template-shadow'].push(obj['template'].children[key])
                }
              }
            }
          } else {
            for (let key = 0; key < obj['this'].children.length; key++) {
              // //console.log('~~~~~~this~~~~~~~', obj['this'].children[key].tagName)
              if (obj['this'].children[key].tagName.split('-').length === 1) {
                if (obj['this'].children[key].slot === 'view') {
                  obj['this'].children[key].className = 'wall'
                }
                obj['template-shadow'].push(obj['this'].children[key])
              } else {
                if (obj['getAttribute'](obj['this'].children[key], 'light', 'template') === true) {
                  scriptTemplate(obj['this'].children[key])
                  obj['template-shadow'].push(obj['this'].children[key])
                } else {
                  scriptTemplate(obj['this'].children[key])
                  obj['template-light'].push(obj['this'].children[key])
                }
              }
            }
            for (let key = 0; key < obj['template'].children.length; key++) {
              // //console.log('~~~~~~template~~~~~~~', obj['template'].children[key].tagName)
              if (obj['template'].children[key].tagName.split('-').length === 1) {
                if (obj['template'].children[key].slot === 'view') {
                  obj['template'].children[key].className = 'wall'
                }
                obj['template-shadow'].push(obj['template'].children[key])
              } else {
                if (obj['getAttribute'](obj['template'].children[key], 'light', 'template') === true) {
                  scriptTemplate(obj['template'].children[key])
                  obj['template-shadow'].push(obj['template'].children[key])
                } else {
                  scriptTemplate(obj['template'].children[key])
                  obj['template-light'].push(obj['template'].children[key])
                }
              }
            }
          }
          obj['verify'] = verify
          if (obj['verify']['slider'] === true) {
            getSliderTemplate(obj)
              .then((obj) => {
                console.assert(false, obj)
                obj['template-light'].push(obj['slider'])
                obj['this']['appendChild'](obj['slider'])
                setExternalComponent(obj, 'slider')
                  .then((obj) => {
                    if (obj['verify']['one'] === true) {
                      for (let state = 0; state < obj['state'].length; state++) {
                        for (let key = 0; key < obj[`template-${obj['state'][state]}`].length; key++) {
                          // //console.log(obj[`template-${obj['state'][state]}`][key])
                          if (obj[`template-${obj['state'][state]}`][key]['className'] === 'wall') {
                            obj[`template-${obj['state'][state]}`].splice(key, 1)
                            resolve(obj)
                          }
                        }
                      }
                    } else {
                      resolve(obj)
                    }
                  })
              })
          } else {
            resolve(obj)
          }
        })
      }
      function template (obj, type) {
        return new Promise(function (resolve, reject) {
          obj['verify'] = []
          let name = {}
          if (!obj['this'].hasAttribute('preset')) {
            // console.assert(false, 'должен быть родительский объект для пресета по default')
          } else {
            obj['parent'] = obj['this'].getAttribute('parent')
          }
          if (!obj['this'].hasAttribute('preset')) {
            obj['path-template'] = `/static/html/components/${obj['component']}/${obj['component']}.html`
            obj['verify']['preset'] = false
          } else {
            if (obj['this'].getAttribute('preset').length === 0) {
              obj['path-template'] = `/static/html/components/${obj['component']}/template/${obj['parent']}.html`
              obj['preset'] = `default`
              obj['verify']['preset'] = true
            } else {
              obj['path-template'] = `/static/html/components/${obj['component']}/template/${obj['this'].getAttribute('preset')}/${obj['component']}-${obj['this'].getAttribute('preset')}.html`
              obj['preset'] = `${obj['this'].getAttribute('preset')}`
              obj['verify']['preset'] = true
            }
          }
          fetch(obj['path-template'])
            .then(function (response) {
              if (response.ok) {
                return response.text()
              }
            }).then(function (body) {
              let parser = new DOMParser()
              let doc = parser.parseFromString(body, 'text/html')
              obj['template'] = doc.getElementsByTagName('template')[0].content.cloneNode(true)
              external(obj)
                .then((obj) => {
                  getTemplate(obj, obj['type-swap'], obj['type-external'])
                    .then((obj) => {
                      if (obj['verify']['swap'] === true) {
                        if (obj['template-shadow'].length !== 0) {
                          obj['this']['attachShadow']({mode: 'open'})
                          obj['shadowRoot'] = true
                          for (let key = 0; key < obj['template-shadow'].length; key++) {
                            obj['this']['shadowRoot']['appendChild'](obj['template-shadow'][key])
                          }
                        }
                        if (obj['template-light'].length !== 0) {
                          for (let key = 0; key < obj['template-light'].length; key++) {
                            obj['this']['appendChild'](obj['template-light'][key])
                          }
                        }
                      } else {
                        if (obj['template-shadow'].length !== 0) {
                          obj['this']['attachShadow']({mode: 'open'})
                          obj['shadowRoot'] = true
                          for (let key in obj['template-shadow']) {
                            obj['this']['shadowRoot']['appendChild'](obj['template-shadow'][key])
                          }
                        }
                        if (obj['template-light'].length !== 0) {
                          for (let key in obj['template-light']) {
                            obj['this']['appendChild'](obj['template-light'][key])
                          }
                        }
                      }
                      resolve(obj)
                    })
                })
            })
            .catch(error => {
              return error
            })
        })
      }

      function getSliderTemplate (obj) {
        return new Promise(function (resolve, reject) {
          fetch(`/static/html/components/varan-slider/template/${obj['slot']}.html`)
            .then(function (response) {
              if (response.ok) {
                return response.text()
              }
            }).then(function (body) {
              let parser = new DOMParser()
              let doc = parser.parseFromString(body, 'text/html')
              obj['slider'] = doc.getElementsByTagName('template')[0].content.cloneNode(true)
              let slider = document.createElement('section')
              slider.className = 'slider'
              slider.slot = 'view'
              slider.appendChild(obj['slider'])
              obj['slider'] = slider
              resolve(obj)
            })
            .catch(error => {
              return error
            })
        })
      }
      function renderExternal (obj) {
        return new Promise(function (resolve, reject) {
          obj['words-action'] = []
          let wordsAction = []
          for (let key = 0; key < obj['external-property'].length; key++) {
            for (let words = 0; words < obj['external-property'][key]['actions'].length; words++) {
              for (let verify = 0; verify < obj['words'].length; verify++) {
                if (obj['external-property'][key]['actions'][words].indexOf(obj['words'][verify]) !== -1) {
                  if (obj['words'][verify] === 'shadowRoot' || obj['words'][words] === 'shadow') {
                    wordsAction['shadow'] = true
                  }
                  if (obj['words'][verify] === 'light' || obj['words'][words] === 'лайт') {
                    wordsAction['light'] = true
                  }
                  if (obj['words'][verify] === 'editor') {
                    wordsAction['editor'] = true
                  }
                  if (obj['words'][verify] === 'слайдер') {
                    wordsAction['editor-slider'] = true
                  }
                  if (obj['words'][verify] === 'swap') {
                    wordsAction['swap'] = true
                  }
                }
              }
            }
            obj['words-action'] = wordsAction

            for (let key in obj['external-property']) {
              for (let type in obj['external-property'][key]) {
                switch (type) {
                  case 'id':
                    let doc = document.createElement(obj['external-property'][key][type])
                    doc.setAttribute('type', 'external')
                    obj['this'].appendChild(doc)
                    break
                  default:
                    // //console.log(`какой то неизвестный тип`, type)
                    break
                }
              }
            }
            resolve(obj)
          }
        })
      }

      function external (obj) {
        return new Promise(function (resolve, reject) {
          obj['path-external'] = `/static/html/components/${obj['component']}/external/${obj['component']}-external.html`
          fetch(obj['path-external'])
            .then(function (response) {
              if (response.ok === false) {
                return response.ok
              } else {
                return response.text()
              }
            })
            .then(function (data) {
              if (data === false) {
              } else {
                let parser = new DOMParser()
                let doc = parser.parseFromString(data, 'text/html')
                obj['external'] = doc.querySelectorAll('section')
                externalProperty(obj)
                  .then((obj) => {
                    if (obj['external-property'].length === 0) {
                      resolve(obj)
                    } else {
                      renderExternal(obj)
                        .then((obj) => {
                          resolve(obj)
                        })
                    }
                  })
              }
            })
            .catch(error => {
              throw error
            })
        })
      }
      function getElementsByClassName (obj, type) {
        return new Promise(function (resolve, reject) {
          for (let state = 0; state < obj['state'].length; state++) {
            for (let key = 0; key < obj[`template-${obj['state'][state]}`].length; key++) {
              if (obj[`template-${obj['state'][state]}`][key].getElementsByClassName(type).length === 0) {

              } else {
                obj['slider'] = obj[`template-${obj['state'][state]}`][key].getElementsByClassName(type)[0]
                resolve(obj[`template-${obj['state'][state]}`][key].getElementsByClassName(type)[0])
              }
            }
          }
        })
      }
      function setSlider (obj) {
        return new Promise(function (resolve, reject) {
          resolve(Peppermint(obj, {
            dots: false,
            slideshow: false,
            speed: 500,
            slideshowInterval: 5000,
            stopSlideshowAfterInteraction: true,
            onSetup: function (n) {
              // //console.log('Peppermint setup done. Slides found: ' + n)
            }
          }))
        })
      }
      function scriptTemplate (obj) {
        return new Promise(function (resolve, reject) {
          if (obj.getAttribute('import') === null) {

          } else {

          }

          const script = document.createElement('script')
          let verify = false
          for (let key in document['head'].getElementsByTagName('script')) {
            if (typeof (document['head'].getElementsByTagName('script')[key]) === 'object') {
              if (document['head'].getElementsByTagName('script')[key].outerHTML.indexOf(obj.tagName.toLowerCase()) !== -1) {
                verify = true
              }
            }
          }
          if (verify === true) {
            // //console.log('script уже загруже')
          } else {
            if (obj.getAttribute('import') === null) {
            } else {
              script.type = 'module'
            }
            script.src = `/static/html/components/${obj.tagName.toLowerCase()}/${obj.tagName.toLowerCase()}.js`
            script.onload = resolve
            script.onerror = reject
            document['head'].appendChild(script)
          }
        })
      }

      function setExternalComponent (obj, type, nObj) {
        return new Promise(function (resolve, reject) {
          if (!type) {
            resolve(obj)
          } else {
            switch (type) {
              case 'slider': {
                getElementsByClassName(obj, 'peppermint')
                  .then((slider) => {
                    setSlider(slider)
                      .then((slider) => {
                        obj['slider'] = slider
                        resolve(obj)
                      })
                  })
              }
                break
              default:
                // //console.log(`какой то неизвестный тип`, type)
                break
            }
            resolve(obj)
          }
        })
      }
      objectProperty(this)
        .then((obj) => {
          template(obj)
            .then((obj) => {
              style(obj)
                .then((obj) => {
                  modules(obj)
                  return obj
                })
              return obj
            })
          return obj
        })
      function once (obj) {
        timeStamp['staticProperty'] = obj
        once = function (obj) { return obj }
      }
      async function modules (obj) {
        if (!obj['parent']) {
          if (obj['this'].hasAttribute('parent') === true) {
            obj['parent'] = obj['this'].getAttribute('parent')
          } else {
            console.warn('если компонент не родительский нужен параметр parent')
          }
        }
        obj['menu'] = {}
        obj['menu'] = await menu
        obj['menu'] = await obj['menu']['init'](obj)
        for (let key = 0; key < obj['type'].length; key++) {
          switch (obj['type'][key]) {
            case 'editor':
              obj['verify'][`${obj['type'][key]}`] = true
              obj['menu']['disableMode'](obj)
              break
            case 'editor-verify':
              obj['get_n'] = null
              matcher['database']['request']['functions']['verify'](obj)
                .then((obj) => {
                  if (!obj['get_n']) {
                    obj['menu']['disableDelete'](obj)
                  } else {
                    if (obj['get_n'].length > 1) { } else {
                      obj['menu']['disableDelete'](obj)
                    }
                  }
                })
              break
            case 'addBtn':
              obj['menu']['addButton'](obj)
              break
            case 'slider-txt':
              obj['verify'][`${obj['type'][key]}`] = true
              obj['menu']['disableMode'](obj)
              break
            case 'editor-news':
              let name = {}
              if (!obj['slot']) {
                name = obj['parent']
              } else {
                name = obj['slot']
              }
              matcher['database']['request']['functions']['verify'](obj)
                .then((obj) => {
                  obj['menu']['varan-slider-news'](obj)

                  if (!obj['get']) {
                    // obj['menu']['disableDelete'](obj)
                  } else {
                    // let keys = Object.keys(obj['get'][`${obj['parent']}`])
                    // if (keys.length > 1) { } else {
                    //   obj['menu']['disableDelete'](obj)
                    // }
                  }
                })
              break
            default:
              console.log(`новый тип`, obj['type'][key])
              break
          }
        }
        let modeAction = function (event) {
          once(event.timeStamp)
          let time = (event.timeStamp - timeStamp['staticProperty'])
          if ((time) > 140 || time === 0) {
            if (event.target.innerText === 'Add') {
              if (!obj['this'].hasAttribute('parent')) {
                alert('нет родительского элемента')
              } else {
                // console.log(event)
                // console.log(event.target.querySelectorAll('slot'))
                let name = {}
                // if(event.target.offsetParent.querySelectorAll('slot'))
                if (event.target.offsetParent.offsetParent.querySelectorAll('slot').length === 1) {
                  name = event.target.offsetParent.offsetParent.querySelectorAll('slot')[0].name
                } else if (event.target.offsetParent.querySelectorAll('slot').length === 1) {
                  name = event.target.offsetParent.querySelectorAll('slot')[0].name
                } else {
                  console.assert(false, 'нет названия объекта')
                }
                event.target.disable = 'true'
                event.target.style.backgroundColor = '#62bcd7'
                let addItems = new CustomEvent('addItems', {
                  detail: {
                    id: name
                  }
                })
                document.dispatchEvent(addItems)
                setTimeout(function tick () {
                  event.target.disable = 'false'
                  event.target.style.backgroundColor = '#ccc'
                }, 3000)
              }
            } else {
              if (obj['this'].hasAttribute('mode')) {
                switch (obj['this'].getAttribute('mode')) {
                  case 'gallery':
                    obj['this'].setAttribute('mode', 'editor')
                    break
                  case 'editor':
                    obj['this'].setAttribute('mode', 'gallery')
                    break
                  default:
                    // console.log(`~~~новый~~~атрибут~~~:`, obj['this'].getAttribute('mode'))
                    break
                }
              } else {
                obj['this'].setAttribute('mode', 'gallery')
              }
            }
          }
          timeStamp['staticProperty'] = event.timeStamp
        }

        let saveAction = function (event) {
          once(event.timeStamp)
          let time = (event.timeStamp - timeStamp['staticProperty'])
          if ((time) > 140 || time === 0) {
            event.target.disable = 'true'
            event.target.style.backgroundColor = '#62bcd7'
            let target = event.target
            while (!target.hasAttribute('parent')) {
              target = target.parentNode
            }
            let save = new CustomEvent('saveEditor', {
              detail: {
                id: target.getAttribute('parent')
              }
            })
            document.dispatchEvent(save)
            setTimeout(function tick () {
              event.target.disable = 'false'
              event.target.style.backgroundColor = '#ccc'
            }, 3000)
          }
          timeStamp['staticProperty'] = event.timeStamp
        }
        let convertAction = function (event) {
          once(event.timeStamp)
          let time = (event.timeStamp - timeStamp['staticProperty'])
          if ((time) > 140 || time === 0) {
            event.target.disable = 'true'
            event.target.style.backgroundColor = '#62bcd7'
            let target = event.target
            while (!target.hasAttribute('parent')) {
              target = target.parentNode
            }
            let convert = new CustomEvent('convertAction', {
              detail: {
                id: target.getAttribute('parent')
              }
            })
            document.dispatchEvent(convert)
            setTimeout(function tick () {
              event.target.disable = 'false'
              event.target.style.backgroundColor = '#ccc'
            }, 3000)
          }
          timeStamp['staticProperty'] = event.timeStamp
        }
        let delAction = function (event) {
          once(event.timeStamp)
          let time = (event.timeStamp - timeStamp['staticProperty'])
          if ((time) > 140 || time === 0) {
            event.target.disable = 'true'
            event.target.style.backgroundColor = '#62bcd7'
            let target = event.target
            while (!target.hasAttribute('parent')) {
              target = target.parentNode
            }
            let del = new CustomEvent('delItems', {
              detail: {
                id: target.getAttribute('parent')
              }
            })
            document.dispatchEvent(del)
            setTimeout(function tick () {
              event.target.disable = 'false'
              event.target.style.backgroundColor = '#ccc'
            }, 3000)
          }
          timeStamp['staticProperty'] = event.timeStamp
        }
        // console.assert(false)
        if(!obj['this'].querySelector('.menu-mode')){
          obj['this'].shadowRoot.querySelector('.menu-mode').addEventListener('click', modeAction, false)
          obj['this'].shadowRoot.querySelector('.menu-save').addEventListener('click', saveAction, false)
          obj['this'].shadowRoot.querySelector('.menu-delete').addEventListener('click', delAction, false)
          obj['this'].shadowRoot.querySelector('.menu-convert').addEventListener('click', convertAction, false)
        }else{
          obj['this'].querySelector('.menu-mode').addEventListener('click', modeAction, false)
          obj['this'].querySelector('.menu-save').addEventListener('click', saveAction, false)
          obj['this'].querySelector('.menu-delete').addEventListener('click', delAction, false)
          obj['this'].querySelector('.menu-convert').addEventListener('click', convertAction, false)
        }
      }
    }
    attributeChangedCallback (name, oldValue, newValue) {
      let $obj = {}
      if (this.hasAttribute('parent')) {
        $obj = {
          id: name,
          slot: this.getAttribute('parent'),
          state: 0
        }
      } else {
        $obj = {
          id: name,
          slot: 'default',
          state: 0
        }
      }
      if (!this.hasAttribute('parent')) {
        alert('не установлен parent родительский элемент')
      } else {
        let $json = {
          name: name,
          oldValue: oldValue,
          newValue: newValue,
          state: 0,
          parent: this.getAttribute('parent')
        }
        store['dispatch']($obj, $json).then((obj) => {
        })
      }
    }
  })
