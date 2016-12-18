$(function(){
	var popWidth = $("#winSelector").width(),
		popHeight = $("#winSelector").height(),
		middleWidth = $(".bigImg").width(),
		middleHeight = $(".bigImg").height(),
		bigWidth = $("#bigView").width(),
		bigHeight = $("#bigView").height();
		rateX =(800-bigWidth) / (420-popWidth),
		rateY = (800-bigHeight) / (420-popHeight);
		
		// 鼠标移入 .middle 盒子范围，显示 .pop 的遮罩和 .big 的大图，移出则隐藏
		$("#midView").hover(function(){
			$("#winSelector,#bigView").show();
		}, function(){
			$("#winSelector,#bigView").hide();
		}).on("mousemove", function(event){
			// 设置 .pop 遮罩在文档中的绝对定位位置，将鼠标指针放置在遮罩居中的位置上
			$("#winSelector").offset({
				top:event.pageY - popHeight / 2,
				left:event.pageX - popWidth / 2
			});
			
		// 获取 .pop 相对有定位的父元素 .middle 的相对定位位置
				var position = $("#winSelector").position(),
					_top = position.top,
					_left = position.left;
				// 判断 _top, _left 的取值
				if (_top < 0)
					_top = 0;
				else if (_top > middleHeight - popHeight)
					_top = middleHeight - popHeight;
				if (_left < 0)
					_left = 0;
				else if (_left > middleWidth - popWidth)
					_left = middleWidth - popWidth;
				// 重新设置 .pop 的相对定位位置
				$("#winSelector").css({
					top:_top,
					left:_left
				});

				// 设置放大镜 .big 框中的图片定位位置
				$("#bigView img").css({
					top: -rateY * _top,
					left: -rateX * _left
				});
		});
		
		// 点击 .small 小图切换显示图片
		$(".smallImg .small").on("mouseover", function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			var _src = $(this).children('img').attr("src");
			$("#midView img").attr("src", _src.replace("85X85", "420X420"));
			$("#bigView img").attr("src", _src.replace("85X85", "800X800"));
		});
		
		//左右键点击
		$(".pre").on("click",function(){
			if ($(".huadong").css("marginLeft") == "-95px"){
				$(".huadong").animate({marginLeft: '-0px'}, "slow");
			} else{
				return;
			}
		});
		
		$(".next").on("click",function(){
			if ($(".huadong").css("marginLeft") == "0px"){
				$(".huadong").animate({marginLeft: '-95px'}, "slow");
			} else{
				return;
			}
		});
		
		
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
		
		
		//两件商品切换
		var idnum = 1;
		$(".norm_list a").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			var index = $(this).index();
			if (index ==0) {
				$(".smallImg .small").eq(1).mouseover();
				idnum = 1;
			} else{
				$(".smallImg .small").eq(0).mouseover();
				idnum = 2;
			}
		});
		
		//商品数量加减
		$(".add").on("click",function(){
			var count = $(".quantity_txt").val();
			if (count<38) {
				$(".quantity_txt").val(++count);
			}
		});
		$(".less").on("click",function(){
			var count = $(".quantity_txt").val();
			if (count>1) {
				$(".quantity_txt").val(--count);
			}
		});
		
		//评论详情切换栏目
		$("#detailTab a").on("click",function(index,element){
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".center_html li").eq(index).stop(true).fadeIn().siblings().fadeOut();
		});
		
		
		//加入购物车弹出对话框
		$(".btnAddToCart").click(function(){
			$(".success").fadeIn();
		});
		
		$(".success .closeBtn").click(function(){
			$(".success").fadeOut();
		});

		
});