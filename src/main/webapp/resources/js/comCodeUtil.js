﻿
var datepicker_default;

jQuery(function($) {
	
	$.datepicker.setDefaults({
			  showOn: "both",								// 버튼과 텍스트 필드 또는 모두 캘린더에 표시할지에 대한 여부 선택, both/button,text
			  buttonImage: "resources/img/common/calendar.png",	// image 경로 지정, 버튼 이미지 선택
			  buttonImageOnly: true,							// 버튼에 있는 이미지만 표시, true/false
			  buttonText: "Select date",						
			  changeMonth: true,								// 월을 바꿀 수 있는 select 박스 표시, true/false
			  changeYear: true,									// 년을 바꿀 수 있는 select 박스 표시, true/false
			  nextText: calText1,								// next 아이콘의 title 설정
			  prevText: calText2,								// prev 아이콘의 title 설정
			  showButtonPanel: true,						// 캘린더 하단에 (today,done) 버튼 패널 표시 여부 선택
			  showMonthAfterYear:true,
			  closeText: calText3,									// close 버튼의 text 선택
			  dateFormat: 'yy-mm-dd',						// 표시할 날짜 형식 선택
			  dayNames: [calText10,calText4,calText5,calText6,calText7,calText8,calText9],			   // 표시할 요일 이름
			  dayNamesMin: [calText17,calText11,calText12,calText13,calText14,calText15,calText16],	// 표시할 요일 약자 이름
			  monthNames: [calText18,calText19,calText20,calText21,calText22,calText23,calText24,calText25,calText26,calText27,calText28,calText29]	,	// 표시할 달 이름
			  monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],								// 표시할 달 약자 이름
			  beforeShow: function() {
				  $('#ui-datepicker-div').removeClass('DATE_YM');
	          },
		}); 
	
});

