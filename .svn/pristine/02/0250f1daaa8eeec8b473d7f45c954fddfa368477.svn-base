/********************************************************
 * 설명:  메뉴관리
 * 수정일      	수정자       수정내용
 * ------------------------------------------------------
 * ------------------------------------------------------
 * author	: 문희훈
 * since	: 2016.10.31
 * version : 1.0
 ********************************************************/
var crudBit          =   "";   // 최초 신규로 시작함
var crudBitDetail    =   "C";   // 최초 신규로 시작함


$(document).ready(function(){
	//$("#header").hide();
	//page = new Page();				// Page 클래스 생성

	initData();							// 1. 최초 DB에서 세팅헤 필요한 데이터를 가져온다.
	initElementBinding();				// 2. 초기 HTML ELEMENT BINDING
	setFormElementValue();				// 3. FORM ELEMENT 초기값 세팅
	saveFormElementValue();				// 4. FORM ELEMENT 초기값 저장
	applyFormElementJquery();			// 5. FORM ELEMENT 공통 JQUERY 적용
	addFormElementJqueryEvent();		// 6. FORM ELEMENT JQUERY EVENT 등록
	initGrid();							// 7. GRID 초기화
	init();								// 8. init Start
	
	fnClear();
	btn_search();

	//alert($(location).attr('pathname').replace('/',''));
	
	//최초 도움말 불러오기 
	setHelpMessage($(location).attr('pathname').replace('/',''));
});

$(window).resize(function() {

	$('.box_menu').height($(window).height() - 47);
	$(".tbl_st2 tr .menu_note").height( $(window).height()-259 );
});
 
//########################################################
//###	1. 최초 DB에서 세팅에 필요한 데이터를 가져온다 ( 시작 )          ###
//########################################################
function initData() {
	 $("#deleteRow").css("display","none");
}
//########################################################
//###	1. 최초 DB에서 세팅에 필요한 데이터를 가져온다 ( 끝 )     	   ###
//########################################################
 
//########################################################
//###	2. 초기 HTML ELEMENT BINDING ( 시작 )  			   ###
//########################################################
function initElementBinding() {
}
//########################################################
//###	2. 초기 HTML ELEMENT BINDING ( 끝 )       	       ###
//########################################################
 
//########################################################
//###	3. FORM ELEMENT 초기값 세팅 ( 시작 )    			   ###
//########################################################
function setFormElementValue() {

}
  
//########################################################
//###	3. FORM ELEMENT 초기값 세팅 ( 끝 )      			   ###
//########################################################
 


//########################################################
//###	4. FORM ELEMENT 초기값 저장 ( 시작 )    			   ###
//########################################################
function saveFormElementValue() {
	
}
//########################################################
//###	4. FORM ELEMENT 초기값 저장 ( 끝 )      			   ###
//########################################################
 
//########################################################
//###	5. FORM ELEMENT 공통 JQUERY 적용 ( 시작 )    		   ###
//########################################################
function applyFormElementJquery() {

}
//########################################################
//###	5. FORM ELEMENT 공통 JQUERY 적용 ( 끝 )      		   ###
//########################################################
 
//########################################################
//###	6. FORM ELEMENT JQUERY EVENT 등록 ( 시작 )    	   ###
//########################################################
function addFormElementJqueryEvent() {

	$('#MENU_GB').change(menuGbChange);

}
//########################################################
//###	6.FORM ELEMENT JQUERY EVENT 등록 ( 끝 )      	   ###
//########################################################
 
//########################################################
//###	7. grid 초기화 ( 시작 )   						   ###
//########################################################
function initGrid(){
	   
	 
	
}
//########################################################
//###	7. grid 초기화 ( 끝 )     						   ###
//########################################################
 
//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
function init() {

	  
	
	//숫자만 입력받기
	$("#SORT_ORDER").keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,''));
    });

	$('.box_menu').height($(window).height() - 47);
	  

}
//########################################################
//###	8. init ( 시작 )   							   ###
//########################################################
  
//########################################################
//###   사용자 정의 함수 ( 시작 )   							   ###
//########################################################



//그리드 사이즈 조절
function reSizefn(){ 

	

}

   


//########################################################
//###   사용자 정의 함수 ( 끝 )     						   ###
//########################################################
 
