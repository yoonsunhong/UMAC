   /***************************************************************
    * 보고서에 대한 (HTML뷰어)호출 API제공 (ActiveX뷰어는 기존 API사용) *
    * <body>를 가지는 문서에만 사용가능 (head에서 포함하여 반복사용)     *
    * <frameset>구조인 경우에는 하위의 특정frame 문서에 배치하여 사용    *
    ***************************************************************/

    // 파라미터등의 주요 Request정보를 브라우저 console에 출력할지 여부
    var aiDebugging = false;

    // 보고서호출간에 공통으로 적용할 파라미터들을 object literal형식으로 구성한다.
    // (공통 파라미터가 없는 경우에도 해당 항목을 null대신 empty로 구성)
    // 개별 보고서호출간에 동일 파라미터를 지정하면 해당 호출에는 해당 값을 사용(over-ride)
    // report항목에 속한 파라미터들은 단일파라미터인 reportParams로 통합되어 서버에 전송되므로
    // 기존에 reportParams에 기술하기로 정의된 파라미터는 반드시 report항목에 추가해야함
    // (예) report: {showMenuBar:false,printMode:'pdfSave',showHwp:false}
    //     server: {AIReportLangScCd:'en',embedXtab:true}
    var aiCommonParams = {
        // 기존에 reportParams에 기술하던 파라미터들
        report: {},
        // 기타 (서버)제어파라미터들 (AIReportLangScCd,clientURIEncoding 등)
        server: {}
    };

    /**
     * 명시된 파라미터로 보고서를 실행하고 그 결과를 지정된 프레임에 표시한다.
     * reportMode가 HTML이나 XTAB인 경우에는 전용뷰어가 보고서를 표시하며
     * 기타모드인 경우에는 보고서가 해당포맷의 화일로 변환된 후 다운로드된다.
     *
     * @param reportURL 호출할 AIReport보고서의 URL(?이전의 경로까지만 포함)
     *                  상대URL인 경우 this함수가 포함된 페이지를 기준으로 해야함
     * @param aiParams 보고서호출에 적용할 파라미터를 담은 Object.
     *        Object는 user,report,server,agent 라는 세부항목(object property)으로
     *        구성되며 각각의 항목(object)이 property형식으로 파라미터를 포함한다.
     *        (형식) {user:{...}, report:{...}, server:{...}, agent:{...}}
     *        모든항목(user,report,server,agent)은 empty형식이나 생략도 가능하며
     *        따라서 {user: {myCode:234}}나 {agent: {method:'GET'}} 등으로 구성가능
     *      - 파라미터가 전혀 없는 경우에는 null이 아니라 empty 즉 {}를 명시해야함
     *      - user항목은 AIReport제어와는 무관한, 사용자가 보고서에 정의한 파라미터를 담음
     *      - report,server항목은 aiCommonParams의 해당항목-파라미터를 over-ride하게됨
     *      - agent항목은 서버에 전달되지 않고 this제어기가 사용함
     * @param targetFrame 보고서의 실행결과로 AI뷰어를 load할 유효한 frame명.
     *     this함수가 포함된 window(frame)를 기준으로 유효한 frame명을 명시
     *     (this함수가 sub frame에 있는 경우에는 parent.frameName 형식으로 지정)
     *     이때 아래의 예약된 프레임명도 사용가능 ( _blank, _self 는 사용금지)
     *     (예약명) null:현재프레임, _new:새창(또는 Tab), _parent:바로상위, _top:최상위
     * @param reportMode 실행모드(HTML:기본값 or XTAB or PDF or EXCEL or HWP)
     */
    function loadAIReport(reportURL, aiParams, targetFrame, reportMode) {
        if (!reportMode) reportMode = "HTML";
        if (!targetFrame) targetFrame = "_self"; // 반복사용됨을 가정하여 항상 명시

        var paramElements = configParamElements(aiParams, reportMode);

        var form = document.getElementById("aireport-dummy-form");
        if (form == null) { // first submit
            form = document.createElement("form");
            form.setAttribute("id", "aireport-dummy-form");
            document.body.appendChild(form); // body가 frameset이면 fail
        } else { // clear후 재사용 (삭제는 구조상 곤란)
            form.innerHTML = "";
        }

        var method = "POST";
        var winFeatures = null;
        if (aiParams.agent) {
            if ("GET" === aiParams.agent.method) method = "GET";
            winFeatures = aiParams.agent.windowFeatures;
        }

        form.setAttribute("action", reportURL);
        form.setAttribute("method", method);

        var newWindow = (targetFrame === "_new");
        if (newWindow) {
            form.setAttribute("target", "aireport_win");
        } else {
            form.setAttribute("target", targetFrame);
        }

        var win;
        form.innerHTML = paramElements;
        if (newWindow) { // 기존의 새창을 사용자가 close하지 않았다면 재사용됨
            if (winFeatures) { // (win.name을 위의 target과 이름 일치)
                win = window.open("", "aireport_win", winFeatures); // 보통 새창
            } else { // IE(null/undefined-새창,empty-탭)때문에 분리처리
                win = window.open("", "aireport_win"); // 보통 탭
            }
        }

        if (aiDebugging && window.console) {
            window.console.log("\n\n" + method + " " + reportURL);
            if (newWindow) window.console.log("windowFeatures: " + winFeatures);
            window.console.log(form.innerHTML);
        }

        form.submit();
        if (win && window.focus) win.focus();
    }

    // 정의된 모든 파라미터에 대해(user, report, server) form에 사용할
    // input element 문자열을 구성하고 이를 연결한 문자열을 return한다.
    function configParamElements(aiParams, reportMode) {
        var paramElements = "<input type='hidden' name='reportMode' value='" + reportMode + "'>\n";

        var nm; // prop. name
        if (aiParams.user) {
            var user = aiParams.user;
            for (nm in user) {
                paramElements += "<input type='hidden' name='" + nm + "' value='" + escapeValue(user[nm]) + "'>\n";
            }
        }

        var nmArr = []; // name array
        var reportParams;
        if (aiParams.report) {
            var report = aiParams.report;
            for (nm in report) {
                if (reportParams) {
                    reportParams += "," + nm + ":" + report[nm];
                } else {
                    reportParams = nm + ":" + report[nm];
                }
                nmArr.push(nm);
            }
        }
        var comm = aiCommonParams.report;
        for (nm in comm) {
            if (reportParams && inArray(nm, nmArr) != -1) continue; // over-rided
            if (reportParams) {
                reportParams += "," + nm + ":" + comm[nm];
            } else {
                reportParams = nm + ":" + comm[nm];
            }
        }
        if (reportParams) {
            reportParams = escapeValue(reportParams); // 전체를 한번만 처리해도 무방
            paramElements += "<input type='hidden' name='reportParams' value='" + reportParams + "'>\n";
        }

        nmArr.length = 0; // clear (전역개념으로 계속사용하여 전체중복을 필터링할 수도 있음)
        if (aiParams.server) {
            var server = aiParams.server;
            for (nm in server) {
                paramElements += "<input type='hidden' name='" + nm + "' value='" + escapeValue(server[nm]) + "'>\n";
                nmArr.push(nm);
            }
        }
        comm = aiCommonParams.server;
        for (nm in comm) {
            if (inArray(nm, nmArr) != -1) continue; // over-rided
            paramElements += "<input type='hidden' name='" + nm + "' value='" + escapeValue(comm[nm]) + "'>\n";
        }

        return paramElements;
    }

    var replExp = /'/g; // input value='v'에 적용하기 위해 '를 replace
    function escapeValue(value) {
        if (typeof value != "string") return value;

        if (value.indexOf("'") == -1) {
            return value;
        } else {
            return (value.replace(replExp, "&#039;"));
        }
    }

    // ES5의 Array.indexOf를 대신하여 JQuery(1.10.2)의 method를 copy(수정)하여 사용
    function inArray(elem, arr, i) {
        var len;
        if ( arr ) {
	        len = arr.length;
            i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
            for ( ; i < len; i++ ) {
                // Skip accessing in sparse arrays
                if ( i in arr && arr[ i ] === elem ) {
                    return i;
                }
            }
		}
        return -1;
    }

    var replExp2 = /\f/g;
    /**
     * 문자열형식으로 구성된 파라미터들을 파싱하여 객체의 property로 추가한다.
     * 순수보고서파라미터(user항목)나 AIReport제어파라미터(report항목)가 많은 경우
     * 서버에서 "p1:false,p2:339,p3:'문자열값'" 형식으로 문자열을 구성한후 호출한다.
     *
     * @param params 추가할 파라미터를 열거한 문자열
     *      (형식은 aireport_load.jsp의 composeUserParameters() 설명참조)
     * @param obj 파라미터를 추가할 객체(생략시 새 객체에 추가후 그객체를 return)
     */
    function convertToParameters(params, obj) {
        if (!obj) obj = {};

        var k, v;
        var st = 0;
        var idx = params.indexOf(':');
        while (idx != -1) {
            k = params.substring(st, idx);
            if (params.charAt(idx+1) === "'") { // k:'v' or k:'..\f..'
                st = params.indexOf("'", idx+2);
                v = params.substring(idx+2, st);
                if (v.indexOf('\f') != -1) { // "\f"로 대체된 "'"가 있음
                    v = v.replace(replExp2, "'");
                }
                st++;
            } else { // k:v
                st = params.indexOf(',', idx+1); // (+1 -> empty도 허용)
                if (st == -1) { // last
                    st = params.length;
                }
                v = params.substring(idx+1, st);
            }
            obj[k] = v;

            if (params.charAt(st) === ",") { // 마지막 즉 len인 경우에는 empty
                idx = params.indexOf(':', ++st);
            } else {
                break;
            }
        }

        return obj;
    }