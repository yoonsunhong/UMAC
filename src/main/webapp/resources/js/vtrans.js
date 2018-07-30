
/**************************************************************************************************
request 클래스: 서버에 전문을 요청하는 역할을 한다.
**************************************************************************************************/
var VRequest = {

    HEADER: {

        CMD: "", 		// 조회 쿼리 TYPE ( SELECT , UPDATE )
        SUM: "N",		// 합계표시여부
        SQLMAPID: "" 	// SQLMAP ID

    },
    DATABLOCK: []				// DATABLOCK

};

/**************************************************************************************************
response 클래스
 * request 전송 후 응답 데이터를 가져오는 역할을 한다.
 * 이 response 클래스로 client의 컨트롤에 data를 bind 한다.
**************************************************************************************************/
var VResponse = {

    HEADER: {

        RESULT: "", // ERROR, SUCCESS
        ROWCNT: 0, // 결과 ROW 갯수
        TOTROWCNT: 0 // 전체 ROW 갯수
        

    },
    DATABLOCK: []			// DATABLOCK

};

var VTrans = function () {

    this.beforeFunc = null;		// 통신 시작 전
    this.afterFunc = null;		// 통신 완료 후
    this.successFunc = null;	// 통신 성공시 호출할 function
    this.errorFunc = null;		// 통신 에러시 호출할 function

    this.url = "/service/ServiceCommon.aspx";		// DATA 처리 WAS 주소
    this.dataType = "html";			// DATA TYPE
    this.async = true;				// 비동기 여부 (true: 비동기, false: 동기)

    this.transMsg = "";		// 전문 송신 msg

    this.header = {};		// response 전용(응답)
    this.datablock = [];	// response 전용(응답)
    this.data = null;			// response 전용(응답)

    this.init();					// 초기화 함수 호출

};
VTrans.prototype.init = function () {

    this.request = Comm.objectCopy(VRequest);		// request object 생성
    this.response = Comm.objectCopy(VResponse);	    // response object 생성

    $.ajaxSetup({
        error: function (x, e) {
            if (x.status == 0)
                Comm.alert("네트워크를 체크해 주세요");
            else if (x.status == 404)
                Comm.alert("페이지를 찾을 수 없습니다");
            else if (x.status == 500)
                Comm.alert("서버 에러가 발생하였습니다");
            else if (e == 'parsererror')
                Comm.alert("Error.Parsing JSON Request failed");
            else if (e == 'timeout')
                Comm.alert("시간을 초과하였습니다");
            else
                Comm.alert("알 수 없는 에러가 발생하였습니다\n" + x.responseText);
        },
        cache: false
    });

};
VTrans.prototype.send = function (fnSuccess, fnError) {

    if (typeof (fnSuccess) != "undefined") {
        this.successFunc = fnSuccess;
    }

    if (typeof (fnError) != "undefined") {
        this.errorFunc = fnError;
    }

//    this.transMsg = "MSG=" + JSON.stringify(this.request);
    
    this.transMsg = "MSG=" + escape(encodeURIComponent(JSON.stringify(this.request)));
    
    $.ajax({
        type: "POST",
        async: this.async,
        url: "http://" + $.url.attr("host") + (($.url.attr("port") == null) ? "" : (":" + $.url.attr("port"))) + this.url,
        dataType: this.dataType,
        data: this.transMsg,
        timeout: 60000,
        cache: false,
        success: (this.successFunc == null) ? function (response, status, request) {
                if (request.status != 200) {
                    Comm.alert("네트워크 송수신 오류-상태값이 정상(200)이 아닙니다");
                }
            } : this.successFunc,
        error: (this.errorFunc == null) ? function () {
                Comm.alert("네트워크 상태가 좋지 않습니다.\n잠시 후 다시 시도해 주세요");
            } : this.errorFunc,
        beforeSend: (this.beforeFunc == null) ? function () {} : this.beforeFunc,
        complete: (this.afterFunc == null) ? function () {} : this.afterFunc
    });

};
VTrans.prototype.success = function (asResponse) {

    this.response = JSON.parse(asResponse);
    this.header = this.response.HEADER;
    this.datablock = this.response.DATABLOCK;
    if (this.datablock.length > 0) {
    	for (var i = 0; i < this.datablock.length; i++) {
    		if(i == 0) {
    			this.data = this.datablock[0];
    		}
    		for(var key in this.datablock[i]) {
				this.datablock[i][key] = Comm.trim(this.datablock[i][key].toString());
			}
		}
    }

};
