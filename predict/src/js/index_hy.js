$(function () {

    //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,重置列表数据;
    var mescroll01 = new MeScroll("mescroll-part01", {
        up: {
            clearEmptyId: "mescroll-dataList01", //1.下拉刷新时会自动先清空此列表,再加入数据; 2.无任何数据时会在此列表自动提示空
            callback: getListData01, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
        }
    });

    var mescroll02 = new MeScroll("mescroll-part02", {
        up: {
            clearEmptyId: "mescroll-dataList02",
            callback: getListData02,
        }
    });

    /*----------------------------------------------------------------------------------------------------------------------*/

    /*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function getListData01(page) {
        //联网加载数据
        getListDataFromNet01(page.num, page.size, function (data) {
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll01.endSuccess(data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            //设置列表数据,因为配置了emptyClearId,第一页会清空dataList的数据,所以setListData应该写在最后;
            setListData01(data);
        }, function () {
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll01.endErr();
        });
    }

    function getListData02(page) {
        //联网加载数据
        getListDataFromNet02(page.num, page.size, function (data) {
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll02.endSuccess(data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            //设置列表数据,因为配置了emptyClearId,第一页会清空dataList的数据,所以setListData应该写在最后;
            setListData02(data);
        }, function () {
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll02.endErr();
        });
    }

    /*----------------------------------------------------------------------------------------------------------------------*/

    /*设置列表数据*/
    function setListData01(data) {
        var listDom = document.getElementById("mescroll-dataList01");
        for (var i = 0; i < data.length; i++) {
            var pd = data[i];

            var str = '<p class="data-list01-userName">' + pd.nickname + '</p>';
            str += '<p class="data-list01-coinPrice">' + pd.price + '</p>';

            var liDom = document.createElement("li");
            $(liDom).addClass('data-list01-li');
            liDom.innerHTML = str;
            listDom.appendChild(liDom);
        }
    }

    function setListData02(data) {
        var listDom = document.getElementById("mescroll-dataList02");
        for (var i = 0; i < data.length; i++) {
            var pd = data[i];

            var str = '<p class="data-list02-date">' + pd.date + '</p>';
            str += '<p class="data-list02-coinPrice">' + pd.closing_price + '</p>';
            str += '<p class="data-list02-giftList" actIndex="' + pd.id + '">详情<img src="src/img/prize_detail@2x.png" alt=""></p>';

            var liDom = document.createElement("li");
            $(liDom).addClass('data-list02-li');
            liDom.innerHTML = str;
            listDom.appendChild(liDom);
        }
    }

    /*----------------------------------------------------------------------------------------------------------------------*/

    /*联网加载列表数据*/
    function getListDataFromNet01(pageNum, pageSize, successCallback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: baseURL+'/guessing/get_today',
            data: {page: pageNum, pagesize: pageSize},
            dataType: 'json',
            success: function (data) {
                if (data.code === 0) {
                    var listData01 = [];
                    for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
                        if (i === data.data.list.length) break;
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

    function getListDataFromNet02(pageNum, pageSize, successCallback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: baseURL+'/guessing/past_period',
            data: {page: pageNum, pagesize: pageSize},
            dataType: 'json',
            success: function (data) {
                if (data.code === 0) {
                    var listData02 = [];
                    for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
                        if (i === data.data.list.length) break;
                        listData02.push(data.data.list[i]);
                    }
                    successCallback(listData02);
                } else {
                    console.log(data.info)
                }
            },
            error: errorCallback
        });
    }

    /*----------------------------------------------------------------------------------------------------------------------*/

    /*点击跳转事件*/
    $('#mescroll-dataList02').on('click', 'li', function (e) {
        var target = e.target
        if (target.className === 'data-list02-giftList') {
            var index = $(target).attr('actIndex')
            window.location.href = 'giftList.html?actId=' + index
        }
    });

    //禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
    /*document.ondragstart = function () {
        return false;
    }*/
});