/** 년/월만 사용하는 달력 함수  (매개변수 : 달력 texbox ID)*/
function datePickerYearMonth(){
	
	 $('.datepickerYm').each(function(i,e){
         var $d = $(this);
         $d.datepicker({
			 showOn: "both",								// 버튼과 텍스트 필드 또는 모두 캘린더에 표시할지에 대한 여부 선택, both/button,text
			 buttonImage: "resources/img/common/calendar.png",	// image 경로 지정, 버튼 이미지 선택
			 buttonImageOnly: true,							// 버튼에 있는 이미지만 표시, true/false
             changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시
             changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시
             monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],								// 표시할 달 약자 이름
             showMonthAfterYear:true,
             showOtherMonths: true, // 다음달 날짜도 표시
             selectOtherMonths: true, // 다음달 날짜도 선택 가능
             closeText: select,
             dateFormat: "yy-mm",
             onClose: function(dateText, inst) {
            	 var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                 var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                 $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
                 $(this).datepicker('setDate', new Date(year, month, 1));
               },
             yearRange: 'c-10:c+10',
             beforeShow: function() {
            	 var selectDate = $(".datepickerYm").val().split("-");
                 var year = Number(selectDate[0]);
                 var month = Number(selectDate[1]) - 1;
                 $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
                 $('#ui-datepicker-div').addClass('DATE_YM');
               },
         });
      });
	 
	 $('.datepickerYm2').each(function(i,e){
         var $d = $(this);
         $d.datepicker({
			 showOn: "both",								// 버튼과 텍스트 필드 또는 모두 캘린더에 표시할지에 대한 여부 선택, both/button,text
			 buttonImage: "resources/img/common/calendar.png",	// image 경로 지정, 버튼 이미지 선택
			 buttonImageOnly: true,							// 버튼에 있는 이미지만 표시, true/false
             changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시
             changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시
             monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],								// 표시할 달 약자 이름
             showMonthAfterYear:true,
             showOtherMonths: true, // 다음달 날짜도 표시
             selectOtherMonths: true, // 다음달 날짜도 선택 가능
             closeText: select,
             dateFormat: "yy-mm",
             onClose: function(dateText, inst) {
            	 var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                 var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                 $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
                 $(this).datepicker('setDate', new Date(year, month, 1));
               },
             yearRange: 'c-10:c+10',
             beforeShow: function() {
            	 var selectDate = $(".datepickerYm").val().split("-");
                 var year = Number(selectDate[0]);
                 var month = Number(selectDate[1]);
                 $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
                 $('#ui-datepicker-div').addClass('DATE_YM');
               },
         });
      });	 

	 $('.datepickerYm3').each(function(i,e){
		 var $d = $(this);
		 $d.datepicker({
			 showOn: "both",								// 버튼과 텍스트 필드 또는 모두 캘린더에 표시할지에 대한 여부 선택, both/button,text
			 buttonImage: "resources/img/common/calendar.png",	// image 경로 지정, 버튼 이미지 선택
			 buttonImageOnly: true,							// 버튼에 있는 이미지만 표시, true/false
			 changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시
			 changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시
			 monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],								// 표시할 달 약자 이름
			 showMonthAfterYear:true,
			 showOtherMonths: true, // 다음달 날짜도 표시
			 selectOtherMonths: true, // 다음달 날짜도 선택 가능
			 closeText: select,
			 dateFormat: "yy-mm",
			 onClose: function(dateText, inst) {
				 var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				 var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				 $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
				 $(this).datepicker('setDate', new Date(year, month, 1));
			 },
			 yearRange: 'c-10:c+10',
			 beforeShow: function() {;
				 var selectDate = $(".datepickerYm3").val().split("-");
				 var year = Number(selectDate[0]);
				 var month = Number(selectDate[1]) - 1;
				 $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
				 $('#ui-datepicker-div').addClass('DATE_YM');
			 },
	         onChangeMonthYear: function (year, month, inst) {
        	    // 년 또는 월이 변경시 이벤트 발생
				var CUR_MT = new CommDateManager().after(0, 0).getDate("yyyy-mm");
				if(year + "-" + fillZeros(month,2) > $("#P_END_DT").val()){   
					alert(msgStartDateAndEndDate);
					$(this).datepicker("setDate", new Date(CUR_MT) );
					return;
				}
        	 }, 
		 });
	 });
	 $('.datepickerYm4').each(function(i,e){
		 var $d = $(this);
		 $d.datepicker({
			 showOn: "both",								// 버튼과 텍스트 필드 또는 모두 캘린더에 표시할지에 대한 여부 선택, both/button,text
			 buttonImage: "resources/img/common/calendar.png",	// image 경로 지정, 버튼 이미지 선택
			 buttonImageOnly: true,							// 버튼에 있는 이미지만 표시, true/false
			 changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시
			 changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시
			 monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],								// 표시할 달 약자 이름
			 showMonthAfterYear:true,
			 showOtherMonths: true, // 다음달 날짜도 표시
			 selectOtherMonths: true, // 다음달 날짜도 선택 가능
			 closeText: select,
			 dateFormat: "yy-mm",
			 onClose: function(dateText, inst) {
				 var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				 var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				 $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
				 $(this).datepicker('setDate', new Date(year, month, 1));
			 },
			 yearRange: 'c-10:c+10',
			 beforeShow: function() {;
				 var selectDate = $(".datepickerYm4").val().split("-");
				 var year = Number(selectDate[0]);
				 var month = Number(selectDate[1]) - 1;
				 $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
				 $('#ui-datepicker-div').addClass('DATE_YM');
			 },
	         onChangeMonthYear: function (year, month, inst) {
        	    // 년 또는 월이 변경시 이벤트 발생
				var CUR_MT = new CommDateManager().after(0, 0).getDate("yyyy-mm");
				if(year + "-" + fillZeros(month,2) < $("#P_OPEN_DT").val()){   
					alert(msgStartDateAndEndDate);
					$(this).datepicker("setDate", new Date(CUR_MT) );
					return;
				}
        	 }, 
		 });
	 });
}


/********************************************************
 * 분류공통코드의 SELECT BOX 리스트를 생성한다. 대중소리스트 박스 사용가능
 * SELECTBOX_ID		:  html오브젝트ID        
 * CATE_GUBUN	    :  대(1)중(2)소(3) 구분
 * CATE_CODE        :  분류코드로써 대분류는 인자가 필요없고, 중/소 분류는 인자가 필요하다. ex) 010101
 ******************************************************/
