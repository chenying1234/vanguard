$(function(){
		var $li = $("#goods .row").detach();
		//两件商品切换
		var idnum = 1,
		imgsrc = "images/14580455_90X90.jpg";
		$(".norm_list a").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			var index = $(this).index();
			if (index ==0) {
				$(".smallImg .small").eq(1).mouseover();
				idnum = 1;
				imgsrc = "images/14580455_90X90.jpg";
				$(".textPrimary strong").text(59);
			} else{
				$(".smallImg .small").eq(0).mouseover();
				idnum = 2;
				imgsrc = "images/14580454_90X90.jpg";
				$(".textPrimary strong").text(79);
			}
		});
		
		
		//点击添加到购物车
		$(".btnAddToCart").click(function(){
			//获取商品 id name price
			var product = {
				id : idnum,
				psrc : imgsrc,
				name : $(".norm .active").text(),
				price : $(".textPrimary strong").text(),
				amount : parseInt($(".quantity .quantity_txt").val())
			}
			//点击购物,弹出框
			$(".success .total .allgoods").text(product.amount);
			$(".success .total .money").text(product.amount *product.price);
			
			//alert(product.price);
			//将商品保存到数组中
			$.cookie.json = true ;
			//先从 cookie 中读取
			var products = $.cookie("products");
			//判断是否有读取到
			if (!products) {
				products = [];
			}
			//products.push(product);
			// 判断数组中是否存在当前选购商品
			var index = findIndex(product.id, products);
			if (index === -1) { // 数组中不存在当前选购商品
				// 将当前次添加到购物车的商品保存到数组中
				products.push(product);
			} else { // 数组中存在当前选购商品
				// 数量累加
				var jia=[];
				jia[index] = parseInt(products[index].amount);
				jia[index]+=product.amount;
				products[index].amount = jia[index];
			}
			//保存回cookie
			$.cookie("products",products,{expires:7,path:"/"});
		});
			
			
		// 找出数组中指定商品编号的元素位置
		function findIndex(id, products) {
			for (var i in products) {
				if (products[i].id === id)
					return i;
			}
			return -1;
		}
	
	
		//购物车把数据读出来
		$.cookie.json = true ;
		var products = $.cookie("products");
		if (!products || products.length === 0) {
			//alert("商品为空！");
			//window.location.href = "商品信息.html";
		}else{
			//for (var i=0, len = products.length; i<len;i++) {}
			$.each(products, function(index,element){
			console.log(element.id,element.name,element.price,element.psrc,element.amount);	
			//展示到页面上去
			$li.clone().appendTo("#goods").end().data("product",element)
			.find('img').attr("src",element.psrc).end()
			.find('.ld2a').text(element.name).end()
			.find('.ld4').text(element.price).end()
			.find('#shuliang').val(element.amount).end()
			.find('.font18').text(element.amount * element.price );
			});	
		}
		
		// "全选" 功能 
		$(".ck_all").click(function(){				
			$(".xuan").prop("checked", $(this).prop("checked"));
			calcTotal();
		});
		
		
		// "删除" 购物车中的商品
		$(".btndel").click(function(){
			var $row = $(this).parents(".row");
			deleteRow($row);
		});
		
		//从cookie中和页面中删除指定行中的数据
		function deleteRow($row){
			// 获取到缓存在行上的商品数据
			var product = $row.data("product");
			// 找出当前删除的商品在数组中是第几个元素
			var index = $.inArray(product, products);
			// 从数组中删除该索引处的元素
			products.splice(index, 1);
			// 将删除元素后的数组保存回 cookie 中
			$.cookie("products", products, {expires:7, path:"/"});
			// 从页面删除行
			$row.remove();
			
			// 如果购物车为空，则跳转页面
		if (products.length === 0){
			alert("购物车为空，跳转到商品页面");
			//location = "商品信息.html";
		}
		// 重新计算合计
		calcTotal();
		}
		
		// "删除选中行"
		$(".del_check").click(function(){
			$(".xuan").each(function(index, element){
				// $(this).prop("checked")
				if ($(this).is(":checked")) { // 被选中的
					var $row = $(this).parents(".row");
					deleteRow($row);
				}
			});
		});
		
		// 计算合计金额
		function calcTotal() {
		var total = 0;
		$(".xuan:checked").parents(".row").find(".font18").each(function(index, element){
			total += parseFloat($(this).text());
		});
		
		// 显示合计金额
		$(".jiesuan .price").text(total);
		}
		
		// 点击商品行前的复选框，设置“全选”复选框状态与刷新显示合计金额
		$(".xuan").click(function() {
		$(".ck_all").prop("checked", $(".xuan:checked").length === $(".xuan").length ? true : false);
		calcTotal();
		});
		
		
		// 加数量
		$(".caradd").click(function(){
		// 获取原有数量
		var amount = parseInt($(this).prev().val());
		amount++;
		// 加数量，将加了之后的结果放回文本框中显示
		$(this).prev().val(amount);
		// 获取单价
		var price = parseFloat($(this).parent().prev().text());
		// 重新计算小计
		$(this).parent().next().children("span").text(price * amount);
		// 重新计算合计
		calcTotal();

		// 保存修改了数量的商品信息
		$(this).parents(".row").data("product").amount = amount;
		$.cookie("products", products, {expires:7, path:"/"});
		});

		// 减数量
		$(".minus").click(function(){
		// 获取原有数量
		var amount = parseInt($(this).next().val());
		if (amount <= 1) // 数量最小减到1
			return;
		amount--;
		// 减数量，将减了之后的结果放回文本框中显示
		$(this).next().val(amount);
		// 获取单价
		var price = parseFloat($(this).parent().prev().text());
		// 重新计算小计
		$(this).parent().next().children("span").text(price * amount);
		// 重新计算合计
		calcTotal();

		// 保存修改了数量的商品信息
		$(this).parents(".row").data("product").amount = amount;
		$.cookie("products", products, {expires:7, path:"/"});
		});
		
		
		
});
