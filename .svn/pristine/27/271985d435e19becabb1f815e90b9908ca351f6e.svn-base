
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
		 
	//var startPage 		= 1;
	//var endPage 		= 4;
    //var currentPage 	= 1;
	//var zoomRate        = 1.0;
	var zoomIndex		= 5;
    var zoomArray       = new Array(0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5);
    var ieFlag = true;
    var swfReady = false;
    var jsReady = false;
    var printCount = 1;
    var reportUrl = document.URL;
    var scrollFlag = true;
    var pdffilename="";
    var reportTopMargin=26;
    
    var browserSearchString = new Array(
			"MSIE 6.0","MSIE 7.0","MSIE 8.0","MSIE 9.0","MSIE 10.0","MSIE",
			"IEMobile 6","IEMobile 7","IEMobile 8","IEMobile/9.0","IEMobile",
			"Chrome/13","Chrome/14","Chrome/15","Chrome/16","Chrome/17","Chrome/18","Chrome/19","Chrome/20","Chrome/21","Chrome/22","Chrome/23","Chrome/24","Chrome",
			"Firefox/3","Firefox/4","Firefox/5","Firefox/6","Firefox/7","Firefox/8","Firefox/9","Firefox/10","Firefox",
			"Firefox/3.5 Maemo",
			"Safari/52","Safari/531","Safari/530","Safari/533","Safari/534","Safari",
			"Mobile Safari/530","Mobile/5A347 Safari/5","Mobile/3A101a Safari/419","Mobile/7B367 Safari/531","Mobile/8B117 Safari/6531",
			"J2ME/MIDP","Opera/8.0","Opera/9","Opera/9.80"
	);
    
    var browserType= new Array(
			"MSIE6","MSIE7","MSIE8","MSIE9","MSIE10","MSIE",
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
	
	$(document).ready(function(){
		
		jsReady = true;
		
		$('#loading')
		.ajaxStart(function(){
				$(this).show();
			})
		.ajaxStop(function(){
				$(this).fadeOut(1000);
		});

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

        /*
		$('#subreport').css({
			'text-align': 'left',
			'margin-left' : function() {
				//report_width가 %로 동적으로 변할 경우
				if(report_widthUnit =='%'){
					var leftMargin = ($(window).width() - pageWidth)/2 - 10 + 'px';
					if(parseInt(leftMargin) < 0){
						return 0;
					}else{
						return leftMargin;
					}
				}
			},
			'height': function(){return ($(window).height()-bottomMargine-10) + 'px';}
		});
		*/

        for(var i=startPage;i < endPage+1;i++){

            var tempPage=$('#p' + i).innerWidth();
            $('#p' + i).css({
                'text-align': 'left',
                'margin-left' : function() {
                    //report_width가 %로 동적으로 변할 경우
                    if(report_widthUnit =='%'){
                        var leftMargin = ($(window).width() - tempPage)/2 - 10 + 'px';
                        if(parseInt(leftMargin) < 0){
                            return 0;
                        }else{
                            return leftMargin;
                        }
                    }
                }
            });
        }

        if(!lemonade) {
            $('#report td').css({'letter-spacing': '-1px' });
        }
        else{
            //$('#report td').css({'letter-spacing': '-1px' });
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
				'height': function(){return ($(window).height()-bottomMargine-2) + 'px';}
			});

            /*
			$('#subreport').css({
				'text-align': 'left',
				'margin-left' : function() {
					//report_width가 %로 동적으로 변할 경우
					if(report_widthUnit =='%'){
						var leftMargin = ($(window).width() - pageWidth)/2  - 10 + 'px';
						if(parseInt(leftMargin) < 0){
							return 0;
						}else{
							return leftMargin;
						}
					}
				},
				'height': function(){return ($(window).height()-bottomMargine-10) + 'px';}
			});
			*/

            for(var i=startPage;i < endPage+1;i++){

                var tempPage=$('#p' + i).innerWidth();
                $('#p' + i).css({
                    'text-align': 'left',
                    'border-width' : '1px 1px',
                    'border-color': '#000000',
                    'border-style': 'solid',
                    'background-color': '#ffffff',
                    'margin-left' : function() {
                        //report_width가 %로 동적으로 변할 경우
                        if(report_widthUnit =='%'){
                            var leftMargin = ($(window).width() - tempPage)/2 - 10 + 'px';
                            if(parseInt(leftMargin) < 0){
                                return 0;
                            }else{
                                return leftMargin;
                            }
                        }
                    }
                });
            }
			
		});
		
		pageTop = new Array();
		for(var i=startPage;i < endPage+1;i++){
			pageTop[i] = $('#p' + i).offset().top;
			
			/*
			$('#' + i).css({
				'border-width' : '2px 2px',
				'border-color': 'blue',
				'border-style': 'solid'
			});
			*/
		}
		
		
		$('#page *',parent.document).remove();
		for(var i=1;i<=endPage;i++){
			var optionStr = "<option>" + i + "/" + endPage + "page</option>";

			$('#page',parent.document).append(optionStr);
		}
		
		$("#size option").eq(5).attr("selected", "selected");
		
		/*
		var _body = document.body;
		if (jQuery.browser.msie) {
			_body.style.zoom = 1.0;
		}
		else {
			$('#subreport').css('-webkit-transform','scale(1.0)');
			$('#subreport').css('-webkit-transform-origin','0 0');
			$('#subreport').css('-moz-transform','scale(1.0)');
			$('#subreport').css('-moz-transform-origin','0 0');
			$('#subreport').css('-o-transform','scale(1.0)');
			$('#subreport').css('-o-transform-origin','0 0');
		}
		*/
		
		zoom(zoomRate);
		
		/*
		$('#report').mousewheel(function(Event, delta){
			
        	if (delta > 0) {
        		if(currentPage != startPage)
        			goScroll(currentPage-1);
            	
        	} else {
        		if(currentPage != endPage)
        			goScroll(currentPage+1);
        	}
			
        	return false;
     	});
     	*/
		
		$("#report").scroll(function(){
			
			if(scrollFlag == false){
				scrollFlag = true;
				return;
			}
			
			var start = 0;
			var end = 0;
			
				
			start = pageTop[currentPage];
			
			currentPage++;
			if(currentPage > endPage)
				end = start + 999;
			else
				end   = pageTop[currentPage];
			
			currentPage--;
		
			var position = $('#report').scrollTop();
			
			
			if(position < 10 ){
				$("#page option",parent.document).eq(startPage-1).prop("selected", "selected");
				currentPage = startPage;
				return true;
			}
			
			
			if(position >= pageTop[endPage]){
				
				$("#page option",parent.document).eq(endPage-1).prop("selected", "selected");
				currentPage = endPage;
				return true;
			}
				
			//console.log(start + " " + position + " " + end);
			
			for(var i=startPage;i < endPage+1;i++){
				
				if(position >= pageTop[i] && position < pageTop[i+1]){
					$("#page option",parent.document).eq(i-1).prop("selected", "selected");
					currentPage=i;;
					//console.log("pageTop=" + pageTop[i] + " " + "position=" + position + " " + "pageBottom=" + pageTop[i+1] + " " + "currentpage=" + currentPage);
					break;
				}

			}
			
			return true;
		});
		
	});
	
	
	function goScroll(id){
		
		scrollFlag = false;
		
		if(id < startPage){
			currentPage = startPage;
			id = startPage;
		}
		else if(id > endPage){
			currentPage = endPage;
			id = endPage;
		}
		else{
			currentPage = id;
		} 
		
		if (browser.indexOf("MSIE9") != -1) {
			$('#report').animate({	scrollTop: pageTop[id] }, 0);
			//console.log("id=" + id + " pageTop=" + (pageTop[id] ));
		}
		else if (browser.indexOf("Chrome") != -1) {
			$('#report').animate({	scrollTop: pageTop[id] }, 0);
			//console.log("id=" + id + " pageTop=" + (pageTop[id] ));
		}
		else if (browser.indexOf("Firefox") != -1) {
			$('#report').animate({	scrollTop: pageTop[id] }, 0);
			//console.log("id=" + id + " pageTop=" + (pageTop[id] ));
		}
		else if (browser.indexOf("Opera") != -1) {
			$('#report').animate({	scrollTop: pageTop[id] }, 0);	
		}
		else if (browser.indexOf("Safari") != -1) {
			$('#report').animate({	scrollTop: pageTop[id] + 1}, 0);	
		}
		else {
			$('#report').animate({	scrollTop: pageTop[id] }, 0);	
		}
			  
		$("#page option",parent.document).eq(id-1).prop("selected", "selected");
					
	}		

	function zoom(size){

			if (jQuery.browser.msie) {

                if(simpleMode){
                    $('#subreport').css('overflow-y', 'scroll');
                    $('#subreport').css('zoom', size);
                    $('#subreport').css('overflow-y', 'hidden');
                }
                else{
                    $('#subreport').css('zoom', size);
                }
				ieFlag = false;
				
			}
			else {
			
				$('#subreport').css('-webkit-transform', 'scale(' + (size) + ')');
				$('#subreport').css('-webkit-transform-origin', '0 0');
				$('#subreport').css('-moz-transform', 'scale(' + (size) + ')');
				$('#subreport').css('-moz-transform-origin', '0 0');
				$('#subreport').css('-o-transform', 'scale(' + (size) + ')');
				$('#subreport').css('-o-transform-origin', '0 0');
			}
			
		    /*
			for(var i=0;i<11;i++){
				if (size == zoomArray[i]) {
					$("#size option",parent.document).eq(i).attr("selected", "selected");
					zoomIndex=i;
				}
					
			}
			*/

			for(var i=startPage;i < endPage+1;i++){

				if(size < 1.0 ){
					pageTop[i] = parseInt($('#p' + i).offset().top  + $('#report').scrollTop()) - parseInt((reportTopMargin * size)) ;
				}
				else{
					pageTop[i] = parseInt($('#p' + i).offset().top + $('#report').scrollTop()) - reportTopMargin;
				}
				//console.log(i + " " + pageTop[i]);
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

	function goToMove(){
		var index = parent.getPage();
		goScroll(index);
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
	
	function goZoomOut(){
		if(zoomIndex < 0)
			return 0;
		zoomIndex--;
		zoom(zoomArray[zoomIndex]);
		zoomRate = zoomArray[zoomIndex];
		return zoomIndex;
	}
	
	function goZoomIn(){
		if(zoomIndex > 9)
			return 10;
		
		zoomIndex++;
		zoom(zoomArray[zoomIndex]);
		zoomRate = zoomArray[zoomIndex];
		return zoomIndex;
	}
	
	function goZoomPers(index){
		zoomIndex=index;
		zoom(zoomArray[zoomIndex]);
		zoomRate = zoomArray[zoomIndex];
	}
	
	function borderSetColor(color){
		$('#report').css({ 'border-color': 'red' });  
	}
	
	function scrollSet(scroll){
		if(scroll == 'true')
			$('#report').css({ 'overflow-y': 'scroll' });
		else
			$('#report').css({ 'overflow-y': 'visible' });
	}
	
	function getMaxPage(){
		return endPage; 
	}

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
		if(printCount == 1){
			$.ajax({  
				type: "get",  
				dataType: "text",
				url: jspUrl,   
				success: function(xmlData) {
                		 
					console.log("33333333333333333");
					console.log(swfReady);
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
		var info = getAcrobatInfo();
		if(info.acrobat==false){
			if(langScCd.indexOf("ko")!=-1)
				alert("Adobe Reader를 설치후 이용바랍니다.");
			else
				alert("Please use after installing Adobe Reader.");
			return;
		}
		*/
		
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
		
		//parameter=encodeURI(parameter);
		if(pdffilename==""){
			
			$.ajax({  
				type: method,  
				dataType: "json",
				url: jspUrl,   
				data: parameter + "&url=" + getStripUrl(reportUrl) ,
				success: function(url) {
					
					pdffilename=url[0].targetURL;
                    if(!showPrintDialog && browser.indexOf("MSIE") != -1)
                        printDialogPopupIE(jspCall, pdffilename);
                    else
                        printDialogPopup(jspCall, pdffilename);
					
				},   
				error: function(xhr, status, error) {
					alert(status + " " + error);   
				}  
			});  
		}
		else{
            if(!showPrintDialog && browser.indexOf("MSIE") != -1)
                printDialogPopupIE(jspCall, pdffilename);
            else
                printDialogPopup(jspCall, pdffilename);
		}
		
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
	
		pdfPath=encodeURIComponent(pdfPath);
		var embedTag="<embed src=\"" + jspCall + pdfPath + "\" " + "id=\"pdfDoc\" name=\"pdfDoc\" width=\"1px\" height=\"1px\">";
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
	
	/*
	function pdfPrint(urlStr,width,height){
		var url = JSON.parse(urlStr);
		var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
		window.open(url[0].targetURL,"print",options);
	}
	*/

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

        method = method || "POST";

        url=url+'?';

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
            .prop("name", 'myframe')
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
		var info = getAcrobatInfo();
		if(info.acrobat==false){
			if(langScCd.indexOf("ko")!=-1)
				alert("Adobe Reader를 설치후 이용바랍니다.");
			else
				alert("Please use after installing Adobe Reader.");
			return;
		}
		*/
		
		
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
		
		var urlparams = JSON.parse(params);
		//var options = "toolbar=no," + "width=" + width + ",height=" + height + ",status=no";
		//window.open(url+urlparams[0].targetURL,"print",options);
		
		printDialogPopup(url, urlparams[0].targetURL);
	}
	
	function isInstalledAcrobatReader(){
		var displayString;
		var acrobat=new Object();
		
		acrobat.installed=false;
        try {
            oAcro7 = new ActiveXObject('AcroPDF.PDF.1');
            if (oAcro7) {
                acrobat.installed = true;
                acrobat.version = '7.0';

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

                    acrobat.installed = false;
                    return acrobat.installed;
                }

            }
        }
        catch(e) {
            acrobat.installed = false;
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
					break;
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
						//alert("111");
						acrobat.installed=true;
					}
				}
				catch(e) {
                    acrobat.installed = false;
                }
			}
			
			try
			{
				oAcro4=new ActiveXObject('PDF.PdfCtrl.1');
				if (oAcro4)
				{
					//alert("222");
					acrobat.installed=true;
					acrobat.version='4.0';
				}
			}
			catch(e) {
                acrobat.installed = false;
            }
		
			try
			{
				oAcro7=new ActiveXObject('AcroPDF.PDF.1');
				if (oAcro7)
				{
					//alert("333");
					acrobat.installed=true;
					acrobat.version='7.0';
				}
			}
			catch(e) {
                acrobat.installed = false;
            }
		}

		return acrobat.installed;
	}
	
	function getNavigator(){
		 return navigator.userAgent;
	 }
	
	function isReady() 
	 { 
		 //console.log("1111111111111111");
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

