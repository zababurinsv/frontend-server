function validateResponse(e){if(console.log("validateResponse",e),!e.ok)throw Error(e.statusText);return e}function readResponseAsJSON(e){return e.json()}function readResponseAsBlob(e){return console.log("222222222~~~~~~22222222222",e),e.blob()}function readResponseAsText(e){return e.text()}function logResult(e){console.log(e)}function logError(e){console.log("Looks like there was a problem: \n",e)}function showImage(e){var t=document.getElementById("container"),o=document.createElement("img");t.appendChild(o);var n=URL.createObjectURL(e);o.src=n}function showComp(e){let t=URL.createObjectURL(e);return console.log("~~~~~~~~~~~",t),t}function showText(e){document.getElementById("message").textContent=e}function fetchImage(e){return new Promise(function(t,o){e["image-path"]="/static/images/header/Image46.png",fetch(e["image-path"],{mode:"cors"}).then(validateResponse).then(readResponseAsBlob).then(e=>{t(e)}).then(showImage).catch(logError)})}function fetchJSON(e){fetch(e["JSON-path"],{mode:"cors"}).then(validateResponse).then(readResponseAsJSON).then(logResult).then(e=>{resolve(e)}).catch(logError)}function fetchText(e){fetch(e["text-path"]).then(validateResponse).then(readResponseAsText).then(e=>{resolve(e)}).catch(logError)}export default{getTxt:e=>fetchText(e),getImages:e=>fetchImage(e),getJSON:e=>fetchJSON(e)};