let menu = {}
menu['this'] = {}
menu['disableMode'] = function (obj) {
  return new Promise(function (resolve, reject) {
    if (!obj['this'].querySelector('.menu-mode')) {
      obj['this'].shadowRoot.querySelector('.menu-mode').disabled = true
      obj['this'].shadowRoot.querySelector('.menu-mode').style.backgroundColor = 'black'
      obj['this'].shadowRoot.querySelector('.menu-delete').disabled = true
      obj['this'].shadowRoot.querySelector('.menu-delete').style.backgroundColor = 'black'
      resolve(obj)
    } else {
      obj['this'].querySelector('.menu-mode').disabled = true
      obj['this'].querySelector('.menu-mode').style.backgroundColor = 'black'
      obj['this'].querySelector('.menu-delete').disabled = true
      obj['this'].querySelector('.menu-delete').style.backgroundColor = 'black'
      resolve(obj)
    }
  })
}
menu['varan-slider-news'] = function (obj) {
  return new Promise(function (resolve, reject) {
    if (!obj['this'].querySelector('.menu-save')) {
      obj['this'].shadowRoot.querySelector('.menu-save').innerText = 'Создать новость'
      obj['this'].shadowRoot.querySelector('.menu-mode').innerText = 'Редактировать новость'
      obj['this'].shadowRoot.querySelector('.menu-delete').innerText = 'Удалить новость'
      // obj['this'].shadowRoot.querySelector('.menu-save').disabled = true
      // obj['this'].shadowRoot.querySelector('.menu-save').style.backgroundColor = 'black'
      // obj['this'].shadowRoot.querySelector('.menu-mode').disabled = true
      // obj['this'].shadowRoot.querySelector('.menu-mode').style.backgroundColor = 'black'
      // obj['this'].shadowRoot.querySelector('.menu-delete').disabled = true
      // obj['this'].shadowRoot.querySelector('.menu-delete').style.backgroundColor = 'black'
      resolve(obj)
    } else {
      obj['this'].querySelector('.menu-save').innerText = 'Создать новость'
      obj['this'].querySelector('.menu-mode').innerText = 'Редактировать новость'
      obj['this'].querySelector('.menu-delete').innerText = 'Удалить новость'
      // obj['this'].querySelector('.menu-save').disabled = true
      // obj['this'].querySelector('.menu-save').style.backgroundColor = 'black'
      // obj['this'].querySelector('.menu-mode').disabled = true
      // obj['this'].querySelector('.menu-mode').style.backgroundColor = 'black'
      // obj['this'].querySelector('.menu-delete').disabled = true
      // obj['this'].querySelector('.menu-delete').style.backgroundColor = 'black'
      resolve(obj)
    }
  })
}
menu['disableDelete'] = function (obj) {
  return new Promise(function (resolve, reject) {
    if (!obj['this'].shadowRoot.querySelector('.menu-delete')) {
      obj['this'].shadowRoot.querySelector('.menu-delete').disabled = true
      obj['this'].shadowRoot.querySelector('.menu-delete').style.backgroundColor = 'black'
      resolve(obj)
    } else {
      obj['this'].querySelector('.menu-delete').disabled = true
      obj['this'].querySelector('.menu-delete').style.backgroundColor = 'black'
      resolve(obj)
    }
  })
}
menu['addButton'] = function (obj) {
  return new Promise(function (resolve, reject) {
    if (!obj['this'].shadowRoot.querySelector('.menu-mode')) {
      obj['this'].shadowRoot.querySelector('.menu-mode').innerText = 'Add'
      obj['this'].shadowRoot.querySelector('.menu-mode').disabled = false
      obj['this'].shadowRoot.querySelector('.menu-mode').style.backgroundColor = '#ddd'
      resolve(obj)
    } else {
      obj['this'].querySelector('.menu-mode').innerText = 'Add'
      obj['this'].querySelector('.menu-mode').disabled = false
      obj['this'].querySelector('.menu-mode').style.backgroundColor = '#ddd'
      resolve(obj)
    }
  })
}

let init = async function (obj) {
  return menu
}

export default new Promise(async resolve => {
  resolve({
    init: function (obj) {
      return init(obj)
    }
  })
})
