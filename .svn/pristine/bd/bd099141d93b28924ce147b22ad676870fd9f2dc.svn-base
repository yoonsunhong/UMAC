/***************************************************************************
 * Name : CommonJs 공통
 * Desc : 공통 
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs = new Object();

/***************************************************************************
 * Name     : CommonJs.alertStatusMessage
 * Desc     : ajax 통신오류 메세지처리
 * @param   : status
 *            exception
 * @returns : void
 * @author  : rum
 * @since   : 2016.12.07
 ***************************************************************************/
CommonJs.alertErrorStatus = function(status, e) {
	//연결을 할 수 없습니다.인터넷 연결 상태를 확인해주세요.
	if(status==0){
		alert(msgError0);
	} 
	//요청하신 URL을 찾을 수 없습니다.
	else if(status==404){
		alert(msgError404);
	}
	//요청 서버에 문제가 발생하였습니다.관리자에게 문의하세요.
	else if(status==500){
		alert(msgError500);
	} 
	//조회된 결과의 형식이 잘못되었습니다.
	else if(e=='parsererror'){
		alert(msgErrorParser);
	} 
	//요청된 시간이 초과되엇습니다.
	else if(e=='timeout'){
		alert(msgErrorTimeout);
	} 
	//요청중 문제가 발생했습니다.관리자에게 문의하세요.
	//예기치 못한 오류로 인해 시스템이 종료되었습니다. 다시 로그인 하세요.
	else {
		alert(msgErrorDefault);
		window.location = "/errorLogout.do";
	}
};

/***************************************************************************
 * Name     : CommonJs.getAttachedFileIds
 * Desc     : 다음에디터에서 첨부파일 id 목록을 반환
 * @param   : editor - daum Editor
 *            type - image/file
 * @returns : true/false
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.getAttachedFileIds = function(editor, type) {
	if(type == 'image') {
	    var files = editor.getAttachments('image');
	} else {
		var files = editor.getAttachments('file', true);
		
	}
	var fileIds = [];
	for(var i=0; i<files.length; i++) {
		fileIds[fileIds.length] = files[i].data.fileid;				
	}
	return fileIds;
};

/***************************************************************************
 * Name     : CommonJs.buildDatePicker
 * Desc     : DatePicker 생성
 * @param   : el - input tag object or id
 * @returns : void
 * @author  : rum
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.buildDatePicker = function(el) {
	if(!el) {
		return;
	}
	var el = typeof(el) == "string" ? document.getElementById(el) : el;
	var focusListener = function() {
		el.value = el.value.split("-").join("");
		el.select();
	};
	var blurListener = function() {
		if(CommonJs.isDate(el.value)) {
			var value = el.value.split("-").join("");
			el.value = value.substring(0,4) + "-" + value.substring(4,6) + "-" + value.substring(6,8); 
		}
	}
	$(el).bind("focus", focusListener);
	$(el).bind("blur", blurListener);
	
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	$(el).datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		showOn: "button",
		buttonImage: "/resources/img/common/btn_calendar.gif",
//		buttonImage: "/resources/images/btn_calendar.gif",
		buttonImageOnly: true,
		autoSize: true,
		dateFormat: 'yy-mm-dd'	//기본 포멧
	});
};

CommonJs.buildDatePickerMonth = function(el) {
	if(!el) {
		return;
	}
	var el = typeof(el) == "string" ? document.getElementById(el) : el;
	var focusListener = function() {
		el.value = el.value.split("-").join("");
		el.select();
	};
	var blurListener = function() {
		if(CommonJs.isDate(el.value)) {
			var value = el.value.split("-").join("");
			el.value = value.substring(0,4)+ value.substring(4,6); 
		}
	};
	$(el).bind("focus", focusListener);
	$(el).bind("blur", blurListener);
	
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	$(el).datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		showOn: "button",
		buttonImage: "/resources/images/btn_calendar.gif",
		buttonImageOnly: true,
		autoSize: true,
		dateFormat: 'yymm'	//기본 포멧
	});
};

/***************************************************************************
 * Name     : CommonJs.isDate
 * Desc     : 문자열이 날자형인지 판단한다. 문자열이 비어있으면 false
 * @param   : str - 문자열
 * @returns : true/false
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.isDate = function(str, separator) {
	var sep = separator ? separator : "-";
	var ns = str.split(sep);
	//포맷이  yyyyMMdd or yyyy-MM-dd 인지 확인
	if(ns.length == 1) {
	} else if(ns.length == 3) {
		if(ns[0].length != 4 || ns[1].length !=2 || ns[2].length !=2) {
			return false;
		}
		str = str.split(sep).join("");
	} else { 
		return false;
	}
	if(str.length != 8) {
		return false;
	}
	if(!this.isNumeric(str)) {
		return false;
	}
	var year = Number(str.substring(0, 4));
	var month = Number(str.substring(4, 6));
	var day = Number(str.substring(6, 8));
	if(month < 1 || month > 12) {
		return false;
	}
	var daysOfMonth = [31, ((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //4,6,9,11=>30
	if(day < 1 || day > daysOfMonth[month-1]) {
		return false;
	}
	return true;
};

/***************************************************************************
 * Name     : CommonJs.isNumeric
 * Desc     : 문자열이 숫자인지 판별한다. 문자열이 비어있으면 false
 * @param   : str - 문자열
 * @returns : true/false
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.isNumeric = function(str) {
	var regexp = /^[0-9]+$/;
	return regexp.test(str);
};

/***************************************************************************
 * Name     : CommonJs.isEmail
 * Desc     : Email 검증
 * @param   : str - email
 * @returns : true/false
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.isEmail = function(str) {
	//하나이상의문자열@하나이상의문자열.하나이상의문자열 의 패턴
	var regexp = /^(\w+)@(\w+)[.](\w+)$/;
	//하나이상의문자열@하나이상의문자열.하나이상의문자열 .하나이상의문자열 의 패턴
	var regexp2 = /^(\w+)@(\w+)[.](\w+)[.](\w+)$/;
	return regexp.test(str) || regexp2.test(str);
};

/***************************************************************************
 * Name     : CommonJs.getCookie
 * Desc     : 쿠키값 읽기
 * @param   : name - 쿠키이름
 * @returns : string
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.getCookie = function(name) {
	var cookie = document.cookie;
	var value = null;
	if(cookie.length > 0) {
		var start = cookie.indexOf(name+"=", 0);
		if(start != -1) {
			var end = cookie.indexOf(";", start);
			if(end == -1) {
				end = cookie.length;
			}
			value = decodeURIComponent(cookie.substring(start+name.length+1, end));
		}
	}
	return value;
};

/***************************************************************************
 * Name     : CommonJs.setCookie
 * Desc     : 쿠키값 설정
 * @param   : name - 쿠키이름
 *            value - 쿠기값
 *            expireDay - 활성일
 *            path
 * @returns : void
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.setCookie = function(name, value, expireDays, path) {
	var str = name + "=" + encodeURIComponent(value) + ";";
	var expireDate = new Date();
	if(expireDays) {
		expireDate.setDate(expireDate.getDate() + parseInt(expireDays));
		str += "expires=" + expireDate.toGMTString() + ";";
	}
	if(path) {
		str += "path=" + path + ";";
	}
	document.cookie = str;
};

/***************************************************************************
 * Name     : CommonJs.openWindow
 * Desc     : window popup
 * @param   : url
 *            name
 *            width
 *            height
 *            opts - option object
 * @returns : void
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.openWindow = function(url, name, width, height, opts) {
	//open 시 기본옵션
	var options = {toolbar:0, directories:0, status:0, menubar:0, scrollbars:0, resizable:0};
	
	options.width = width;
	options.height = height;
	
	//수정옵션이 존재하면 처리
	if(opts) {
		//기본옵션에 신규옵션 설정
		for(var opt in opts) {
			options[opt] = opts[opt];
		}
	}
	
	// top 이 지정되지 않았으면 센터
	if(!options.top) {
		options.top = (screen.availHeight - height)/2;
	}
	//left 이 지정되지 않았으면 센터
	if(!options.left) {
		options.left = (screen.availWidth - width)/2;
	}
	
	//최종옵션문자열 생성
	var strOpts = "";
	for(var opt in options) {
		if(options[opt] != null) {
			strOpts += opt+"="+options[opt]+",";
		}
	}
	strOpts = strOpts.substring(0, strOpts.length-1);
	var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;   // 특수문자 제거
	var reName = name.replace(pattern,"");
	return window.open(url, reName, strOpts);
};

/***************************************************************************
 * Name     : CommonJs.Progressbar
 * Desc     : progress bar
 * @param   : 
 * @returns : 
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.Progressbar = {
		timer: null,
		interval:100,
		bar:0,
		dialog:null,
		progressbar:null,
		start: function(progressbar, dialog) {
			if(this.progressbar == null) {
				this.progressbar = $( progressbar );
				this.progressbar.progressbar({ value: 0 });
			}
			if(this.dialog == null && dialog) {
				this.dialog = $(dialog);
				dialog.dialog({
					disabled: false,
					autoOpen: false,     // 다이얼로그 창이 자동으로 보이게 하는지의 여부 설정.
					closeOnEscape: false,    // ESC키를 눌렀을때 다이얼로그 박스를 닫을것인지의 설정. 설정하지않으면 기본 true로써 닫히게된다.
					height: 60,    // 창의 높이 설정. 기본 auto.
					width: 300,    // 창의 넓이 설정. 기본 auto.
					modal: true,     // 모달창으로서 사용할지의 여부 설정. 마스크레이어가 자동 설정된다.
					resizable: false,    // 리사이징 가능 여부.
//					show: "slide",     // 창을 오픈할때의 효과 지정. 여러가지 효과를 지정할 수 있다.
//					hide: "slide",     // 다이얼로그가 닫길때의 효과 설정.
					stack: false     // 여러개의 창을 띄울때 마지막에 띄운 창이 다른 창위에 쌓여서 보이게 할지의 여부 설정.
				}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
			}
			if(this.timer != null) {
				clearInterval(this.timer);
			}
			this.timer = setInterval(function() {
				CommonJs.Progressbar.bar += 2;

				if(CommonJs.Progressbar.bar > 0) {
					CommonJs.Progressbar.bar = CommonJs.Progressbar.bar%100;
				}
				$(progressbar).progressbar("value", CommonJs.Progressbar.bar);
			}, this.interval);
			if(this.dialog != null) {
				this.dialog.dialog("open");
			}
		},
		stop:function() {
			if(this.timer != null) {
				clearInterval(this.timer);
			}		
			if(this.dialog != null) {
				this.dialog.dialog("close");
			}
		}
};


/***************************************************************************
 * Name     : CommonJs.getLayoutOptions
 * Desc     : UI.layout 의 기본옵션에 추가옵션 설정하여 반환
 * @param   : options - layout options
 * @returns : new options 
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.getLayoutOptions = function(options) {
	var opts = {
			applyDemoStyles: false,
			size: "auto", // 각 영역(pane) 사이즈 : auto(컨텐츠 자동 맞춤)
			north__size: "60",
			east__size: "0",
//	 		west__size:	"150",
	 		south__size: "0",
	 		spacing_open: 0, // 각 RESIZER-BARS 오픈 상태 사이즈
	 		spacing_closed: 0,  // 각 RESIZER-BARS 닫힘 상태 사이즈
	 		west__spacing_open: 10,  // 왼편(west) RESIZER-BARS 오픈 상태 사이즈 재정의
	 		west__spacing_closed: 6,  // 왼편(west) RESIZER-BARS 닫힘 상태 사이즈 재정의
	 		togglerLength_open: 80,  	// WIDTH of toggler on north/south edges - HEIGHT on east/west edges
	 		togglerLength_closed: "100%", // "100%" OR -1 = full height
	 		north__resizable: false,
	 		north__closable: false,
	 		west__resizable: true,
	 		west__closable: true, 
	 		center__resizable:true,
	 		center__closable: false
//    		showErrorMessages:  false
//	 		center__onresize: "innerLayout.resizeAll"
//	 		, center: {
//	 			onresize: function() {
//	 				//$("#list1").setGridWidth($(".ui-layout-center").width());
//	 			} 
//	 		}
	};
	
	if(options) {
		for(opt in options) {
			opts[opt] = options[opt];
		}
	}
	return opts;
};

/***************************************************************************
 * Name     : CommonJs.buildLayout
 * Desc     : 화면 공통 UI.layout을 설정
 * @param   : options - layout options
 * @returns : void 
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.buildLayout = function(options) {
	var layout = $('body').layout(CommonJs.getLayoutOptions(options));
//	var tit = $(".lmenu_close");
//	if(tit.get(0)) {
//		layout.addPinBtn(tit, "west");
//	}
//	$(".ui-layout-toggler-west-open").css("background-color", "#483d8b");
	$(".ui-layout-west").css("border-top", "1px solid #d4d4d4");
	$(".ui-layout-west").css("border-right", "1px solid #d4d4d4");
	$(".ui-layout-east").css("border-top", "1px solid #d4d4d4");
	$(".ui-layout-east").css("border-left", "1px solid #d4d4d4");
	$(".ui-layout-center").css("border-left", "1px solid #d4d4d4");
	$(".ui-layout-center").css("border-right", "1px solid #d4d4d4");
	$(".ui-layout-center").css("border-top", "1px solid #d4d4d4");
//	layout.hide("east");
	layout.hide("south");
	//.sizePane("west", 150)
	return layout;
};

/***************************************************************************
 * Name     : CommonJs.getPageSize
 * Desc     : grid 페이지 크기 설정시 쿠키에 저장된 값 반환
 * @param   : defaultSize
 *            cookieName
 * @returns : int 
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
CommonJs.getPageSize = function(defaultSize, cookieName) {
	try {
		var size = CommonJs.getCookie(cookieName);
		if(size) {
			size = parseInt(size);
			return size;
		}
	} catch(e) {
	}
	return defaultSize;
};

/***************************************************************************
 * Name     : doQueryDelLastPage
 * Desc     : 멀티셀렉트 그리드에서 마지막페이지 전체 선택 후 
 *			  삭제시 첫 페이지를 호출 하기 위해 사용
 * @param   : gridId
 * @returns : 
 ***************************************************************************/
