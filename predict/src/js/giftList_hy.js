$(function() {
	console.log(baseURL)
	var actId = getQueryString('actId')

	/*获取url中的actId参数*/
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	/*设置列表数据*/
	function setListData01(data) {
		var listDom = document.getElementById("gift-content-ul");
		for(var i = 0; i < data.length; i++) {
			var pd = data[i];

			var str = '<p class="data-list-rank">' + pd.ranking + '</p>';
			str += '<p class="data-list-userName">' + pd.nickname + '</p>';
			str += '<p class="data-list-price">' + pd.price + '</p>';

			var liDom = document.createElement("li");
			$(liDom).addClass('gift-content-li');
			liDom.innerHTML = str;
			listDom.appendChild(liDom);
		}
		var listEnd = document.createElement("li");
		listEnd.innerHTML = `<li class="gift-content-end"><p class="data-list02-date">展示完毕</p></li>`;
		listDom.appendChild(listEnd);
	}

	/*联网加载列表数据*/
	function getListDataFromNet01(pageNum, pageSize, successCallback, errorCallback) {
		$.ajax({
			type: 'POST',
			url: baseURL + '/guessing/ranking',
			data: {
				page: pageNum,
				pagesize: pageSize,
				id: actId
			},
			dataType: 'json',
			success: function(data) {
				console.log(data)
				if(data.code === 0) {
					var listData01 = [];
					for(var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
						if(i === data.data.list.length) break;
						listData01.push(data.data.list[i]);
					}
					successCallback(listData01);
				} else {
					console.log(data.info)
				}
			},
			error: errorCallback
		});
	}

	getListDataFromNet01(1, 1000, function(data) {
		setListData01(data)
	}, function() {

	})
});