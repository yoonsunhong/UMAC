<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=euc-kr" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
    <title>AIReport 보고서호출</title>
    <!-- 운영시에는 최적화버전(XX_min.js)을 사용하고 문서(API)는 일반버전 참조 -->
    <!-- JS에 한글이 포함되는 경우 아래처럼 charset을 정확히 지정하는 것이 필요 -->
    <script type="text/javascript" charset="utf-8" src="js/aireportLoader_min.js"></script>

    <script type="text/javascript">
        var setHeight = function() {
            var ht = window.innerHeight || document.documentElement.clientHeight;
            var aiframe = document.getElementById("aireport_frame");
            aiframe.height = ht-50-20;
        };

        var callAIReportOnLoad = false; // 페이지로딩시 자동으로 AIReport를 호출할지 여부

        if (window.addEventListener) {
            window.addEventListener("load", setHeight);
            if (callAIReportOnLoad) {
                window.addEventListener("load", embedAIReport); // embed만 가능
            }
        } else if (window.attachEvent) {
            window.attachEvent("onload", setHeight);
            if (callAIReportOnLoad) {
                window.attachEvent("onload", embedAIReport); // embed만 가능
            }
        }

        window.aiDebugging = true; // (브라우저)콘솔에 처리정보를 출력할지 여부
        
        function embedAIReport() {
            // 아래 aiParams는 모든 항목을 담을 전체 파라미터 객체
            // 순수하게 보고서에 사용되는 파라미터를 구성 (user항목)
            var aiParams = {user: composeUserParameters()};
            // 필요시 user항목에 파라미터를 추가
            aiParams.user.idNo = 3;
            aiParams.user.custName = "홍씨 길동";

            // 이하는 AIReport제어 파라미터 (report항목)
            aiParams.report = {showPdf:false,savename:'지역정보'};
            // 서버에서 일괄구성한 문자열형식의 파라미터들을 report항목에 추가
            // (reportParams의 경우 기존의 구조상 값에 ":" 나 ","를 포함할 수 없음)
            var serverComposedStrParams = "excelMerge:false,hwpsavename:'우리동네정보'";
            convertToParameters(serverComposedStrParams, aiParams.report);

            aiParams.server = {AIReportLangScCd:'en',clientURIEncoding:'EUC-KR',embedXtab:true};
            // Request는 기본이 POST이므로 GET은 agent.method로 별도 지정해야 함
            aiParams.agent = {method: 'GET'};

            loadAIReport("../sample/sample.jsp", aiParams, "aireport_frame");
            //loadAIReport("xtab_sample.jsp", aiParams, "aireport_frame", "XTAB");
        }

        function popAIReport() {
            // 파라미터(객체)의 구성방법은 embedAIReport()와 composeUserParameters()참조
            var aiParams = {user: {idNo:3, custName:'홍길동'},
                            server: {clientURIEncoding:'EUC-KR',embedXtab:true}};
            // agent.windowFeatures에 너비나 높이를 지정하면 (보통) 탭이 아닌 새창이 열림
            aiParams.agent = {windowFeatures: 'width=900,height=600,top=10,left=10'};

            loadAIReport("../sample/sample.jsp", aiParams, "_new");
            //loadAIReport("xtab_sample.jsp", aiParams, "_new", "XTAB");
        }

        function convertAIReport() {
            // 파라미터(객체)의 구성방법은 embedAIReport()와 composeUserParameters()참조
            var aiParams = {user: composeUserParameters()};
            aiParams.server = {clientURIEncoding:'EUC-KR'};

            loadAIReport("../sample/sample.jsp", aiParams, null, "PDF"); // PDF/EXCEL/HWP
        }

        function composeUserParameters() {
            // 상수나 변수값으로 파라미터객체를 생성(초기화)
            // 이때 가능하면 본래의 데이타형(string,number,boolean)을 그대로 사용
            // 특히 문자열(상수)인 경우에는 값을 반드시 quotation(따옴표로 둘러쌈)해야 함
            var userParams = {userID: "xpcsdcu",
                              userNo: 276590,
                              initLoded: callAIReportOnLoad
                             };
            // 서버에서 일괄구성한 문자열형식의 파라미터들을 userParams에 일괄 추가
            // convertToParameters()에 사용되는 문자열은 반드시 아래의 규칙을 준수해야함
            // 1.값이 문자열인 경우에는 작은따옴표로 둘러싸야하며 구분자사이에 공백은 없어야함
            // 2.문자열값에 작은따옴표가 있는 경우 "\f"로 대체기술하며 값중의 ",tab,개행 등은
            //   JavaScript의 표준 escape규칙에 따라 \", \t, \n 등으로 인코딩해야 함
            // * 아래 p3의 경우 [한글's "s value':,end] 를 인코딩한 형식이며 Java의 경우
            //   out.print("한글\\fs \\\"s value\\f:,end");  와 같이 구성하면 됨
            var serverComposedParams = "p1:false,p2:43.56,p3:'한글\fs \"s value\f:,end'";
            convertToParameters(serverComposedParams, userParams);

            // 필요시 아래와 같이 동적으로 파라미터를 구성(추가)
            userParams.authCode = document.getElementById('eg-authCode').value;
            // 필요시 아래와 같이 문서의 값으로 파라미터를 구성(추가)
            var inputs = document.forms["eg-data-form"].elements;
            userParams.age = inputs['eg-data-1'].value;
            userParams.city = inputs['eg-data-2'].value;
            userParams.addr1 = inputs['eg-data-3'].value;

            // 파라미터의 값이 인코딩된 경우에는 아래처럼 디코딩하여 본래의 값을 할당해야 함
            userParams.addr2 = decodeURIComponent(inputs['eg-data-4'].value);

            return userParams;
        }
    </script>
</head>
<body>
    <div style="width:98%; height:20px; margin:15px 30px;">
        <a href="javascript:embedAIReport()">특정 프레임에 AIReport호출</a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <a href="javascript:popAIReport()">새창(tab)에 AIReport호출</a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <a href="javascript:alert('callAIReportOnLoad=true로 설정하세요')">AIReport를 자동으로 로드</a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <a href="javascript:convertAIReport()">AIReport를 PDF/EXCEL/HWP로 직접다운로드</a>
    </div>
    <form id="eg-data-form">
        <input type="hidden" name="eg-data-1" value="34">
        <input type="hidden" name="eg-data-2" value="서울&% 특별시's">
        <input type="hidden" name="eg-data-3" value='홍길동 ;:=" 자택'>
        <input type="hidden" name="eg-data-4" value="12%EB%8F%99%20%25%ED%98%B8">
        <input type="hidden" id="eg-authCode" value="a34b78dfgj">
    </form>
    <iframe id="aireport_frame" name="aireport_frame" width="100%"></iframe>
</body>
</html>