CommonJs.doQueryDelLastPage = function(gridId) {
	try {
		var $grid = $("#"+gridId);
		
		if($grid.jqGrid("getGridParam", "lastpage") == $grid.jqGrid("getGridParam", "page") && $("#cb_"+gridId).attr("checked") == "checked") {
			$grid.setGridParam({page: 1}).trigger("reloadGrid");
		} else {
			$grid.trigger("reloadGrid");
		}
	} catch(e) {
	}
};

/***************************************************************************
 * Name     : doQueryDelLastRow
 * Desc     : 멀티셀렉트 그리드에서 마지막페이지 전체 선택 후 
 *			  삭제시 이전 페이지를 호출 하기 위해 사용
 * @param   : gridId
 * @returns : 
 ***************************************************************************/
CommonJs.doQueryDelLastRow = function(gridId) {
	try {
		var $grid = $("#"+gridId);
		
		if($grid.jqGrid("getGridParam", "lastpage") == $grid.jqGrid("getGridParam", "page") && $grid.jqGrid("getDataIDs").length <= 1 ) {
			$grid.setGridParam({page: $grid.jqGrid("getGridParam", "lastpage") - 1}).trigger("reloadGrid");
		} else {
			$grid.trigger("reloadGrid");
		}
	} catch(e) {
	}
};

/***************************************************************************
 * Name     : CommonJs.jqGridStringFormatter
 * Desc     : jqgrid formatter for string
 * @param   : cellvalue
 *            options
 *            rowObject
 * @returns : string 
 * @author  : 염국선
 * @since   : 2012.09.10
 ***************************************************************************/
/** JqGrid에 수정버튼을 붙인다. */
CommonJs.jqGridStringFormatter = function(cellvalue, options, rowObject) {
	if(!cellvalue)return "";
	var result = cellvalue + "";
	result = result.replace("<", "&lt;");
	result = result.replace(">", "&gt;");
	return result;
};

/***************************************************************************
 * Function Name : instanceOfXMLHttpRequest
 * Description : Ajax을 사용하기 위해  XMLHttpRequest를 브라우저 호환되게 반환한다.
 * parameters :
 * return : XMLHttpRequest
 ***************************************************************************/
CommonJs.instanceOfXMLHttpRequest = function() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
};

/***************************************************************************
 * Function Name : loadXMLHttpRequest
 * Description : XMLHttpRequest를 통해 받은 문서를 반환
 * parameters :
 * return : XMLHttpRequest
 ***************************************************************************/
