

    //전자서명 관련
    function showSignPanel() {
      var spanel = document.getElementById("signaturePanel");
      spanel.style.display = "block";
    }

    function hideSignPanel(enableOpen) {
      var spanel = document.getElementById("signaturePanel");
      spanel.style.display = "none";
    }
    //전자서명 관련



    //var startPage         = 1;
    //var endPage       = 4;
    //var currentPage   = 1;
    //var zoomRate        = 1.0;
    var zoomArray       = new Array(0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5);
    var ieFlag = true;
    var swfReady = false;
    var jsReady = false;
    var printCount = 1;
    var reportUrl = document.URL;
    var scrollFlag = true;
    var pdffilename="";

    var browserSearchString = new Array(
        "Edge",
        "MSIE 6.0","MSIE 7.0","MSIE 8.0","MSIE 9.0","MSIE 10.0","rv:11.0","MSIE",
        "IEMobile 6","IEMobile 7","IEMobile 8","IEMobile/9.0","IEMobile",
        "Chrome/13","Chrome/14","Chrome/15","Chrome/16","Chrome/17","Chrome/18","Chrome/19","Chrome/20","Chrome/21","Chrome/22","Chrome/23","Chrome/24","Chrome",
        "Firefox/3","Firefox/4","Firefox/5","Firefox/6","Firefox/7","Firefox/8","Firefox/9","Firefox/10","Firefox",
        "Firefox/3.5 Maemo",
        "Safari/52","Safari/531","Safari/530","Safari/533","Safari/534","Safari",
        "Mobile Safari/530","Mobile/5A347 Safari/5","Mobile/3A101a Safari/419","Mobile/7B367 Safari/531","Mobile/8B117 Safari/6531",
        "J2ME/MIDP","Opera/8.0","Opera/9","Opera/9.80"
    );

    var browserType= new Array(
        "Edge",
        "MSIE6","MSIE7","MSIE8","MSIE9","MSIE10","MSIE11","MSIE",
        "MSIEMobile6","MSIEMobile7","MSIEMobile8","MSIEMobile9","MSIEMobile",
        "Chrome13","Chrome14","Chrome15","Chrome16","Chrome17","Chrome18","Chrome19","Chrome20","Chrome21","Chrome22","Chrome23","Chrome24","Chrome",
        "Firefox3","Firefox4","Firefox5","Firefox6","Firefox7","Firefox8","Firefox9","Firefox10","Firefox",
        "FirefoxMobile",
        "Safari3","Safari4","Safari4","Safari5","Safari6","Safari",
        "MobileSafari2","MobileSafari3.2","MobileSafari3.1","MobileSafari3.2","MobileSafari4",
        "OperaMini","Opera8","Opera/9","Opera11"
    );

    var browser = getBrowser();

    function getBrowser(){

        var browser = navigator.userAgent;
        if(browser == null)
            return "nothing";

        var i;
        for(i=0;i<browserSearchString.length;i++){
            if(browser.indexOf( browserSearchString[i] ) != -1){
                browser=browserType[i];
                break;
            }
        }

        if(i == browserSearchString.length)
            browser="nothing";

        return browser;
    }

    if(reportUrl.indexOf("?") == -1){
        reportUrl += "?reportMode=HTML";
    }else if(reportUrl.indexOf("reportMode") == -1){
        reportUrl += "&reportMode=HTML";
    }

    if(window.console == undefined)
        console = window.console || { log: function() {} };

    function getRealOffsetTop(el) {
        return el ? el.offsetTop + getRealOffsetTop(el.offsetParent) : 0;
    }

    function getRealOffsetLeft(el) {
        return el ? el.offsetLeft + getRealOffsetLeft(el.offsetParent) : 0;
    }

    $(document).ready(function(){

        jsReady = true;

        $(document).ajaxStart(function() {
               $( "#loading" ).show();
             });

        $(document).ajaxStop(function() {
               $( "#loading" ).hide();
             });


        if (navigator.userAgent.indexOf("Opera") == -1){

            if (navigator.userAgent.indexOf("J2ME/MIDP") == -1){
                $('#report table').css({
                    'table-layout': 'fixed',
                    'word-break': 'break-all'
                });

            }
        }


    });


    /*
    function callRequestUrl(url, params, method) {

        method = method || "POST";
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", url);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
             }

        }

        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "url");
        hiddenField.setAttribute("value", getStripUrl(reportUrl));
        form.appendChild(hiddenField);

        document.body.appendChild(form);
        form.submit();
    }
    */

    function callRequestUrl(url, params, method) {

        var fileDownloadCheckTimer;
        var $iframe,
            downloadWindow,
            formDoc,
            $form;

        var formInnerHtml = "";

        method = method || "POST";

        if(AES128parameter){
            url=location.href;
            url=url.replace(/\?.+/g,'');
        }

        // 현재 쿠키설정 테스트
        $.cookie("cookieTest","true");
        var cookieTest= $.cookie("cookieTest");

        if(cookieTest)
            $( "#loading3" ).show();

        for(var key in params) {
            if(params.hasOwnProperty(key)) {

                formInnerHtml += '<input type="hidden" name="' + key + '" value="' + params[key] + '" />';
            }
        }

        formInnerHtml += '<input type="hidden" name="' + 'url' + '" value="' + getStripUrl(reportUrl) + '" />';

        $iframe = $("<iframe>")
            .hide()
            .prop("src", 'about:blank')
            .prop("id", 'myframe')
            .prop("name", 'myframe')
            .appendTo("body");

        formDoc = getiframeDocument($iframe);
        formDoc.write("<html><head></head><body><form name='myform' method='" + method + "' action='" + url + "'>" + formInnerHtml + "</form>" + "</body></html>");
        //$form = $(formDoc).find('form');

        fileDownloadCheckTimer = window.setInterval(function () {
            if(!cookieTest){
                window.clearInterval(fileDownloadCheckTimer);
                return;
            }

            var cookieValue = $.cookie("fileDownloadToken");
            if (cookieValue == "success") {
                setTimeout(function () {
                    $("#loading3").hide();
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

            window.clearInterval(fileDownloadCheckTimer);
            $("#loading3").hide();
            formDoc = getiframeDocument($iframe);
            setTimeout(function () {
                alert(formDoc.body.innerHTML);
                if ($iframe) {
                    $iframe.remove();
                }
            },100);

        });

        //window.top.myframe.document.myform.submit();
        formDoc.myform.submit();
        //$form.submit();

    }
    //gets an iframes document in a cross browser compatible manner
    function getiframeDocument($iframe) {
        var iframeDoc = $iframe[0].contentWindow || $iframe[0].contentDocument;
        if (iframeDoc.document) {
            iframeDoc = iframeDoc.document;
        }
        return iframeDoc;
    }

    function getStripUrl(url){
        if(url.indexOf("?") != -1){
            var stripUrl=url.substring(0,url.indexOf("?"));
        }
        else{
            stripUrl=url;
        }

        return stripUrl;
    }

    function ajaxPrint(jspUrl) {

        //alert(jspUrl);

        if(printCount == 1){
            $.ajax({
                type: "get",
                dataType: "text",
                url: jspUrl,
                success: function(xmlData) {

                    //alert(xmlData);
                    //console.log(swfReady);
                    if (swfReady){
                        getSWF("AIprint").flashPrint(xmlData);
                    }

                    /*
                    if($(xml).find("category").find("item").length > 0) {
                        //loop
                        $(xml).find("category").find("item").each(function() {
                            var value = $(this).find("value").text();
                            var title = $(this).find("title").text();
                            $("select#sel2").append("<option value='"+value+"'>"+title+"</option>");
                        });
                    }
                     */

                },
                error: function(xhr, status, error) {
                    alert(status + " " + error);
                }
            });

            if (navigator.userAgent.indexOf("Firefox") == -1){
                printCount++;
            }
        }
        else{
            if (swfReady){
                getSWF("AIprint").flashPrint("reprint");
            }
        }
    }


    function ajaxPdfPrintOld(jspCall,jspUrl,width,height) {
        //alert(jspCall);
        //alert(jspUrl);
        if(pdffilename==""){

            $.ajax({
                type: "get",
                dataType: "json",
                url: jspUrl,
                success: function(url) {

                    //alert(url[0].targetURL);
                    //console.log(url[0].targetURL);

                    var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
                    //window.open(jspCall + url[0].targetURL,"print",options);
                    pdffilename=url[0].targetURL;
                    window.open(jspCall + encodeURIComponent(url[0].targetURL),"print",options);

                },
                error: function(xhr, status, error) {
                    alert(status + " " + error);
                }
            });
        }
        else{
            //alert(pdffilename);
            var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
            window.open(jspCall + encodeURIComponent(pdffilename),"print",options);
        }

    }

    function ajaxPdfPrint(jspCall,jspUrl,width,height) {
        //alert(jspCall);
        //alert(jspUrl);
        if(pdffilename==""){

            $.ajax({
                type: "get",
                dataType: "json",
                url: jspUrl,
                success: function(url) {

                    //alert(url[0].targetURL);
                    //console.log(url[0].targetURL);

                    //var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
                    //window.open(jspCall + url[0].targetURL,"print",options);
                    pdffilename=url[0].targetURL;
                    //window.open(jspCall + encodeURIComponent(url[0].targetURL),"print",options);
                    printDialogPopup(jspCall, pdffilename);

                },
                error: function(xhr, status, error) {
                    alert(status + " " + error);
                }
            });
        }
        else{
            //alert(pdffilename);
            //var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
            //window.open(jspCall + encodeURIComponent(pdffilename),"print",options);
            printDialogPopup(jspCall, pdffilename);
        }

    }

    function ajaxPdfPrintNew(jspCall,jspUrl,method,parameter,width,height) {
        //alert(jspCall);
        //alert(jspUrl);

        /*
        if(browser.indexOf("Safari") == -1){

            var info = getAcrobatInfo();
            if(info.acrobat==false){
                if(langScCd.indexOf("ko")!=-1)
                    alert("Adobe Reader를 설치후 이용바랍니다.");
                else
                    alert("Please use after installing Adobe Reader.");
                return;
            }
        }
        */

        if(browser.indexOf("Safari") == -1 && browser.indexOf("Chrome") == -1){

            //var info = getAcrobatInfo();
            if(isInstalledAcrobatReader() == false){

                //if(langScCd.indexOf("ko")!=-1)
                //    alert("Adobe Reader를 최신버전으로 설치 또는 업그레이드 후 이용바랍니다.");
                //else
                //    alert("The latest version of Adobe Reader, please use the installation or upgrade.");

                if(langScCd.indexOf("ko")!=-1) {
                    if (confirm("Adobe Reader가 없거나 최신버전이 아닙니다. \r\n해당 문서를 다운로드 하시겠습니까?")) {
                        PDFConvert();
                    }
                }
                else {
                    if(confirm("The latest version of Adobe Reader, please use the installation or upgrade.\r\nDo you want to download the document?")){
                        PDFConvert();
                    }
                }
                return;
            }
        }

        if(pdffilename==""){

            $.ajax({
                type: method,
                dataType: "json",
                url: jspUrl,
                data: parameter + "&url=" + getStripUrl(reportUrl) ,
                success: function(url) {

                    //alert(url[0].targetURL);
                    //console.log(url[0].targetURL);

                    //var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
                    //window.open(jspCall + url[0].targetURL,"print",options);
                    pdffilename=url[0].targetURL;
                    //window.open(jspCall + encodeURIComponent(url[0].targetURL),"print",options);
                    printDialogPopup(jspCall, pdffilename);

                },
                error: function(xhr, status, error) {
                    alert(status + " " + error);
                }
            });
        }
        else{
            //alert(pdffilename);
            //var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
            //window.open(jspCall + encodeURIComponent(pdffilename),"print",options);
            printDialogPopup(jspCall, pdffilename);
        }

    }

    function printDialogPopup(jspCall, pdfPath){

        //pdfPath=encodeURIComponent(pdfPath);
        var embedTag="<embed src=\"" + jspCall + pdfPath + "\" " + "id=\"pdfDoc\" name=\"pdfDoc\" width=\"1px\" height=\"1px\">";
        //var embedTag="<embed src=\"" + jspCall + pdfPath + "\" " + "id=\"pdfDoc\" name=\"pdfDoc\" width=\"1px\" height=\"1px\" type=\"application/pdf\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi? P1_Prod_Version=ShockwaveFlash\" >";
        var embedIframeTag="<iframe id=\"iFramePdf\" name=\"iFramePdf\" src=\"" + jspCall + pdfPath + "\" " + "style=\"display:none\" width=\"1px\" height=\"1px\" onload=printDialog()></iframe>";

        if (navigator.userAgent.indexOf("Safari") != -1 )
        {

            if(navigator.userAgent.indexOf("Chrome") == -1){

                if($('#pdfdiv').children().size() == 0){
                    $('#pdfdiv').append(embedIframeTag);
                }
                else{
                    var getMyFrame = document.getElementById('iFramePdf');
                    getMyFrame.focus();
                    getMyFrame.contentWindow.print();
                }

            }
            else{

                if($('#pdfdiv').children().size() == 0){
                    $('#pdfdiv').append(embedTag);
                }
                else{
                    $('#pdfDoc').remove();
                    $('#pdfdiv').append(embedTag);
                }
            }
        }
        else if(navigator.userAgent.indexOf("MSIE") != -1){

            if($('#pdfdiv').children().size() == 0){
                $('#pdfdiv').append(embedIframeTag);
            }
            else{
                $('#iFramePdf').remove();
                $('#pdfdiv').append(embedIframeTag);

            }

        }
        else
        {

            if($('#pdfdiv').children().size() == 0){
                $('#pdfdiv').append(embedTag);
            }
            else{
                $('#pdfDoc').remove();
                $('#pdfdiv').append(embedTag);
            }

        }

    }

    function printDialog(){
        var getMyFrame = document.getElementById('iFramePdf');
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
    }

    function urlPrint(xmlData){
        alert(xmlData);
        if(printCount == 1){
            if (swfReady){
                getSWF("AIprint").flashPrint(xmlData);
            }
        }
        else{
            if (swfReady){
                getSWF("AIprint").flashPrint("reprint");
            }
        }
    }

    function directPrint(params){

        var url=location.href;
        url=url.replace(/\?.+/g,'');

        if((browser.indexOf("Edge") != -1) || windowPrint){

            if((browser.indexOf("MSIE8")==-1) && (browser.indexOf("MSIE7")==-1) && (browser.indexOf("MSIE6")==-1) &&
                (browser.indexOf("Safari")==-1) ) {
                var target = document.getElementById('myIframe');
                if (target == null) {
                    var $iframe, formDoc;
                    var formInnerHtml = "";

                    method = "POST";

                    // 현재 쿠키설정 테스트
                    $.cookie("cookieTest", "true");
                    var cookieTest = $.cookie("cookieTest");

                    if (cookieTest)
                        $("#loading3").show();

                    for (var key in printParameter) {
                        if (printParameter.hasOwnProperty(key)) {

                            formInnerHtml += '<input type="hidden" name="' + key + '" value="' + printParameter[key] + '" />';
                        }
                    }

                    $iframe = $("<iframe>")
                        .hide()
                        .prop("src", 'about:blank')
                        .prop("id", 'myIframe')
                        .prop("name", 'myIframe')
                        .appendTo("body");

                    formDoc = getiframeDocument($iframe);
                    formDoc.write("<html><head></head><body><form name='myform' method='" + method + "' action='" + url + "'>" + formInnerHtml + "</form>" + "</body></html>");

                    $iframe.load(function () {

                        $("#loading3").hide();

                        target = document.getElementById('myIframe');
                        if (browser.indexOf("Firefox") != -1) {
                            target.contentWindow.print();
                        }
                        else {
                            target.contentWindow.document.execCommand('print', false, null);
                        }

                    });

                    formDoc.myform.submit();
                }
                else {

                    if (browser.indexOf("Firefox") != -1) {
                        target.contentWindow.print();
                    }
                    else {
                        target.contentWindow.document.execCommand('print', false, null);
                    }
                }
                return;
            }

        }

        if(browser.indexOf("Safari") == -1 && browser.indexOf("Chrome") == -1){

            if(isInstalledAcrobatReader() == false){

                if(langScCd.indexOf("ko")!=-1) {
                    if (confirm("Adobe Reader가 없거나 최신버전이 아닙니다. \r\n해당 문서를 다운로드 하시겠습니까?")) {
                        PDFConvert();
                    }
                }
                else {
                    if(confirm("The latest version of Adobe Reader, please use the installation or upgrade.\r\nDo you want to download the document?")){
                        PDFConvert();
                    }
                }

                return;
            }
        }

        if (navigator.userAgent.indexOf("Safari") != -1 )
        {
            //사파리,크롬
            printDialogPopupIframe(url, params, "POST");
        }
        else if(navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("rv:11.0") != -1){
            printDialogPopupIframe(url, params, "POST");
        }
        else
        {
            //fireFox
            var stripParam="?";
            for(var key in params) {
                if(params.hasOwnProperty(key)) {

                    if(key.indexOf('AICipher') == -1)
                        continue;
                    stripParam += key + '=' + params[key];
                }
            }

            printDialogPopup(url, stripParam);
        }

    }

    var $iframe2;
    function printDialogPopupIframe(url, params, method) {

        var fileDownloadCheckTimer;
        var formDoc;
        var formInnerHtml = "";

        url=url+'?';

        method = method || "POST";

        if ($iframe2) {
            $iframe2.remove();
        }

        // 현재 쿠키설정 테스트
        $.cookie("cookieTest","true");
        var cookieTest= $.cookie("cookieTest");

        if(cookieTest)
            $( "#loading3" ).show();

        for(var key in params) {
            if(params.hasOwnProperty(key)) {

                formInnerHtml += '<input type="hidden" name="' + key + '" value="' + params[key] + '" />';
            }
        }

        $iframe2 = $("<iframe>")
            .hide()
            .prop("src", 'about:blank')
            .prop("id", 'myframe')
            .prop("name", 'myframeName')
            .prop("width", '1px')
            .prop("height", '1px')
            .appendTo("body");

        formDoc = getiframeDocument($iframe2);
        formDoc.write("<html><head></head><body><form name='myform' method='" + method + "' action='" + url + "'>" + formInnerHtml + "</form>" + "</body></html>");

        fileDownloadCheckTimer = window.setInterval(function () {
            if(!cookieTest){
                window.clearInterval(fileDownloadCheckTimer);
                return;
            }

            var cookieValue = $.cookie("fileDownloadToken");
            if (cookieValue == "success") {

                setTimeout(function () {
                    $("#loading3").hide();
                },10);

                $.removeCookie('fileDownloadToken', { path: '/' });
                window.clearInterval(fileDownloadCheckTimer);
                return;
            }

        }, 500);

        $iframe2.load(function(){

            window.clearInterval(fileDownloadCheckTimer);
            $("#loading3").hide();

        });

        formDoc.myform.submit();

    }

    function pdfPrint(url,params,width,height){

        /*
        if(browser.indexOf("Safari") == -1){

            var info = getAcrobatInfo();
            if(info.acrobat==false){
                if(langScCd.indexOf("ko")!=-1)
                    alert("Adobe Reader를 설치후 이용바랍니다.");
                else
                    alert("Please use after installing Adobe Reader.");
                return;
            }
        }
        */

        if(browser.indexOf("Safari") == -1 && browser.indexOf("Chrome") == -1){

            //var info = getAcrobatInfo();
            if(isInstalledAcrobatReader() == false){

                if(langScCd.indexOf("ko")!=-1) {
                    if (confirm("Adobe Reader가 없거나 최신버전이 아닙니다. \r\n해당 문서를 다운로드 하시겠습니까?")) {
                        PDFConvert();
                    }
                }
                else {
                    if(confirm("The latest version of Adobe Reader, please use the installation or upgrade.\r\nDo you want to download the document?")){
                        PDFConvert();
                    }
                }
                return;
            }
        }

        var urlparams = JSON.parse(params);
        //var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
        //window.open(url+urlparams[0].targetURL,"print",options);

        printDialogPopup(url, urlparams[0].targetURL);
    }

    function isInstalledAcrobatReader(){
        var displayString;
        var acrobat=new Object();

        acrobat.installed=false;
        if(browser.indexOf("MSIE11") != -1 || browser.indexOf("MSIE10") != -1){
            try
            {
                oAcro7=new ActiveXObject('AcroPDF.PDF.1');
                if (oAcro7)
                {
                    acrobat.installed=true;
                    acrobat.version='7.0';

                    if( oAcro7.GetVersions().indexOf("10") == -1 &&
                        oAcro7.GetVersions().indexOf("11") == -1 &&
                        oAcro7.GetVersions().indexOf("12") == -1 &&
                        oAcro7.GetVersions().indexOf("13") == -1 &&
                        oAcro7.GetVersions().indexOf("14") == -1 &&
                        oAcro7.GetVersions().indexOf("15") == -1 &&
                        oAcro7.GetVersions().indexOf("16") == -1 &&
                        oAcro7.GetVersions().indexOf("17") == -1 &&
                        oAcro7.GetVersions().indexOf("18") == -1 &&
                        oAcro7.GetVersions().indexOf("19") == -1 &&
                        oAcro7.GetVersions().indexOf("20") == -1  ){

                        acrobat.installed=false;
                    }
                    return acrobat.installed;

                }
            }
            catch(e) {
                acrobat.installed=false;
            }

            try
            {
                oAcro7=new ActiveXObject('FoxitReader.FoxitReaderCtl.1');
                if (oAcro7)
                {
                    acrobat.installed=true;
                    acrobat.version='7.0';
                    return acrobat.installed;
                }
            }
            catch(e) {
                acrobat.installed=false;
            }

            try
            {
                oAcro7=new ActiveXObject('NitroPDF.IE.ActiveDoc.8');
                if (oAcro7)
                {
                    acrobat.installed=true;
                    acrobat.version='7.0';
                    return acrobat.installed;
                }
            }
            catch(e) {
                acrobat.installed=false;
            }

            try
            {
                oAcro7=new ActiveXObject('NitroPDF.IE.ActiveDoc.5');
                if (oAcro7)
                {
                    acrobat.installed=true;
                    acrobat.version='7.0';
                    return acrobat.installed;
                }
            }
            catch(e) {
                acrobat.installed=false;
            }

            return acrobat.installed;
        }


        if (navigator.plugins && navigator.plugins.length) {

            for (x=0; x<navigator.plugins.length;x++) {

                if (
                    navigator.plugins[x].description.indexOf('Adobe Acrobat')!= -1 ||
                    navigator.plugins[x].description.indexOf('Adobe PDF')!= -1
                    )
                {
                    acrobat.version=parseFloat(navigator.plugins[x].description.split('Version ')[1]);

                    if (acrobat.version.toString().length == 1) acrobat.version+='.0';

                    acrobat.installed=true;
                    return acrobat.installed;
                }
                else if(navigator.plugins[x].description.indexOf('Foxit') != -1 ||
                    navigator.plugins[x].description.indexOf('Nitro') != -1)
                {
                    acrobat.installed=true;
                    return acrobat.installed;
                }
            }
        }
        else if (window.ActiveXObject)
        {
            for (x=2; x<10; x++)
            {
                try
                {
                    var id="PDF.PdfCtrl." + x;
                    oAcro=new ActiveXObject(id);
                    if (oAcro)
                    {
                        acrobat.installed=true;
                        return acrobat.installed;
                    }
                }
                catch(e) {
                    acrobat.installed=false;
                }
            }

            try
            {
                oAcro4=new ActiveXObject('PDF.PdfCtrl.1');
                if (oAcro4)
                {
                    acrobat.installed=true;
                    acrobat.version='4.0';
                    return acrobat.installed;
                }
            }
            catch(e) {
                acrobat.installed=false;
            }

            try
            {
                oAcro7=new ActiveXObject('AcroPDF.PDF.1');
                if (oAcro7)
                {
                    acrobat.installed=true;
                    acrobat.version='7.0';
                    return acrobat.installed;
                }
            }
            catch(e) {
                acrobat.installed=false;
            }

            try
            {
                oAcro7=new ActiveXObject('FoxitReader.FoxitReaderCtl.1');
                if (oAcro7)
                {
                    acrobat.installed=true;
                    acrobat.version='991.0';
                    return acrobat.installed;
                }
            }
            catch(e) {
                acrobat.installed=false;
            }

            try
            {
                oAcro7=new ActiveXObject('NitroPDF.IE.ActiveDoc.8');
                if (oAcro7)
                {
                    acrobat.installed=true;
                    acrobat.version='992.0';
                    return acrobat.installed;
                }
            }
            catch(e) {
                acrobat.installed=false;
            }

            try
            {
                oAcro7=new ActiveXObject('NitroPDF.IE.ActiveDoc.5');
                if (oAcro7)
                {
                    acrobat.installed=true;
                    acrobat.version='992.1';
                    return acrobat.installed;
                }
            }
            catch(e) {
                acrobat.installed=false;
            }

        }

        return acrobat.installed;
    }

    function getNavigator(){
         return navigator.userAgent;
    }