function getCateCodeSelectBoxList(SELECTBOX_ID , CATE_GUBUN, CATE_CODE ){
	var postValue ={};	
	postValue = { 
			  "CATE_GUBUN"	: CATE_GUBUN 
			, "CATE_CODE"	: CATE_CODE  
	};
	 
	jQuery.ajax({
	    type:"POST",
	    url:"/getCateCodeSelectBoxList.do",
	    dataType:"JSON",  
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	$("select[name="+SELECTBOX_ID+"   ] option").remove();
	    	$("#"+SELECTBOX_ID).append('<option value="">선택</option>'); 
			for(var i = 0; i < data.length; i++){
				 $("#"+SELECTBOX_ID).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


/************************************************
 * 공통코드의 SELECT BOX 리스트를 생성한다
 * checkBoxId		: 셀렉트 박스 ID
 * groupCode	    : 공통 코드 Group (ex : CD0005)
 ************************************************/
function getCommonCodeSelectBoxList(checkBoxId, groupCode){
	var postValue ={};	
	postValue = { "CD_CL"	: groupCode };
	
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getCommonCodeSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#"+checkBoxId).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

/************************************************]
 * 20170425 김창열 
 * 공통코드의 SELECT BOX 리스트를 생성한다
 * 생성시 관리항목의 특정값에 의해 사용여부 구분 해서 나옴			
 * checkBoxId		: 셀렉트 박스 ID
 * groupCode	    : 공통 코드 Group (ex : CD0005)
 ************************************************/
function getCommonCodeSelectBoxList2(checkBoxId, groupCode, mgmtEntry){
	var postValue ={};	
	postValue = { "CD_CL"	: groupCode , "MGMT_ENTRY"	: mgmtEntry };
	
	// 공통코드를 가져온다.
	jQuery.ajax({
		type:"POST",
		url:"/getCommonCodeSelectBoxList2.do",
		dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
		data:postValue,
		async:false,
		success : function(data) {
			$("#"+checkBoxId).find("option").remove();
	    	$("#"+checkBoxId).append('<option value="">전체</option>');
			for(var i = 0; i < data.length; i++){
				$("#"+checkBoxId).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>'); 
			}
		},
		complete : function(data) {
		},
		error : function(xhr, status, error) {
			CommonJs.alertErrorStatus(xhr.status, error);
		}
	});
}

/************************************************
 * 공통코드의 SELECT BOX 리스트를 생성한다
 * checkBoxId		: 셀렉트 박스 ID
 * groupCode	    : 공통 코드 Group (ex : CD0005)
 ************************************************/
function getCommonCodeSelectBoxListSelected(checkBoxId, groupCode, index){
	var postValue ={};	
	postValue = { "CD_CL"	: groupCode };
	
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getCommonCodeSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				if(i == index){
					$("#"+checkBoxId).append('<option value="'+ data[i].CD_ID +'" selected>'+ data[i].CD_NM +'</option>');
				} else{
					$("#"+checkBoxId).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>');
				}
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

/************************************************
 * 공통코드의 회원등급을 회원구분 별로 SELECT BOX 리스트를 생성한다
 * elID				: 셀렉트 박스 ID
 * groupCode	    : 공통 코드 Group (ex : CD0005)
 * cdid				: 회원구분 코드 ID
 * allFlag			: option 에 '전체' 추가 flag  
 ************************************************/
function getCommonCodeGradeSelectBoxList(elID, groupCode, cdid, allFlag){
	var postValue ={};	
	postValue = {"P_CD_CL"			: groupCode
				 , "P_MGMT_ENTRY_1"	: cdid
				};
	
	var html = "";
	
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getCommonCodeGradeSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	
	    	if(typeof allFlag != "" && allFlag != null)		// html clear
	    	{
	    		if(allFlag == true)
		    	{
		    		html += "<option value=\"\">"+all+"</option>";
		    	}
		    	 
				for(var i = 0; i < data.length; i++)
				{
					html += "<option value=\"" + data[i].CD_ID + "\">"+ data[i].CD_NM + "</option>"; 
			   	}
				$("#"+elID).html(html);
	    	}
	    	else	// append
	    	{
	    		for(var i = 0; i < data.length; i++)
				{ 
					$("#"+elID).append('<option value="'+ data[i].CD_ID +'">'+ data[i].CD_NM +'</option>');
			   	}
	    	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

/************************************************
 * 점포코드 SELECT 박스로 받아오기
 * checkBoxId		: 셀렉트 박스 ID 
 ************************************************/
function getStoreCode(checkBoxId){
	
	var postValue = {};
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#"+checkBoxId).append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function getStoreCodeFlag(checkBoxId, UPTAE_FLAG){
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCodeFlag.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:{"UPTAE_FLAG" : UPTAE_FLAG},
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 $("#"+checkBoxId).append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

function getStoreCode2(checkBoxId){
	
	var postValue = {};
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
			for(var i = 0; i < data.length; i++){
				 //$("#"+checkBoxId).append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
				$("#pop_frm select[id='"+checkBoxId+"']").append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>');				 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

/************************************************
 * 해당 점포의 POS 마스터 계산원을 SELECT 박스로 받아오기
 * elID				: 셀렉트 박스 ID
 * STR_CODE			: 점포 코드
 * allFlag			: option 에 '전체' 추가 flag
 * isEmpNo			: 계산원 ID 표시 여부    
 ************************************************/
function getPosMasterMember(elID, STR_CODE, allFlag, isEmpNo){
	
	var postValue = { "P_STR_CODE"	: STR_CODE };
	var html = "";
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getPosMasterMember.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	
	    	if(allFlag == true)
	    	{
	    		html += "<option value=\"\">"+all+"</option>";
	    	}
	    	 
			for(var i = 0; i < data.length; i++)
			{
				if(isEmpNo == true)
				{
					html += "<option value=\"" + data[i].EMP_NO + "\">"+ data[i].EMP_NAME + " (" + data[i].EMP_NO + ")</option>";
				}
				else
				{
					html += "<option value=\"" + data[i].EMP_NO + "\">"+ data[i].EMP_NAME + "</option>";
				}
		   	}
			
			$("#"+elID).html(html);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

/************************************************
 * 행사가져오기 SELECT BOX
 * elID				: 셀렉트 박스 ID
 * P_STR_CODE   : 행사명 코드
 * P_SALES_SD	 : 행사시작 날짜
 * P_SALES_ED    : 행사종료 날짜
 * allFlag			: option 에 '전체' 추가 flag
 * firstFlag			 : 초기 select box 셋팅 여부(true 일경우 모든행사가져옴, false일경우 특정 날짜를 지정해줘야함.)
 ************************************************/
function getEventBOx(elID, P_STR_CODE, P_SALES_SD, P_SALES_ED, allFlag, firstFlag){
/*	console.log("행사 select");
	console.log("---------------------------");*/
	var postValue = { "P_STR_CODE"	: P_STR_CODE, 
							 "P_SALES_SD"		: P_SALES_SD,
							 "P_SALES_ED"		: P_SALES_ED,
							 "URL"					: "itemSalesState.itemSalesEventPopupList"
							};
	var html = "";
	
	var url ="/commonSearch.do";
	if(firstFlag == true){
		url = "/first_commonSearch.do";
	}
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:url,
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	data_list = eval(data['list']);
	    	if(allFlag == true)
	    	{
	    		html += "<option value=\"\">선택</option>";
	    	}
	    	 
			for(var i = 0; i < data_list.length; i++)
			{
				//console.log("option count : " + (i+1));
				html += "<option value=\"" + data_list[i].EVT_CODE + "\">"+ data_list[i].EVT_NAME + "</option>";
		   	}
			
			$("#"+elID).html(html);
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

/************************************************
 * 그리드내에 사용할 점포코드를 Arry 객체로 반환
 ************************************************/
function getStoreCodeGrid(){
	
	var postValue = {};
	var rtCommonCode = [];
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	var codeArray = new Array();
	    	var codeInfo;
	    	
    		for(var i = 0; i < data.length; i++){
	    		codeInfo = new Object();
	    		codeInfo.label =  data[i].STR_NAME ;
	    		codeInfo.code = data[i].STR_CODE; 
	    		codeArray.push( codeInfo );      
    		}
    		rtCommonCode = codeArray;
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	return rtCommonCode;
}

/************************************************
 * 그리드내의 공통코드의 SELECT BOX 리스트를 생성한다
 * 그리드 공통코드 셀렉트 그리드의 셀에 select box 를 표현 할때 사용 
 * code	    : 공통코드 (ex : CD0005)
 ************************************************/ 
function getCommonCodeSelectBoxListInGrid(  code ){
	var postValue ={};	
//	code = "PAY_CON";
	postValue = { "CD_CL"	: code };
	 
	var rtCommonCode = "";
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getCommonCodeSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	var codeArray = new Array();
	    	var codeInfo  = new Object();
	    	var totalInfo = new Object();
	    	
	    	codeInfo = new Object();
    		codeInfo.label = "선택";
    		codeInfo.code = ""; 
    		codeArray.push( codeInfo );
    		 
    		for(var i = 0; i < data.length; i++){
	    		 
	    		codeInfo = new Object();
	    		codeInfo.label =  data[i].CD_NM ;
	    		codeInfo.code = data[i].CD_ID; 
	    		codeArray.push( codeInfo );
	               
    		}
    		 
	    	totalInfo.persons = codeArray; 
             
            var jsonInfo = JSON.stringify(codeArray);
//            console.log(jsonInfo); //브라우저 f12개발자 모드에서 confole로 확인 가능 
//            rtCommonCode = jsonInfo 
//            rtCommonCode = jsonInfo.replace(/"/g, "'");
            
            rtCommonCode = codeArray; 
             
            
	    },
	    complete : function(data) { 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	  
	return rtCommonCode;
}

/************************************************
 * 그리드내의 공통코드의 SELECT BOX 리스트를 생성한다 ("선택 표시 제외")
 * 그리드 공통코드 셀렉트 그리드의 셀에 select box 를 표현 할때 사용 
 * code	    : 공통코드 (ex : CD0005)
 ************************************************/ 
function getCommonCodeSelectBoxListInGrid2(  code ){
	var postValue ={};
	postValue = { "CD_CL"	: code };
	
	var rtCommonCode = [];
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getCommonCodeSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	var codeArray = new Array();
	    	var codeInfo;
	    	
    		for(var i = 0; i < data.length; i++){
	    		codeInfo = new Object();
	    		codeInfo.label =  data[i].CD_NM ;
	    		codeInfo.code = data[i].CD_ID; 
	    		codeArray.push( codeInfo );      
    		}
    		rtCommonCode = codeArray;
	    },
	    complete : function(data) { 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	return rtCommonCode;
}

/************************************************
 * 그리드내의 공통코드의 SELECT BOX 리스트를 생성한다 ("선택 표시 제외") ("CD_ID" display 한다)
 * 그리드 공통코드 셀렉트 그리드의 셀에 select box 를 표현 할때 사용 
 * code	    : 공통코드 (ex : CD0005)
 ************************************************/ 
function getCommonCodeSelectBoxListInGrid3(  code ){
	var postValue ={};
	postValue = { "CD_CL"	: code };
	
	var rtCommonCode = [];
	// 공통코드를 가져온다.
	jQuery.ajax({
	    type:"POST",
	    url:"/getCommonCodeSelectBoxList.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	var codeArray = new Array();
	    	var codeInfo;
	    	
    		for(var i = 0; i < data.length; i++){
	    		codeInfo = new Object();
	    		//codeInfo.label =  data[i].CD_NM ;
	    		codeInfo.label =  data[i].CD_ID ;
	    		codeInfo.code = data[i].CD_ID; 
	    		codeArray.push( codeInfo );      
    		}
    		rtCommonCode = codeArray;
	    },
	    complete : function(data) { 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	return rtCommonCode;
}


/************************************************
 * 그리드내의 관리부서 의 SELECT BOX 리스트를 생성한다. CD_DEPT 사용
 * 그리드 관리부서 셀렉트 그리드의 셀에 select box 를 표현 할때 사용 
 * code	    :  
 ************************************************/ 
function getDeptCodeSelectBoxListInGrid(    ){
	var postValue ={};	
//	code = "PAY_CON";
//	postValue = { "CD_CL"	: code };
	 
	var rtCommonCode = "";
	// 관리부서코드를 가져온다.   getCommonCodeSelectBoxList
	jQuery.ajax({
	    type:"POST",
	    url:"/getDeptCodeSelectBoxListInGrid.do",     
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
//	    data:postValue,
	    async:false,
	    success : function(data) {
	    	var codeArray = new Array();
	    	var codeInfo  = new Object();
	    	var totalInfo = new Object();
	    	
	    	codeInfo = new Object();
    		codeInfo.label = "선택";
    		codeInfo.code = ""; 
    		codeArray.push( codeInfo );
    		 
    		for(var i = 0; i < data.length; i++){
	    		 
	    		codeInfo = new Object();
	    		codeInfo.label =  data[i].DEPT_NAME ;
	    		codeInfo.code = data[i].DEPT_CODE; 
	    		codeArray.push( codeInfo );
	               
    		}
    		 
	    	totalInfo.persons = codeArray; 
             
            var jsonInfo = JSON.stringify(codeArray);
//            console.log(jsonInfo); //브라우저 f12개발자 모드에서 confole로 확인 가능 
//            rtCommonCode = jsonInfo 
//            rtCommonCode = jsonInfo.replace(/"/g, "'");
            
            rtCommonCode = codeArray; 
             
            
	    },
	    complete : function(data) { 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	  
	return rtCommonCode;
}



/************************************************
 * 그리드내의 관리담당자 의 SELECT BOX 리스트를 생성한다. TBL_USER_INfo 사용
 * 그리드 관리담당자 셀렉트 그리드의 셀에 select box 를 표현 할때 사용 
 * code	    :  
 ************************************************/ 
function getEmpNoSelectBoxListInGrid(    ){
	var postValue ={};	
//	code = "PAY_CON";
//	postValue = { "CD_CL"	: code };
	 
	var rtCommonCode = "";
	// 관리부서코드를 가져온다.   getCommonCodeSelectBoxList
	jQuery.ajax({
	    type:"POST",
	    url:"/getEmpNoSelectBoxListInGrid.do",     
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
//	    data:postValue,
	    async:false,
	    success : function(data) {
	    	var codeArray = new Array();
	    	var codeInfo  = new Object();
	    	var totalInfo = new Object();
	    	
	    	codeInfo = new Object();
    		codeInfo.label = "선택";
    		codeInfo.code = ""; 
    		codeArray.push( codeInfo );
    		 
    		for(var i = 0; i < data.length; i++){
	    		 
	    		codeInfo = new Object();
	    		codeInfo.label =  data[i].EMP_NM ;
	    		codeInfo.code = data[i].EMP_NO; 
	    		codeArray.push( codeInfo );
	               
    		}
    		 
	    	totalInfo.persons = codeArray; 
             
            var jsonInfo = JSON.stringify(codeArray);
//            console.log(jsonInfo); //브라우저 f12개발자 모드에서 confole로 확인 가능 
//            rtCommonCode = jsonInfo 
//            rtCommonCode = jsonInfo.replace(/"/g, "'");
            
            rtCommonCode = codeArray; 
             
            
	    },
	    complete : function(data) { 
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	  
	return rtCommonCode;
}




//숫자 3자리 마다 콤마 찍기
function moneyComma(val){
	var moneyFormat =   val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	return moneyFormat;
}	



//숫자  콤마 빼기
function removeComma(val){
	var removeComma =   val.replace(/,/g, '');
	return removeComma;
}

//사업자 등록번호일 때 . 찍어주기
function busyNoComma(val){
	var a1 = val.substring(0, 3);
	var a2 = val.substring(3, 5);
	var a3 = val.substring(5);
	var returnVal = a1 + "-" + a2 + "-" + a3;
	
	return returnVal;
}



// 체크
// essential                  필수입력클래스
// onlynum                    숫자만입력
// input 에서 limit="min,max" 속성추가
// for="이름"                 속성추가
function validationCheck() {
	var isSuccess = false;

	// 필수 입력사항
	$('.essential').each(function() {
		
		if($(this)[0].tagName == 'SELECT') {
			var index = $(this).children("option").index($(this).children("option:selected"));
			
			if(index == 0) {
				alert($(this).attr('for') + '를 선택하세요.');
				$(this).focus();
				
				isSuccess = false;
				return false;
			}else {
				isSuccess = true;				
			}
		}
		else {
			if($(this).val() == '') {
				alert($(this).attr('for') + '을 입력하세요.');
				$(this).focus();
				
				isSuccess = false;
				
				return false;
			}
			else{
				isSuccess = true;				
			}
		}
	});

	return isSuccess;
}



//0채우기 num : 값 , len : 자리수
function fillZeros(num, len) {
    var str = '';
    num = num.toString();

    if (num.length < len) {
    for (var i = 0; i < len - num.length; i++)
      str += '0';
    }
    return str + num;
}


//html코드 특수문자로 변경
function htmlDecode(str){
    if(str == "" || str == null){
        return str;
    }
    else{
        return str.replace(/&amp;/gi,"&").replace(/&#35;/gi,"#").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,"\"").replace(/&#39;/gi,'\\').replace(/&#37;/gi,'%').replace(/&#40;/gi,'(').replace(/&#41;/gi,')').replace(/&#43;/gi,'+').replace(/&#47;/gi,'/').replace(/&#46;/gi,'.').replace(/&apos;/gi,'\'');
    }
}



//도움말 불러오기 (파라미터: 메뉴별 호출 url), 즐겨찾기 ICON 활성화
function setHelpMessage(classNm){
	
	//alert(classNm);
	
	//도움말 불러오기
	jQuery.ajax({ 
	    url:"/selectMenuBigo.do",         
	    type:"POST",  
		datatype:"json",
		data: {
			CLASS_NM     : classNm
		},
		success:function(data){ 
			if(data != "" && data !='null'){
				$('#helpText').text(data[0].BIGO);
			}else{
				//작성된 도움말이 없습니다.
				$('#helpText').text(defaultHelpMessage);
			};
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	 
	//즐겨찾기 아이콘 활성화(on/off)
	jQuery.ajax({ 
	    url:"/getBookMarkStat.do",         
	    type:"POST",  
		datatype:"json",
		data: {
			CLASS_NM     : classNm
		},
		success:function(data){ 
			if(data != "" && data !='null'){
				//alert("즐겨찾기 등록됨");
				$("#bookMarkIcon").attr('class', 'fav fav_active');  
			}else{
				//alert("즐겨찾기 등록않됨");
				$("#bookMarkIcon").attr('class', 'fav fav_inactive');  
			}
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


/***************************************************************************
 * @author  : 김창열
 * @since   : 2017.02.24
 ***************************************************************************/
function updateStrCodeSelectBox(checkBoxId, uptaeFlagCode){
	var postValue = {};
	postValue = { "UPTAE_FLAG"	: uptaeFlagCode };
	
	// 점포코드 가져오기
	jQuery.ajax({
	    type:"POST",
	    url:"/getStoreCode.do",
	    dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
	    data:postValue,
	    async:false,
	    success : function(data) {
	    	$("#"+checkBoxId).find("option").remove();
	    	$("#"+checkBoxId).append('<option value="">전체</option>');
			for(var i = 0; i < data.length; i++){
				 $("#"+checkBoxId).append('<option value="'+ data[i].STR_CODE +'">'+ data[i].STR_NAME +'</option>'); 
		   	}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}


//숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function(){
    if(this==0) return 0;
 
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
 
    return n;
};
 
// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.format = function(){
    var num = parseFloat(this);
    if( isNaN(num) ) return "0";
 
    return num.format();
};
 