$(function() {
	/*滑块*/
	var selector = '[data-rangeslider]';
	var $inputRange = $(selector);
	function valueOutput(element) {
		element.min = 0.1,
		element.max = 200,
		$('.minNum').text(element.min);
		$('.maxNum').text(element.max);
		$('.selectNum').text(element.value);
		$('.enterNumVal').val(element.value);
		var size=parseInt($(".activeLi").attr('size'));
		$(".getNumVal").val(  (element.value*size).toFixed(4));
	}
	valueOutput($inputRange[0]);
	$(document).on('input', selector, function(e) {
		valueOutput(e.target);
	});
	$inputRange.rangeslider({
		polyfill: false
	});
	$(".xiala-div").click(function() {
		$(this).siblings(".xiala-list").slideToggle("fast");
	})
	$(".xiala-list").on('click','li',function() {
		$(this).parents(".xiala-list").siblings(".xiala-div").text($(this).text());
		$(this).parents(".xiala-list").slideToggle("fast");
		if($(this).index()==1){
			language('english')
		}else{
			language('chinses')
		}
	})
	$(".main-form li").click(function() {
		$(".main-form li").removeClass("activeLi");
		$(this).addClass("activeLi");
		var size=parseInt($(".activeLi").attr('size'));
		$(".getNumVal").val(($inputRange[0].value*size).toFixed(4));
	})	
	/*弹窗*/
	$(".guide").click(function() {
		$(".guide-box").show();
		$(".mark-box").show();
	})
	$(".guide-box .close-btn").click(function() {
		$(".guide-box").hide();
		$(".mark-box").hide();
	});

	/*输入数值*/
	function clearNoNum() {
		this.value = this.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符  
		this.value = this.value.replace(/^\./g, ""); //验证第一个字符是数字而不是  
		this.value = this.value.replace(/^0./g, ""); //验证第一个字符是数字而不是  
		this.value = this.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
		this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数  
	}
	$(".enterNumVal").blur(function(){
		var valNum=parseFloat($(this).val()).toFixed(4);
		if(valNum<$inputRange[0].min){
			valNum=$inputRange[0].min;
		}
		if(valNum>$inputRange[0].max){
			valNum=$inputRange[0].max;
		}
		$(".enterNumVal").val(valNum)
		$inputRange.val(valNum).change();
		console.log($inputRange[0].value);
		
	})
	/*index_hy*/
	$('#allBet').on('click', function () {
        $('#allBet-ul').show()
        $('#perBet-ul').hide()
        $('#moveLine').addClass('goLeft')
        $('#moveLine').removeClass('goRight')
    })

    $('#perBet').on('click', function () {
        $('#perBet-ul').show()
        $('#allBet-ul').hide()
        $('#moveLine').addClass('goRight')
        $('#moveLine').removeClass('goLeft')
    })
    
    /*toast*/
   	$(".toast img").click(function(){
   		$('.toast').hide();
   	})
	
	/*语言切换*/
	function language(type){
		
		if(type=="english"){
			activeData=englishData
		}else{
			activeData=chineseData
		}
		console.log(activeData)
		$(".language .xiala-div").text(activeData.headTitle.languageActive);
		var languageListStr='';
		activeData.headTitle.languageList.forEach(function(x,i){
			languageListStr +='<li>'+x+'</li>';
		})
		$('.language .xiala-list').html(languageListStr);
		$('.guide span').text(activeData.headTitle.headTitle02);
		$('.login-btn span').text(activeData.headTitle.headTitle03);
		$('.sort1 .sort-title').text(activeData.betKind.bet01);
		$('.sort1 .sort1-list ul li').eq(0).find("span").text(activeData.betKind.bet01Kind01);
		$('.sort1 .sort1-list ul li').eq(1).find("span").text(activeData.betKind.bet01Kind02);
		$('.sort1 .sort1-list ul li').eq(2).find("span").text(activeData.betKind.bet01Kind03);
		$('.sort1 .sort1-list ul li').eq(3).find("span").text(activeData.betKind.bet01Kind04);
		$('.sort2 .sort-title').text(activeData.betKind.bet02);
		$('.sort3 .sort-title').text(activeData.betKind.bet03);
		$('.myNum .title').text(activeData.betCurrency.betCurrency);
		$('.myNum .allNum span').text(activeData.betCurrency.betBalance);
		$('.enterNum-box .enterNum').eq(0).find('.title').text(activeData.betCurrency.betCurrency);
		$('.enterNum-box .enterNum').eq(1).find('.title').text(activeData.betCurrency.betPredict);
		$('.form-btn').text(activeData.betCurrency.betDice);
		$('#allBet').text(activeData.betDataList.aLLBet);
		$('#perBet').text(activeData.betDataList.perBet);
		$('.allBet-list-head span').eq(0).text(activeData.betDataList.betTime);
		$('.allBet-list-head span').eq(0).text(activeData.betDataList.betCurrency);
		$('.allBet-list-head span').eq(0).text(activeData.betDataList.betEvent);
		$('.allBet-list-head span').eq(0).text(activeData.betDataList.betBonus);
		
		$(".guide-box .title").text(activeData.guideTitle);
		
		
		var guideListStr=''
		activeData.guide.forEach(function(x,i){
			x=x.replace("(a1)","<a>")
			x=x.replace("(/a1)","</a>")
			x=x.replace("(a2)","<a>")
			x=x.replace("(/a2)","</a>")
			guideListStr+='<p>'+x+'</p>'
		})
		$('.guide-box .content-text').html(guideListStr);
	}
	language('chinese');
})