
/*
    Sub Tabs
*/

// Tab 새로고침
function Tabs_Refresh() {
 
    var active = $('#hdnActiveId').val(); 
  	var frame = $('li[id="' + active+'"]').attr("name");
    $('#' + frame).attr("src", $('#' + frame).attr("src"));
 
} 

// Tab 삭제
function Tabs_Del(menuCode) {
    var frame = "";
    var frameCnt = 0;
    var strTabs = "";
    var strCookie = "";
    var active = $('#hdnActiveId').val();
 
//    if (delUrl.indexOf("?") != -1)
//        delUrl = delUrl.substring(0, delUrl.indexOf("?"));
        
    $('#tabs li').each(function() {
        //탭삭제  if 문 변경
        if ($(this).attr("id") == menuCode)        //   if ($(this).attr("id") == active)    추가
        {
            frame = $(this).attr("name");
             
            $('#' + frame).attr("src", "").removeClass('DivShow').addClass('DivHide');
            $(this).remove();
            
        } else {
             
            if (strCookie == "") { 
  
                // 맨 처음 tab 활성화
                frame = $(this).attr("name");
                strCookie = $(this).attr("id") + '|' + $(this).text() + '|' + $('#' + frame).attr("src");
                $(this).addClass('on');
                $('#hdnActiveId').val($(this).attr("id"));
                $('#' + frame).removeClass('DivHide').addClass('DivShow');
            } else {
              
                frame = $(this).attr("name");
                strCookie += '#' + $(this).attr("id") + '|' + $(this).text() + '|' + $('#' + frame).attr("src");
            }
        }

        frameCnt++;
    });

    $('#hdnFrameCount').val(frameCnt);
    $.cookie('TabsMenu', strCookie);
}

var beforeMenu = "";
// 왼쪽 메뉴 클릭시 Sub Tab 생성
function Tabs_On(menuCode, menuName, menuUrl, reflash) {
    var tabs = "";
    var vals = "";
    var strTabs = "";
    var chkTabs = false;
    var cookie = $.cookie("TabsMenu");
    var active = $('#hdnActiveId').val();
    var frameCnt = $('#hdnFrameCount').val();
    
    if(beforeMenu != ""){
    	$("#" + beforeMenu).attr("class", "");
    }
    
    var arrMenuCode = menuCode.split(".");
    $("#" + arrMenuCode[0]).attr("class", "on");
    beforeMenu = arrMenuCode[0];
    	

        // 중복 여부 체크
        $('#tabs li').each(function() {
        	
            if ($(this).attr("id") == menuCode) {
                chkTabs = true;
                return false;
            }
        });
        
        
        if (chkTabs) {
        
            // 중복되었을 경우
            $('#hdnActiveId').val(menuCode);
            $('#tabs li').removeClass('on');
            
             
            $('li[id="' + menuCode + '"]').addClass('on');
            var frame = $('li[id="' + menuCode+'"]').attr("name");
 

            $('.frame_box iframe').removeClass('DivShow').addClass('DivHide');
            $('#' + frame).removeClass('DivHide').addClass('DivShow');
          
          	// 이것을 풀면 메뉴 중복 클릭시 리프레쉬 된다.( 다 지워진다는 이야기임...
            //if(reflash)
            //    $('#' + frame).attr("src", menuUrl);
            
            
            
            // 인자수 5개이고 5번째 인수가 배열일 경우 실행 (페이지 이동시 함수 실행이나 hidden 필드등에 값을 할당할때 사용)
            if(arguments.length >= 5 && Array.isArray(arguments[4])) {
            	
            	for(var i = 0; i < arguments[4].length; i++) {
            		
            		switch (arguments[4][i].type) {
						case 'function':
							if(typeof $('#' + frame)[0].contentWindow[arguments[4][i].name] === 'function')
								$('#' + frame)[0].contentWindow[arguments[4][i].name].call(arguments[4][i].parameter);
							break;
						case 'value':
							$('#' + frame).contents().find('#' + arguments[4][i].id).val(arguments[4][i].value);
							break;
					}
            	}
            }

                
        } else {
        	if (frameCnt >= 8) {    // 최대 갯수 지정 //개발후 고정필요
                alert('  메뉴가 7개 이상입니다.\n  메뉴는 최대7개까지 열수 있습니다.    ');
            } else {
            	if(menuCode != 'main_contents'){
            		frameCnt++;
            	}
	            cookie += "#" + menuCode + "|" + menuName + "|" + menuUrl;
	            $('#tabs li').removeClass('on');
	            
	            //탭 삭제 추가 시작  
	            var delUrl;    
	            delUrl = menuUrl.substring(0,menuUrl.indexOf("."))  ;    // 주소의 뒤로 get 인자와 변수가 들어왔을때 .부터 뒤를 날려버린다.
	            delUrl = delUrl.replace('.jsp', '') ;             // .aspx 가 있을때 날려버린다.
	            
	 
	             
	            //탭 삭제 추가 끝
	            
	            var j = 0;
	            for (var i = 0; i <= 100; i++) {//보이는 사이즈 픽스 100 => 6
	                if ($('#frame' + i).attr("src") == '') {
	                    if (j == 0) {
	                        $('#hdnActiveId').val(menuCode);
	                        
	                        //삭제아이콘
	                        delString = "<span class='ui-icon ui-icon-close' role='presentation' id=tab_delete onclick=Tabs_Del('"+menuCode+"')>탭닫기</span>";
	                        //delString = "<div style='overflow: auto;' ><div id=tab_delete_icon  style=' MARGIN-TOP:0px;  position:relative;  text-align: right' class=DivShow  align=center><img src=./Asset/Images/tab_delete_icon.gif  id=tab_delete onclick=Tabs_Del('"+menuCode+"')    alt=탭삭제></div></div>";
	                        tabs = '<li id="' + menuCode + '" class="on" name="frame' + i + '" title="' + menuCode + '"><a href="#">' + menuName + '</a>'+delString+'</li>';
	                        $('#frame' + i).attr("src", menuUrl);
	                        $('.frame_box iframe').removeClass('DivShow').addClass('DivHide');
	                        $('#frame' + i).removeClass('DivHide').addClass('DivShow');
	                        j++;
	                     }                    
	                }
	            }
	
	            $.cookie("TabsMenu", cookie);
	            $('#tabs ul').prepend(tabs);
	            $('#hdnFrameCount').val(frameCnt);
	 
	            $('#tabs li').unbind('click');
	
	            // 이벤트 설정
	            $('#tabs li').click(function() {
	
	                $('#tabs li').removeClass('on');
	                $(this).addClass('on');
	                $('#hdnActiveId').val($(this).attr("id"));
	
	                $('.frame_box iframe').removeClass('DivShow').addClass('DivHide');
	                //$('#' + $(this).attr("title")).removeClass('DivHide').addClass('DivShow');
	                $('#' + $(this).attr("name")).removeClass('DivHide').addClass('DivShow');
	                
	            });   
	        }
        }
        
}


// 초기 페이지 로딩시 Default Tab 생성 (새로고침 포함)
function Tabs_Onload(classNm,url) {

     
    var frameCnt = $('#hdnFrameCount').val();
    if(frameCnt == 0)
    {
    		Tabs_On(classNm,'홈',url,'true');
                 
    }
}