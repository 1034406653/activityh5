var Toastlxl = function(ele) {
	this.ele = document.getElementById(ele);
	this.ele.innerHTML = "<span></span>";
	this.span = this.ele.getElementsByTagName("span")[0];
	this.shown = false;
};
Toastlxl.prototype.show = function(text) {
	this.span.innerHTML = text || '';
	this.shown = true;
	if(this.shown)
		this.ele.style.display = "block"
	else
		this.ele.style.display = "none"
	var that = this;
	window.setTimeout(function() {
		that.shown = false;
		that.ele.style.display = "none"
	}, 1000);
};

