$(function(){
	var user='',pass='',phone='',mess='',yzma='';
	//当用户名失去焦点的时候
	$('#loginId').focusout(function(){
		var txt = $('#loginId').val(),
			reg = /^[a-zA-Z_]\w{3,19}$/;
		if( txt != ''){
			var b = reg.test(txt);
			if(b){
				$('#sp1').text('');
				user = txt;
			}
			else{
				$('#sp1').text('请输入正确的用户名')
			}
		}
	});
	
	
	//当手机号失去焦点的时候
	$('#mobilePhone').focusout(function(){
		var txt = $('#mobilePhone').val(),
			reg = /^1[34578]\d{9}$/g;
		if( txt != ''){
			var b = reg.test(txt);
			if(b){
				$('#sp2').text('');
				phone = txt;
			}
			else{
				$('#sp2').text('请输入正确的11位手机号码')
			}
		}
	});
	
	
	//当验证码失去焦点的时候
	var ma=3614;
	$("#flushCode").click(function(){
		if($("#ma").attr("src") =="images/3614.jpg"){
			$("#ma").attr("src","images/7944.jpg");
			ma = 7944;
		} else{
			$("#ma").attr("src","images/3614.jpg");
			ma = 3614;
		}
	});
	
	$('#captcha').focusout(function(){
		var txt =parseInt($('#captcha').val());
		if( txt != ''){
			if(txt == ma){
				$('#sp3').text('');
				yzma = txt;
			}
			else{
				$('#sp3').text('请输入正确的验证码')
			}
		}
	});
	
	//当短信失去焦点的时候
	var message=1234;
	$("#getMobileCaptcha").click(function(){
		if(message==1234){
			$('#sp4').text("短信:5678");
			message=5678;
		} else{
			$('#sp4').text("短信:1234");
			message=1234;
		}
	});
	
	$('#mobileValidateCode').focusout(function(){
		var txt =parseInt($('#mobileValidateCode').val());
		if( txt != ''){
			if(txt == message){
				$('#sp4_2').text('');
				mess = txt;
			}
			else{
				$('#sp4_2').text('请输入正确的短信验证码')
			}
		}
	});
	
	//当密码失去焦点的时候
	$('#password').focusout(function(){
		var txt = $('#password').val(),
			reg = /^[a-zA-Z_]\w{5,19}$/;
		if( txt != ''){
			var b = reg.test(txt);
			if(b){
				$('#sp5').text('');
				pass = txt;
			}
			else{
				$('#sp5').text('请输入正确的密码格式')
			}
		}
	});
	
	//确认密码失去焦点的时候
	$('#password_confirm').focusout(function(){
		var txt =$('#password_confirm').val();
		if( txt != ''){
			if(txt == pass){
				$('#sp6').text('');
			}
			else{
				$('#sp6').text('两次密码不一样')
			}
		}
	});
	
	//注册
	$("#gobtn").click(function(){
		console.log("gobtn");
		if(user==""||pass==""||phone==""||yzma==""||mess=="") {
			$('#sp7').text('请填写完整的信息后再注册！')
		} 
		else{
			//获取注册的 用户名 密码
			var people = {
				username :user,
				userpass :pass
			}
			$.cookie.json = true ;
			//先从 cookie 中读取
			var peoples = $.cookie("peoples");
			//判断是否有读取到
			if (!peoples) {
				peoples = [];
			}
			//products.push(product);
			// 判断数组中是否存在当前选购商品
			var index = findIndex(people.username, peoples);
			if (index === -1) { // 数组中不存在当前选购商品
				// 将当前次添加到购物车的商品保存到数组中
				peoples.push(people);
			} else { // 数组中存在当前选购商品
				peoples[index].username = people.username;
				peoples[index].userpass = people.userpass;
			}
			//保存回cookie
			$.cookie("peoples",peoples,{expires:7,path:"/"});	
			window.location.href="login.html";
			}
		
	});
	
	// 找出数组中指定用户名的元素位置
	function findIndex(username, peoples) {
		for (var i in peoples) {
			if (peoples[i].username == username)
				return i;
		}
		return -1;
	}
	
	
	//验证登录
	$("#denglv").click(function(){
		console.log("ok");
		var 
		a = $("#loginKey").val(),
		b = $("#dengpass").val();
		$.cookie.json = true ;
		//先从 cookie 中读取
		var peoples = $.cookie("peoples");
		var index = findIndex( a, peoples);
		if (index === -1) { // 数组中不存在当前选购商品
			$('#sp10').text('用户名不存在！');
		} else { // 数组中存在当前选购商品
			if (b==peoples[index].userpass) {
				alert("登录成功，即将跳转到首页");
				window.location.href="index.html";
			} else{
				$('#sp11').text('用户名或密码错误！');
			}
		}
		
	});


});