CommonJs.loadXMLHttpRequest = function (method, url, async, asyncFunc) {
	var xmlhttp = CommonJs.instanceOfXMLHttpRequest();
	if(async) { //IE와 오페라에서는 동기방식도 onreadystatechange 발생 
		//비동기 방식일 경우 응답받을 함수를 이벤트에 설정한다.
		xmlhttp.onreadystatechange = asyncFunc;
	}
	xmlhttp.open(method, url, false);
	xmlhttp.send(null);
	if(!async) {
		//동기 방식이면 결과를 반환
		return xmlhttp.responseText;
	}
};

/***************************************************************************
 * Function Name : checkBusiNo
 * Description : 파라미터로 입력받은 10자리 사업자 번호를 검증
 * parameters :  사업자번호
 * return : XMLHttpRequest
 ***************************************************************************/
CommonJs.checkBusiNo = function (busiNo){
	var sum = 0;
	var getlist = new Array(10);
	var chkvalue = new Array("1","3","7","1","3","7","1","3","5");
	for(var i=0;i<10;i++){getlist[i] = busiNo.substring(i,i+1);}
	for(var i=0;i<9;i++){sum += getlist[i]*chkvalue[i];}
	sum = sum + parseInt((getlist[8]*5)/10);
	sidliy = sum % 10;
	sidchk = 0;
	if(sidliy !=0){sidchk = 10 - sidliy;}
	else{sidchk = 0;}
	if(sidchk != getlist[9]){return false;}
	
	return true;
};

/***************************************************************************
 * Function Name : numberFormat
 * Description : 숫자 천단위마다 콤마 찍기
 * parameters :  
 * return : 
 ***************************************************************************/
CommonJs.numberFormat = function(num) {
	num = CommonJs.unNumberFormat(num+'');
    var pattern = /(-?[0-9]+)([0-9]{3})/;
    while(pattern.test(num)) {                    
    	num = num.replace(pattern,"$1,$2");
    }
    return num;
};


/***************************************************************************
 * Function Name : numberFormat
 * Description :  %의 경우 .1 을 0.1로 표현
 * parameters :  
 * return : 
 ***************************************************************************/
CommonJs.percentFormat = function(num) {
	num = CommonJs.unNumberFormat(num+'');
    var pattern = /(-?[0-9]+)([0-9]{3})/;
    while(pattern.test(num)) {                    
    	num = num.replace(pattern,"$1,$2");
    }
    num = Comm.rate(num,2,5);
    return num;
};





/***************************************************************************
 * Function Name : unNumberFormat
 * Description : 숫자 천단위 구분 콤마 제거
 * parameters :  
 * return : 
 ***************************************************************************/
CommonJs.unNumberFormat = function (num) {
	return (num+''.replace(/\,/g,""));
};

/***************************************************************************
 * Function Name : closeTab
 * Description : 탭 닫기
 * parameters :  
 * return : 
 ***************************************************************************/
CommonJs.closeTab = function () {
//	$('#hdnActiveId').val(menuCode);
	var tabId = parent.document.getElementById("hdnActiveId").value;
//	var parentSrc = parent.document.getElementById(activeId).src;
//	var parentSrc = parent.document.getElementById(window.name).src;
//	var pos1 = parentSrc.lastIndexOf("/")+1;
//	var pos2 = parentSrc.length;
	
//	var tabId = parentSrc.substr(pos1, pos2);
	
	parent.Tabs_Del(tabId);
};

/***************************************************************************
 * Function Name : jAlert
 * Description : jquery ui 의 massage 창 
 * parameters : title, content
 * return : 
 ***************************************************************************/
CommonJs.jAlert = function (title, content, callback, h) {
	
	$( ".dialog:ui-dialog" ).dialog( "destroy" );

	$("<div class='dialog' title='"+title+"'>"+
			"<span class='ui-icon ui-icon-circle-check' style='float:left; margin:0 7px 50px 0;'></span>"+
		content+"</div>").dialog({
		modal: true,
		minHeight: 200,
		height: h,
		buttons: {
			"확인": function() {
				$( this ).dialog( "close" );
				if(callback) {
					callback();
				}
			}
		}
	});
	
};

/***************************************************************************
 * Function Name : jAlert
 * Description : jquery ui 의 massage 창 
 * parameters : title, content
 * return : 
 ***************************************************************************/
CommonJs.jAlert2 = function (title, content, callback, h, w) {
	
	$( ".dialog:ui-dialog" ).dialog( "destroy" );

	$("<div class='dialog' title='"+title+"'>"+
			"<span class='ui-icon ui-icon-circle-check' style='float:left; margin:0 7px 50px 0;'></span>"+
		content+"</div>").dialog({
		modal: true,
		height: h,
		width: w,
		buttons: {
			"확인": function() {
				$( this ).dialog( "close" );
				if(callback) {
					callback();
				}
			}
		}
	});
	
};

CommonJs.jAlert3 = function (title, content, callback, h, w) {
	
	$( ".dialog:ui-dialog" ).dialog( "destroy" );

	$("<div class='dialog' title='"+title+"'>"+
			"<span class='ui-icon ui-icon-circle-check' style='float:left; margin:0 7px 50px 0;'></span>"+
		content+"</div>").dialog({
		modal: true,
		height: 150,
		width: 450,
		buttons: {
			
		}
	});
	
};

/***************************************************************************
 * Function Name : jConfirm
 * Description : jquery ui 의 massage 창 
 * parameters : title, content
 * return : 
 ***************************************************************************/
CommonJs.jConfirm = function (title, content, callback, h) {
	
	$( ".dialog:ui-dialog" ).dialog( "destroy" );
	
	$("<div class='dialog' title='"+title+"'>"+
			"<span class='ui-icon ui-icon-circle-check' style='float:left; margin:0 7px 50px 0;'></span>"+
			content+"</div>").dialog({
				modal: true,
				minHeight: 200,
				height: h,
				buttons: {
					"확인": function() {
						$( this ).dialog( "close" );
						if(callback) {
							callback();
						}
					},
					"취소": function() {
						$( this ).dialog( "close" );
					}
				}
			});
	
};

/***************************************************************************
 * Function Name : checkMaxLength
 * Description : element를사용하여 length 체크
 * 				 length에 초과되는 필드 alert으로 보여줌
 * parameters : element
 * return : 
 ***************************************************************************/
CommonJs.checkMaxLength = function (element) {
	var tempText = $(element);
    var tempChar = "";                                        // TextArea의 문자를 한글자씩 담는다
    var tempChar2 = "";                                        // 절삭된 문자들을 담기 위한 변수
    var countChar = 0;                                        // 한글자씩 담긴 문자를 카운트 한다
    var tempHangul = 0;                                        // 한글을 카운트 한다
    var maxSize = $(element).attr("maxlength");                                        // 최대값
    
    // 글자수 바이트 체크를 위한 반복
    for(var i = 0 ; i < tempText.val().length; i++) {
        tempChar = tempText.val().charAt(i);

        // 한글일 경우 2 추가, 영문일 경우 1 추가
        if(escape(tempChar).length > 4) {
            countChar += 2;
            tempHangul++;
        } else {
            countChar++;
        }
    }
    
    // 카운트된 문자수가 MAX 값을 초과하게 되면 절삭 수치까지만 출력을 한다.(한글 입력 체크)
    // 내용에 한글이 입력되어 있는 경우 한글에 해당하는 카운트 만큼을 전체 카운트에서 뺀 숫자가 maxSize보다 크면 수행
    //한글 체크 위해서 한글빼주던거 삭제함
//    if(countChar > maxSize) {
	if((countChar-tempHangul) > maxSize) {
        tempChar2 = tempText.val().substr(0, maxSize-1);
        tempText.val(tempChar2);
    }	
};

/***************************************************************************
 * Function Name : validateForm
 * Description : formId를사용하여 validate 체크
 * 				 formId는 필드를 감싸고 있는 엘리먼트의 ID
 * 				 validation에 위배되는 필드 alert으로 보여줌
 * parameters : formId(wraper Id)
 * return : 
 ***************************************************************************/
CommonJs.validateForm = function (formId) {
	var returnVal = true;
	var titleList = "";
	var title = "";
	
	$("#"+formId + " input," + "#"+formId + " textarea," + "#"+formId + " select").each(function () {
		if ($(this).attr("required") && $(this).val() == "") {
			returnVal = false;
			title = $(this).attr("title").length <= 0 ? "항목" : $(this).attr("title");
			titleList += (titleList == "") ? title : ", " + title;
		}
	});

	if (returnVal == false) {
		CommonJs.jAlert("알림", "<strong>[ " + title + " ]</strong><br />위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.", null);
	}
	
	return returnVal;
};

