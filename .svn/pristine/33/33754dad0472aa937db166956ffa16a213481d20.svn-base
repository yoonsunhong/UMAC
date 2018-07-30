/********************************************************
 * 설명:  손익생성
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 윤태희
 * since	: 2017.11.10
 * version : 1.0
 ********************************************************/
// ----------------------- 그리드 설정 시작 -------------------------------------
//----------------------- 그리드 설정 끝 ---------------------------------------


/*플래그 정의하기*/
var flag_1 		= "N";	//일재고마감(조정전) 성공 실패 플래그
var flag_2 		= "N";	//월재고마감(조정전) 성공 실패 플래그
var flag_3 		= "N";	//실사확정 성공 실패 플래그
var flag_3_1 	= "N";	//실사확정취소 성공 실패 플래그
var flag_4 		= "N";	//원가율 성공 실패 플래그
var flag_5 		= "N";	//손익생성 성공 실패 플래그
var flag_6 		= "N";	//일재고마감(조정후) 성공 실패 플래그
var flag_7 		= "N";	//월재고마감(조정후) 성공 실패 플래그

$(document).ready(function () {
	// 점포코드 콤보 가져오기
	/*getStoreCode("S_STR_CODE");
	$("#S_STR_CODE").val($("#SESSION_STR_CODE").val());*/
});


//실사확정 라디오버튼 체크시 판단
function ad_yn_change(ad_yn_val){
	if(ad_yn_val == "Y"){		//실사확정
		//console.log("실사확정");
		
		//체크박스 checked
		$('#day_closed').prop("checked", true);
		$('#month_closed').prop("checked", true);
		$('#ad_real').prop("checked", true);
		$('#day_real_closed').prop("checked", true);
		$('#month_real_closed').prop("checked", true);
		$('#profit').prop("checked", true);
		$('#profitandloss').prop("checked", true);
		
		//필수여부text
		$('#day_closed_dis').css("display", "");
		$('#month_closed_dis').css("display", "");
		$('#ad_real_dis').css("display", "");
		$('#day_real_closed_dis').css("display", "");
		$('#month_real_closed_dis').css("display", "");
		
		//disabled
		$('#profit').removeAttr("disabled");
		$('#profitandloss').removeAttr("disabled");
		
	}else if(ad_yn_val == "N"){	//실사확정취소
		//console.log("실사확정 취소");
		
		//체크박스 checked
		$('#day_closed').prop("checked", true);
		$('#month_closed').prop("checked", true);
		$('#ad_real').prop("checked", false);
		$('#day_real_closed').prop("checked", false);
		$('#month_real_closed').prop("checked", false);
		$('#profit').prop("checked", false);
		$('#profitandloss').prop("checked", false);
		
		//필수여부text
		$('#day_closed_dis').css("display", "");
		$('#month_closed_dis').css("display", "");
		$('#ad_real_dis').css("display", "none");
		$('#day_real_closed_dis').css("display", "none");
		$('#month_real_closed_dis').css("display", "none");
		
		//disabled
		$('#profit').attr("disabled", "disabled");
		$('#profitandloss').attr("disabled", "disabled");
	}else if(ad_yn_val == "M"){		//실사확정 비대상
		//console.log("실사확정 비대상");
		
		//체크박스 checked
		$('#day_closed').prop("checked", false);
		$('#month_closed').prop("checked", false);
		$('#ad_real').prop("checked", false);
		$('#day_real_closed').prop("checked", false);
		$('#month_real_closed').prop("checked", false);
		$('#profit').prop("checked", false);
		$('#profitandloss').prop("checked", false);
		
		//필수여부text
		$('#day_closed_dis').css("display", "none");
		$('#month_closed_dis').css("display", "none");
		$('#ad_real_dis').css("display", "none");
		$('#day_real_closed_dis').css("display", "none");
		$('#month_real_closed_dis').css("display", "none");
		
		//disabled
		$('#profit').removeAttr("disabled");
		$('#profitandloss').removeAttr("disabled");
	}
}

//손익생성 체크박스 클릭시 원가율 자동체크
function profitandloss_change(val){
	if($("#profitandloss").prop("checked") == true){
		//손익생성을 체크하면 원가율은 필수
		//console.log("손인생성 클릭시 원가율 필수");
		$('#profit').prop("checked", true);
	} else{
		//console.log("손익생성 해제");
	}
}

