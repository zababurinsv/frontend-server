import conf from '/static/html/components/component_modules/matcher/matcher/this/database/config/index.js'

let server = 'now-0.6'
// let server = 'local-1.0'
server = server.split('-')
console.log('~~~~~~node~~~~~~', conf[server[0]][server[1]])

// console.assert(false, conf[server[0]][server[1]])
function colorLog (message, color, ...args) {
  color = color || 'black'
  switch (color) {
    case 'success':
      color = 'Green'
      break
    case 'info':
      color = 'DodgerBlue'
      break
    case 'error':
      color = 'Red'
      break
    case 'warning':
      color = 'Orange'
      break
    default:
  }
  console.log('%c' + message, 'color:' + color, ...args)
}
function blobToDataURL (blob, callback) {
  if (typeof (blob) === 'string') {
    callback(blob)
  } else {
    var a = new FileReader()
    a.onload = function (e) { callback(e.target.result) }
    a.readAsDataURL(blob)
  }
}
function setFile (obj) {
  return new Promise((resolve, reject) => {
    let object = {}
    let keys = {}
    let mongoObject = {}
    let name = {}
    if (!obj['slot']) {
      name = obj['parent']
    } else {
      if (obj['slot'] === 'edit') {
        name = obj['parent']
      } else {
        name = obj['slot']
      }
    }
    if (name === 'varan-rss') { name = 'varan-slider-news' }
    if (!obj['set'][name]['file']) {
      if (!obj['set']) {
        console.assert(false, 'должен быть obj[set], mongoDB matcher')
      } else {
        object = obj['set'][name]
        mongoObject = {
          [`${obj['set']['object']}`]: object,
          id: obj['set']['id'],
          object: obj['set']['object']
        }
      }

      colorLog(`~~~~~~~<mongo-setFile>~~~~~~~`, 'green', mongoObject)
      fetch(`${conf[server[0]][server[1]]}${mongoObject['object']}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        },
        body: JSON.stringify(mongoObject)
      }).then(function (response) {
        if (!response.ok) {
          return response
        } else {
          return response.json()
        }
      }).then(function (json) {
        if (json.status === 404) {
          colorLog(`~~~~~~~~~~~~~<404>~~~~~~~~~~~~~`, 'green', json)
          obj['mongo'] = []
          resolve(obj)
        } else {
          colorLog(`~~~~~~~~~~~~~<mongo-set-out>~~~~~~~~~~~~~`, 'green', json)
          obj['mongo'] = json
          obj['mongo'][name]['_id'] = json['_id']
          resolve(obj)
        }
      }).catch(function (error) {
        console.assert(false, 'mongoDb', error)
      })
    } else {
      blobToDataURL(obj['set'][name]['file'], function (file) {
        obj['set'][name]['file'] = file
        object = obj['set'][name]
        mongoObject = {
          [`${obj['set']['object']}`]: object,
          id: obj['set']['id'],
          object: obj['set']['object']
        }
        const rawResponse = fetch(`${conf[server[0]][server[1]]}${obj['set']['object']}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'no-cors'
          },
          body: JSON.stringify(mongoObject)
        }).then(function (response) {
          if (!response.ok) {
          } else {
            return response.json()
          }
        }).then(function (json) {
          colorLog(`~~~~~~~~~~~~~<mongo-out>~~~~~~~~~~~~~`, 'green', json)
          obj['mongo'] = json
          obj['mongo'][name]['_id'] = json['_id']
          resolve(obj)
        }).catch(function (error) {
          console.assert(false, 'mongoDb', error)
        })
      })
    }
  })
}
function delFile (obj) {
  return new Promise((resolve, reject) => {
    let path = {}

    if (!obj['delete']) {
      path = `${conf[server[0]][server[1]]}${obj['delObj']['component']}/${obj['delObj']['id']}`
    } else {
      path = `${conf[server[0]][server[1]]}${obj['delete']['object']}/${obj['delete']['id']}`
    }
    // console.assert(false, obj, path)

    const rawResponse = fetch(path, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    }).then((del) => {
      resolve(obj)
    })
  })
}
function getFile (obj) {
  return new Promise((resolve, reject) => {
    let req = ''
    if (!obj['slot']) {
      req = obj['parent']
    } else {
      if (obj['slot'] === 'edit') {
        req = obj['parent']
      } else {
        req = obj['slot']
      }
    }
    if (req === undefined) { console.assert(false, 'нет слота и родителя') }
    if (req === 'varan-rss') { req = 'varan-slider-news' }

    // console.log('obj', obj)
    // console.assert(false , `${conf[server[0]][server[1]]}${req}`)

    console.log('dddddd', `${conf[server[0]][server[1]]}${req}`)
    const rawResponse = fetch(`${conf[server[0]][server[1]]}${req}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    }).then(function (response) {
      if (!response.ok) {
        if (response.status === 404) {
          return response
        } else {
          throw new Error('HTTP error, status = ' + response.status)
        }
      } else {
        return response.json()
      }
    })
      .then(function (json) {
        if (json.status === 404) {
          obj['mongo'] = []
          resolve(obj)
        } else {
          colorLog(`~~~~~~~~~~~~<mongo-get-out>~~~~~~~~~~~~`, 'green', json)
          let name = {}

          if (!obj['slot']) {
            name = obj['parent']
          } else {
            if (obj['slot'] === 'edit') {
              name = obj['parent']
            } else {
              name = obj['slot']
            }
          }
          obj['mongo'] = json

          for (let key = 0; key < obj['mongo'].length; key++) {
            if (obj['mongo'][key]['object'] === 'varan-slider-news') {

            } else {
              obj['mongo'][key][name]['_id'] = obj['mongo'][key]['_id']
            }
          }
          resolve(obj)
        }
      })
      .catch(function (error) {
        console.assert(false, 'mongoDb', error)
      })
  })
}

function updFile (obj) {
  return new Promise(async (resolve, reject) => {
    let path = {}
    if (!obj['update']) {
      console.log('нет объекта update')
      // console.assert(false, obj)
      resolve(obj)
    } else {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~', obj['update']['object'])
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~', conf[server[0]][server[1]])
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~', obj['update']['id'])
      path = `${conf[server[0]][server[1]]}${obj['update']['object']}/${obj['update']['id']}`

      let object = {}
      let name = {}
      if (!obj['slot']) {
        name = obj['parent']
      } else {
        name = obj['slot']
      }
      if (name === 'varan-rss') { name = 'varan-slider-news' }
      if (!obj['update']) {
        if (!obj['upload'][name]) {
          object = obj['upload']
        } else {
          object = obj['upload'][name]
        }
      } else {
        if (!obj['update'][name]) {
          object = obj['update']
        } else {
          object = obj['update'][name]
        }
      }

      let mongoObject = {
        [`${obj['update']['object']}`]: object,
        object: obj['update']['object']
      }
      if (object === undefined) {
        console.assert(false, obj)
      }

      fetch(path, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        },
        body: JSON.stringify(mongoObject)
      }).then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status)
        } else {
          return response.json()
        }
      })
        .then(function (json) {
          colorLog(`~~~~~~~~~~~~~~~~~~<mongo-out-update>~~~~~~~~~~~~~~~~~~`, 'green', json)
          obj['mongo'] = json
          obj['update'] = null
          resolve(obj)
        })
        .catch(function (error) {
          console.assert(false, 'mongoDb', error)
        })
    }
  })
}

function updateClientId (obj) {
  return new Promise(async (resolve, reject) => {
    colorLog(`~~~~~~~~~~<mongo-update>~~~~~~~~~~`, 'green', obj['update'])
    let path = {}
    path = `${conf[server[0]][server[1]]}${obj['update']['object']}/local/${obj['update']['_id']}`
    // console.assert(false, path)
    let object = {}
    let name = {}
    if (!obj['slot']) {
      name = obj['parent']
    } else {
      if (obj['slot'] === 'edit') {
        name = obj['parent']
      } else {
        name = obj['slot']
      }
    }
    if (!obj['update']) { console.assert(false, obj) }
    if (!obj['update']['_id']) { console.assert(false, 'должен быть _id mongo', obj) }

    let mongoObject = {
      [`${obj['update']['object']}`]: obj['update'][name],
      object: obj['update']['object'],
      id: obj['update'][name]['id']
    }
    // console.assert(false, mongoObject)
    colorLog(`~~~~~~~~~~<mongo-update>~~~~~~~~~~`, 'green', mongoObject)
    fetch(path, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      },
      body: JSON.stringify(mongoObject)
    }).then(function (response) {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status)
      } else {
        return response.json()
      }
    })
      .then(function (json) {
        colorLog(`~~~~~~~<mongo-update-out-json>~~~~~~~`, 'green', json)
        obj['get_n'] = []
        obj['mongo'] = json
        obj['get_n'].push(json)
        colorLog(`~~~~~~~<mongo-update-out>~~~~~~~`, 'green', obj['get_n'])
        resolve(obj)
      })
      .catch(function (error) {
        console.assert(false, 'mongoDb', error)
      })
  })
}
export default {
  delFile: (obj) => {
    console.log('------> deleteImages mongo')
    return delFile(obj)
  },
  setFile: (obj) => {
    console.log('------> setImages mongo')
    return setFile(obj)
  },
  getFile: (obj) => {
    console.log('------> getImages mongo')
    return getFile(obj)
  },
  updFile: (obj) => {
    console.log('------> updateImages mongo')
    return updFile(obj)
  },
  updateClientId: (obj) => {
    console.log('------> updateClientId mongo')
    return updateClientId(obj)
  }
}
