function storageAvailable(e){try{var t=window[e],o="__storage_test__";return t.setItem(o,o),t.removeItem(o),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0!==t.length}}function setUpdFile(e){return new Promise(function(t,o){storageAvailable("localStorage")?(localStorage.setItem(e.localStorage),t(!0)):t(!1)})}function delFile(e){return new Promise(function(t,o){storageAvailable("localStorage")?(Storage.removeItem(e.localStorage),t(!0)):t(!1),t(e)})}function getFile(e){return new Promise(function(t,o){storageAvailable("localStorage")?(e.localStore=localStorage.getItem(`${e.slot}`),t(e)):t(!1),t(e)})}function clearData(){console.log("CLEAR"),localStorage.clear()}export default{delFile:e=>delFile(e),setUpdFile:e=>setUpdFile(e),getFile:e=>getFile(e),clearData:()=>{clearData()}};