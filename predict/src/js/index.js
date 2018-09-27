$(function () {
    console.log(window.location.href)
    /*基础设置*/
    var baseURL = 'https://a.hzjiazhuo.com/api';
    var webURL = 'http://web.hzjiazhuo.com/';
    var loginURL = 'http://web.hzjiazhuo.com/#/acount/login';
    var coinURL = 'http://web.hzjiazhuo.com/#/center/draw';
    var toastlxl = new Toastlxl('toastBox');
    var modallxl = "";
    var jiazhuoToken = getQueryString('token') || window.localStorage.getItem('jiazhuoToken') || '';
    console.log(jiazhuoToken);
    window.localStorage.setItem('jiazhuoToken', jiazhuoToken);
    $.ajax({
        type: "post",
        url: baseURL + '/guessing/get_guessing',
        data: {},
        async: true,
        success(res) {
            console.log(res)
            if (res.code === 0) {
                $(".prize1").text(res.data.guessing_price.first_prize)
                $(".prize2").text(res.data.guessing_price.second_prize)
                $(".prize3").text(res.data.guessing_price.third_prize)
                $('.reduce_dio').text(res.data.guessing_price.reduce_dio)
                $('.BTC-countPrice').text(res.data.closing_price)
                $('.content1').show();
                $('.content2').show();
                $('.content3').hide();
            } else if (res.code === 1) {
                console.log(1)
                $('.content1').hide();
                $('.content2').hide();
                $('.content3').show();
            }
        }
    });
    $('.foot_nav li').click(function () {
        $(this).addClass("active");
        $(this).siblings("li").removeClass('active');
        if ($(this).index() == "0") {
            $(".foot-main2").hide()
            $(".foot-main3").hide()
            $(".foot-main1").show()
        } else if ($(this).index() == "1") {
            $(".foot-main1").hide()
            $(".foot-main3").hide()
            $(".foot-main2").show()
        } else if ($(this).index() == "2") {
            $(".foot-main1").hide()
            $(".foot-main2").hide()
            $(".foot-main3").show()
        }
    })
    $('.input_box input').change(function () {
        var priceVal = parseFloat($(this).val()).toFixed(2);
        if (priceVal > 99999.99) {
            priceVal = 99999.99
            toastlxl.show('最大数值为99999.99')
        } else if (priceVal < 0) {
            priceVal = 0.99
            toastlxl.show('最小数值为0.00')
        }
        $(this).val(priceVal);
    })
    $('.subBtn').click(function () {
        var priceVal = parseFloat($('.input_box input').val()).toFixed(2);
        console.log(priceVal);
        console.log(jiazhuoToken);
        if (0 < priceVal && priceVal <= 99999.99) {
            if (jiazhuoToken) {
                var prizeSort = $('.prize1').text() + '&nbsp;' + $('.prize2').text() + '&nbsp;' + $('.prize3').text();
                modallxl = new Modal({
                    "eleId": "modalBox",
                    "title": '',
                    "content": '<div class="contentTitle">确定</div><span class="confirmhint"><i>奖励币种</i>' + prizeSort + '</span><span class="confirmhint"><i>预测币价</i>' + priceVal + '</span><span class="confirmhint"><i>消耗DIO</i>' + $('.reduce_dio').text() + '</span>',
                    success: function () {
                        $('#modalBox').hide();
                        $.ajax({
                            type: "post",
                            url: baseURL + '/guessing/enroll',
                            data: {
                                token: jiazhuoToken,
                                price: priceVal,
                            },
                            async: true,
                            success(res) {
                                console.log(res);
                                if (res.code == 0) {
                                    toastlxl.show('提交成功')

                                } else if (res.code == 1) {
                                    toastlxl.show(res.info)
                                } else if (res.code == 2) {
                                    modallxl = new Modal({
                                        "eleId": "modalBox",
                                        "title": '',
                                        "content": '<span class="login">请先填写提币地址</span>',
                                        success: function () {
                                            window.localStorage.setItem('fromUrl', webURL + 'activity/predict/index.html');
                                            $('#modalBox').hide();
                                            console.log(window.localStorage.getItem('fromUrl'));
                                            window.location.href = coinURL;
                                        },
                                        cancel: function () {

                                        }
                                    })
                                } else {
                                    modallxl = new Modal({
                                        "eleId": "modalBox",
                                        "title": '',
                                        "content": '<span class="login">请先登录</span>',
                                        success: function () {
                                            window.localStorage.setItem('fromUrl', webURL + 'activity/predict/index.html');
                                            $('#modalBox').hide();
                                            console.log(window.localStorage.getItem('fromUrl'));
                                            window.location.href = loginURL;
                                        },
                                        cancel: function () {

                                        }
                                    })
                                }
                            }
                        });

                    },
                    cancel: function () {

                    }
                })
            } else {
                modallxl = new Modal({
                    "eleId": "modalBox",
                    "title": '',
                    "content": '<span class="login">请先登录</span>',
                    success: function () {
                        window.localStorage.setItem('fromUrl', webURL + 'activity/predict/index.html');
                        console.log(window.localStorage.getItem('fromUrl'));
                        $('#modalBox').hide();
                        window.location.href = loginURL;
                    },
                    cancel: function () {

                    }
                })
            }
        } else {
            toastlxl.show('请输入0~99999.99')
        }

    })
})
