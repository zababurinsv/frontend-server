import draggable from"/static/html/components/component_modules/crop/this/varan-crop-tool/utils/draggable.js";import movePos from"/static/html/components/component_modules/crop/this/varan-crop-tool/utils/cropMove.js";const dragEle=[".c-crop--drap_eline",".c-crop--drap_sline",".c-crop--drap_wline",".c-crop--drap_nline",".c-crop--drap_e",".c-crop--drap_s",".c-crop--drap_w",".c-crop--drap_n",".c-crop--drap_ne",".c-crop--drap_se",".c-crop--drap_sw",".c-crop--drap_nw"];let tool={};(tool={}).props={},tool.width="",tool.height="",tool.top="",tool.left="",tool.startPos=[0,0],tool.crop=[],tool.cropTimer=null,tool.startSize=null,tool.func={},tool.props.elWidth="",tool.props.elHeight="",tool.props.cursorTop="",tool.props.cursorLeft="",tool.props.cropJson="",tool.func.range2=function(t,o,e){return t<=0?0:t>e-o?e-o:t},tool.func.handleDragLocation=function(){return new Promise(function(t,o){let e=event.clientX,i=event.clientY;this.left=e-this.startPos[0]+this.left,this.top=i-this.startPos[1]+this.top,this.startPos=[e,i],this.handleSize(),this.$emit("updateSize",this.width,this.height,this.top,this.left),clearTimeout(this.cropTimer),this.cropTimer=setTimeout(()=>{this.$emit("afterCrop")},200)})},tool.func.dragCallLocation=function(){return new Promise(function(t,o){draggable(this.$el.querySelector(".c-crop--drap_screen"),{start:t=>{this.startPos=[t.x,t.y]},drag:t=>{this.handleDragLocation(t)},end:t=>{this.handleDragLocation(t)}})})},tool.func.getParentElement=function(t,o){return new Promise(function(e,i){return-1===t.className.indexOf(o)?(t=t.parentNode,this.getParentElement(t,o)):t})},tool.func.getDragSize=function(t){return new Promise(function(o,e){const i=this.$el,r=this.$cropArea.getBoundingClientRect(),s=i.getBoundingClientRect();let n={x:t.clientX,y:t.clientY,t:s.top,b:s.bottom,l:s.left,r:s.right,w:s.width,h:s.height,screen:r};return n.ratio=n.w/n.h,n})},tool.func.handleDrag=function(t,o){return new Promise(function(e,i){const r=this.getDragSize(t);movePos[o](this,r,this.startSize),this.handleSize(!0),this.$emit("updateSize",this.width,this.height,this.top,this.left),clearTimeout(this.cropTimer),this.cropTimer=setTimeout(()=>{this.$emit("afterCrop")},200)})},tool.func.dragCall=function(t){return new Promise(function(o,e){let i=this.$el.querySelector(dragEle[t]);draggable(i,{start:t=>{this.startSize=this.getDragSize(t)},drag:o=>{this.handleDrag(o,t)},end:o=>{this.handleDrag(o,t)}})})},tool.func.handleSize=function(t){return new Promise(function(o,e){if(this.left=tool.func.range2(this.left,this.width,this.cropJson.w),this.top=tool.func.range2(this.top,this.height,this.cropJson.h),t){let t=this.cropJson.w-this.left,o=this.cropJson.h-this.top;this.cropJson.r?t<this.width?(this.width=t,this.height=this.width/this.cropJson.r):o<this.height&&(this.height=o,this.width=this.height*this.cropJson.r):(t<this.width&&(this.width=t),o<this.height&&(this.height=o))}})};export default{tool:tool};