//실행버튼 클릭시
function profitAndLoss_pr(){		
	if($('#P_INV_MT').val()==""){
		alert("날짜를 선택해주세요.");
		return ;
	}
	if($(':radio[name="ad_yn"]:checked').val() == undefined  || $(':radio[name="ad_yn"]:checked').val() == ""  ){
		alert("실사확정여부를 선택해주세요.");
		return ;
	}
	//console.log($(':radio[name="ad_yn"]:checked').val());
	
	//로딩바 보이기
	showLoadingBar1();
	
	if($(':radio[name="ad_yn"]:checked').val()  == "Y")
	{
		/*console.log("실사확정여부 확정 선택");
		BATCH_IV_DT_ITEM_COLL_VER2();				//일재고마감(조정 전)
		//console.log("flag_1 : " +flag_1+ "// 일재고마감(조정전) 플래그");
		if(flag_1 == "Y"){
			BATCH_IV_MT_ITEM_COLL_VER2();				//월재고마감(조정 전)
		}else{
			console.log("일재고마감(조정 전)이 실패하였습니다.");
			return;
		}
		
		if(flag_2 == "Y"){
			STOCK_EXCEL_UPLOAD_FINISH_VER2();		//실사확정
		}else{
			console.log("월재고마감(조정 전)이 실패하였습니다.");
			return;
		}
		
		
		BATCH_IV_DT_ITEM_COLL_VER2();				//실사확정후, 일재고마감 다시돌림 (조정 후)
		BATCH_IV_MT_ITEM_COLL_VER2();				//실사확정후, 월재고마감 다시돌림 (조정 후)
		
		
		if(flag_3 == "Y"){
			STOCK_PROFIT_RATE_VER2();		//원가율
		}else{
			console.log("실사확정이 실패하였습니다.");
			return;
		}
		
		
		if(flag_4 == "Y"){
			BATCH_IV_MT_ITEM_COLL_PROFIT();		//손익생성
		}else{
			console.log("원가율이 실패하였습니다.");
			return;
		}*/
		BATCH_IV_DT_ITEM_COLL_VER2("B");	//일재고마감(조정 전)
		BATCH_IV_MT_ITEM_COLL_VER2();		//월재고마감(조정 전)
		STOCK_EXCEL_UPLOAD_FINISH_VER2();	//실사확정
		BATCH_IV_DT_ITEM_COLL_VER2("A");	//일재고마감(조정 후)
		BATCH_IV_MT_ITEM_COLL_VER2();		//월재고마감(조정 후)
		STOCK_PROFIT_RATE_VER2();			//원가율
		BATCH_IV_MT_ITEM_COLL_PROFIT();		//손익생성
	}else if($(':radio[name="ad_yn"]:checked').val() == "N"){
		//console.log("실사확정여부 취소 선택");
		
		STOCK_EXCEL_UPLOAD_CANCEL_VER2();			//확정취소, IV_STOCK_ADJUST 삭제,   IV_STOCK_SCHEDULE   CFM_FLAG = 1 update
		//BATCH_IV_DT_ITEM_COLL_VER2();					//실사확정후, 일재고마감 다시돌림 (조정 후)
		//BATCH_IV_MT_ITEM_COLL_VER2();					//실사확정후, 월재고마감 다시돌림 (조정 후)
		//일재고마감(조정 전)
		//월재고마감(조정 전)
	}else{
		//console.log("실사확정여부 비대상 선택");
		STOCK_PROFIT_RATE_VER2();			//원가율
		BATCH_IV_MT_ITEM_COLL_PROFIT();		//손익생성
	}
	
	//로딩바 숨기기
	hideLoadingBar1();
}

function change_dt(){
	var CH_DT = $('#P_INV_MT').val()+"-30";
	$('#P_WORK_DT').val(CH_DT);
}


