$(function(){
	//轮播图
	var $lis = $("#banner>.bannerlist li"), // 所有的 li
		len = $lis.length, // 轮播图片的数量
		index = 0, // 当前显示图片的索引
		nextIndex = 1; // 下一张显示图片的索引
		
	// 添加小圆点
	var html = "";
	for (var i = 0; i < len; i++) {
		html += "<div>"+(i+1)+"</div>";	
	}	

	// 自动轮播切换
	var timer = setInterval(move, 2200);
	
	// 追加小圆点并给小圆点绑定点击事件
	$(html).appendTo('#pages').on("mouseover", function(){	
	nextIndex = $(this).index(); 
	move(); //切换
	});
	//给第一个加上curr
	$("#banner #pages div").eq(0).addClass('curr');
	
	//鼠标进入停止,移出继续轮播
	$("#banner").hover(
	function () {
		clearInterval(timer)
	},
	function () {
		timer = setInterval(move, 2200);
	  }
	);

	// 切换显示
	function move() {
		//当前页面的轮播图的淡出与下一张轮播图的淡入
		$("#banner>.bannerlist li").eq(index).stop(true).fadeOut(500);
		$("#banner>.bannerlist li").eq(nextIndex).stop(true).fadeTo(500,1);
		//小圆点样式的同步改变
		$("#banner #pages div").eq(nextIndex).addClass('curr').siblings().removeClass("curr");
		// 设置下一张图片索引		
		index = nextIndex;
		nextIndex++;
		if (nextIndex >= len)
			nextIndex = 0;		
	}
	
	//右边电梯和头部出现
	$(window).on("scroll",function(){
		var scrTop = $(this).scrollTop();
		if (scrTop>=700) {
			$("#scrool").fadeIn();
			$("#dianti").fadeIn();
		} else{
			$("#scrool").fadeOut();
			$("#dianti").fadeOut();
		}
	});
	
	//选项卡切换
	var 
	$tabs = $(".floorTab a"),	// 所有的 tab a标签
	$uls = $(".floor .goodslist ul"); // 所有的 ul
	console.log($uls);
	$tabs.each(function(index,element){
		$(this).on("mouseover",function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			$uls.eq(index).fadeIn().siblings().fadeOut();
		});
	});
	
	
	//商品分类显示或隐藏
	
	
	
	
	
	
	
	
	
	
	
	
	
});