$(document).ready(function (){	
	
	// ie readonly 처리
	function addClassReadOnly(id) {
		$("#" + id).addClass("readonly");
		$("#" + id).on("click focus",function  () {
			if ($(this).hasClass('readonly') == true ) $(this).blur();
		});
	}
	
	function removeClassReadOnly(id) {
		$("#" + id).removeClass("readonly");
	}
	
	$(window).on('resize',function  () {
		/* width */
		var wid = $(window).width();
		var wrapWid = $("#wrap").outerWidth();
		var logoWid = $(".logo").outerWidth();
		
		$("#wrap").width( wid-40 );
		$("#iframeCnt").width(wid-48);
		$("#gnb").width( wid-260 );
		$(".frame_box, #content").width( wid-260 );
		$(".advice").width( wid-97 );

		if ( wid <= 1200 ) {	// 전체 너비가 1200px 이하일 때
			$("#wrap").width( 1180 );
			$("#content").width( 940 );
		}

		/* height */
		var hei = $(window).height();
		
		$("#wrap").height( hei-30 );
		$("#container, #snb").height( hei-74 );
		$(".frame_box").height( hei-102 );
		$("#loginArea").height( hei );

		// 로그인 영역
		if ( $(window).width() <= 900 ) { $("#loginHeader, .login").width( 900 ); } 
		else { $("#loginHeader, .login").width( '100%' ); }

		$("#loginHeader, #loginMain").parent().css('min-width','900px');

		$(".login .login_cnt").css('marginTop',  ( $("#loginMain").height() - 367 ) / 2);

		if ( $(window).height() <= 588 ) {
			$("#loginArea").height(588);
			$(".login .login_cnt").css('marginTop', '110px');
		} else $("#loginArea").height($(window).height());
	});
	$(window).trigger('resize');	
	
	/* 즐겨찾기 클릭시 */
	$(".fav").on("click",function (){
		
		//alert($(location).attr('pathname').replace('/',''));
		var bookMark = $(location).attr('pathname').replace('/','');
		
		if ( $(this).hasClass("fav_inactive") ){
			$(this).removeClass("fav_inactive").addClass("fav_active");
			
			/**
			 * 즐겨찾기 추가
			 * 파라미터 정보 (?,?,?)
			 * 1, 프로그램 ID (URL) 
			 * 2. 즐겨찾기 등록, 삭제여부 (Y : 등록 , N: 삭제), 
			 * 3.즐겨찾기 대메뉴 호출여부 (즐겨찾기면 N, 아니면 Y)
			 * 
			 */
			bookMarkAdd(bookMark,'Y','Y');
		} else {
			$(this).removeClass("fav_active").addClass("fav_inactive");
			
			/**
			 * 즐겨찾기 삭제 
			 * 파라미터 정보 (?,?,?)
			 * 1, 프로그램 ID (URL) 
			 * 2. 즐겨찾기 등록, 삭제여부 (Y : 등록 , N: 삭제), 
			 * 3.즐겨찾기 대메뉴 호출여부 (즐겨찾기면 N, 아니면 Y)
			 * 
			 */
			bookMarkAdd(bookMark,'N','Y');
		}
	});
	
	/* 로그인 엔터시 포커스 이동 */
	$("#USER_ID").keydown(function(key) {
		if (key.keyCode == 13) $("#PASSWD_NO").focus();
	});
	
	$("#PASSWD_NO").keydown(function(key) {
		if (key.keyCode == 13) {
			$("#PASSWD_NO").focus();
			login();
		} 
	});

	/* 여닫기 */
	var $fold = $(".btn_fold");
	$fold.on('click',function  () {
		$(this).toggleClass('fold');
		var fold = $(this).hasClass('fold');

		if ( fold ) { /*누르면 사라짐 */
			$("#snb").width(0);
			$("#snb h2").text('');
			$("#tabs").css('left','20px');
			$("#content, .frame_box").width( $("#container").width() );

			$(window).on('resize',function  () {	
				$("#content, .frame_box").width( $("#container").width() );

				if ( $(window).width() <= 1200 ) {
					$("#content, .frame_box").width( 1160 );
				} else $("#content, .frame_box").width( $("#container").width() );
			});
			$(window).trigger('resize');

		} else { /* 누르면 나타남 */
			$("#snb").width(220);
			$("#snb h2").text('Menu');
			$("#tabs").css('left','240px');
			$("#content, .frame_box").width( $("#container").width() - 220 );

			$(window).on('resize',function  () {	
				$("#content, .frame_box").width( $("#container").width() - 220 );

				if ( $(window).width() <= 1200 ) {
					$("#content, .frame_box").width( 940 );
				}
				else $("#content, .frame_box").width( $("#container").width() - 220 );
			});
			
			$(window).trigger('resize');	
		}
	});
	
	// 탭
	$(".tab .tab_btn").on("click focus",function  () {
		$(this).closest(".tab").find("ul > li").removeClass("on").find(".tab_btn").next().css("visibility","hidden");
		$(this).siblings().css("visibility","visible").closest("li").addClass("on");
		
		return false;
	});
	
	// 버튼
	/* 버튼 클릭시 효과 */
	$(".btn_style2, .btn_style3").on({
		"mouseup":function (){
			$(this).removeClass('mouseup');
		},
		"mousedown":function (){
			$(this).addClass('mouseup');
		}
	});
	
	// ie 제어
	/* ie9일 때*/
	if (jQuery.browser.version <= 9.0) {
		$(".login .input .icon-append + input").width("96%");
	}
	
	/* 도움말 클릭시 */
	$(".btn_area .btn_style1").toggle(function() {
		$(".advice").slideDown();
	}, function() {
		$(".advice").slideUp();
	});

	/*도움말 X(닫기) 클릭*/
	$(".advice .close_btn").on("click",function  () {
		$(".advice").slideUp();
		return false;
	});

	/*외부 클릭 -주석처리*/
	/*$(document).click(function(e){
		if (!$(e.target).is('.advice') || !$(e.target).is('.btn_style1')) {
			$(".advice").slideUp();
		}
	});*/
	
});