//########################################################
//###   grid 이벤트 ( 시작 )   							   ###
//########################################################

//########################################################
//###   grid 이벤트 ( 끝 )     							   ###
//########################################################
 
//########################################################
//###   로우 클릭시 팝업  구현 ( 시작 )    					   ###
//########################################################
 


// 메뉴구분 변경시 이벤트 함수
function menuGbChange() {

	var menuGb = $(this).val();

	// 대메뉴, 중메뉴는 class 명이 있으면 오류
	if(menuGb == '' || menuGb == '1' || menuGb == '2') {
		$('#CLASS_NM').attr('readonly', true);
	}
	else {
		$('#CLASS_NM').attr('readonly', false);	
	}
	

}

 

function btn_del()
{
	
	if($("#MENU_NM").val()==""){
		alert(msgDeleteMenu);
		return;
	}
	
	if(confirm(msgDeleteConfirm) == false) return;
	 
	jQuery.ajax({ 
	    url:"/deleteMenuInfo.do",         
	    type:"POST",
		datatype:"json",
		data: {
		      MENU_ID     : $('#MENU_ID').val() 
	    },
		beforeSend : function(xhr) {} ,
		success:function(data,textStatus){ 
			btn_search();
			fnClear();
			if(data[0].RETURN_CODE == "0000"){
				alert(msgDelete);
			}else{
				alert("선택하신 메뉴는 권한관리 -> 권한그룹에서 사용하고 있습니다.\n권한관리메뉴의 권한그룹별 사용가능 메뉴에서 제거후 삭제해 주세요. ");
			}
			
	    },
	    complete : function(data) {
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});

	//location.reload();
}

   

 


function btn_new()
{

	if(crudBit == '') {
		alert(msgSelectMenu);
		return;
	}

	if(crudBit == 'C') {

		alert(msgNewMenu);
		return;

	}

 	crudBit = "C";   //신규
 	
 	if(  $('#UP_MENU_ID').val() == "" )
 	{
 		alert(msgSelectUpMenu);
 		return;
 	}
 	
 	if(  $('#MENU_GB').val() == "3" )
 	{
 		alert(msgSelectBottomMenu);
 		return;
 	}

	// console.log($('#MENU_GB').val());

 	var $select = $('<select>');
	var $option = $('<option>').text('선택').val('');
	var $optionBigMenu = $('<option>').text('대메뉴').val('1');
	var $optionMiddleMenu = $('<option>').text('중메뉴').val('2');
	var $optionSmallMenu = $('<option>').text('소메뉴').val('3');

 	// MENU_GB (1 : 대메뉴, 2 : 중메뉴, 3 : 소메뉴)



 	// 대메뉴 클릭후 신규 클릭시 중메뉴 소메뉴만 추가 가능
	if($('#UP_MENU_NM').val() == "ROOT"){
		$('#CLASS_NM').attr('readonly', true);

 		$('#MENU_GB').empty();
 		$('#MENU_GB').append($option, $optionBigMenu);
	}else{
		if($('#MENU_GB').val() == "1") {

	 		$('#CLASS_NM').attr('readonly', true);

	 		$('#MENU_GB').empty();
	 		$('#MENU_GB').append($option, $optionMiddleMenu);
	 	}
	 	// 중메뉴 클릭후 신규 클릭시 소메뉴만 추가 가능
	 	else if($('#MENU_GB').val() == "2") {

	 		$('#MENU_GB').empty();
	 		$('#MENU_GB').append($option, $optionSmallMenu);
	 	}
	}
 	/*else {

 		$('#CLASS_NM').attr('readonly', true);

 		$('#MENU_GB').empty();
 		$('#MENU_GB').append($option, $optionBigMenu);
 	}*/
 	
 	
 	$("#deleteRow").css("display","none");
 	
 	$("#UP_MENU_NM").val($("#MENU_NM").val());
 	
// 	$('#UP_MENU_NM').val(""); 
// 	$('#UP_MENU_ID').val("");
 	$('#MENU_ID').val(""); 
 	$('#MENU_NM').val(""); 
 	$('#CLASS_NM').val(""); 
 	$('#MENU_GB').val(""); 
 	$('#SORT_ORDER').val(""); 
 	$('#USE_YN').val("Y"); 
 	$('#MENU_ID').attr("readonly",false);
 	// $('#CLASS_NM').attr("readonly",false);
// 	$('#SORT_ORDER').attr("readonly",true);
 	$('#MENU_GB').attr("disabled",false);
 	$('#BIGO').val(""); 
 	$("#MENU_ID").focus();
}

function btn_save()
{
	if(crudBit == '') {
		alert(msgSelectMenu);
		return;
	} 


	 if(confirm(msgModifyConfirm) == false) return;
	                
	 if( $('#MENU_ID').val()  == null || $('#MENU_ID').val() =="" ) {

			confirm(menuID + msgConfirm);
			$('#MENU_ID').focus();
			return;

	 } 
	 
	 if( $('#MENU_NM').val()  == null || $('#MENU_NM').val() =="" ) {

			confirm(menuName + msgConfirm);
			$('#MENU_NM').focus();
			return;

	 } 
	 
	 if( $('#MENU_GB').val() == '3' && ($('#CLASS_NM').val() == null || $('#CLASS_NM').val() == "")) {

			confirm(menuClassName + msgConfirm);
			$('#CLASS_NM').focus();
			return;

	 }


	 if( $('#MENU_GB').val() != '3' && ($('#CLASS_NM').val() != null || $('#CLASS_NM').val() != "")) {

		/*	confirm("대메뉴, 중메뉴 추가시에는 클래명은 입력 받지 않습니다.");
			$('#CLASS_NM').val('');
			$('#CLASS_NM').focus();
			return;*/

	 }

	 
	 if( $('#MENU_GB').val() == null || $('#MENU_GB').val() == "" ) {

			confirm(menuGubun + msgConfirm);
			$('#MENU_GB').focus();
			return;

	 } 
	 
	 if( $('#SORT_ORDER').val()  == null || $('#SORT_ORDER').val() == "" ) {

			confirm(sortOrder + msgConfirm);
			$('#SORT_ORDER').focus();
			return;

	 } 
	 
	 if( $('#USE_YN').val()  == null || $('#USE_YN').val() == "" ) {

			confirm(useYn + msgConfirm);
			$('#USE_YN').focus();
			return;

	 }
	 
	 if(crudBit == "C")   // 신규 insert
	 {
		 
		 var UP_MENU_ID = "";

		 if($('#MENU_GB').val() == "1")  // 대메뉴 선택시 널을 넣는다.
		 {
			 UP_MENU_ID = "";
		 } 
		 else {
			 if( $('#MENU_GB').val() == "2" || $('#MENU_GB').val() == "3") { // 중메뉴 선택시 상위아이디을 넣는다.
				 UP_MENU_ID = $('#UP_MENU_ID').val();
			 }
		 }
		  
		 jQuery.ajax({ 
			    url:"/insertMenuInfo.do",         
			    type:"POST",  
				datatype:"json",
				data: {
					      MENU_ID     : $('#MENU_ID').val()
						, MENU_NM     : $('#MENU_NM').val()
						, UP_MENU_ID  : UP_MENU_ID
						, SORT_ORDER  : $('#SORT_ORDER').val() 
						, MENU_GB     : $('#MENU_GB').val()
						, CLASS_NM    : $('#CLASS_NM').val()
						, BIGO        : $('#BIGO').val()
						, USE_YN      : $('#USE_YN').val() 
				},
				beforeSend : function(xhr) {} ,
				success:function(data,textStatus){  
					btn_search();
					alert(msgSave);
			    },
			    complete : function(data) {
			    },
			    error : function(xhr, status, error) {
			    	CommonJs.alertErrorStatus(xhr.status, error);
			    }
			});
		 
	 }
	 if(crudBit == "U")   // 수정 업데이트
	 {
		 
		 
		 jQuery.ajax({ 
			    url:"/updateMenuInfo.do",         
			    type:"POST",  
				datatype:"json",
				data: {
					      MENU_ID     : $('#MENU_ID').val()
						, MENU_NM     : $('#MENU_NM').val()
						, UP_MENU_ID  : $('#UP_MENU_ID').val()
						, SORT_ORDER  : $('#SORT_ORDER').val()
						, MENU_GB     : $('#MENU_GB').val()
						, CLASS_NM    : $('#CLASS_NM').val()
						, BIGO        : $('#BIGO').val()
						, USE_YN      : $('#USE_YN').val() 
				},
				beforeSend : function(xhr) {} ,
				success:function(data,textStatus){
					btn_search();
					alert(msgModify);
			    },
			    complete : function(data) {
			    },
			    error : function(xhr, status, error) {
			    	CommonJs.alertErrorStatus(xhr.status, error);
			    }
			});
		 
	 }
	 
	 //location.reload();
	  
}
 


function setMenuInfo(menu_id  ,menu_nm ,up_menu_id ,sort_order ,menu_gb ,class_nm  ,use_yn ,del_yn, up_menu_nm) 
{
	
	var $select = $('<select>');
	var $option = $('<option>').text(select).val('');
	var $optionBigMenu = $('<option>').text(topMenu).val('1');
	var $optionMiddleMenu = $('<option>').text(middleMenu).val('2');
	var $optionSmallMenu = $('<option>').text(bottonMenu).val('3');

	$('#MENU_GB').empty();
	$('#MENU_GB').append($option, $optionBigMenu, $optionMiddleMenu, $optionSmallMenu);


	crudBit = "U";
	
	$("#deleteRow").css("display","block");
	
	$('#MENU_ID').val(menu_id);
	$('#MENU_NM').val(menu_nm);
	if(up_menu_nm == 'null') {up_menu_nm = topMenu;}
	$('#UP_MENU_NM').val(up_menu_nm);
	$('#UP_MENU_ID').val(menu_id);
	$('#SORT_ORDER').val(sort_order);
	$('#MENU_GB').val(menu_gb);
	if(class_nm == 'null') {class_nm = "";}
	$('#CLASS_NM').val(class_nm);
	$("#USE_YN").val(use_yn); 
	$('#BIGO').val("");
	
	
	//도움말 불러오기
	jQuery.ajax({ 
	    url:"/selectMenuBigo.do",         
	    type:"POST",  
		datatype:"json",
		data: {
			CLASS_NM     : class_nm
		},
		success:function(data){  
			//alert(data);		
			if(data != "" && data != null){
				$('#BIGO').val(data[0].BIGO);
			}
	    },
	    error : function(xhr, status, error) {
	    	CommonJs.alertErrorStatus(xhr.status, error);
	    }
	});
		
	
	
	$('#USE_YN').val(use_yn); 
	
	if(menu_gb == "3")
	{   
		$('#MENU_ID').attr("readonly",true);   
		$('#CLASS_NM').attr("readonly",false);  
		$('#MENU_GB').attr("disabled",true);   
		
	}   else {   
		$('#MENU_GB').attr("disabled",true);   
		$('#MENU_ID').attr("readonly",true);   
		$('#CLASS_NM').attr("readonly",true);  
	}
}


var str = "";
var treeCnt   = 0;
function treeMenu( data )
{
	var parent;	// 현재 노드
	var child;	// 다음에 출력할 노드
	
	if( treeCnt < data.length )
	{ 
		str += "<li>";
		str += '<a id="' + data[treeCnt].MENU_ID + '" href="javascript:setMenuInfo(\''+data[treeCnt].MENU_ID+'\'   ,\''+data[treeCnt].MENU_NM+'\'  , \''+data[treeCnt].UP_MENU_ID+'\'  , \''+data[treeCnt].SORT_ORDER+'\'  , \''+data[treeCnt].MENU_GB+'\'  ,  \''+data[treeCnt].CLASS_NM+'\'  , \''+data[treeCnt].USE_YN+'\'  ,  \''+data[treeCnt].DEL_YN+'\' ,  \''+data[treeCnt].UP_MENU_NM+'\' )" >'+data[treeCnt].MENU_NM+' ('+data[treeCnt].SORT_ORDER+')</a>';
		
		if(treeCnt+1 < data.length ){
			
			/* 다음노드가 존재하는경우 */				
			/* 현재노드와 다음노드 depth비교 */			
			parent 	= data[treeCnt].MENU_GB; //1
			child 	= data[treeCnt+1].MENU_GB; //3
			
			if(parent < child){			// 다음 노드가 본인보다 높은레벨(자식)일경우
				str += "<ul> ";
			} else if(parent==child){	// 같은 레벨일경우
				if(treeCnt == 0){
					str += "</li></ul>";
				}else{
					str += "</li>";
				}				
			} else if(parent>child){	// 다음 노드가 본인보다 작은레벨(부모)일경우
				str += "</li> ";
				for(var depth=0; depth < parent-child; depth++){	// 부모레벨로 이동
					str += "</ul> ";
					str += "</li> ";
				}
			}
			
			treeCnt++;		// i 증가
			treeMenu(data);	// 재귀호출 (다음노드 호출)
			
		} else {
				/* 다음노드가 존재하지 않는경우 마무리 */
				str += "</li> ";
				for(var depth=1; depth < data[treeCnt].MENU_GB; depth++){	// 들어갔던 depth만큼 빠져나오기
					str += "</ul> ";
					str += "</li> ";
				}
				treeCnt++;	// i를 증가하지않는경우  if( i < data.content.length ) 조건문을 계속 타게되어 새로고침할때마다 숫자가 계속출력
		}
					  
	}	
	 
	return str;
	
}


function tree_init(status){
	var tree_menu_ul = $('#tree_menu_ul');
	if (status == 'close'){
		tree_menu_ul.find('ul').hide();
		$('a.control').find('img').attr('src', icon_open);
	} else if (status == 'open'){
		tree_menu_ul.find('ul').show();
		$('a.control').find('img').attr('src', icon_close);
	}
}



function btn_search(){
	
	$("#tree_menu").html( "" );
	
	$.ajax({
		url:"/getMenuTree.do" ,
		type:"POST",
		datatype:"json",
		async:"false",
//		data:{ menu_id:menu_id },
		beforeSend : function(xhr) {} ,
		success:function(data,textStatus){ 

			var menu = treeMenu( data );
			$("#tree_menu").html( "<ul id=tree_menu_ul>"+menu+"</ul>" );
			
			/*treeCnt와 str은 트리메뉴를 그려주는 함수에서 사용되는 파라미터이며,
			   해당 함수 자체가 재귀함수 이기 때문에 전역변수로 선언되었으며, 
			   이 후 호출을 위해 다시 초기화해주는 작업을 수행해야 다시 그려짐 */
			treeCnt = 0;
			str = "";
//			tree_init('close');
			
			// 메뉴 선택시 메뉴 활성화 효과
			$('#tree_menu li a').mouseup(function(e) {
		    	e.preventDefault();

		    	$('#tree_menu a').removeClass('menuActive');
		    	$(this).addClass('menuActive');

		    });
				 
		},
		error:function(xhr, error){
			CommonJs.alertErrorStatus(xhr.status, error);
		}	 
	}); 
	
	 
	
}

function fnClear(){
	$('#UP_MENU_NM').val(""); 
 	$('#UP_MENU_ID').val(""); 
 	$('#MENU_ID').val(""); 
 	$('#MENU_NM').val(""); 
 	$('#CLASS_NM').val(""); 
 	$('#MENU_GB').val(""); 
 	$('#SORT_ORDER').val(""); 
 	$('#USE_YN').val("Y");
 	$('#BIGO').val("");
 	$('#MENU_ID').attr("readonly",false);
}

/**
 * 글자수(바이트 체크)
 * @param oid : 글자를 받을 Textarea 오브젝트
 * @param maxByte : 바이트 체크할 값
 */
function fnChkByte(obj, maxByte){
	var str = obj.value;
	var str_len = str.length;

	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";

	for(var i=0; i<str_len; i++){
	one_char = str.charAt(i);
	if(escape(one_char).length > 4){
	    rbyte += 2;                                         //한글2Byte
	}else{
	    rbyte++;                                            //영문 등 나머지 1Byte
	}

	if(rbyte <= maxByte){
	    rlen = i+1;                                          //return할 문자열 갯수
	}
	}

	if(rbyte > maxByte){
	    //alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
		alert(msgValueLength); //입력할 수 있는 문자열의 길이를 초과하였습니다.
	    str2 = str.substr(0,rlen);                                  //문자열 자르기
	    obj.value = str2;
	    fnChkByte(obj, maxByte);
	}else{
	    document.getElementById('byteInfo').innerText = rbyte;
	}
}
//########################################################
//###   상단 버튼 구현 ( 끝 )   							   ###
//########################################################