/***************************************************************************
 * Function Name : getSplitData
 * Description : 특정 부호로 split하여 index로 반환
 * parameters : data: 문자열
 * 				mark: 기준 부호
 * 				idx: 순서
 * return :     문자열
 ***************************************************************************/
CommonJs.getSplitData = function(data, mark, idx) {
	var val = "";
	
	if(!data) {
		return "";
	}
	
	val = data.split(mark);
	
	if(val.length == 0 || val.length-1 < idx) {
		return "";
	}
	
	return val[idx];
};

/***************************************************************************
 * Function Name : bindForm
 * Description : formId안의 필드에 jsonData bind
 * parameters : formId(wraper Id)
 * 				aoData(jsonData)
 * return : 
 ***************************************************************************/
CommonJs.bindForm = function(formId, aoData) {
	$("#"+formId + " input," + "#"+formId + " textarea," + "#"+formId + " select," + "#"+formId + " span," + "#"+formId + " td," + "#"+formId + " th").each(function () {
		for(var key in aoData) {
			if($(this).attr("name") == key.toUpperCase()) {
				switch ($(this).prop("tagName").toUpperCase()) {
				case "INPUT":
					switch ($(this).attr("type").toUpperCase()) {
						case "RADIO":
							var lsVal = aoData[key];
							if (lsVal != "") {
								$("#"+formId + " input:radio[name=" + key + "]:radio[value='" + aoData[key] + "']").prop("checked", true);
							}
							break;
						case "CHECKBOX":
							$("input[name='"+$(this).attr("name")+"']").each(function () {
								$(this).attr("checked", false);
							});
							var lsVal = aoData[key];
							if (lsVal) {
								var lsrVal = lsVal.split(",");
								for (var i = 0; i < lsrVal.length; i++) {
									$("input[name='"+$(this).attr("name")+"']").each(function () {
										if ($(this).val() == lsrVal[i]) {
											$(this).prop("checked", true);
										}
									});
								}
							}
							break;
						case "TEXT":
							switch ($(this).attr("format")) {
								case "rate25":
									$(this).val(Comm.rate(aoData[key], 2, 5));
									break;
								case "money":
									$(this).val(Comm.money(aoData[key]));
									break;
								case "date":
									$(this).val(Comm.date(aoData[key]));
									break;
								case "number":
									$(this).val(Comm.number(aoData[key]));
									break;
								default:
									$(this).val(aoData[key]);
									break;
							}
							break;
						default:
							$(this).val(aoData[key]);
							break;
					}
					break;
				case "SELECT":					
					$(this).val(aoData[key]);
					break;
				case "TEXTAREA":			
					$(this).val(aoData[key]);
					break;
				case "SPAN":
					switch ($(this).attr("format")) {
						case "rate25":
							$(this).html(Comm.rate(aoData[key], 2, 5));
							break;
						case "money":
							$(this).html(Comm.money(aoData[key]));
							break;
						case "date":
							$(this).html(Comm.date(aoData[key]));
							break;
						case "number":
							$(this).html(Comm.number(aoData[key]));
							break;
						default:
							$(this).html(aoData[key]);
							break;
					}
					break;
				case "TH":			
					switch ($(this).attr("format")) {
						case "rate25":
							$(this).html(Comm.rate(aoData[key], 2, 5));
							break;
						case "money":
							$(this).html(Comm.money(aoData[key]));
							break;
						case "date":
							$(this).html(Comm.date(aoData[key]));
							break;
						case "number":
							$(this).html(Comm.number(aoData[key]));
							break;
						default:
							$(this).html(aoData[key]);
							break;
					}
					break;
				case "TD":			
					switch ($(this).attr("format")) {
						case "rate25":
							$(this).html(Comm.rate(aoData[key], 2, 5));
							break;
						case "money":
							$(this).html(Comm.money(aoData[key]));
							break;
						case "date":
							$(this).html(Comm.date(aoData[key]));
							break;
						case "number":
							$(this).html(Comm.number(aoData[key]));
							break;
						default:
							$(this).html(aoData[key]);
							break;
					}
					break;
				}
			}
		}
	});
		
};

/***************************************************************************
 * Function Name : flushGrid
 * Description : gridId안의 데이터를 array 형태로 반환
 * parameters : gridId
 * return : array 
 ***************************************************************************/
CommonJs.flushGrid = function(gridId) {
	var rows = $("#"+gridId).jqGrid('getDataIDs');
	
	var rowArray = new Array();
	
	for(var i = 0; i < rows.length; i++){
		var rowData = $("#"+gridId).getRowData(rows[i]);
		rowArray[rowArray.length] = rowData;
	}
	
	return rowArray;
};

/***************************************************************************
 * Function Name : bindGrid
 * Description : gridId안의 컬럼에 jsonData bind
 * parameters : gridId
 * 				aoData(jsonData)
 * return : 
 ***************************************************************************/
CommonJs.bindGrid = function(gridId, aoData) {
//	Comm.printArrayMap("aoData",aoData);
	$("#"+gridId).jqGrid("clearGridData");
	
	if ($("#" + gridId).get(0).p.treeGrid) {
		$("#" + gridId).get(0).addJSONData({
			total: 1,
			page: 1,
			records: aoData.length,
			rows: aoData
		});
	} else {
		$("#" + gridId).jqGrid('setGridParam', {
			datatype: 'local',
			data: aoData,
			rowNum: aoData.length
		});
	}
	
	$("#" + gridId).trigger("reloadGrid");
};

/***************************************************************************
 * Function Name : flushFile
 * Description : commFile.upload.uploaded 데이터를 array 형태로 반환
 * parameters : tableNm(저장테이블), uploadedMap(fileMap)
 * return : array 
 ***************************************************************************/
CommonJs.flushFile = function(tableNm, uploadedMap) {
	var fileArray = new Array();
	
	for( var key in uploadedMap ) {
//		Comm.printMap("key[" + key + "]", commFile.upload.uploaded[key]); 
		var uploaded = commFile.upload.uploaded[key];
		
		var file = {};
		
		file.TABLE_NM = tableNm;
// 		file.KEY1 = 서비스에서 ; 
		file.GUBUN = key;
		file.FILE_LOC = uploaded.webpath;
		file.FILE_NM = uploaded.origfilename;
		file.FILE_EXT = uploaded.file_ext;
		file.FILE_SIZE = uploaded.filesize;
		
		fileArray[fileArray.length] = file;
	}
	
	return fileArray; 
};

/***************************************************************************
 * Function Name : bindFile
 * Description : file array 데이터를 commFile.upload.uploaded에 bind
 * parameters : commFile(파일업로드 객체), fileArray(db 파일테이블에서 조회된 값)
 * return : 
 ***************************************************************************/
CommonJs.bindFile = function(commFile, fileArray) {
//	Comm.printArrayMap(fileArray);
	for(var i = 0; i < fileArray.length; i++) {
		file = fileArray[i];

//		Comm.printMap(file);
		commFile.upload.uploaded[file.GUBUN] = {"webpath": file.FILE_LOC, 
												"origfilename": file.FILE_NM,
												"file_ext": file.FILE_EXT,
												"filesize": file.FILE_SIZE
												};
		
		$("#"+file.GUBUN+"_DOC_NM").text(file.FILE_NM);
		
	}
//	for( var key in commFile.upload.uploaded ) {
//		Comm.printMap("key[" + key + "]", commFile.upload.uploaded[key]); 
//	}
};

/***************************************************************************
 * Function Name : bindCombo
 * Description : sqlId로 ComboArrayData 조회
 * parameters : selector, options, jsonParams, sqlId
 * sample: 
 * 
 * var options = {ITEM: [{ VAL: "", TEXT: "선택" }],DEFAULT: ""};
 * CommonJs.getComboData("#SCHEDULE_L", options, null, "csbp.biz_combo_s01");
 * 
 * return : jsonArray 
 ***************************************************************************/
CommonJs.bindCombo = function(selector, options, jsonParams, sqlId) {
	Comm.callAjax({
		DATAFORM	: null,
		DATA		: jsonParams,
		DATABLOCK	: null,
		CMD			: "SELECT",
		SQLMAPID	: sqlId,
		TRANSKEY	: sqlId,
		ASYNC		: false
	},
	function (data, context, method) {
		var loTrans = top.gSite.trans[sqlId];
		loTrans.success(data);
		delete top.gSite.trans[sqlId];
		
		Comm.setSelectItem(
				selector,			// element
				loTrans.datablock,					// bind data
				options
		);
	},
	function (data, context, method) {	// error callback
		Comm.alert(method);
	});
};