//일재고마감(조정 전)
function BATCH_IV_DT_ITEM_COLL_VER2(workType){
	change_dt();
	$("#P_WORK_TYPE").val(workType);	//workType = B : (조정전,Before), A : (조정후,After)
	var params = $('#frm').serialize();
	
	$.ajax({
		url :'/batch_iv_dt_item_coll_ver2.do',
		type : 'POST',
		data : params,
		dataType : "JSON",
		async: false,		//순차적 AJAX 진행을 위해 비동기로 진행.
		beforeSend : function(){ 	    	
            //로딩바 생성
	    }, 
		success:function(data){
			//화면에 체크표시 퍼블리싱
			//로빙바 제거
			console.log("ajax_일재고마감 조정전 성공");
			//console.log(JSON.stringify(data.JOB_FLAG));
			//console.log(JSON.stringify(data));
	    },
	    complete : function() {
	    	//성공플래그
	    	flag_1 = "Y";
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


//월재고마감(조정 전)
function BATCH_IV_MT_ITEM_COLL_VER2(){
	change_dt();
	var params = $('#frm').serialize();
	
	$.ajax({
		url :'/batch_iv_mt_item_coll_ver2.do',
		type : 'POST',
		data : params,
		dataType : "JSON",
		async: false,		//순차적 AJAX 진행을 위해 비동기로 진행.
		beforeSend : function(){ 	    	
            //로딩바 생성
	    }, 
		success:function(data){
			//화면에 체크표시 퍼블리싱
			//로빙바 제거
			console.log("ajax_월재고마감 조정전 성공");
			//console.log(JSON.stringify(data.JOB_FLAG));
	    },
	    complete : function() {
	    	//성공플래그
	    	flag_2 = "Y";
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//실사확정
function STOCK_EXCEL_UPLOAD_FINISH_VER2() {
	change_dt();
	var params = $('#frm').serialize();
	
	$.ajax({
		url : '/stock_excel_upload_finish_ver2.do',
		type : 'POST',
		data : params,
		dataType : "JSON",
		async : false,
		beforeSned : function(){
			
		},
		success : function(data){
			console.log("ajax_실사확정 완료");
			//console.log(JSON.stringify(data.JOB_FLAG));
		},
		complete : function(){
			//성공플래그
	    	flag_3 = "Y";
		},
		error : function(xhr, status, error){
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

//실사확정 취소
function STOCK_EXCEL_UPLOAD_CANCEL_VER2() {
	change_dt();
	var params = $('#frm').serialize();
	
	$.ajax({
		url : '/stock_excel_upload_cancel_ver2.do',
		type : 'POST',
		data : params,
		dataType : "JSON",
		async : false,
		beforeSned : function(){
			$('.wrap-loading').removeClass('display-none');
		},
		success : function(data){
			//console.log("ajax_실사확정취소 완료");
			//console.log(JSON.stringify(data.JOB_FLAG));
			//로딩바 숨기기
			hideLoadingBar1();
		},
		complete : function(){
			//성공플래그
	    	flag_3_1 = "Y";
	    	$('.wrap-loading').addClass('display-none');
		},
		error : function(xhr, status, error){
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

//원가율
function STOCK_PROFIT_RATE_VER2(){
	change_dt();
	var params = $('#frm').serialize();
	
	$.ajax({
		url : '/stock_profit_rate_ver2.do',
		type : 'POST',
		data : params,
		dataType : "JSON",
		async : false,
		beforeSend : function(){
			
		},
		success : function(data){
			console.log("ajax_원가율완료");
			//console.log(JSON.stringify(data.JOB_FLAG));
		},
		complete : function(){
			//성공플래그
	    	flag_4 = "Y";
		},
		error : function(xhr, status, error){
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

//손익생성
function BATCH_IV_MT_ITEM_COLL_PROFIT(){
	change_dt();
	var params = $('#frm').serialize();
	
	$.ajax({
		url : '/batch_iv_mt_item_coll_profit_ver2.do',
		type : "POST",
		data : params,
		dataType : "JSON",
		async : false,
		beforeSend : function(){
			
		},
		success : function(data){
			console.log("ajax_손익생성완료");
			//console.log(JSON.stringify(data.JOB_FLAG));
			//console.log(JSON.stringify(data));
		},
		complete : function(){
			//성공플래그
	    	flag_5 = "Y";
		},
		error : function(xhr, status, error){
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

//그리드 로딩바  보이기
function showLoadingBar1() {
    $("#loading_bar").show();
}
//그리드 로딩바  숨기기
function hideLoadingBar1() {
	$("#loading_bar").hide();
}
