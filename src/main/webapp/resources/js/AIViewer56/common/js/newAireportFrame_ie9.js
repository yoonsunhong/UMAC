
    if(!contextMenu) {
        document.oncontextmenu = function () {
            return false;
        }

        document.ondragstart = function () {
            return false;
        }

        document.onselectstart = function () {
            return false;
        }

        document.onkeydown = function () {
            if (event.keyCode == 123) {
                return false;
            }
        }
    }

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

    var zoomArray       = new Array(0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5);
    var ieFlag = true;
    var swfReady = false;
    var jsReady = false;
    var printCount = 1;
    var reportUrl = document.URL;
    var scrollFlag = true;
    var pdffilename="";
    var menuHeight=57;                  //px단위
    var reportTopMargin=26;
    

    var browserSearchString = new Array(
        "Edge",
        "MSIE 6.0","MSIE 7.0","MSIE 8.0","MSIE 9.0","MSIE 10.0","rv:11.0","MSIE",
        "IEMobile 6","IEMobile 7","IEMobile 8","IEMobile/9.0","IEMobile",
        "Chrome/13","Chrome/14","Chrome/15","Chrome/16","Chrome/17","Chrome/18","Chrome/19","Chrome/20","Chrome/21","Chrome/22","Chrome/23","Chrome/24","Chrome",
        "Firefox/3","Firefox/4","Firefox/5","Firefox/6","Firefox/7","Firefox/8","Firefox/9","Firefox/10","Firefox",
        "Firefox/3.5 Maemo",
        "Safari/52","Safari/531","Safari/530","Safari/533","Safari/534","Safari",
        "Mobile Safari/530","Mobile/5A347 Safari/5","Mobile/3A101a Safari/419","Mobile/7B367 Safari/531","Mobile/8B117 Safari/6531",
        "J2ME/MIDP","Opera/8.0","Opera/9","Opera/9.80", "Opera"
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
        "OperaMini","Opera8","Opera/9","Opera11", "Opera"
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

		$('#root').css({
			//'width': function(){return '800px';}
			'width': function(){return '100%';}

		});
		
		//화면이 보고서 폭보다 넓을 경우 와
	    //report_widthUnit 이 '%' 일 경우만
		//% 일 경우 100% 만 정상 동작
	    if( parseInt(($(window).width() - pageWidth)/2) > 0 && report_widthUnit != '%'){
	    	report_leftMargin = parseInt(($(window).width() - pageWidth)/2 - 10);
	    }
		
		$('#report').css({
			//'text-align': 'center',
			
			'margin-left' : function() {return report_leftMargin;},
			
			'width': function(){return report_width + report_widthUnit;},
			//'height': function(){return '1100px';}
			//'height': function(){return ($(window).height()-bottomMargine) + 'px';}
            'height': function(){return ($(window).height()-bottomMargine-2) + 'px';}
		});
		
		
		if (navigator.userAgent.indexOf("Opera") == -1){
			
			if (navigator.userAgent.indexOf("J2ME/MIDP") == -1){
				$('#report table').css({
					'table-layout': 'fixed',
					'word-break': 'break-all'
				});
				
			}	
		}

        try {

            var tempPage = $('#p' + currentPage).innerWidth();
            $('#p' + currentPage).css({
                'text-align': 'left',
                'margin-left': function () {
                    //report_width가 %로 동적으로 변할 경우
                    if (report_widthUnit == '%') {
                        var leftMargin = ($(window).width() - tempPage) / 2 - 1 + 'px';
                        if (parseInt(leftMargin) < 0) {
                            return 0;
                        } else {
                            return leftMargin;
                        }
                    }
                }
            });
        }
        catch(e){

        }

        if(!lemonade) {
            if (browser.indexOf("MSIE") != -1) {
                //$('#report td').css({'letter-spacing': '-1px' });
                $('#report td').css({'letter-spacing': '-0.05mm' });
            }
            else if (browser.indexOf("Chrome") != -1) {
                $('#report td').css({'letter-spacing': '-1px' });
            }
            else if (browser.indexOf("Firefox") != -1) {
                $('#report td').css({'letter-spacing': '-1px' });
            }
            else if (browser.indexOf("Opera") != -1) {
                $('#report td').css({'letter-spacing': '-1px' });
            }
            else if (browser.indexOf("Safari") != -1) {
                $('#report td').css({'letter-spacing': '-1px' });
            }
        }
        else{
            if (browser.indexOf("Chrome") != -1) {
                $('#report td').css({'-webkit-text-size-adjust': 'none' });
            }
            else if (browser.indexOf("Firefox") != -1) {
                //$('#report td').css({'letter-spacing': '-0.1mm' });
            }
            else if (browser.indexOf("Opera") != -1) {
                //$('#report td').css({'letter-spacing': '-1px' });
                //$('#report td').css({'letter-spacing': '-0.2mm' });
                $('#report td').css({'-webkit-text-size-adjust': 'none' });
            }
            else if (browser.indexOf("Safari5") != -1) {
                //$('#report td').css({'letter-spacing': '-0.1pt' });
            }
            else {
                //$('#report td').css({'letter-spacing': 'normal' });
            }

        }

		pageTop = new Array();
		oldPageTop = new Array();

        try {
            pageTop[currentPage] = parseInt($('#p' + currentPage).offset().top) - menuHeight - reportTopMargin;
            //console.log(i + " " + pageTop[i]);
        }
        catch(e){

        }
		
		$(window).resize(function(){
			
			//화면이 보고서 폭보다 넓을 경우 와
		    //report_widthUnit 이 '%' 일 경우만
			//% 일 경우 100% 만 정상 동작
		    if( parseInt(($(window).width() - pageWidth)/2) > 0 && report_widthUnit != '%'){
		    	report_leftMargin = parseInt(($(window).width() - pageWidth)/2 - 10 );
		    }
		    
			$('#report').css({
				//'text-align': 'center',
				'margin-left' : function() {return report_leftMargin;},
				
				'width': function(){return report_width + report_widthUnit;},
				//'height': function(){return '1100px';}
				'height': function(){return ($(window).height()-bottomMargine) + 'px';}
			});

            var tempPage=$('#p' + currentPage).innerWidth();
            $('#p' + currentPage).css({
                'text-align': 'left',
                'margin-left' : function() {
                    //report_width가 %로 동적으로 변할 경우
                    if(report_widthUnit =='%'){
                        //var leftMargin = ($(window).width() - tempPage)/2 - 10 + 'px';
                        var leftMargin = ($(window).width() - tempPage)/2 - 1 + 'px';
                        if(parseInt(leftMargin) < 0){
                            return 0;
                        }else{
                            return leftMargin;
                        }
                    }
                }
            });

		});

        $('#page *',parent.document).remove();
        for(var i=1;i<=endPage;i++){
            var optionStr = "<option>" + i + "/" + endPage + "page</option>";

            $('#page',parent.document).append(optionStr);
        }

		$("#size option").eq(5).prop("selected", "selected");
		
		zoom(zoomRate);

		$("#report").scroll(function(){

			if(scrollFlag == false){
				return;
			}

			var position = $('#report').scrollTop();
			var scrollHeight = $('#report')[0].scrollHeight;
            var bottomPosition = position + $(window).height() + 5;
            var offset= $('#report').innerHeight();
            var offset2= $('#subreport').innerHeight();

			if(position ==0 && currentPage > startPage){
                goPrev();
				return true;
			}

            if(bottomPosition > scrollHeight && currentPage < endPage){
                goNext();
				return true;
			}
				
			return true;
		});
			
	});
	
    function goToMove(){
        //var pageNum = $("#page option").index($("#page option:selected"))+ 1;
        var pageNum = $('#page option',parent.document).index($('#page option:selected',parent.document))+ 1;
        goScroll(pageNum);
    }

    function goPrev(){
		
		goScroll(currentPage - 1);
		
	}
	
	function goNext(){
		goScroll(currentPage + 1);
	}

    function getMaxPage(){
        return endPage;
    }

    function goScrollTop(){
        goScroll(startPage);
        return startPage;
    }

    function goScrollBottom(){
        goScroll(endPage);
        return endPage;
    }

    function goScrollNext(){
        goScroll(currentPage+1);
        return currentPage;
    }

    function goScrollPrev(){
        goScroll(currentPage-1);
        return currentPage;
    }

    function goScrollPage(index){
        goScroll(index);
    }

    function goScrollAjax(jspUrl, parameter, method, pageNum){

        scrollFlag = false;

        if(pageNum < startPage){
            currentPage = startPage;
            pageNum = startPage;
        }
        else if(pageNum > endPage){
            currentPage = endPage;
            pageNum = endPage;
        }
        else{
            currentPage = pageNum;
        }

        parameter['page']=pageNum;
        $.ajax({
            type: method,
            dataType: "html",
            url: jspUrl,
            data: parameter ,
            success: function (html) {
                $("#subreport > *").remove();
                $("#subreport").append(html);
                var tempPage = $('#p' + pageNum).innerWidth();
                $('#p' + pageNum).css({
                    'text-align': 'left',
                    'margin-left' : function() {
                        //report_width가 %로 동적으로 변할 경우
                        if(report_widthUnit =='%'){
                            //var leftMargin = ($(window).width() - tempPage)/2 - 10 + 'px';
                            var leftMargin = ($(window).width() - tempPage)/2 - 1 + 'px';
                            if(parseInt(leftMargin) < 0){
                                return 0;
                            }else{
                                return leftMargin;
                            }
                        }
                    }
                });

                try {

                    if (zoomRate < 1.0) {
                        pageTop[pageNum] = parseInt($('#p' + pageNum).offset().top + $('#report').scrollTop()) - menuHeight - parseInt((reportTopMargin * zoomRate));
                    }
                    else {
                        pageTop[pageNum] = parseInt($('#p' + pageNum).offset().top + $('#report').scrollTop()) - menuHeight - reportTopMargin;
                    }
                }
                catch(e){
                    //console.log(e);
                }

                if (browser.indexOf("MSIE9") != -1) {
                    $('#report').animate({	scrollTop: 10 }, 0);
                    //console.log("id=" + id + " pageTop=" + (pageTop[id] ));
                }
                else if (browser.indexOf("Chrome") != -1) {
                    $('#report').animate({	scrollTop: 10 }, 0);
                    //console.log("id=" + id + " pageTop=" + (pageTop[id] ));
                }
                else if (browser.indexOf("Firefox") != -1) {
                    $('#report').animate({	scrollTop: 10 }, 0);
                    //console.log("id=" + id + " pageTop=" + (pageTop[id] ));
                }
                else if (browser.indexOf("Opera") != -1) {
                    $('#report').animate({	scrollTop: 10 }, 0);
                }
                else if (browser.indexOf("Safari") != -1) {
                    $('#report').animate({	scrollTop: 10 + 1}, 0);
                }
                else {
                    //$('#report').animate({	scrollTop: pageTop[pageNum] }, 0);
                    $('#report').animate({	scrollTop: 10 }, 0);
                }

                $('#page option',parent.document).eq(pageNum-1).prop("selected", "selected");

                scrollFlag = true;

            },
            error:function (xhr, status, error) {
                currentPage--;
                alert(status + " " + error);
            }
        });

    }

	function zoom(size){
			//console.log("-1size=" + size);

            //안드로이드 킷켓(4.4.2)이면 확대축소 무시
            if(navigator.userAgent.indexOf("Android 4.4.2") != -1)
                return;

            if(simpleMode){
                if (browser.indexOf("MSIE9") != -1) {
                    $('#subreport').css('-ms-transform-origin', '0 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');

                }
                else if (browser.indexOf("MSIE10") != -1) {
                    $('#subreport').css('-ms-transform-origin', '0 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');
                }
                else if (browser.indexOf("MSIE11") != -1) {
                    $('#subreport').css('-ms-transform-origin', '0 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');
                }
                else if (browser.indexOf("MSIE7") != -1) {
                    $('#subreport').css('-ms-transform-origin', '0 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');
                }
                else if (browser.indexOf("MSIE6") != -1) {
                    $('#subreport').css('-ms-transform-origin', '0 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');
                }
                else {

                    $('#subreport').css('-webkit-transform', 'scale(' + (size) + ')');
                    $('#subreport').css('-webkit-transform-origin', '0 0');
                    $('#subreport').css('-moz-transform', 'scale(' + (size) + ')');
                    $('#subreport').css('-moz-transform-origin', '0 0');
                    $('#subreport').css('-o-transform', 'scale(' + (size) + ')');
                    $('#subreport').css('-o-transform-origin', '0 0');
                }

            }
            else {
                if (browser.indexOf("MSIE9") != -1) {
                    $('#subreport').css('-ms-transform-origin', '50% 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');

                }
                else if (browser.indexOf("MSIE10") != -1) {
                    $('#subreport').css('-ms-transform-origin', '50% 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');
                }
                else if (browser.indexOf("MSIE11") != -1) {
                    $('#subreport').css('-ms-transform-origin', '50% 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');
                }
                else if (browser.indexOf("MSIE7") != -1) {
                    $('#subreport').css('-ms-transform-origin', '50% 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');
                }
                else if (browser.indexOf("MSIE6") != -1) {
                    $('#subreport').css('-ms-transform-origin', '50% 0');
                    $('#subreport').css('-ms-transform', 'scale(' + (size) + ')');
                }
                else {

                    $('#subreport').css('-webkit-transform', 'scale(' + (size) + ')');
                    $('#subreport').css('-webkit-transform-origin', '50% 0');
                    $('#subreport').css('-moz-transform', 'scale(' + (size) + ')');
                    $('#subreport').css('-moz-transform-origin', '50% 0');
                    $('#subreport').css('-o-transform', 'scale(' + (size) + ')');
                    $('#subreport').css('-o-transform-origin', '50% 0');
                }

                if(size==1.1){
                    $('#bmargin').remove();
                    $('#report').append('<div id="bmargin" style="position:relative;height:240px"></div>');
                }
                else if(size==1.2){
                    $('#bmargin').remove();
                    $('#report').append('<div id="bmargin" style="position:relative;height:380px"></div>');
                }
                else if(size==1.3){
                    $('#bmargin').remove();
                    $('#report').append('<div id="bmargin" style="position:relative;height:520px"></div>');
                }
                else if(size==1.4){
                    $('#bmargin').remove();
                    $('#report').append('<div id="bmargin" style="position:relative;height:660px"></div>');
                }
                else if(size==1.5){
                    $('#bmargin').remove();
                    $('#report').append('<div id="bmargin" style="position:relative;height:760px"></div>');
                }
                else if(size==1.0){
                    $('#bmargin').remove();
                    if(landScape)
                        $('#report').append('<div id="bmargin" style="position:relative;height:240px"></div>');
                    else
                        $('#report').append('<div id="bmargin" style="position:relative;height:100px"></div>');
                }
                else{
                    $('#bmargin').remove();
                    $('#report').append('<div id="bmargin" style="position:relative;height:1px"></div>');
                }

            }

			for(var i=0;i<11;i++){
				if (size == zoomArray[i]) {
					$("#size option").eq(i).prop("selected", "selected");
				}
					
			}

            try {

                if (size < 1.0) {
                    pageTop[i] = parseInt($('#p' + currentPage).offset().top + $('#report').scrollTop()) - menuHeight - parseInt((reportTopMargin * size));
                }
                else {
                    pageTop[i] = parseInt($('#p' + currentPage).offset().top + $('#report').scrollTop()) - menuHeight - reportTopMargin;
                }
                //console.log(i + " " + pageTop[i]);
            }
            catch(e){

            }
	}

	function ZoomIn(){
		var index = $("#size option").index($("#size option:selected"));
		zoom(zoomArray[index+1]);
		zoomRate = zoomArray[index+1];
	}
			
	function ZoomOut(){
		var index = $("#size option").index($("#size option:selected"));
		if(index == 0)
			index = 1;
		zoom(zoomArray[index-1]);
		zoomRate = zoomArray[index-1];
		
	}		
	
	function ZoomInOut(){
		var index = $("#size option").index($("#size option:selected"));
		zoom(zoomArray[index]);
		zoomRate = zoomArray[index];
	}

	function divPrint() {
		beforePrint();
		window.print();		
		afterPrint();
		
	}
	
	function beforePrint(){
		
	}
	
	function afterPrint(){
			
	}

    function callRequestUrl(url, params, method) {

        var fileDownloadCheckTimer;
        var $iframe,
            downloadWindow,
            formDoc,
            $form;

        var formInnerHtml = "";

        method = method || "POST";

        // 현재 쿠키설정 테스트
        $.cookie("cookieTest","true");
        var cookieTest= $.cookie("cookieTest");

        if(cookieTest) {
            $("#loading3").show();
            $.removeCookie('fileDownloadToken', { path: '/' });
        }

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

        fileDownloadCheckTimer = setInterval(function () {
            if(!cookieTest){
                clearInterval(fileDownloadCheckTimer);
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
                clearInterval(fileDownloadCheckTimer);
                return;
            }

        }, 500);

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

    function printDialogPopupIE(jspCall, pdfPath){

        pdfPath=encodeURIComponent(pdfPath);
        var embedTag="<object data=\"" + jspCall + pdfPath + "\" " + "id=\"pdfDoc\" name=\"pdfDoc\" type=\"application/pdf\" width=\"1px\" height=\"1px\">";
        //var embedIframeTag="<iframe id=\"iFramePdf\" name=\"iFramePdf\" src=\"" + jspCall + pdfPath + "\" " + "style=\"display:none\" width=\"1px\" height=\"1px\"></iframe>";
        if($('#pdfdiv').children().size() == 0){
            $('#pdfdiv').append(embedTag);
        }
        else{
            $('#pdfDoc').remove();
            $('#pdfdiv').append(embedTag);
        }

        setTimeout("printDialogIE();", 1000);

    }

    function printDialogIE(){
        document.getElementById('pdfDoc').printAll();
        if(langScCd.indexOf("ko")!=-1)
            alert("인쇄완료...");
        else
            alert("Complete Print...");
    }

    function printDialogPopup(jspCall, pdfPath){

        // 현재 쿠키설정 테스트
        var fileDownloadCheckTimer;
        $.cookie("cookieTest","true");
        var cookieTest= $.cookie("cookieTest");

        if(cookieTest) {
            $("#loading3").show();
            $.removeCookie('fileDownloadToken', { path: '/' });
        }

        fileDownloadCheckTimer = setInterval(function () {
            if(!cookieTest){
                clearInterval(fileDownloadCheckTimer);
                return;
            }

            var cookieValue = $.cookie("fileDownloadToken");
            if (cookieValue == "success") {

                setTimeout(function () {
                    $("#loading3").hide();
                },10);

                $.removeCookie('fileDownloadToken', { path: '/' });
                clearInterval(fileDownloadCheckTimer);
                return;
            }

        }, 500);

		//pdfPath=encodeURIComponent(pdfPath);
		//var embedTag="<embed src=\"" + jspCall + pdfPath + "\" " + "id=\"pdfDoc\" name=\"pdfDoc\" width=\"1px\" height=\"1px\" onload=printAll();>";
        var embedTag="<embed src=\"" + jspCall + pdfPath + "\" " + "id=\"pdfDoc\" name=\"pdfDoc\" width=\"1px\" height=\"1px\">";
		//var embedTag="<embed src=\"" + jspCall + pdfPath + "\" " + "id=\"pdfDoc\" name=\"pdfDoc\" width=\"1px\" height=\"1px\" type=\"application/pdf\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi? P1_Prod_Version=ShockwaveFlash\" >";
		var embedIframeTag="<iframe id=\"iFramePdf\" name=\"iFramePdf\" src=\"" + jspCall + pdfPath + "\" " + "style=\"display:none\" width=\"1px\" height=\"1px\" onload=printDialog()></iframe>";
        var embedIframeTag2="<iframe id=\"iFramePdf\" name=\"iFramePdf\" src=\"" + jspCall + pdfPath + "\" " + "width=\"1px\" height=\"1px\" onload=printDialog()></iframe>";

		if (navigator.userAgent.indexOf("Safari") != -1 )
		{

			if(navigator.userAgent.indexOf("Chrome") == -1){
				
				if($('#pdfdiv').children().size() == 0){	
					$('#pdfdiv').append(embedIframeTag);
				}
				else{
                    //var getMyFrame = document.getElementById('iFramePdf');
                    //getMyFrame.focus();
                    //getMyFrame.contentWindow.print();
                    $('#iFramePdf').remove();
                    $('#pdfdiv').append(embedIframeTag);
				}
				
			}
            else if(navigator.userAgent.indexOf("Edge") != -1){
                //Edge
                if($('#pdfdiv').children().size() == 0){
                    $('#pdfdiv').append(embedIframeTag2);
                }
                else{
                    var getMyFrame = document.getElementById('iFramePdf');
                    getMyFrame.focus();
                    getMyFrame.contentWindow.print();
                }
            }
			else{
                //Chrome, Opera
				if($('#pdfdiv').children().size() == 0){	
					$('#pdfdiv').append(embedTag);
				}
				else{
					$('#pdfDoc').remove();
					$('#pdfdiv').append(embedTag);
				}
			}
		}
		else if(navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("rv:11.0") != -1){
            //IE9-11
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
            //FireFox
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

	function directPrint(params, url, method){

        method = method || "POST";

        //if((browser.indexOf("Edge") != -1) || windowPrint){
        if(windowPrint){

            if(langScCd.indexOf("ko")!=-1) {
                alert("Edge나 WindowPrint Mode에서는 인쇄를 진행할 수 없습니다.");
            }
            else {
                alert("Edge or WindowPrint Mode not support printing.");
            }
            return;

            /*
            if((browser.indexOf("MSIE8")==-1) && (browser.indexOf("MSIE7")==-1) && (browser.indexOf("MSIE6")==-1) &&
                (browser.indexOf("Safari")==-1) ) {
                var target = document.getElementById('myIframe');
                if (target == null) {
                    var $iframe, formDoc;
                    var formInnerHtml = "";

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
            */

        }

        if(browser.indexOf("Safari") == -1 && browser.indexOf("Chrome") == -1 && browser.indexOf("Edge") == -1){

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
            //사파리,크롬,Edge
            //printDialogPopupIframe(url, params, method);
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
        else if(navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("rv:11.0") != -1){
            printDialogPopupIframe(url, params, method);
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

        //url=url+'?';

        method = method || "POST";

        if ($iframe2) {
            $iframe2.remove();
        }

        // 현재 쿠키설정 테스트
        $.cookie("cookieTest","true");
        var cookieTest= $.cookie("cookieTest");

        if(cookieTest) {
            $("#loading3").show();
            $.removeCookie('fileDownloadToken', { path: '/' });
        }

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

        fileDownloadCheckTimer = setInterval(function () {
            if(!cookieTest){
                clearInterval(fileDownloadCheckTimer);
                return;
            }

            var cookieValue = $.cookie("fileDownloadToken");
            if (cookieValue == "success") {

                setTimeout(function () {
                    $("#loading3").hide();
                },10);

                $.removeCookie('fileDownloadToken', { path: '/' });
                clearInterval(fileDownloadCheckTimer);
                return;
            }

        }, 500);

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

				//if(langScCd.indexOf("ko")!=-1)
				//	alert("Adobe Reader를 최신버전으로 설치 또는 업그레이드 후 이용바랍니다.");
				//else
				//	alert("The latest version of Adobe Reader, please use the installation or upgrade.");

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

        acrobat.installed=true;
        return acrobat.installed;

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
            catch(e) {}

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
	
	function isReady() 
	 { 
		return jsReady; 
	 } 
	 
	 function setSWFIsReady(){
		 swfReady = true;
	 }
	 
	 function getSWF(flashName){
	 	if (navigator.appName.indexOf("Microsoft") != -1)
	 	{
	 		if(navigator.userAgent.indexOf("MSIE 9.0") != -1)
	 			return document[flashName];
	 		else if(navigator.userAgent.indexOf("MSIE 10.0") != -1)
	 			return document[flashName];
	 		else if(navigator.userAgent.indexOf("IEMobile") != -1)
	 			return document[flashName];
	 		else
	 			return window[flashName];
	 	}
	 	else
	 	{
	 		return document[flashName];
	 	}
	 }
	 
	function convert(){
		var index = $("#convert option").index($("#convert option:selected"));
		$("#convert option:eq(0)").attr("selected", "selected");
		if(index == 1)
			PDFConvert();
		else if (index == 2)
			ExcelConvert();
	}
	
	function objectAppend(){
		var index = $("#objectAppend option").index($("#objectAppend option:selected"));
		$("#objectAppend option:eq(0)").attr("selected", "selected");
		if(index == 1)
			textAppend();
		else if (index == 2)
			imageAppend();
	}

	function textAppend(){
	
		textInsert++;
		var myPosition = 0;
	
		if (jQuery.browser.mozilla) {
			var myOffset = parseInt($('#report').scrollTop()) + parseInt($('#' + currentPage).offset().top);
			myPosition = myOffset * zoomRate - 44;
			
		}
		else if (jQuery.browser.msie) {		
			myPosition = pageTop[currentPage] - 44;
		}
		else {
			myPosition = parseInt($('#report').scrollTop()) + parseInt($('#' + currentPage).offset().top) - 44;	
		}
	
		//console.log(myPosition);
	
		var $myHtml = "<div id=" + "'textDiv" + textInsert +"'>" + 
				"<textarea id=" + "'textBox" + textInsert + "'" + "></textarea></div>"

		$($myHtml).appendTo('#' + currentPage);

		
		$("#textBox" + textInsert).css({
			'position': 'absolute',
			//'background': 'white',
			'left': '400px',
			'top': '-750px',
			'height': '30px',
			'width': '200px',
			'cursor': 'pointer',
			'z-index': '1'
			});
	
		var $bgcolor=0;
		var $fgcolor=12;
		$("#textDiv" + textInsert).draggable({
			cancel: ''
		}).keydown(function(event) {
			//alert(event.which);
  			if (event.which == 46) {
				//alert(event.which);
				$(this).remove();
				//event.preventDefault();
			}
   
		}).contextMenu('myMenu1', {

      	bindings: {

        	'font': function(t) {
				var $textBox = "#textBox" + t.id.charAt(t.id.length - 1);
				
				//alert($($textBox).css('font-family'));
				$("#font1").val($($textBox).css('font-family'));
				$("#font2").val($($textBox).css('font-size'));
				
				//alert($($textBox).css('font-weight'));
				
				if($($textBox).css('font-weight') == 700 || $($textBox).css('font-weight') == "bold" )
					$('#bold').prop("checked", true);
				else
					$('#bold').prop("checked", false);
					
				if($($textBox).css('font-style') == "italic")
					$('#italic').prop("checked", true);
				else
					$('#italic').prop("checked", false);
					
				if($($textBox).css('text-decoration') == "underline")
					$('#underline').prop("checked", true);
				else
					$('#underline').prop("checked", false);
				
				
				
				$("#fontDialog").dialog({
					resizable: false,
					height:220,
					modal: true,
					position: [350,200],
					buttons: {
						"확인": function() {
							
							var $font1 = $("#font1").val();
							var $font2 = $("#font2").val();
							
							if($('#bold').attr('checked'))
								var $bold = "bold";
							else
								var $bold = "normal";
							if($('#italic').attr('checked'))
								var $italic = "italic";
							else
								var $italic = "normal";
							if($('#underline').attr('checked'))
								var $underline = "underline";
							else
								var $underline = "none";
							//alert($bold + " " + $italic + " " + $underline);
							//var $textBox = "#textBox" + t.id.charAt(t.id.length - 1);
							$($textBox).css({
								'background-color': $bgcolor,
								'color': $fgcolor,
								'font-size': $font2,
								'font-family':$font1,
								'font-style': $italic,
								'text-decoration': $underline,
								'font-weight': $bold
							});
							
							$( this ).dialog( "close" );
					},
						"취소": function() {
							$( this ).dialog( "close" );
					}
				
					}
				});
		
		
				switch($($textBox).css('background-color')){
					case '#ffffff':
						$bgcolor = 0;
						break;
					case '#eeeeee':
						$bgcolor = 1;
						break;
					case '#ffff88':
						$bgcolor = 2;
						break;
					case '#ff7400':
						$bgcolor = 3;
						break;
					case '#cdeb8b':
						$bgcolor = 4;
						break;
					case '#6bba70':
						$bgcolor = 5;
						break;
					case '#006e2e':
						$bgcolor = 6;
						break;
					case '#c3d9ff':
						$bgcolor = 7;
						break;
					case '#4069ee':
						$bgcolor = 8;
						break;
					case '#356aa0':
						$bgcolor = 9;
						break;
					case '#ff0096':
						$bgcolor = 10;
						break;
					case '#b02b2c':
						$bgcolor = 11;
						break;
					case '#000000':
						$bgcolor = 12;
						break;
				}
										
				//alert($($textBox).css('background-color'));
				$('#bgcolor').colorPicker(
				{			
			  		defaultColor: $bgcolor, // index of the default color
			  		columns:13,     // number of columns 
			  		click:function(c){
			    	//$('#output').html(c);
					//alert(c);
					$bgcolor = c;
			  		}
				});
				
				
				switch($($textBox).css('color')){
					case '#ffffff':
						$fgcolor = 0;
						break;
					case '#eeeeee':
						$fgcolor = 1;
						break;
					case '#ffff88':
						$fgcolor = 2;
						break;
					case '#ff7400':
						$fgcolor = 3;
						break;
					case '#cdeb8b':
						$fgcolor = 4;
						break;
					case '#6bba70':
						$fgcolor = 5;
						break;
					case '#006e2e':
						$fgcolor = 6;
						break;
					case '#c3d9ff':
						$fgcolor = 7;
						break;
					case '#4069ee':
						$fgcolor = 8;
						break;
					case '#356aa0':
						$fgcolor = 9;
						break;
					case '#ff0096':
						$fgcolor = 10;
						break;
					case '#b02b2c':
						$fgcolor = 11;
						break;
					case '#000000':
						$fgcolor = 12;
						break;
				}
				
				$('#fgcolor').colorPicker(
				{			
			  		defaultColor:$fgcolor, // index of the default color
			  		columns:13,     // number of columns 
			  		click:function(c){
			    	//$('#output').html(c);
					//alert(c);
					$fgcolor = c;
			  		}
				});
				
          		//alert('Trigger was '+t.id+'\nAction was fontchange');

        	},
        	'delete': function(t) {
			
				$('#' + t.id).remove();
          		//alert('Trigger was '+t.id+'\nAction was Delete' );
			
        	},
		menuStyle: {
        	border: '2px solid #000'
      		},

      	itemStyle: {
        	fontFamily : 'verdana',
        	backgroundColor : '#666',
        	color: 'white',
        	border: 'none',
        	padding: '1px'
      		},

      	itemHoverStyle: {
        	color: '#fff',
        	backgroundColor: '#0f0',
        	border: 'none'
      		}

      	}

    	});
 
 
	
		$("#textBox" + textInsert).resizable({
		     cancel: ''
		}).click(function() {
			//alert("text mouse click");
    		$(this).focus();
		});
	
	}

	function imageAppend(){
		imageInsert++;
		var myPosition = 0;
	
		if (jQuery.browser.mozilla) {
			var myOffset = parseInt($('#report').scrollTop()) + parseInt($('#' + currentPage).offset().top);
			myPosition = myOffset * zoomRate - 44;
			
		}
		else if (jQuery.browser.msie) {		
			myPosition = pageTop[currentPage] - 44;
		}
		else {
			myPosition = parseInt($('#report').scrollTop()) + parseInt($('#' + currentPage).offset().top) - 44;	
		}
	
		//console.log(myPosition);
		$('#urlfile').val("http://");
		$("#imageDialog").dialog({
			resizable: false,
			height:230,
			modal: true,
			position: [350,200],
			buttons: {
				"확인": function() {		
						
					var $myHtml = "<div id=" + "'imageDiv" + imageInsert +"'>" + 
								"<img id=" + "'imageBox" + imageInsert + "'" + 
								" " + "src='" + $('#urlfile').val() + "'" + 
								" width='100' height='80' " + "></div>";
								
							//alert($myHtml);
					$($myHtml).appendTo('#' + currentPage);
							
							
					$("#imageBox" + imageInsert).css({
						'position': 'absolute',
						'left': '400pt',
						'top': '-750pt',
						'height': '60px',
						'width': '200px',
						'cursor': 'pointer'
						//'z-index': '1'
								
					});
							
							
					//console.log($myHtml);
					//console.log("text:" + $('#1').html());
							
					$("#imageDiv" + imageInsert).keydown(function(event) {
						//alert(event.which);
  						if (event.which == 46) 
							$(this).remove();
					});
							
							
							
					$("#imageBox" + imageInsert).resizable({
						cancel: ''
					}).click(function() {
						//alert($('#textBox' + imageInsert));
    					$(this).focus();
					});
							
							
					$("#imageDiv" + imageInsert).draggable({
						cancel: ''							
					}).contextMenu('myMenu2', {
      					bindings: {
        					'delete': function(t) {
								$('#' + t.id).remove();
							}
						}
					});
									
					$( this ).dialog( "close" );
					
				},
				"취소": function() {
					$( this ).dialog( "close" );
				}
				
			}
		});
		
	}

/**
 *  Version 2.1
 *      -Contributors: "mindinquiring" : filter to exclude any stylesheet other than print.
 *  Tested ONLY in IE 8 and FF 3.6. No official support for other browsers, but will
 *      TRY to accomodate challenges in other browsers.
 *  Example:
 *      Print Button: <div id="print_button">Print</div>
 *      Print Area  : <div class="PrintArea"> ... html ... </div>
 *      Javascript  : <script>
 *                       $("div#print_button").click(function(){
 *                           $("div.PrintArea").printArea( [OPTIONS] );
 *                       });
 *                     </script>
 *  options are passed as json (json example: {mode: "popup", popClose: false})
 *
 *  {OPTIONS} | [type]    | (default), values      | Explanation
 *  --------- | --------- | ---------------------- | -----------
 *  @mode     | [string]  | ("iframe"),"popup"     | printable window is either iframe or browser popup
 *  @popHt    | [number]  | (500)                  | popup window height
 *  @popWd    | [number]  | (400)                  | popup window width
 *  @popX     | [number]  | (500)                  | popup window screen X position
 *  @popY     | [number]  | (500)                  | popup window screen Y position
 *  @popTitle | [string]  | ('')                   | popup window title element
 *  @popClose | [boolean] | (false),true           | popup window close after printing
 *  @strict   | [boolean] | (undefined),true,false | strict or loose(Transitional) html 4.01 document standard or undefined to not include at all (only for popup option)
 */
(function($) {
    var counter = 0;
    var modes = { iframe : "iframe", popup : "popup" };
    var defaults = { mode     : modes.iframe,
                     popHt    : 500,
                     popWd    : 400,
                     popX     : 200,
                     popY     : 200,
                     popTitle : '',
                     popClose : false };

    var settings = {};//global settings

    $.fn.printArea = function( options )
        {
            $.extend( settings, defaults, options );

            counter++;
            var idPrefix = "printArea_";
            $( "[id^=" + idPrefix + "]" ).remove();
            var ele = getFormData( $(this) );

            settings.id = idPrefix + counter;

            var writeDoc;
            var printWindow;

            switch ( settings.mode )
            {
                case modes.iframe :
                    var f = new Iframe();
                    writeDoc = f.doc;
                    printWindow = f.contentWindow || f;
                    break;
                case modes.popup :
                    printWindow = new Popup();
                    writeDoc = printWindow.doc;
            }

            writeDoc.open();
            writeDoc.write( docType() + "<html>" + getHead() + getBody(ele) + "</html>" );
            writeDoc.close();

            printWindow.focus();
            printWindow.print();

            if ( settings.mode == modes.popup && settings.popClose )
                printWindow.close();
        }

    function docType()
    {
        if ( settings.mode == modes.iframe || !settings.strict ) return "";

        var standard = settings.strict == false ? " Trasitional" : "";
        var dtd = settings.strict == false ? "loose" : "strict";

        return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + standard + '//EN" "http://www.w3.org/TR/html4/' + dtd +  '.dtd">';
    }

    function getHead()
    {
        var head = "<head><title>" + settings.popTitle + "</title>";
        $(document).find("link")
            .filter(function(){
                    return $(this).attr("rel").toLowerCase() == "stylesheet";
                })
            .filter(function(){ // this filter contributed by "mindinquiring"
                    var media = $(this).attr("media");
                    return (media.toLowerCase() == "" || media.toLowerCase() == "print");
                })
            .each(function(){
                    head += '<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" >';
                });
        head += "</head>";
        return head;
    }

    function getBody( printElement )
    {
        return '<body><div class="' + $(printElement).attr("class") + '">' + $(printElement).html() + '</div></body>';
    }

    function getFormData( ele )
    {
        $("input,select,textarea", ele).each(function(){
            // In cases where radio, checkboxes and select elements are selected and deselected, and the print
            // button is pressed between select/deselect, the print screen shows incorrectly selected elements.
            // To ensure that the correct inputs are selected, when eventually printed, we must inspect each dom element
            var type = $(this).attr("type");
            if ( type == "radio" || type == "checkbox" )
            {
                if ( $(this).is(":not(:checked)") ) this.removeAttribute("checked");
                else this.setAttribute( "checked", true );
            }
            else if ( type == "text" )
                this.setAttribute( "value", $(this).val() );
            else if ( type == "select-multiple" || type == "select-one" )
                $(this).find( "option" ).each( function() {
                    if ( $(this).is(":not(:selected)") ) this.removeAttribute("selected");
                    else this.setAttribute( "selected", true );
                });
            else if ( type == "textarea" )
            {
                var v = $(this).attr( "value" );
                if ($.browser.mozilla)
                {
                    if (this.firstChild) this.firstChild.textContent = v;
                    else this.textContent = v;
                }
                else this.innerHTML = v;
            }
        });
        return ele;
    }

    function Iframe()
    {
        var frameId = settings.id;
        var iframeStyle = 'border:0;position:absolute;width:0px;height:0px;left:0px;top:0px;';
        var iframe;

        try
        {
            iframe = document.createElement('iframe');
            document.body.appendChild(iframe);
            $(iframe).attr({ style: iframeStyle, id: frameId, src: "" });
            iframe.doc = null;
            iframe.doc = iframe.contentDocument ? iframe.contentDocument : ( iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
        }
        catch( e ) { throw e + ". iframes may not be supported in this browser."; }

        if ( iframe.doc == null ) throw "Cannot find document.";

        return iframe;
    }

    function Popup()
    {
        var windowAttr = "location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no";
        windowAttr += ",width=" + settings.popWd + ",height=" + settings.popHt;
        windowAttr += ",resizable=yes,screenX=" + settings.popX + ",screenY=" + settings.popY + ",personalbar=no,scrollbars=no";

        var newWin = window.open( "", "_blank",  windowAttr );

        newWin.doc = newWin.document;

        return newWin;
    }
})(jQuery);