/***************************************************************************
 * Function Name : ajax
 * Description : sqlId로 데이터 조회
 * parameters : sqlId, jsonParams, listener
 * sample: 
 * 
 * return : jsonArray 
 ***************************************************************************/
CommonJs.ajax = function(sqlId, jsonParams, listener) {
	Comm.callAjax({
		DATAFORM	: null,
		DATA		: jsonParams,
		DATABLOCK	: null,
		CMD			: "SELECT",
		SQLMAPID	: sqlId,
		TRANSKEY	: sqlId,
		ASYNC		: false
	},
	function (data, context, method) {
		var loTrans = top.gSite.trans[sqlId];
		loTrans.success(data);
		delete top.gSite.trans[sqlId];
		
		if(listener) {
			if(loTrans.datablock) {
				listener(loTrans.datablock);
			} else {
				var result = new Array()
				result[0] = loTrans.data;
				
				listener(result);
			}
		}
	},
	function (data, context, method) {	// error callback
		Comm.alert(method);
	});
};

/***************************************************************************
 * Function Name : searchZipCode
 * Description : 상공회의소 우편번호 팝업
 * parameters : listener
 * return : 우편번호 찾기 팝업 aWltMy5rb3JjaGFtLm5ldA== (임시) / d3d3LmlpbTMub3Jn (오픈후 www.iim3.org) / aWltMy5vcmc=(오픈후 iim3.org)
 ***************************************************************************/
CommonJs.searchZipCode = function(listener) {
	//리얼 iim3.org
	var lsLic = "aWltMy5vcmc=";
	
	if(location.href.indexOf("iim3.korcham.net:8089") > -1 ) {
		//개발서버키
		lsLic = "aWltMy5rb3JjaGFtLm5ldA==";
		
	}else if(location.href.indexOf("iim3.korcham.net:8081") > -1 ) {
		//개발서버키
		lsLic = "aWltMy5rb3JjaGFtLm5ldA==";
		
	}
	else if(location.href.indexOf("www.iim3.org") > -1 ){
		//리얼 www.iim3.org
		lsLic = "d3d3LmlpbTMub3Jn";
		//alert("www.iim3.org");
	} 
		
	var url = "http://www.korchambiz.net/join/search_zipcodeEXT.jsp?listener="+listener+"&p_tp=C&c="+lsLic;
	var win = window.open(url, "postSearchWin", "width=550,height=350,status=yes,scrollbars=yes,resizable=no");
	
	win.focus();
};

/***************************************************************************
 * Function Name : reportView
 * Description : 리포트 View
 * parameters : file_nm:파일명,param:파라미터
 ***************************************************************************/
CommonJs.reportView = function(file_nm,param){
	for(var i = 0;i < param.length ; i++){
		param = param.replace('#','%23');
	}
	CommonJs.openWindow("report_viewer.do?file_nm="+file_nm+"&param="+param, file_nm, 800, 700, null) ;
};


// 가로형 레포트
CommonJs.reportViewHorizontally = function(file_nm,param){
	for(var i = 0;i < param.length ; i++){
		param = param.replace('#','%23');
	}
	CommonJs.openWindow("report_viewer.do?file_nm="+file_nm+"&param="+param, file_nm, 1050, 700, null) ;
};


var spinnerVisible = false;
function showProgress() {
	if($("#loadingSpinner").length < 1)
		$("body").append('<div id="loadingSpinner"></div>');
    if (!spinnerVisible) {
        $("div#loadingSpinner").fadeIn("fast");
        spinnerVisible = true;
    }
};
function hideProgress() {
    if (spinnerVisible) {
        var spinner = $("div#loadingSpinner");
//       spinner.stop();
        spinner.fadeOut("fast");
        spinnerVisible = false;
    }
};

function numbersonly(e, decimal) {
    var key;
    var keychar;
    if (window.event) {  //익스와 파폭 체크 !
        key = window.event.keyCode;
    } else if (e) {
        key = e.which;
    } else {
        return true;
    }
    keychar = String.fromCharCode(key);
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13)
            || (key == 27)) {
        return true;
    } else if ((("0123456789").indexOf(keychar) > -1)) {
        return true;
    } else if (decimal && (keychar == ".")) {
        return true;
    } else
        return false;
}

$(function() 
		{ 
		 /*$(document).on("keyup", "input:text[numberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9]/gi,"") );});*/ 
		 $(document).on("keyup", "input:text[datetimeOnly]", function() {$(this).val( $(this).val().replace(/[^0-9:\-]/gi,"") );}); 
		});
/***************************************************************************
 * Function Name : dialogHandler
 * Description : dialogi, height, width로 생성
 * 포함 method : popup() 팝업 open
 * 			     closePopup() 팝업 close
 *               setForm(form) action(팝업화면url)을 포함한 폼 설정 
 * 				 setUrl(url) url(팝업화면url) 설정	
 * parameters : dialogId, height, width
 * return : 
 ***************************************************************************/
var dialogHandler = function (dialogId, option){
	this.dialogId = dialogId;
	this.dialog = document.getElementById(dialogId);
	this.queryForm = null;
	this.queryUrl = null;
	
	/** 팝업 open **/
	this.popup = function(){
				
		/** 팝업 리스너 생성 **/
		$(this.dialog).dialog(option);
		
		if(this.queryForm != null){
			var target = "iframe"+this.dialogId;
			var html = '<iframe name="'+target+'" style="min-width:100px !important; width:100%; height:100%;" frameborder=0 ></iframe>';
			this.dialog.innerHTML = html;
			this.queryForm.target = target;
			this.queryForm.submit();
		}else if(this.queryUrl != null){
			var html = '<iframe src="'+this.queryUrl+'" style="min-width:100px !important;width:100%; height:100%;" frameborder=0></iframe>';
			this.dialog.innerHTML = html;
			
		}else{
			alert('호출 할 소스에 대한 설정이 없습니다.');
			return;
		}
		
		//$( "#popup:ui-dialog" ).dialog( "destroy" );
		$(this.dialog).dialog( "open" );
		$(".ui-dialog-titlebar").addClass("pop_head");
	};
	
	/** form 설정 action(팝업화면url) 설정된 폼 사용해야 함 **/
	this.setForm = function (form){
		this.queryForm = form;
	};
	
	/** url(팝업화면url) 설정 **/
	this.setUrl = function (url){
		this.queryUrl = url;
	};

	/** 팝업 close **/
	this.closePopup = function (){
		$(this.dialog).dialog("close");
	};
	
	
};

/***************************************************************************
 * Function Name : strCut
 * Description : 문자열 자르기
 * @author  : 김경진
 * @since   : 2016.12.26
 * @parameters : 
 * 		str 		자를 문자열
 * 		lengths		자를 문자열 길이
 * return : newStr
 ***************************************************************************/
CommonJs.strCut = function(str,lengths) {
	var len = 0;
	var newStr = "";
	
	for (var i=0;i<str.length; i++) 
	{
		var n = str.charCodeAt(i); // charCodeAt : String개체에서 지정한 인덱스에 있는 문자의 unicode값을 나타내는 수를 리턴한다.
		// 값의 범위는 0과 65535사이이여 첫 128 unicode값은 ascii문자set과 일치한다.지정한 인덱스에 문자가 없다면 NaN을 리턴한다.
		
		var nv = str.charAt(i); // charAt : string 개체로부터 지정한 위치에 있는 문자를 꺼낸다.
		
		if ((n>= 0)&&(n<256)) len ++; // ASCII 문자코드 set.
		else len += 2; // 한글이면 2byte로 계산한다.
		
		if (len>lengths) break; // 제한 문자수를 넘길경우.
		else newStr = newStr + nv;
	}
	return newStr;
};

/***************************************************************************
 * Function Name : getElBytes
 * Description : 문자열 byte 가져오기
 * @author  : 김경진
 * @since   : 2016.12.26
 * @parameters : 
 * 		obj		입력받은 엘리먼트의 문자열
 * return : _byte
 ***************************************************************************/
CommonJs.getElBytes = function(obj) {
	var str = new String(obj.value);
	var _byte = 0;
	if(str.length != 0)
	{
		for (var i=0; i < str.length; i++) 
		{
			var str2 = str.charAt(i);
			if(escape(str2).length > 4)
			{
				_byte += 2;
			}
			else 
			{
				_byte++;
			}
		}
	}
	return _byte;
};

