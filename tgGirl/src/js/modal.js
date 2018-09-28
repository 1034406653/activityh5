var Modal = function(option) {
  this.option = {
    eleId: option.eleId,
    title: option.title,
    content: option.content,
    callbackConfirm: option.success,
    callbackCancel: option.cancel,
  };
  this.ele = document.getElementById(this.option.eleId);
  this.ele.innerHTML = `<div class='modalBody'>
    <div class='tltle'><span></span></div>
    <div class='content'><span></span></div>
    <div class='bottom'>
      <div class='cancel'>取消</div>
      <div class='confirm'>确定</div>
    </div>
  </div>
  <div class='modalMask'></div>`;
  this.modalBody = this.ele.getElementsByClassName("modalBody")[0];
  this.modalMask = this.ele.getElementsByClassName("modalMask")[0];
  this.title = this.ele.getElementsByClassName("tltle")[0];
  this.content = this.ele.getElementsByClassName("content")[0];
  this.bottom = this.ele.getElementsByClassName("bottom")[0];
  this.cancel = this.ele.getElementsByClassName("cancel")[0];
  this.confirm = this.ele.getElementsByClassName("confirm")[0];
  this.ele.style.cssText = 'display: block;'
  this.modalMask.style.cssText = 'position: fixed;left: 0;top: 0;bottom: 0;right: 0;background: #000000;opacity: 0.7;z-index: 101;'
  this.title.innerHTML = this.option.title || "";
  this.content.innerHTML = this.option.content || "";
  var callBackConfirm = this.option.callbackConfirm;
  var callBackCancel = this.option.callbackCancel;
  var thatEle = this.ele;
  var thatShadow = this.shadow;
  this.cancel.onclick = function() {
    callBackCancel();
    thatEle.style.display = "none";
  };
  this.confirm.onclick = function() {
    callBackConfirm();
  };
}

