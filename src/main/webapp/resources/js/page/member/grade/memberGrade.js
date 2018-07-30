/********************************************************
 * 설명:  회원정보 > 멤버십관리 > 회원등급변경(개별)
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 김경진
 * since	: 2017.02.01
 * version : 1.0
 ********************************************************/

// 회원포인트 및 매출 조회
function getGridData() {
	
	var param = $("#sertch_frm").serializeArray();
	
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberGradeDetail.do",         
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		success:function(data){
			
			var list;
			
			if(typeof data.list != "undefiend" && data.list != null)
			{
				list = data.list;
				if(list.length > 0)
				{
					$("#D_SALE_TPOINT").text(CommonJs.numberFormat(list[0].SALE_TPOINT));
					$("#D_MINUS_POINT").text(CommonJs.numberFormat(list[0].MINUS_POINT));
					$("#D_SALE_UPOINT").text(CommonJs.numberFormat(list[0].SALE_UPOINT));
				}
				else
				{
					$("#D_SALE_TPOINT").text("0");
					$("#D_MINUS_POINT").text("0");
					$("#D_SALE_UPOINT").text("0");
				}
			}
			
			if(typeof data.list2 != "undefiend" && data.list2 != null && data.list2.length > 0)
			{
				list = data.list2;
				if(list.length > 0)
				{
					$("#D_PRIOR_YEAR_SALE_AMT").text(CommonJs.numberFormat(list[0].PRIOR_YEAR_SALE_AMT));
					$("#D_THE_YEAR_SALE_AMT").text(CommonJs.numberFormat(list[0].THE_YEAR_SALE_AMT));
					$("#D_ADD_AMT").text(CommonJs.numberFormat(list[0].ADD_AMT));
				}
				else
				{
					$("#D_PRIOR_YEAR_SALE_AMT").text("0");
					$("#D_THE_YEAR_SALE_AMT").text("0");
					$("#D_ADD_AMT").text("0");
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

// 등록 수정
function updateMemberGrade()
{
	if($("#P_CORP_CODE").val() == null || $("#P_CORP_CODE").val() == "")
	{
		alert(corpCode + msgConfirm);
		return;
	}
	
	if($("#P_CUST_NO").val() == null || $("#P_CUST_NO").val() == "")
	{
		alert(msgSearchData);
		$("#btn_search").focus();
		return;
	}
	
	var param = $("#update_frm").serializeArray();
	
	jQuery.ajax({ 
	    url:"/updateMemberGrade.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			//그리드1 데이터 조회
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				//alert(data.RETURN_CODE);
				if(data.RETURN_CODE > 0)
				{
					alert(msgSave);
					
					var busiFlag = $("#P_BUSI_FLAG option:selected").text();
					var mbrGrade = $("#P_MBR_GRADE option:selected").text();
					
					$("#D_BUSI_FLAG_NAME").text(busiFlag);
					$("#P_BUSI_FLAG_NAME").val(busiFlag);
					$("#D_MBR_GRADE_NAME").text(mbrGrade);
					$("#P_MBR_GRADE_NAME").val(mbrGrade);
					
					var org_mbrGradeNm = $("#P_MBR_GRADE_ORG_NAME").val();
					var org_mbrGrade = $("#P_MBR_GRADE_ORG").val();
					var new_mbrGrade = $("#P_MBR_GRADE option:selected").val();
					if(typeof org_mbrGrade != "undefiend" && org_mbrGrade != null && org_mbrGrade != "" && typeof new_mbrGrade != "undefiend" && new_mbrGrade != null && new_mbrGrade != "")
					{
						org_mbrGrade = parseInt(org_mbrGrade);
						new_mbrGrade = parseInt(new_mbrGrade);
						if(org_mbrGrade < new_mbrGrade)		// 회원등급 상향일경우만 알림톡 발송
						{
							alimtalkSend(org_mbrGradeNm, mbrGrade);
						}
					}
					
					// 등급 변경 후 현재등급 재셋팅
					$("#P_MBR_GRADE_ORG_NAME").val(mbrGrade);
					$("#P_MBR_GRADE_ORG").val(new_mbrGrade);
				}
				else
				{
					alert(data.RETURN_MSG);
				}
			}
			else
			{
				alert(msgErrorDefault);
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
}

//알림톡 발송
function alimtalkSend(org_mbrGrade, new_mbrGrade)
{
	var memList = "";
	
	memList += CommonJs.isNullToString($("#D_CUST_NAME").text(), "") + "|" + CommonJs.isNullToString($("#D_CUST_NO").text(), "") + "|" + CommonJs.isNullToString($("#D_MOBIL_NO").text(), "")
			 + "|" + CommonJs.isNullToString(org_mbrGrade, "") + "|" + CommonJs.isNullToString(new_mbrGrade, "");
	
	CommonJs.sendAlimtalk($("#P_CORP_CODE").val(), memList, "dadam_101", 0);
}

//회원이름으로 조회 (카운트)
function getMemberInfoCnt() 
{
	var param = $("#sertch_frm").serializeArray();
	
	var rs = null;
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberInfoCount.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			
			if(typeof data != "undefiend" && data != null)
			{
				rs = data;
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	return rs;
}

//회원번호로 조회
function getMemberInfoSet(cust_no)
{
	if(typeof cust_no == "undefiend" || cust_no == null || cust_no == "")
	{
		return;
	}
	
	$("#S_CUST_NO").val(cust_no);
	var dataRow = getMemberInfo();
	fn_comm_user_callback(dataRow);
}

//회원번호로 조회
function getMemberInfo() 
{
	var param = $("#sertch_frm").serializeArray();
	
	var rs = null;
	//데이터 조회후 그리드1에 데이터를 넣을때 itemClickHandler1 실행된다.
	jQuery.ajax({ 
	    url:"/memberInfoSelect.do",
	    type:"POST",
		datatype:"json",
		async:false,
		data: param,
		success:function(data){
			
			if(typeof data.info != "undefiend" && data.info != null)
			{
				rs = data.info;
			}
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
	
	return rs;
}

//(회원검색) 팝업 호출 function
function btn_comm_user_search()
{
	
	$("#comm_pop_wrap20").dialog("open");
	gridApp29.resize();
	
	// callback함수명을 P_CALLBACK_NM1에 값을 넘겨준다. (하나면 안넣어도 된다.)
	$("#P_CALLBACK_NM20").val("fn_comm_user_callback(dataRow29)");
	
	if($("#S_CUST_NAME").val()) {
		
		$("#P_TEXT20").val($("#S_CUST_NAME").val());
		btn_comm_search('20');
		
	}
	
//	$("#comm_pop_wrap1").dialog("open");
//	gridApp10.resize();
//	
//	// 검색 텍스트를 부모창에 입력 할 경우 공통팝업이 뜨자마자 조회가 된다.
//	if($("#S_CUST_NAME").val() != null && $("#S_CUST_NAME").val() != ""){
//		$("#P_TEXT1").val($("#S_CUST_NAME").val());
//		btn_comm_search('1');
//	}
}

//(회원검색) 팝업 callback function
function fn_comm_user_callback(dataRow)
{
	if(typeof dataRow == "undefined" || dataRow == null)
	{
		alert("회원정보 조회 실패");
		return
	}
	
	frmReset();
	
	var telNo = CommonJs.phoneFomatter(dataRow.TEL_NO);
	var mobile = CommonJs.phoneFomatter(dataRow.MOBIL_NO);
	var busi = CommonJs.busiFomatter(dataRow.BUSI_NO);
	
	$("#S_CORP_CODE").val(dataRow.CORP_CODE);		// 기업코드
	$("#S_CUST_NO" ).val(dataRow.CUST_NO);			// 회원번호
	
	$("#D_CUST_NO" ).text(dataRow.CUST_NO);			// 회원번호
	$("#D_CUST_NAME").text(dataRow.CUST_NAME);		// 회원명
	$("#D_SEX").text(dataRow.SEX_NAME);				// 성별
	$("#D_BIR_DATE").text(CommonJs.dateFormat(dataRow.BIR_DATE, "-"));		// 생년월일
	$("#D_TEL_NO").text(telNo);		// 전화번호
	$("#D_MOBIL_NO").text(mobile);	// 휴대전화
	
	$("#D_BUSI_NAME").text(dataRow.BUSI_NAME);				// 업체명
	$("#D_BUSI_NO").text(busi);								// 사업자번호
	$("#D_BUSI_FLAG_NAME").text(dataRow.BUSI_FLAG_NAME);	// 회원구분
	$("#D_MBR_GRADE_NAME").text(dataRow.MBR_GRADE_NAME);	// 회원등급
	
	// 등급변경 form
	$("#P_BUSI_FLAG_NAME").val(dataRow.BUSI_FLAG_NAME);		// 회원구분 (현재)
	$("#P_BUSI_FLAG").val(dataRow.BUSI_FLAG);				// 회원구분 (변경)
	$("#P_BUSI_FLAG").trigger("change");
	
	// 등급변경전 값 담기
	$("#P_MBR_GRADE_ORG").val(dataRow.MBR_GRADE);			// 회원등급코드 (현재)
	$("#P_MBR_GRADE_ORG_NAME").val(dataRow.MBR_GRADE_NAME);	// 회원등급 (현재)
	
	$("#P_MBR_GRADE_NAME").val(dataRow.MBR_GRADE_NAME);		// 회원등급 (현재)
	$("#P_MBR_GRADE").val(dataRow.MBR_GRADE);				// 회원등급 (변경)
	$("#P_CUST_NO" ).val(dataRow.CUST_NO);					// 회원번호
	
	getGridData();
}

// 초기화
function frmReset()
{
	/*$("#frm1").each(function() {
		this.reset();
	});*/
	
	//$("#S_CORP_CODE").val("");		// 기업코드
	$("#S_CUST_NO" ).val("");		// 회원번호
	
	$("#D_CUST_NO" ).text("");		// 회원번호
	$("#D_CUST_NAME").text("");		// 회원명
	$("#D_SEX").text("");			// 성별
	$("#D_BIR_DATE").text("");		// 생년월일
	$("#D_TEL_NO").text("");		// 전화번호
	$("#D_MOBIL_NO").text("");		// 휴대전화
	$("#D_BUSI_NAME").text("");		// 업체명
	$("#D_BUSI_NO").text("");		// 사업자번호
	$("#D_BUSI_FLAG_NAME").text("");// 회원구분
	$("#D_MBR_GRADE_NAME").text("");// 회원등급
	
	// 등급변경 form
	$("#P_CUST_NO" ).val("");			// 회원번호
	$("#P_BUSI_FLAG_NAME").val("");	// 회원구분 (현재)
	$("#P_MBR_GRADE_NAME").val("");		// 회원등급
	
	// 회원포인트
	$("#D_SALE_TPOINT").text("");
	$("#D_MINUS_POINT").text("");
	$("#D_SALE_UPOINT").text("");
	
	// 회원실적
	$("#D_PRIOR_YEAR_SALE_AMT").text("");
	$("#D_THE_YEAR_SALE_AMT").text("");
	$("#D_ADD_AMT").text("");
}

$(document).ready(function () {
	
	//최초 도움말 불러오기
	setHelpMessage($(location).attr("pathname").replace("/",""));
	
	getCommonCodeSelectBoxList("P_MBR_GRADE", "MBR_GRADE");		// 회원등급
	getCommonCodeSelectBoxList("P_BUSI_FLAG", "BUSI_FLAG");		// 회원구분
	
	$("#S_CUST_NAME").keydown(function(key) {
		
		if(key.keyCode == 13){
			btn_comm_user_search();
		}
	});
	
	// 조회 버튼 클릭
	$("#btn_search").click(function() {
		var data = getMemberInfoCnt();
		if(typeof data.count != "undefiend" && data.count != null)
		{
			if(data.count == 1)		// 검색결과 1명일때
			{
				getMemberInfoSet(data.cust_no);
			}
			else if(data.count > 1)	// 검색결과 복수일때 팝업 오픈
			{
				btn_comm_user_search();
			}
		}
	});
	
	// 실행 버튼 클릭
	$("#btn_grade_save").click(function() {
		updateMemberGrade();
	});
	
	// 회원정보관리 링크 버튼
	$("#btn_memberInfo").click(function() {
		//parent.Tabs_On("memberInfo.do" ,"회원정보관리","memberInfo.do" ,"true");
		
		parent.Tabs_On('memberInfo.do', '회원정보관리', 'memberInfo.do?CUST_NO=' + $('#S_CUST_NO').val(), 'true', [{ type: 'function', name: 'getMemberInfoSet', parameter: { CUST_NO: $('#S_CUST_NO').val() } }]);
		//location.href = "/memberInfo.do";
	});
	
	// 회원구분 체인지 이벤트 (회원구분 변경시 회원등급 리스트 재조회)
	$("#P_BUSI_FLAG").change(function() {
		getCommonCodeGradeSelectBoxList("P_MBR_GRADE", "MBR_GRADE", $("#P_BUSI_FLAG").val(), false);	// 회원등급
	});
	
	$("#P_BUSI_FLAG").trigger("change");
	
});

