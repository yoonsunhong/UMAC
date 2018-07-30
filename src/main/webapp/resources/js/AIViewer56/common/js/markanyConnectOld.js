/**
 * Created by sysk on 2015-04-13.
 */

var reportUrl = document.URL;

function callRequestUrl(url, params, method) {

    var fileDownloadCheckTimer;
    var $iframe,
        formDoc;

    var formInnerHtml = "";

    method = method || "POST";

    // 현재 쿠키설정 테스트
    $.cookie("cookieTest","true");
    var cookieTest= $.cookie("cookieTest");

    for(var key in params) {
        if(params.hasOwnProperty(key)) {

            formInnerHtml += '<input type="hidden" name="' + key + '" value="' + params[key] + '" />';
        }
    }

    //formInnerHtml += '<input type="hidden" name="' + 'callUrl' + '" value="' + getStripUrl(reportUrl) + '" />';

    $iframe = $("<iframe>")
        .hide()
        .prop("src", 'about:blank')
        .prop("id", 'myframe')
        .prop("name", 'myframe')
        .appendTo("body");

    formDoc = getiframeDocument($iframe);
    formDoc.write("<html><head></head><body><form name='myform' method='" + method + "' action='" + url + "'>" + formInnerHtml + "</form>" + "</body></html>");

    fileDownloadCheckTimer = window.setInterval(function () {
        if(!cookieTest){
            window.clearInterval(fileDownloadCheckTimer);
            return;
        }

        var cookieValue = $.cookie("fileDownloadToken");
        if (cookieValue == "success") {

            setTimeout(function () {
                if ($iframe) {
                    $iframe.remove();
                }
            },10);

            $.removeCookie('fileDownloadToken', { path: '/' });
            window.clearInterval(fileDownloadCheckTimer);
            return;
        }

    }, 500);

    $iframe.load(function(){

        formDoc = getiframeDocument($iframe);
        setTimeout(function () {
            alert(formDoc.body.innerHTML);
            if ($iframe) {
                $iframe.remove();
            }
        },100);

    });

    formDoc.myform.submit();

}

function getiframeDocument($iframe) {
    var iframeDoc = $iframe[0].contentWindow || $iframe[0].contentDocument;
    if (iframeDoc.document) {
        iframeDoc = iframeDoc.document;
    }
    return iframeDoc;
}

function aireportCall(markanyCall,jspUrl,parameter,method) {

    $.ajax({
        type: method,
        dataType: "json",
        url: jspUrl,
        data: parameter,
        success: function (filePaths) {
            callRequestUrl(markanyCall, filePaths[0], method);
        },
        error:function (xhr, status, error) {
            alert(status + " " + error);
        }
    });

}
