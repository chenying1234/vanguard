$(function(){
	//右边电梯和头部出现
	$(window).on("scroll",function(){
		var scrTop = $(this).scrollTop();
		if (scrTop>=700) {
			$("#dianti").fadeIn();
		} else{
			$("#dianti").fadeOut();
		}
	});
	
	//分类栏目出现或隐藏
		$("#title").on("mouseover",function(){
			$(".goodslist").css("display","block");
			$(".goodslist").hover(function(){
				$(this).css("display","block");
			},function(){
				$(this).css("display","none");
			});
		});
		
		$("#title").on("mouseout",function(){
			$(".goodslist").css("display","none");
		});
	
	
	
});