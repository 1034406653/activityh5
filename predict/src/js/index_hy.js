$(function() {
	var mescroll01 = new MeScroll("mescroll-part01", {
		up: {
			clearEmptyId: "mescroll-dataList01",
			callback: getListData01,
		}
	});
	var mescroll02 = new MeScroll("mescroll-part02", {
		up: {
			clearEmptyId: "mescroll-dataList02",
			callback: getListData02
		}
	});

	function getListData01(page) {
		getListDataFromNet01(page.num, page.size, function(data) {
			mescroll01.endSuccess(data.length);
			console.log(data);
			setListData01(data)
		}, function() {
			mescroll01.endErr()
		})
	}

	function getListData02(page) {
		getListDataFromNet02(page.num, page.size, function(data) {
			mescroll02.endSuccess(data.length);
			setListData02(data)
		}, function() {
			mescroll02.endErr()
		})
	}

	function setListData01(data) {
		var listDom = document.getElementById("mescroll-dataList01");
		for(var i = 0; i < data.length; i += 1) {
			var pd = data[i];
			var str = '<p class="data-list01-userName">' + pd.nickname + '</p>';
			str += '<p class="data-list01-coinPrice">' + pd.price + '</p>';
			var liDom = document.createElement("li");
			$(liDom).addClass('data-list01-li');
			liDom.innerHTML = str;
			listDom.appendChild(liDom)
		}
	}

	function setListData02(data) {
		var listDom = document.getElementById("mescroll-dataList02");
		for(var i = 0; i < data.length; i += 1) {
			var pd = data[i];
			var str = '<p class="data-list02-date">' + pd.date + '</p>';
			str += '<p class="data-list02-coinPrice">' + pd.closing_price + '</p>';
			str += '<p class="data-list02-giftList" actIndex="' + pd.id + '">详情<img src="src/img/prize_detail@2x.png" alt=""></p>';
			var liDom = document.createElement("li");
			$(liDom).addClass('data-list02-li');
			liDom.innerHTML = str;
			listDom.appendChild(liDom)
		}
	}

	function getListDataFromNet01(pageNum, pageSize, successCallback, errorCallback) {
		$.ajax({
			type: 'POST',
			url: baseURL + '/guessing/get_today',
			data: {
				page: pageNum,
				pageSize: pageSize
			},
			dataType: 'json',
			success: function(data) {
				if(data.code === 0) {
					var listData01 = [];
					for(var i = 0; i < pageSize; i += 1) {
						if(i === data.data.list.length) {
							break
						}
						listData01.push(data.data.list[i])
					}
					successCallback(data.data.list)
				} else {
					console.log(data.info)
				}
			},
			error: errorCallback
		})
	}

	function getListDataFromNet02(pageNum, pageSize, successCallback, errorCallback) {
		$.ajax({
			type: 'POST',
			url: baseURL + '/guessing/past_period',
			data: {
				page: pageNum,
				pagesize: pageSize
			},
			dataType: 'json',
			success: function(data) {
				if(data.code === 0) {
					var listData02 = [];
					for(var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i += 1) {
						if(i === data.data.list.length) {
							break
						}
						listData02.push(data.data.list[i])
					}
					successCallback(data.data.list)
				} else {
					console.log(data.info)
				}
			},
			error: errorCallback
		})
	}
	$('#mescroll-dataList02').on('click', 'li', function(e) {
		var target = e.target;
		if(target.className === 'data-list02-giftList') {
			var index = $(target).attr('actIndex');
			window.location.href = 'giftList.html?actId=' + index
		}
	});
});