/***************************************************************************
 * Function Name : getBytes
 * Description : 문자열 byte 가져오기
 * @author  : 김경진
 * @since   : 2016.12.26
 * @parameters : 
 * 		str		입력받은 문자열
 * return : _byte
 ***************************************************************************/
CommonJs.getBytes = function(str) {
	var _byte = 0;
	if(str.length != 0)
	{
		for (var i=0; i < str.length; i++) 
		{
			var str2 = str.charAt(i);
			if(escape(str2).length > 4)
			{
				_byte += 2;
			}
			else 
			{
				_byte++;
			}
		}
	}
	return _byte;
};

/***************************************************************************
 * Function Name : displayBytes
 * Description : 문자열 byte 를 화면에 표시한다. (문자열 제한 byte 도달시 자름) 
 * @author  : 김경진
 * @since   : 2016.12.26
 * @parameters : 
 * 		obj		입력받은 문자열
 * 		id		출력할 byte
 * 		sz		문자열 제한 byte
 * return : id.value
 ***************************************************************************/
CommonJs.displayBytes = function(obj, id, sz) {
	
	var _byte = CommonJs.getElBytes(obj);
	
	if(_byte >= sz)
	{
		//  sz자 까지 만든다.
		obj.value = CommonJs.strCut(obj.value , sz);
	}
	
	document.getElementById(id).value = _byte;
};

/***************************************************************************
 * Function Name : displayBytesTxt
 * Description : 문자열 byte 를 화면에 표시한다. (문자열 제한 byte 도달시 자름) 
 * @author  : 김경진
 * @since   : 2016.12.26
 * @parameters : 
 * 		obj		입력받은 문자열
 * 		id		출력할 byte
 * 		sz		문자열 제한 byte
 * return : id.text
 ***************************************************************************/
CommonJs.displayBytesTxt = function(obj, id, sz) {
	
	var _byte = CommonJs.getElBytes(obj);
	
	if(_byte >= sz)
	{
		//  sz자 까지 만든다.
		obj.value = CommonJs.strCut(obj.value , sz);
	}
	
	document.getElementById(id).innerHTML = _byte;
};

/***************************************************************************
 * Function Name : displayBytesTxt
 * Description : 문자열 byte 를 화면에 표시한다.
 * @author  : 김경진
 * @since   : 2017.02.21
 * @parameters : 
 * 		obj		입력받은 문자열
 * 		id		출력할 엘리먼트 ID
 * return : id.text
 ***************************************************************************/
CommonJs.displayBytesTxt2 = function(obj, id) {
	
	var _byte = CommonJs.getElBytes(obj);
	document.getElementById(id).innerHTML = _byte;
};

/***************************************************************************
 * Function Name : numberCheck
 * Description : 숫자만 입력
 * @author  : 김경진
 * @since   : 2016.12.26
 * @parameters : 
 * 		obj		input obj
 * return : obj.value
 ***************************************************************************/
CommonJs.numberCheck = function(obj) {
	obj.value = obj.value.replace(/[^0-9]/g,'');
};

/***************************************************************************
 * Function Name : engNumCheck
 * Description : 영어,숫자만 입력
 * @author  : 문희훈
 * @since   : 2017.01.12
 * @parameters : 
 * 		obj		input obj
 * return : obj.value
 ***************************************************************************/
CommonJs.engNumCheck = function(obj) {
	obj.value = obj.value.replace(/[^a-z0-9]/gi,''); 
};

/***************************************************************************
 * Function Name : busiFomatter
 * Description : 숫자형식의 사업자번호를 '-' 를 조합하여 리턴한다.
 * @author  : 김경진
 * @since   : 2017.02.21
 * @parameters : 
 * 		num : '-' 문자가 들어있지않은 숫자로된 전화번호
 * 		type : 0을 보내면 가운데자리를 숨겨준다
 * 
 * 		1. 123-45-67890 : 10자리 사업자
 * return : busiNum
 ***************************************************************************/
CommonJs.busiFomatter = function(num, type) {
	
	if(typeof num == "undefined" || num == null || num == "")
	{
		return "";
	}
	
	var busiNum = "";
	
	if(num.length==10)
	{
		if(type==0){
			busiNum = num.replace(/(\d{3})(\d{2})(\d{5})/, "$1-**-$3");
		}else{
			busiNum = num.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
		}
	}
	else
	{
		busiNum = num;
	}
	return busiNum;  
};

/***************************************************************************
 * Function Name : busiFomatter
 * Description : 사업자 등록번호 입력 시 자동 하이픈"-" 추가 함수
 * @author  : 김경진
 * @since   : 2017.04.25
 * @parameters : 
 * 		str : 숫자
 * 
 * 		1. 123-45-67890 : 10자리 사업자
 * return : busiNum
 ***************************************************************************/
CommonJs.autoHypenBizNo = function(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    
    if( str.length < 4){
        return str;
    }else if(str.length < 5){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 6){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 2);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{       
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3,2);
        tmp += '-';
        tmp += str.substr(5);
        return tmp;
    }
    return str;
};

/***************************************************************************
 * Function Name : phoneFomatter
 * Description : 숫자형식의 전화번호나 휴대폰번호를 '-' 를 조합하여 리턴한다.
 * @author  : 김경진
 * @since   : 2017.01.09
 * @parameters : 
 * 		num : '-' 문자가 들어있지않은 숫자로된 전화번호
 * 		type : 0을 보내면 가운데자리를 숨겨준다
 * 
 * 		1. 010-XXXX-XXXX : 11자리 휴대폰번호
 *		2. 010-XXX-XXXX : 10자리 휴대폰번호
 *		3. 02-XXXX-XXXX : 10자리 서울 전화번호
 *		4. 031-XXX-XXXX :  10자리 서울 외 전화번호
 *		5. 1688-XXXX : 8자리 업체 번호
 * return : formatNum
 ***************************************************************************/
CommonJs.phoneFomatter = function(num, type) {
	
	if(typeof num == "undefined" || num == null || num == "")
	{
		return "";
	}
	
	var formatNum = "";
	
	if(num.length==11)
	{
		if(type==0){
			formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
		}else{
			formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
		}
	}
	else if(num.length==8)
	{
		formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
	}
	else
	{
		if(num.indexOf("02")==0){
			if(type==0){
				formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
			}else{
				formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
			}
		}else{
			if(type==0){
				formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3");
			}else{
				formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
			}
		}
	}
	return formatNum;  
};

/***************************************************************************
 * Function Name : phoneFomatterArr
 * Description : 숫자형식의 전화번호나 휴대폰번호를 배열로 리턴한다.
 * @author  : 김경진
 * @since   : 2017.01.09
 * @parameters : 
 * 		num : '-' 문자가 들어있지않은 숫자로된 전화번호
 * 		type : 0을 보내면 가운데자리를 숨겨준다
 * 
 * 		1. 010-XXXX-XXXX : 11자리 휴대폰번호
 *		2. 010-XXX-XXXX : 10자리 휴대폰번호
 *		3. 02-XXXX-XXXX : 10자리 서울 전화번호
 *		4. 031-XXX-XXXX :  10자리 서울 외 전화번호
 *		5. 1688-XXXX : 8자리 업체 번호
 * return : formatNum (Array)
 ***************************************************************************/
CommonJs.phoneFomatterArr = function(num) {
	
	if(typeof num == "undefined" || num == null || num == "")
	{
		return null;
	}
	
	var formatNum = new Array();
	
	if(num.length==11)
	{
		//formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
		formatNum[0] = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1");
		formatNum[1] = num.replace(/(\d{3})(\d{4})(\d{4})/, "$2");
		formatNum[2] = num.replace(/(\d{3})(\d{4})(\d{4})/, "$3");
	}
	else if(num.length==8)
	{
		//formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
		formatNum[0] = num.replace(/(\d{4})(\d{4})/, "$1");
		formatNum[1] = num.replace(/(\d{4})(\d{4})/, "$2");
	}else if(num.length==7){
		formatNum[0] = num.replace(/(\d{3})(\d{4})/, "$1");
		formatNum[1] = num.replace(/(\d{3})(\d{4})/, "$2");
	}
	else
	{
		if(num.indexOf("02")==0){
			if(num.length==9)
			{
				//formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
				formatNum[0] = num.replace(/(\d{2})(\d{3})(\d{4})/, "$1");
				formatNum[1] = num.replace(/(\d{2})(\d{3})(\d{4})/, "$2");
				formatNum[2] = num.replace(/(\d{2})(\d{3})(\d{4})/, "$3");
			}
			else
			{
				//formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
				formatNum[0] = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1");
				formatNum[1] = num.replace(/(\d{2})(\d{4})(\d{4})/, "$2");
				formatNum[2] = num.replace(/(\d{2})(\d{4})(\d{4})/, "$3");
			}
		}else{
			formatNum[0] = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1");
			formatNum[1] = num.replace(/(\d{3})(\d{3})(\d{4})/, "$2");
			formatNum[2] = num.replace(/(\d{3})(\d{3})(\d{4})/, "$3");
		}
	}
	return formatNum;  
};