/**
 * 즐겨찾기 추가/삭제
 * 파라미터 정보 (?,?,?)
 * 1, 프로그램 ID (URL) 
 * 2. 즐겨찾기 등록, 삭제여부 (Y : 등록 , N: 삭제), 
 * 3.즐겨찾기 대메뉴 호출여부 (즐겨찾기면 N, 아니면 Y)
 * 
 */
function bookMarkAdd(url, flag, display){
	//alert(flag);
	jQuery.ajax({ 
	    url:"/setMyBookMark.do",         
	    type:"POST",
		datatype:"json",
		async:false,
		data: {FLAG : flag, PROGRAM_ID : url},
		success:function(data){  
			
			var obj = jQuery.parseJSON(data.CUR);
			//alert(obj[0].RETURN_CODE);
			if(obj[0].RETURN_CODE == '0000'){
				if(flag=='Y'){
					//즐겨찾기가 추가되었습니다.
					alert(textFavoritesAdd);
				}else if(flag=='N'){
					//즐겨찾기가 해제되었습니다.
					alert(textFavoritesDel);
				}
			}else{
				//요청중 문제가 발생했습니다.관리자에게 문의하세요.
				alert(msgErrorDefault);
			}
			
			//즐겨찾기 메뉴에서 호출되었으면 다시 레프트 메뉴 그려주기
			if(display == 'N'){
				
				getBookMarkMenu('즐겨찾기');
			}
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
}



/**
* 최상위 메뉴 클릭 시 Left 메뉴를 호출한 후 디자인 적용을 위한 함수
* @return
*/

function scrollMenu(){
	/*===--- 왼쪽 메뉴 ---===*/
	var $leftMenu = $("#snb .left_menu");
	var $depth2 = $leftMenu.find('> li a').next();
	var liHei = $("#snb ul li ul li").height();		// li의 높이
	$depth2.hide();														// dep2 닫기
	$leftMenu.append("<li class='last'></li>");		// dep1의 마지막 dep2 영역 인식을 위한 동적 생성

	 //1depth 클릭시 
	$leftMenu.find('> li > a').on('click',function  () {
		$(this).parent().toggleClass('on');
		var on = $(this).parent().hasClass('on');

		if ( on ) {
			$(this).parent().siblings().removeClass('on').next().animate({marginTop:0}).prev().find('ul').slideUp();			// toggle 시
			//alert('열림');
			$(this).next().slideDown();
			$(this).parent().next().animate({marginTop:$(this).next().children().length * liHei});

		} else {
			//$(this).parent().siblings().addClass('on');
			//alert('닫힘');
			$(this).next().slideUp();
			$(this).parent().next().animate({marginTop:0});
		}

		return false;
	});
}

//즐겨찾기 클릭시 호버 이벤트
function bookMarkMenu(){
	
	// 즐겨찾기 삭제 버튼 클릭시
	$("#snb .favorite li > a").on("click",function (){
		$(this).parent().addClass("on").siblings().removeClass("on");
		return false;
	});
	
}