/***************************************************************************
 * Function Name : emailSplit
 * Description : 이메일 형식의 문자를 '@' 기준으로 자른 후 배열로 리턴
 * @author  : 김경진
 * @since   : 2017.01.09
 * @parameters : 
 * 		email : test@test.com
 * 
 * return : emailSplit (Array)
 ***************************************************************************/
CommonJs.emailSplit = function(email) {
	
	if(typeof email == "undefined" || email == null || email == "")
	{
		return null;
	}
	
	var emailSplit = new Array();
	
	if(email.indexOf("@") > -1)
	{
		emailSplit = email.split("@");
	}
	else
	{
		return null;
	}
	
	return emailSplit;  
};

/***************************************************************************
 * Function Name : dateFormat
 * Description : 원하는 날짜 형식으로 반환 
 * @author  : 김경진
 * @since   : 2017.01.09
 * @parameters : 
 * 		date : 날짜 문자열
 * 		format : 원하는 날짜형식
 * 
 * ex1) 8자리 입력시 (년, 월, 일)
 * 		dateFormat('20101201', '-')
 * 		result : 20101201 -> 2010-12-01
 * ex2) 6자리 입력시(년, 월)
 * 		dateFormat('201012', '-')
 * 		result : 201012 -> 2010-12
 * ex3) 12자리 입력시(년, 월,일,시,분)
 * 		dateFormat('201012111034', '-')
 * result : 201012111034 -> 2010-12-11 10:34
 ***************************************************************************/
CommonJs.dateFormat = function(date, format) {
	
	var result = "";
	
	if(typeof date == "undefined" || date == null || date == "")
	{
		return "";
	}
	else
	{
		if(typeof format == "undefined" || format == null || format == "")
		{
			return date;
		}
		else
		{
			if(date.length == 8) {
				result = date.substring(0, 4) + format + date.substring(4, 6) + format + date.substring(6, 8);
			} else if(date.length == 6) {
				result = date.substring(0, 4) + format + date.substring(4, 6);
			} else if(date.length == 12) {
				result = date.substring(0, 4) + format + date.substring(4, 6) + format + date.substring(6, 8)+" "+date.substring(8,10) + ":" + date.substring(10,12);
			} else if(date.length == 14) {
				result = date.substring(0, 4) + format + date.substring(4, 6) + format + date.substring(6, 8)+" "+date.substring(8,10) + ":" + date.substring(10,12) + ":" + date.substring(12,14);
			}
		}
	}
	
	return result;
};

/***************************************************************************
 * Function Name : isNullToString
 * Description : 객체가 null인지 'undefined'인지 확인하고 원하는 문자로 바꾸는 함수
 * @author  : 김경진
 * @since   : 2017.02.10
 * @parameters : 
 * 		object : 원본 객체
 *		converted : 바꿀문자
 * 
 * return : string
 ***************************************************************************/
CommonJs.isNullToString = function(object, converted) {
	
	var string = "";
    
    if (typeof object != "undefined" && object != null) {
        string = object.toString();
    }
    else {
    	string = converted;
    }
    
    return string; 
};

/***************************************************************************
 * Function Name : viewKorean
 * Description : 숫자금액을 한글로 표현
 * @author  : 김경진
 * @since   : 2017.03.02
 * @parameters : 
 * 		num : 금액 (string 형으로 받아야됨)
 * 
 * return : string
 ***************************************************************************/
CommonJs.viewKorean = function(num) {	
    var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
    var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천");
    var result = "";
	for(var i=0; i<num.length; i++) {		
		str = "";
		han = hanA[num.charAt(num.length-(i+1))];
		if(han != "")
			str += han+danA[i];
		if(i == 4) str += "만";
		if(i == 8) str += "억";
		if(i == 12) str += "조";
		result = str + result;
	}
	if(num != 0)
		result = result + "원";
    return result ;
};

/***************************************************************************
 * Function Name : addInputHandler
 * Description : input 숫자, 영어, 한글 입력 제어 (모든 브라우저 사용가능)
 * @author  : 김경진
 * @since   : 2017.03.30
 * @parameters : 
 * 		conditions : Object
 * 		ex)
 * 			숫자만 : 		CommonJs.addInputHandler({input:$("#onlyNumber"), dataType:"N", maxlength:3});
 * 			영어만 : 		CommonJs.addInputHandler({input:$("#onlyAlphabet"),dataType:"AP"});
            영어&숫자만 : 	CommonJs.addInputHandler({input:$("#alphaNumeric"),dataType:"AN"});
            한글만 : 		CommonJs.addInputHandler({input:$("#hangul"),dataType:"HA"});
 * return : string
 ***************************************************************************/
CommonJs.addInputHandler = function(conditions){
	var $input = conditions.input;
	var dataType = conditions.dataType;
	var eventType = conditions.eventType;
	if ((!$input) || (!dataType)) {
		throw {error:"NotEnoughArguments", errorMsg:"required argument is missing " +((!$input)?" target input element":" dataType")};
		return;
	}
	if ($input[0].tagName != "INPUT") {
		throw {error:"IlregalTargetElement", errorMsg:"target element is not input"};
		return;
	}
	if ((!eventType)) {
		eventType = "keyup";
	}
	var handlerFunc = conditions.handler;
	if ((!handlerFunc)) {
		handlerFunc = function(event){
			$("#divKeyCode").empty().html("<span> event key code = "+event.keyCode+"</span>");
			var regEx = null;
			if (dataType == "N") {
				regEx = /[^0-9]/gi;
			} else if (dataType == "AP") {
				regEx = /[^a-z]/gi;
			}else if (dataType == "AN") {
				regEx = /[^a-z0-9]/gi;
			}else if (dataType == "HA") {
				regEx = /[a-z0-9]/gi;
			}else{
				throw {error:"IlregalDataType", errorMsg:"dataType("+dataType+") is incorrect"};     
			}
			CommonJs.remainOnlyTargetValue(regEx, $input, event);
			//return true;
		};  // end of handlerFunc
	} // end of if to check handlerFunc
	$input.on(eventType,handlerFunc);
	
	if (conditions.maxlength) {
		$input.attr("maxlength",conditions.maxlength);
	}
};

CommonJs.remainOnlyTargetValue = function(regEx, $input, event) {
	if ((!(event.keyCode >=34 && event.keyCode<=40)) && event.keyCode != 16) {
		var inputVal = $input.val();
			if (regEx.test(inputVal)) {
			$input.val(inputVal.replace(regEx,''));    
		}
	}
};

/***************************************************************************
 * Function Name : numberCheck2
 * Description : 숫자만 입력 (음수허용)
 * @author  : 김경진
 * @since   : 2017.03.30
 * @parameters : 
 * 		
 * return : obj.value
 ***************************************************************************/
CommonJs.numberCheck2 = function() { //onKeyPress 이벤트 기준

	if ( ((event.keyCode < 48) || (57 < event.keyCode) && (188 != event.keyCode)) && (45 != event.keyCode) 
		&& (190 != event.keyCode) && (110 != event.keyCode) && (109 != event.keyCode) && (46 != event.keyCode)) 
	{
		event.returnValue=false;
	}
};

/***************************************************************************
 * Function Name : input_comma
 * Description : 콤마 삽입 (금액표시)
 * @author  : 김경진
 * @since   : 2017.03.30
 * @parameters : 
 * 		sfield : this.obj
 * return : obj.value
 ***************************************************************************/
CommonJs.input_comma = function (sfield) {
	
	if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) 
		|| (event.keyCode == 188) || (event.keyCode == 190) || (event.keyCode == 110) || (event.keyCode == 8) || (event.keyCode == 46))
	{
		sfield.value = CommonJs.remove_comma(sfield);
		money = sfield.value;
		var tmpH="";
		if(money.charAt(0)=="-")
		{
			tmpH=money.substring(0,1);
			money=money.substring(1,money.length);
		}
	
		for (; money.indexOf("-") != -1 ;) 
		{ 
			money = money.replace("-","");
		}
	
		belowzero = "";
		if (CommonJs.check_dot(money)==true)
		{
			arr = money.split(".");
			money = arr[0];		
			belowzero = "." + arr[1];    
		}
		
		len = money.length ;
		result ="";
		for (var i=0; i < len;i++)
		{
			comma="";
			schar = money.charAt(i);
			where = len - 1 - i;
			if ( ( where % 3 == 0) && (len > 3) && ( where != 0 )) 
			{
				comma = ",";	
			}
			result = result +   schar + comma ;
		}
		if(tmpH)
		{
				result = tmpH + result;
 		}

		sfield.value = result + belowzero;			
		
   	}	
	return true;
};

CommonJs.check_dot = function(v_value) {
	v_len= v_value.length;
	for (var i=0; i< v_len; i++) 
	{
		schar = v_value.charAt(i);
		if (schar == "." )
		{
			return true;
		}
	}
	return false;
};

/***************************************************************************
 * Function Name : remove_comma
 * Description : 콤마 제거
 * @author  : 김경진
 * @since   : 2017.03.30
 * @parameters : 
 * 		sfield : this.obj
 * return : obj.value
 ***************************************************************************/
CommonJs.remove_comma = function(sfield) {

	var money = sfield.value;
	var arr;
	arr = money.split(",");
	len = arr.length;	
	result = "";
	for (var k=0; k < len; k++) 
	{
		result = result + arr[k];
	}
	return result;
};

/***************************************************************************
 * Function Name : remove_comma2
 * Description : 콤마 제거
 * @author  : 김경진
 * @since   : 2017.03.30
 * @parameters : 
 * 		val : String value
 * return : obj.value
 ***************************************************************************/
CommonJs.remove_comma2 = function(val) {

	var money = val;
	var arr;
	arr = money.split(",");
	len = arr.length;	
	result = "";
	for (var k=0; k < len; k++) 
	{
		result = result + arr[k];
	}
	return result;
};


/***************************************************************************
 * Function Name : sendAlimtalk
 * Description : 알림톡 전송 공통함수
 * @author  : 김경진
 * @since   : 2017.04.17
 * @parameters : 
 *      corpCode	: 기업코드
 *      memList		: String 형의 문자 전송 대상자 List ( row 구분자 '@', filed 구분자 '|')
 *      memo		: 알림톡 내용
 *      result		: ( 0 : 즉시전송(숫자 0) R : 예약전송 )
 *      sendDt		: 예약전송시 예약전송일자 (170417)
 *      reserveTime	: 예약전송시 예약전송일시 (050700)
 *      smsFlag		: 제목 (공통코드)
 * 		
 * return : obj.value
 ***************************************************************************/
CommonJs.sendAlimtalk = function(corpCode, memList, templateCode, result, sendDt, reserveTime, smsFlag) {
	
	var msg = "알림톡 발송 필수값 오류";
	if(memList == null || memList == "")
	{
		alert(msg);	// SMS 수신자를 선택해주세요.
		return;
	}
	
	if(result == "R")	// 예약전송시
	{
		if(sendDt == null || sendDt == "" || reserveTime == null || reserveTime == "")
		{
			alert(msg);
			return;
		}
	}
	
	var param = { "P_CORP_CODE" : corpCode
				, "P_MEM_LIST" : memList
				, "P_SEND_DT" : sendDt
				, "P_RESERVE_TIME" : reserveTime
				, "P_SMS_FLAG" : smsFlag
				, "P_TEMPLATECODE" : templateCode
				, "P_RESULT" : result
	};
	
	jQuery.ajax({
	    url:"/alimtalSend.do",
	    type:"POST",
		datatype:"json",
		//async:false,
		data: param,
		success:function(data){
			if(typeof data.RETURN_CODE != "undefined" && data.RETURN_CODE != null)
			{
				if(data.RETURN_CODE == 0)	// 휴대폰번호 없을시 알림톡 발송 안함.
				{
					//alert(msgSendSuccess);
				}
				else if(data.RETURN_CODE > 0)
				{
					alert(msgSendSuccess);
				}
				else
				{
					alert(msgErrorDefault);
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
};

/***************************************************************************
 * Function Name : CommonJs.addLodingBar
 * Description : 로딩효과 추가 펑션
 * @author  : 김경진
 * @since   : 2017.05.15
 * @parameters : 
 * 		layerId : 로딩바 영역 layer ID
 ***************************************************************************/
CommonJs.addLodingBar = function(layerId) {
	var str = "";
	var top = 0;
	var left = 0;
	var layerTop = $("#" + layerId).scrollTop();
	var layerWidth = $("#" + layerId).width();
	var layerHeight = $("#" + layerId).height();
	var pad_top = $("#" + layerId).css("padding-top").replace("px", "").replace("auto", "0");
	var pad_bottom = $("#" + layerId).css("padding-bottom").replace("px", "").replace("auto", "0");
	var pad_left = $("#" + layerId).css("padding-left").replace("px", "").replace("auto", "0");
	var pad_right = $("#" + layerId).css("padding-right").replace("px", "").replace("auto", "0");
	var mar_top = $("#" + layerId).css("margin-top").replace("px", "").replace("auto", "0");
	var mar_bottom = $("#" + layerId).css("margin-bottom").replace("px", "").replace("auto", "0");
	var mar_left = $("#" + layerId).css("margin-left").replace("px", "").replace("auto", "0");
	var mar_right = $("#" + layerId).css("margin-right").replace("px", "").replace("auto", "0");
	
	// Margin, Padding값 더하기
	layerWidth += parseInt(pad_left) + parseInt(pad_right) + parseInt(mar_left) + parseInt(mar_right);
	layerHeight += parseInt(pad_top) + parseInt(pad_bottom) + parseInt(mar_top) + parseInt(mar_bottom);
	
	str  = "<div id=\"" + layerId + "_loading\" style=\"width:16px;height:16px;\">";
	str += "	<img src=\"/resources/img/common/ico_loading.gif\" />";
	str += "</div>";
	
	// 로딩시 바탕 효과
	$("#" + layerId).append(str);											// 로딩 이미지
	$("#" + layerId).append("<div id=\"" + layerId + "_loadingBg\"></div>");// 로딩 바탕 흐림 효과
	
	// 로딩 이미지 위치값
	top = (layerHeight / 2) - ($("#" + layerId + "_loading").height() / 2) + layerTop;
	left = (layerWidth / 2) - ($("#" + layerId + "_loading").width() / 2);

	// 로딩 CSS 설정
	if($("#" + layerId).css("position") != "absolute") {
		$("#" + layerId).css({"position":"relative"});
	}
	
	$("#" + layerId + "_loading").css({
		"top": top,
		"left": left,
		"position":"absolute",
		"z-index":"99999"
	});
	
	var loadingBgHgt = "100%";
	
	if($("#" + layerId).height() != null && $("#" + layerId).height() != "undefined") {
		loadingBgHgt = $("#" + layerId).height() + "px";
	}
	
	$("#" + layerId + "_loadingBg").css({
		"top": layerTop,
		"left": 0,
		"width": "100%",
		"height": loadingBgHgt,
		"background": "black",
		"opacity": 0.2,
		"position": "absolute",
		"z-index":"99998"
	});
};

/***************************************************************************
 * Function Name : CommonJs.addLodingBar
 * Description : 로딩효과 제거
 * @author  : 김경진
 * @since   : 2017.05.15
 * @parameters : 
 * 		
 ***************************************************************************/
CommonJs.removeLoadingBar = function(layerId) {
	$("#" + layerId + "_loading").remove();		// 로딩바 숨기기				
	$("#" + layerId + "_loadingBg").remove();	// 로딩 바탕 효과 제거
};

/***************************************************************************
 * Function Name : minLenFocus
 * Description : input 최소값 넘지 않을시 focus 고정
 * @author  : 김경진
 * @since   : 2017.05.26
 * @parameters : 
 * 		
 * return : obj.value
 ***************************************************************************/
CommonJs.minLenFocus = function(obj, len) {
	
	if(obj.value != null && obj.value != "" && obj.value.length < len)
	{
		obj.focus();
		obj.title = "최소길이" + len + "자리 이상 입력해주세요.";
		//obj.style = "border: 1px solid #FB1515;";
		return false;
	}
	else
	{
		obj.title = "";
		//obj.style = "";
		return true;
	}
};