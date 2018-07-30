$.fn.extend({
	
    serializeObject: function () {  
    	var lsWrapperId = "#" + $(this).attr("id");
    	var loData = {};
    	var lsType = "";
    	$(lsWrapperId + " input," + lsWrapperId + " select," + lsWrapperId + " textarea").each(function () {
    		switch ($(this).prop("tagName").toUpperCase()) {
    			case "INPUT":
    				switch ($(this).attr("type").toUpperCase()) {
    					case "BUTTON":
    						break;
    					case "RADIO":
    						if ($(this).is(":checked")) {
    							loData[$(this).attr("name")] = $(this).val();
    						}
    						break;
    					case "CHECKBOX":
    						if ($(this).is(":checked")) {
    							if (Comm.containsKey(loData, $(this).attr("name")) == true) {
    								loData[$(this).attr("name")] += "," + $(this).val();
    							} else {
    								loData[$(this).attr("name")] = $(this).val();
    							}
    						}
    						break;
    					default:    // TEXT , HIDDEN , PASSWORD , BUTTON
    						switch ($(this).attr("format")) {
    							case "rate25":
    								loData[$(this).attr("name")] = Comm.rate($(this).val(), 2, 5);
    								break;
    							/*case "money":*/
    							case "number":
    								loData[$(this).attr("name")] = Comm.number($(this).val());
    								break;
    							case "no":
    								loData[$(this).attr("name")] = Comm.no($(this).val());
    								break;
    							case "date":
    								loData[$(this).attr("name")] = Comm.replace($(this).val(), '-', '');
    								break;
    							default:
    								loData[$(this).attr("name")] = $(this).val();
    								break;
    						}
    						break;
    				}
    				break;
    			case "SELECT":
    				loData[$(this).attr("name")] = $(this).children('option:selected').val();
    				break;
    			case "TEXTAREA":
    				loData[$(this).attr("name")] = $(this).val();
    				break;
    		}
    	});
    	return loData;
    },
    serializeAllObject: function () {
    	var lsWrapperId = "#" + $(this).attr("id");
    	var loData = {};
    	var lsType = "";
    	$(lsWrapperId + " input," + lsWrapperId + " select," + lsWrapperId + " textarea," + lsWrapperId + " span").each(function () {
    		switch ($(this).prop("tagName").toUpperCase()) {
    			case "INPUT":
    				switch ($(this).attr("type").toUpperCase()) {
    					case "BUTTON":
    						break;
    					case "RADIO":
    						if ($(this).is(":checked")) {
    							loData[$(this).attr("name")] = $(this).val();
    						}
    						break;
    					case "CHECKBOX":
    						if ($(this).is(":checked")) {
    							if (Comm.containsKey(loData, $(this).attr("name")) == true) {
    								loData[$(this).attr("name")] += "," + $(this).val();
    							} else {
    								loData[$(this).attr("name")] = $(this).val();
    							}
    						}
    						break;
    					default:    // TEXT , HIDDEN , PASSWORD , BUTTON
    						switch ($(this).attr("format")) {
    							case "rate25":
    								loData[$(this).attr("name")] = Comm.rate($(this).val(), 2, 5);
    								break;
    							/*case "money":*/
    							case "number":
    								loData[$(this).attr("name")] = Comm.number($(this).val());
    								break;
    							case "no":
    								loData[$(this).attr("name")] = Comm.no($(this).val());
    								break;
    							case "date":
    								loData[$(this).attr("name")] = Comm.replace($(this).val(), '-', '');
    								break;
    							default:
    								loData[$(this).attr("name")] = $(this).val();
    								break;
    						}
    						break;
    				}
    				break;
    			case "SELECT":
    				loData[$(this).attr("name")] = $(this).children('option:selected').val();
    				break;
    			case "TEXTAREA":
    				loData[$(this).attr("name")] = $(this).val();
    				break;
    			case "SPAN":
    				if (typeof ($(this).attr("name")) != "undefined") {
    					loData[$(this).attr("name")] = $(this).text();
    				}
    				break;
    		}
    	});
    	return loData;
    },
    bindData: function (aoData) {
    	var lsWrapperId = "#" + $(this).attr("id");
    	if(Comm.containsKey(aoData, "CMD") == false) {
    		if (typeof ($(lsWrapperId + " input[name=CMD]")) != "undefined") {
    			$(lsWrapperId + " input[name=CMD]").val("UPDATE");
    		}
    	}
    	for (var key in aoData) {
    		if (typeof ($(lsWrapperId + " *[name=" + key + "]")) != "undefined") {
    			var loElement = $(lsWrapperId + " *[name=" + key + "]");
    			if (typeof (loElement.prop("tagName")) != "undefined") {
    				switch (loElement.prop("tagName").toUpperCase()) {
    					case "INPUT":
    						switch (loElement.attr("type").toUpperCase()) {
    							case "RADIO":
    								var lsVal = aoData[key];
    								if (lsVal != "") {
    									$(lsWrapperId + " input:radio[name=" + key + "]:radio[value='" + aoData[key] + "']").prop("checked", true);
    								}
    								break;
    							case "CHECKBOX":
    								loElement.each(function () {
    									$(this).attr("checked", false);
    								});
    								var lsVal = aoData[key];
    								if (lsVal != "") {
    									var lsrVal = lsVal.split(",");
    									for (var i = 0; i < lsrVal.length; i++) {
    										loElement.each(function () {
    											if ($(this).val() == lsrVal[i]) {
    												$(this).prop("checked", true);
    											}
    										});
    									}
    								}
    								break;
    							case "TEXT":
    								switch (loElement.attr("format")) {
    									case "rate25":
    										loElement.val(Comm.rate(aoData[key], 2, 5));
    										break;
    									/*case "money":
    										loElement.val(Comm.money(aoData[key]));
    										break;*/
    									case "date":
    										loElement.val(Comm.date(aoData[key]));
    										break;
    									case "number":
    										loElement.val(Comm.number(aoData[key]));
    										break;
    									case "no":
    										loElement.val(Comm.no(aoData[key]));
    										break;
    									default:
    										loElement.val(aoData[key]);
    										break;
    								}
    								break;
    							case "HIDDEN":
    								if (key == "DOCMT_ESIGN") {	// 전자서명문서라면
    									loElement.val(Comm.replace(aoData[key], " ", "+"));
    								} else {
    									loElement.val(aoData[key]);
    								}
    								break;
    							default:
    								loElement.val(aoData[key]);
    								break;
    						}
    						break;
    					case "SELECT":
    						loElement.val(aoData[key]);
    						break;
    					case "TEXTAREA":
    						loElement.val(aoData[key]);
    						break;
    					default:
    						break;
    				}
    			}
    		}
    		if (typeof ($(lsWrapperId + " span[name=" + key + "]")) != "undefined") {
    			var loElement = $(lsWrapperId + " span[name=" + key + "]");
    			switch (loElement.attr("format")) {
    				case "rate25":
    					loElement.html(Comm.rate(aoData[key], 2, 5));
    					break;
    				/*case "money":
    					loElement.html(Comm.money(aoData[key]));
    					break;*/
    				case "date":
    					loElement.html(Comm.date(aoData[key]));
    					break;
    				case "number":
    					loElement.html(Comm.number(aoData[key]));
    					break;
    				case "no":
    					loElement.html(Comm.no(aoData[key]));
    					break;
    				default:
    					loElement.html(Comm.nvlHtml(aoData[key]));
    					break;
    			}
    		}
    	}
    	if (typeof ($(lsWrapperId + " *[name=CMD]")) != "undefined") {
			if( $(lsWrapperId + " input[name=CMD]").val() == "INSERT" ) {
				$(lsWrapperId + " *").each(function () {
					if( $(this).attr("updatable") == "false") {
						$(this).attr("disabled",false);
					} else if($(this).attr("updatable") == "hidden") {
						$(this).show();
					} else if($(this).attr("updatable") == "show") {
						$(this).hide();
					}
				});
			} else {
				$(lsWrapperId + " *").each(function () {
					if( $(this).attr("updatable") == "false") {
						$(this).attr("disabled",true);
					} else if($(this).attr("updatable") == "hidden") {
						$(this).hide();
					} else if($(this).attr("updatable") == "show") {
						$(this).show();
					}
				});
			}
		}
    },
	// lsWrapperId 안의 모든 input element 에 사이트에 사용될 공통 event 를 등록시켜 주는 공통함수;
	// 사용시전 - document.ready 시 사용 , 해당 element 가 동적으로 추가되었을때 사용
	// lsWrapperId : input element 를 감싸는 wrapper 태그의 id값 - #포함
    applyCommJquery: function () {
    	var lsWrapperId = "#" + $(this).attr("id");
    	$(lsWrapperId + " input[type=text]").focusin(function () {
    		if (!($(this).attr("readonly") == "readonly" || $(this).attr("readonly") == true)) {
    			$(this).select();
    		}
    	});

    	$(lsWrapperId + " input[type=TEXT]").each(function () {
    		if (typeof ($(this).attr("format")) != "undefined") {
    			switch ($(this).attr("format")) {
    				case "rate25":
    					$(this).css({"text-align":"right"}).blur(function () {
    						$(this).val(Comm.rate($(this).val(), 2, 5));
    					});
    					break;
    				/*case "money":
    					$(this).css({"text-align":"right"}).keyup(function () {
    						$(this).val(Comm.money($(this).val()));
    					});
    					break;*/
    				case "number":
    					$(this).css({"text-align":"right"}).keyup(function () {
    						$(this).val(Comm.number($(this).val()));
    					});
    					break;
    				case "no":
    					$(this).css({"text-align":"right"}).keyup(function () {
    						$(this).val(Comm.no($(this).val()));
    					});
    					break;
    				case "date":
    					$(this).css({"text-align":"center"}).attr("readonly",false).datepicker(Comm.datepicker).dblclick(function () {
                        	$(this).val("");
                        });
    					$(this).css({"text-align":"center"}).blur(function () {
    						$(this).val(Comm.dateFormatterReadTrue($(this).val()));
    					});
    					break;
    			}
    		}
    		if( typeof($(this).attr("maxlength")) != "undefined" ) {
    			$(this).keyup(function () {
        			if($(this).val().length == parseInt($(this).attr("maxlength"))) {
        				if (typeof ($(this).attr("next")) != "undefined") {
        					var nextElem = $(lsWrapperId + " *[name=" + $(this).attr("next") + "]");
        					var i = 0;
        					while( ( typeof(nextElem.attr("disabled")) != "undefined" || nextElem.attr("disabled")==true ) && i < 10 ) {
        						nextElem = $(lsWrapperId + " *[name=" + nextElem.attr("next") + "]");
        						i++;
        					}
            				nextElem.focus();
        				}
        			}
    			});
    		}
    	});

    	$(lsWrapperId + " input").keydown(function (e) {
    		// 엔터키나 탭키가 눌렸다면
    		//if (e.keyCode == 13 || e.keyCode == 9) {
    		if (e.keyCode == 13) {
    			if (typeof ($(this).attr("command")) != "undefined") {
    				e.preventDefault();
    				eval($(this).attr("command"));
    			} else if (typeof ($(this).attr("next")) != "undefined") {
    				e.preventDefault();
    				var nextElem = $(lsWrapperId + " *[name=" + $(this).attr("next") + "]");
					var i = 0;
					while( ( typeof(nextElem.attr("disabled")) != "undefined" || nextElem.attr("disabled")==true ) && i < 10 ) {
						nextElem = $(lsWrapperId + " *[name=" + nextElem.attr("next") + "]");
						i++;
					}
    				nextElem.focus();
    			}
    		}
    	});

    	$(".ui-datepicker-trigger").each(function () {
    		$(this).css({ "margin-left": "3px;" });
    		if ($(this).prev().attr("title") != undefined) {
    			$(this).attr("alt", $(this).prev().attr("title"));
    			$(this).attr("title", $(this).prev().attr("title"));
    		}
    	});
    }

});


Number.prototype.toFixed_new = function (n) {
	if (!n || typeof n != "number" || n > 12) return NaN;
	var reck = 1;
	for (var i = 0; i < n; i++) reck *= 10;
	return parseInt(this * reck) / reck;
};

Number.prototype.read = function () {
	if (this == 0) return '영';
	var phonemic = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
	var unit = ['', '', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억', '백억', '천억', '조', '십조', '백조'];

	var ret = '';
	var part = new Array();
	for (var x = 0; x < String(this).length; x++) part[x] = String(this).substring(x, x + 1);
	for (var i = 0, cnt = String(this).length; cnt > 0; --cnt, ++i) {
		p = phonemic[part[i]];
		p += (p) ? (cnt > 4 && phonemic[part[i + 1]]) ? unit[cnt].substring(0, 1) : unit[cnt] : '';
		ret += p;
	}
	return ret;
};


var GridFormatter = {

	date: function (cellvalue, options, rowObject) {
		return Comm.date(cellvalue, "-");
	}

};


var Comm = {

	seperator: "\\",
	esignDiv: "╅╅",
	
	regExChk: {
		TEL_NO : /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
		EMAIL  : /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
	},

	// asParam을 aiLen 길이만큼 asFill을 채워서 만든다.
	// Comm.fill("2", "0", 3) → "002"
	fill: function (asParam, asFill, aiLen) {
		if (typeof arguments[1] == "number")
			return this.fill(asParam, arguments[2], arguments[1]);
		else {
			var lsReturn = asParam.toString();

			while (lsReturn.length < aiLen)
				lsReturn = asFill + lsReturn;

			return lsReturn;
		}
	},
	// 왼쪽에서 특정 길이로 잘라서 반환: Comm.left("abcde", 2); => "ab"
	left: function (asInput, aiLen) {
		if (asInput == undefined)
			return "";
		if (aiLen < 0)
			return "";
		if (asInput.length < aiLen)
			return asInput;

		return asInput.substring(0, aiLen);
	},
	right: function (asInput, aiLen) {
		if (aiLen < 0)
			return "";
		if (asInput.length < aiLen)
			return asInput;
		return asInput.substring(asInput.length - aiLen);
	},
	// 숫자인지 체크
	number: function (aiNum, asInit) {
		var liNum = Comm.nvl(aiNum);
		if (typeof aiNum != 'string')
			liNum = aiNum.toString();

		var lsNumber = liNum.replace(/[^0-9]/g, '');
		if( lsNumber == "" ) {
			liNum = asInit;
		} else {
			liNum = Number(lsNumber);
			if ($.isNumeric(liNum) == false) {
				if (typeof (asInit) == "undefined")
					liNum = 0;
				else
					liNum = asInit;
			}
		}
		return liNum;
	},
	no: function (aiNum) {
		var liNum = Comm.nvl(aiNum);
		if (typeof aiNum != 'string')
			liNum = aiNum.toString();
		return liNum.replace(/[^0-9]/g, '');
	},
	bizno: function (asBizNo) {
		var lsBizNo = Comm.nvl(asBizNo);
		var lsReturn = "";
		lsBizNo = lsBizNo.replace(/[^0-9]/g, '');
		liLen = lsBizNo.length;
		if (liLen >= 10) {
			lsReturn = lsBizNo.substring(0, 3) + "-" + lsBizNo.substring(3, 5) + "-" + lsBizNo.substring(5, 10);
		} else if (liLen >= 6) {
			lsReturn = lsBizNo.substring(0, 3) + "-" + lsBizNo.substring(3, 5) + "-" + lsBizNo.substring(5);
		} else if (liLen >= 3) {
			lsReturn = lsBizNo.substring(0, 3) + "-" + lsBizNo.substring(3);
		} else {
			lsReturn = lsBizNo;
		}
		return lsReturn;
	},
	// 백분율 표기(숫자,소수점자리수,전체자리수)
	rate: function (number, rateLen, totLen) {
		if (typeof number != 'string')
			number = number.toString();
		var lsnumber = number.replace(/[^[0-9\.]]/g, '');
		number = Number(lsnumber);
		while (number > 100) {
			number = number / 10;
		}
		number = number.toFixed(rateLen);
		if ($.isNumeric(number) == false) {
			if (typeof (asInit) == "undefined")
				number = 0;
			else
				return asInit;
		}
		return number;
	},
	// 3자리 쉼표(금액)
	/*money: function (number, asInit) {
		if(number == null) {return;}
		
		if (typeof number != 'string')
			number = number.toString();

		var lsnumber = number.replace(/[^0-9]/g, '');
		number = Number(lsnumber);
		if ($.isNumeric(number) == false) {
			if (typeof (asInit) == "undefined")
				number = 0;
			else
				return asInit;
		}
		number = '' + number;

		if (number.length > 3) {
			var mod = number.length % 3;
			var output = (mod > 0 ? (number.substring(0, mod)) : '');

			for (var i = 0; i < Math.floor(number.length / 3) ; i++) {
				if ((mod == 0) && (i == 0))
					output += number.substring(mod + 3 * i, mod + 3 * i + 3);
				else
					output += ','
							+ number.substring(mod + 3 * i, mod + 3 * i + 3);
			}

			return (output);
		} else
			return number;
	},*/
	// 파일경로에서 파일명만 추출
	filename: function (asName) {
		lsrName = Comm.nvl(asName).split("\\");
		return lsrName[lsrName.length - 1].toString();
	},
	// 파일명에 style 적용
	filenameHand: function (asName) {
		return '<span style="cursor:pointer; text-decoration:underline;color:blue">' + this.filename(asName) + '</span>';
	},
	// byte 파일크기를 여러형식으로 반환
	filesize: function (asSize) {
		var liSize = Number(asSize);
		if (liSize < 1024) {
			return liSize + " Bytes";
		} else {
			liSize /= 1024;
			if (liSize < 1024) {
				return liSize.toFixed(2) + " KB";
			} else {
				liSize /= 1024;
				if (liSize < 1024) {
					return liSize.toFixed(2) + " MB";
				}
			}
		}

	},

	dateFormatter: function (cellvalue, options, rowObject) {
		return Comm.date(cellvalue, "-");
	},
	dateFormatterReadTrue: function (cellvalue, options, rowObject) {
		return Comm.dateMax(cellvalue, "-");
	},
	moneyFormatter: function (cellvalue, options, rowObject) {
		return Comm.money(cellvalue);
	},
	moneyFormat: {
	        decimalSeparator : ".",
	        thousandsSeparator : ",",
	        decimalPlaces : 0,
	        prefix : "",
	        suffix : "",
	        defaulValue : 0
	},
	// 날짜형식변환
	date: function (asDate, asDiv) {
		if (typeof (asDiv) == "undefined") asDiv = "-";
		var lsReturn = Comm.nvl(asDate);

		if (lsReturn != "" && lsReturn.length == 8) {
			lsReturn = Comm.left(asDate, 4) + asDiv + asDate.substring(4, 6) + asDiv + asDate.substring(6);
		} else if (lsReturn != "" && lsReturn.length <= 6) {
			lsReturn = Comm.left(asDate, 4) + "년 " + asDate.substring(4)+"월";
		}
		return lsReturn;
	},
	// 날짜형식변환 10자리 고정
	dateMax: function (asDate, asDiv) {
		if (typeof (asDiv) == "undefined") asDiv = "-";
		var lsReturn = Comm.nvl(asDate);

		if (lsReturn != "" && lsReturn.length == 8) {
			lsReturn = Comm.left(asDate, 4) + asDiv + asDate.substring(4, 6) + asDiv + asDate.substring(6);
		} else if (lsReturn != "" && lsReturn.length > 10) {
			return "";
		}
		return lsReturn;
	},
	// 문자열 대체 함수: Comm.replace("가,나,다,라", ",", "") => "가나다라"
	replace: function (asInput, asStr, asReplaceStr) {
		return asInput.split(asStr).join(asReplaceStr);
	},
	// 공백문자 제거
	nvl: function (asParam) {
		var lsReturn = "";

		if (asParam != null)
			lsReturn = this.trim(asParam.toString());

		if (typeof arguments[1] != "undefined") {
			if (lsReturn == "")
				lsReturn = arguments[1];
		}

		return lsReturn;
	},
	nvlHtml: function (asParam) {
		var lsReturn = Comm.nvl(asParam);
		if (lsReturn == "") {
			lsReturn = "&nbsp;";
		}
		return lsReturn;
	},
	// 왼쪽 공백 또는 특정 문자열 제거
	ltrim: function (asInput) {
		if (typeof arguments[1] == "undefined")
			return asInput.replace(/^\s+/g, "");
		else {
			var lsInput = asInput;
			var lsInput2 = arguments[1];
			var liInput2Len = arguments[1].length;

			while (this.left(lsInput, liInput2Len) == lsInput2) {
				if (lsInput.length < liInput2Len)
					return lsInput;

				lsInput = lsInput.substring(liInput2Len);
			}

			return lsInput;
		}
	},
	// 오른쪽 공백 또는 특정 문자열 제거
	rtrim: function (asInput) {
		if (typeof arguments[1] == "undefined")
			return asInput.replace(/\s+$/g, "");
		else {
			var ls_input = asInput;
			var lsInput2 = arguments[1];
			var liInput2Len = arguments[1].length;

			while (this.right(ls_input, liInput2Len) == lsInput2) {
				if (ls_input.length < liInput2Len)
					return ls_input;

				ls_input = ls_input.substring(0, ls_input.length - liInput2Len);
			}

			return ls_input;
		}
	},
	// 양쪽 공백 또는 특정 문자열 제거
	trim: function (asInput) {
		if (asInput == null)
			return "";

		if (typeof arguments[1] == "undefined")
			return asInput.replace(/^\s+|\s+$/g, "");
		else
			return this.rtrim(this.ltrim(asInput, arguments[1]), arguments[1]);
	},
	// 팝업 메시지 띄우기
	popMessage: function (errorMessage) {
		var strHtml = '<div id="popup"'
					+ '     class="ui-loader ui-overlay-shadow ui-body-a ui-corner-all"'
					+ '     style="width: 300px; text-align: center;">'
					+ '	<h3 style="padding: 10px;">' + errorMessage + '</h3>'
					+ '</div>';

		$(strHtml).css({
			"display": "block",
			"opacity": 0.96,
			"left": $(window).scrollLeft() + ($(window).width() / 2) - 150,
			"top": $(window).scrollTop() + ($(window).height() * 0.5)
		}).appendTo('body').delay(1000).fadeOut(800,
				function () {
					$(this).remove();
				});
	},
	// 메시지 공통
	alert: function (asMsg) {
		if (top.gSite.alert == false) {
			CommonJs.jAlert("알림", asMsg, null);
		} else {
			lsMsg = asMsg.replace(/[<]br [/][>]/gi, "\n");
			lsMsg = lsMsg.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/g, "");
			alert(lsMsg);
		}
		return;
		//Comm.alert(asMsg);
	},
	
	// 메시지 공통 2
	alert2: function (asMsg, h,w) {
		if (top.gSite.alert == false) {
			CommonJs.jAlert2("알림", asMsg, null, h, w); // title, content, callback, h, w
		} else {
			lsMsg = asMsg.replace(/[<]br [/][>]/gi, "\n");
			lsMsg = lsMsg.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/g, "");
			alert(lsMsg);
		}
		return;
		//Comm.alert(asMsg);
	},
	
	// confirm 메시지 박스 띄우기
	showQMsg: function (msg, callbackFunc) {
		$.msgBox({
			title: "메시지",
			content: msg,
			type: "confirm",
			buttons: [{
				value: "예"
			}, {
				value: "아니요"
			}],
			success: callbackFunc
		});
	},
	// object copy
	objectCopy: function (aoArg) {
		return JSON.parse(JSON.stringify(aoArg));
	},
	appendObject: function (aoMap, aoMapAppend) {
//		$.extend(aoMap, aoMapAppend);
		for (var key in aoMapAppend) {
			aoMap[key] = aoMapAppend[key];
		}
	},
	appendArray: function (aoArray, aoArrayAppend) {
		for (var i = 0; i < aoArrayAppend.length; i++) {
			aoArray.push(Comm.objectCopy(aoArrayAppend[i]));
		}
	},
	// Array > Map 확인
	printArrayMap: function (aoArray) {
		var lsPrint = "";
		var loArray = null;
		var loMap = null;

		if (typeof (arguments[0]) == "string") {
			lsPrint += "--------------------------------------------\n";
			lsPrint += arguments[0];
			lsPrint += "\n--------------------------------------------\n";

			loArray = arguments[1];
		} else {
			loArray = arguments[0];
		}

		if(loArray == null) {
			
			lsPrint += "해당 배열은 null 입니다";
			
		} else {
			
			for (var i = 0; i < loArray.length; i++) {
				lsPrint += "===== [" + i + "] =====\n";
				loMap = loArray[i];
	
				for (var lsKey in loMap) {
					lsPrint += "" + lsKey + "=" + loMap[lsKey] + ",";
				}
	
				lsPrint = lsPrint.substr(0, lsPrint.length - 1);
				lsPrint += "\n";
			}
		
		}
		alert(lsPrint);
	},
	// Array 확인
	printArray: function (aoArray) {
		var lsPrint = "";
		var loArray = null;

		if (typeof (arguments[0]) == "string") {
			lsPrint += "--------------------------------------------\n";
			lsPrint += arguments[0];
			lsPrint += "\n--------------------------------------------\n";

			loArray = arguments[1];
		} else
			loArray = arguments[0];

		if(loArray == null) {
			
			lsPrint += "해당 배열은 null 입니다";
			
		} else {
			for (var i = 0; i < loArray.length; i++) {
				lsPrint += "[" + i + "] : " + loArray[i];
	
				if (i < loArray.length - 1)
					lsPrint += "\n";
			}
		}
		alert(lsPrint);
	},
	mapLen : function(aoMap) {
		var liRtn = 0;
		if( aoMap != null ) {
			try{
				for( var key in aoMap ) liRtn++;
			}catch(e) {
				liRtn = 0;
			}
		}
		return liRtn;
	},
	// object (map) 출력
	printMap: function () {
		var lsPrint = "";
		var loMap = null;

		if (typeof (arguments[0]) == "string") {
			lsPrint += "--------------------------------------------\n";
			lsPrint += arguments[0];
			lsPrint += "\n--------------------------------------------\n";

			loMap = arguments[1];
		} else
			loMap = arguments[0];

		if(loMap == null) {
			
			lsPrint += "해당 맵은 null 입니다";
			
		} else {
			
			for (var lsKey in loMap) {
				lsPrint += "" + lsKey + " = " + loMap[lsKey];
				lsPrint += "\n";
			}
			
		}

		alert(lsPrint);
	},
	printCode: function() {
		var lsPrint = "";
		var loMap = null;
		
		if (typeof (arguments[0]) == "string") {
			lsPrint += "--------------------------------------------\n";
			lsPrint += arguments[0];
			lsPrint += "\n--------------------------------------------\n";

			arrCode = arguments[1];
		} else
			arrCode = arguments[0];

		for( var i = 0 ; i < arrCode.length; i++ ) {
			for( key in arrCode[i] ) {
				lsPrint += key + ":" + arrCode[i][key] + " , ";
			}
			lsPrint += "\n";
		}	

		alert(lsPrint);
	},
	// webservie error 공통
	errorCommon: function (data, context, method) {
		Comm.printMap(data);
		Comm.alert(method);
	},
	// aoMap 내에 asKey 가 있는지 조회
	containsKey: function (aoMap, asKey) {
		var lbReturn = false;
		for (var key in aoMap) {
			if (key == asKey) {
				lbReturn = true;
				break;
			}
		}
		return lbReturn;
	},
	// asrData 내에 asVal 값이 있는지 조회
	arrExist: function (asrData, asVal) {
		var lbReturn = false;
		for (var i = 0; i < asrData.length; i++) {
			if (asrData[i] == asVal) {
				lbReturn = true;
				break;
			}
		}
		return lbReturn;
	},
	// jquery datePicker 속성 공통
	datepicker: {
		showOn: "both",
		buttonImage: "/resources/_img/common/ico_cal.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		yearRange: 'c-3:c+2',
		minDate: '-3y',
		showAnim: "fadeIn" 
		


	},
	// 필수항목체크
	// asFormId : 적용될 input element 를 감싸는 wrapper 태그의 id - #포함
	// 필수 항목을 체크할 element 의 name 값 - 쉼표로 구분하여 넣는다 (주의) 해당 element에는 반드시 title이 있어야 한다.
	inputRequiredCheck: function (asFormId, asName) {
		var lbReturn = true;
		var lsTitle = "";

		if (asName == "") return lbReturn;

		var lsrName = asName.split(",");
		var lsTmp = "";
		for (var i = 0; i < lsrName.length; i++) {
			//$(asFormId + " input[name=" + lsrName[i] + "]," + asFormId + " textarea[name=" + lsrName[i] + "]").each(function () {
			$(asFormId + " input[name=" + lsrName[i] + "]," + asFormId + " textarea[name=" + lsrName[i] + "]," + asFormId + " select[name=" + lsrName[i] + "]").each(function () {
				if ($(this).val() == "") {
					lbReturn = false;
					lsTmp = $(this).attr("title");
					lsTitle += (lsTitle == "") ? lsTmp : ", " + lsTmp;
				}
			});
		}

		if (lbReturn == false) {
			Comm.alert("<strong>[ " + lsTitle + " ]</strong><br />위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.");
		}
		return lbReturn;
	},

	// data 로 select element 바인딩
	// aoElement	: 바인딩 대상 element
	// aoData		: 바인딩 data
	// amOption { ITEM:[{VAL:"",TEXT:""}], DEFAULT:"" }
	setSelectItem: function (aoElement, aoData, amOption) {

		$(aoElement + " option").remove();

		var loMap = null;
		var lsDefault = (Comm.containsKey(amOption, "DEFAULT") == true) ? amOption.DEFAULT : "";

		if (Comm.containsKey(amOption, "ITEM")) {
			for (var i = 0; i < amOption.ITEM.length; i++) {
				loMap = amOption.ITEM[i];
				$(aoElement).append('<option value="' + loMap.VAL + '"' + ((loMap.VAL == lsDefault) ? ' selected' : '') + '>' + loMap.TEXT + '</option>');
			}
		}
		
		if( Comm.containsKey( amOption, "REMOVE" ) ) {
			
			var lbRemove = false;
			
			if (aoData != "" && aoData != null) {
				for (var i = 0; i < aoData.length; i++) {
					if(  aoData[i].CODE_NM != "" && typeof aoData[i].CODE_NM != "undefined" ) {
						lbRemove = false;
						for (var j = 0; j < amOption.REMOVE.length; j++) {
							if( aoData[i].CODE_CD == amOption.REMOVE[j] ) {
								lbRemove = true;
								break;
							}
						}
						if( lbRemove == false ) {
							$(aoElement).append('<option value="' + aoData[i].CODE_CD + '"' + ((aoData[i].CODE_CD == lsDefault) ? ' selected' : '') + '>' + aoData[i].CODE_NM + '</option>');
						}
						
					}
					
				}
			}
			
		} else {
			
			if (aoData != "" && aoData != null) {
				for (var i = 0; i < aoData.length; i++) {
					if(  aoData[i].CODE_NM != "" && typeof aoData[i].CODE_NM != "undefined" )
					$(aoElement).append("<option value='" + aoData[i].CODE_CD + "'" + ((aoData[i].CODE_CD == lsDefault) ? " selected" : "") + ">" + aoData[i].CODE_NM + "</option>");
				}
			}
			
		}

		

	},
	// ajax call 공통 - 모든 ajax 통신에 쓰이는 공통 함수
	callAjax: function (aoAjaxData, successFunc, errorFunc) {

		var dataForm = aoAjaxData.DATAFORM;								// data 를 생성할 dataForm
		var cmd      = aoAjaxData.CMD;									// 처리 CMD ( SELECT, UPDATE )
		var sum		 = "N";
		var sqlmapid = aoAjaxData.SQLMAPID;							    // 호출 sqlMapId
		var transkey = aoAjaxData.TRANSKEY;								// 전문 송수신 trans 가 저장될 key 값.
		var data = null;												// 사용자정의 DATA
		var datablock = null;											// 사용자정의 DATABLOCK
		var async = true;												// 비동기처리여부
		
		if (this.containsKey(aoAjaxData, "DATA") == true) {
			data = aoAjaxData.DATA;
		}
		if (this.containsKey(aoAjaxData, "DATABLOCK") == true) {
			datablock = aoAjaxData.DATABLOCK;
		}
		if (this.containsKey(aoAjaxData, "ASYNC") == true) {
			async = aoAjaxData.ASYNC;
		}
//		if (this.containsKey(aoAjaxData, "FILENAME") == true) {
//			filename = aoAjaxData.FILENAME;
//		}
		
		var loTrans = new VTrans();
		
		if( cmd == "SELECT" ) {
			loTrans.url = "/AjaxSelect.do";
		} else if( cmd == "INSERT" || cmd == "UPDATE" || cmd == "DELETE" ) {
			loTrans.url = "/AjaxUpdate.do";
		} else if( cmd == "UPDATE_MULTI" ) {
			loTrans.url = "/AjaxUpdateMulti.do";
		} else if( cmd == "EXCEL"){
			loTrans.url = "/AjaxExcel.do";	
		}else {
			Comm.alert("CMD는 SELECT 또는 INSERT,UPDATE,DELETE 어야만 합니다.");
			return;
		}
		
		if (this.containsKey(aoAjaxData, "URL") == true) {
			loTrans.url = aoAjaxData.URL;
		}
		if (this.containsKey(aoAjaxData, "SUM") == true) {
			sum = aoAjaxData.SUM;
		}
		

//		Comm.printMap("loTrans.request", loTrans.request);
//		Comm.printMap("loTrans.request.HEADER", loTrans.request.HEADER);
//		Comm.printArrayMap("loTrans.request.DATABLOCK", loTrans.request.DATABLOCK)
//		Comm.printMap("loTrans.response", loTrans.response);

		loTrans.async = async;
		var header = loTrans.request.HEADER;

		//  ###  DATABLOCK DATA 생성 시작  ###

		var loData = {};

		if (this.containsKey(top.gSite.session, "USER") == true) {
			if(top.gSite.session.USER != null){
				loData.REG_ID = top.gSite.session.USER.USER_ID;
				loData.UPD_ID = top.gSite.session.USER.USER_ID;
			}
		}
		//if (this.containsKey(top.gSite.session, "USER_GRP_CD") == true) {
		//	loData.USER_GRP_CD = top.gSite.session.USER_GRP_CD;
		//	loData.COMPANY_SP_CD = Comm.getCompanyDiv(top.gSite.session.USER_GRP_CD);
		//}

		if (datablock != null) {
			var tmpDatablock = null;
			var tmpData = null;
			for (var i = 0; i < datablock.length; i++) {
				tmpData = Comm.objectCopy(loData);
				tmpDatablock = Comm.objectCopy(datablock[i]);
				Comm.appendObject(tmpData, tmpDatablock);
				datablock[i] = tmpData;
			}
		} else {
			var loFormData = {};
			if (dataForm != null && dataForm != "") {
				loFormData = $(dataForm).serializeObject();	// dataForm 으로 송신 data 생성
//				Comm.printMap("loFormData", loFormData);
				Comm.appendObject(loData, loFormData);
			}

			if (data != null) {
				Comm.appendObject(loData, data);
			}
		}

		//  ###  DATABLOCK DATA 생성 끝  ###

//		if (filename != null) {
//			header.FILENAME = filename;
//		}

		header.CMD = cmd;
		header.SUM = sum;
		header.SQLMAPID = sqlmapid;
//		header.QUERYXML = queryxml
		
		if (datablock != null) {
			loTrans.request.DATABLOCK = datablock;
		} else {
			loTrans.request.DATABLOCK.push(loData);
		}

		
//		Comm.printMap("loTrans.request.HEADER", loTrans.request.HEADER);
//		Comm.printArrayMap("loTrans.request.DATABLOCK", loTrans.request.DATABLOCK)
//		Comm.printMap("loTrans.response", loTrans.response);
		
//		header.ROWCNT = loTrans.request.DATABLOCK.length;
		top.gSite.trans[transkey] = loTrans;
//		Comm.alert("transkey = " + transkey);
//		Comm.alert("top.gSite.trans[transkey] = " + top.gSite.trans[transkey]);
		
		loTrans.send(successFunc, errorFunc);

	},
	callExcel: function(aoExcelMap) {
		
		var loDataBolck = [];
		if(Comm.containsKey(aoExcelMap, "CMD") == false) {
			aoExcelMap.CMD = "EXCEL";
		}
		if(Comm.containsKey(aoExcelMap, "SQLMAPID") == false) {
			Comm.alert("SQLMAPID 값은 필수항목 입니다.");
			return;
		}
		if(Comm.containsKey(aoExcelMap, "FILENM") == false) {
			Comm.alert("FILENM 값은 필수항목 입니다.");
			return;
		}
		if(Comm.containsKey(aoExcelMap, "DATA")) {
			if(aoExcelMap.DATA != null && aoExcelMap.DATA != "") {
				loDataBolck.push(aoExcelMap.DATA);
			}
		}
		if(Comm.containsKey(aoExcelMap, "HEADER") == false) {
			Comm.alert("HEADER 값은 필수항목 입니다.");
			return;
		}
		
		var reqJson = {};
		reqJson.HEADER = aoExcelMap;
		reqJson.DATABLOCK = loDataBolck;

		top.$("#form_excel input[name=MSG]").val(encodeURIComponent(JSON.stringify(reqJson)));
		top.$("#form_excel").submit();
		
		Comm.alert("엑셀 다운로드시 다소 시간이 걸릴 수 있습니다.<br />잠시만 기다려 주세요");
		
//		top.$("#frm_excel").attr("src","/AjaxExcel.do?MSG=" + escape(encodeURIComponent(JSON.stringify(reqJson))));
//		top.$("#frm_excel").attr("src","/AjaxExcel.do?CMD=" + aoExcelMap.CMD + "&SQLMAPID=" + aoExcelMap.SQLMAPID + "&FILENM=" + aoExcelMap.FILENM +  "&HEADER=" + JSON.stringify(aoExcelMap.HEADER) + "&DATABLOCK="+JSON.stringify(loDataBolck));
		
	},
	callExcel2: function(aoExcelMap) {
		
		var loDataBolck = [];
		if(Comm.containsKey(aoExcelMap, "CMD") == false) {
			aoExcelMap.CMD = "EXCEL";
		}
		if(Comm.containsKey(aoExcelMap, "SQLMAPID") == false) {
			Comm.alert("SQLMAPID 값은 필수항목 입니다.");
			return;
		}
		if(Comm.containsKey(aoExcelMap, "FILENM") == false) {
			Comm.alert("FILENM 값은 필수항목 입니다.");
			return;
		}
		if(Comm.containsKey(aoExcelMap, "DATA")) {
			if(aoExcelMap.DATA != null && aoExcelMap.DATA != "") {
				loDataBolck.push(aoExcelMap.DATA);
			}
		}
		if(Comm.containsKey(aoExcelMap, "HEADER") == false) {
			Comm.alert("HEADER 값은 필수항목 입니다.");
			return;
		}
		
		var reqJson = {};
		reqJson.HEADER = aoExcelMap;
		reqJson.DATABLOCK = loDataBolck;

		top.$("#form_excel input[name=MSG]").val(encodeURIComponent(JSON.stringify(reqJson)));
		top.$("#form_excel").submit();
		
		//Comm.alert("엑셀 다운로드시 다소 시간이 걸릴 수 있습니다.<br />잠시만 기다려 주세요");
		
//		top.$("#frm_excel").attr("src","/AjaxExcel.do?MSG=" + escape(encodeURIComponent(JSON.stringify(reqJson))));
//		top.$("#frm_excel").attr("src","/AjaxExcel.do?CMD=" + aoExcelMap.CMD + "&SQLMAPID=" + aoExcelMap.SQLMAPID + "&FILENM=" + aoExcelMap.FILENM +  "&HEADER=" + JSON.stringify(aoExcelMap.HEADER) + "&DATABLOCK="+JSON.stringify(loDataBolck));
		
	},
	// ajax call 공통 - 모든 ajax 통신에 쓰이는 공통 함수
//	callExcel: function (aoAjaxData) {
//
//		var dataForm = aoAjaxData.DATAFORM;								// data 를 생성할 dataForm
//		var dbinfo = aoAjaxData.DBINFO;									// 해당 DB ( 기본 : ITCEN )
//		var workid = aoAjaxData.WORKID;									// 작업ID ( 기본:NORMAL , 합계조회:SUM , FILE등록: FILES , 각종구매관련전송:SEND , 엑셀다운로드:EXCEL )
//		var queryxml = aoAjaxData.QUERYXML;								// 해당 query xml 파일
//		var queryid = aoAjaxData.QUERYID;								// 해당 query id
//		var querycmd = aoAjaxData.QUERYCMD;								// 해당 query cmd ( SELECT , INSERT , UPDATE , DELETE )
//		var filename = aoAjaxData.FILENAME;
//		var data = null;												// 사용자정의 DATA
//		var datablock = null;
//		var async = true;
//		if (this.containsKey(aoAjaxData, "DATA") == true) {
//			data = aoAjaxData.DATA;
//		}
//		if (this.containsKey(aoAjaxData, "DATABLOCK") == true) {
//			datablock = aoAjaxData.DATABLOCK;
//		}
//		var loTrans = new VTrans();
//		loTrans.async = async;
//		var header = loTrans.request.HEADER;
//
//		var loData = {};
//
//		//if (this.containsKey(top.gSite.session, "COMPANY_CD") == true) {
//		//	loData.COMPANY_CD = top.gSite.session.COMPANY_CD;
//		//}
//		if (this.containsKey(top.gSite.session, "USER_ID") == true) {
//			loData.REG_USER = top.gSite.session.USER_ID;
//			loData.MODI_USER = top.gSite.session.USER_ID;
//		}
//		//if (this.containsKey(top.gSite.session, "USER_GRP_CD") == true) {
//		//	loData.USER_GRP_CD = top.gSite.session.USER_GRP_CD;
//		//	loData.COMPANY_SP_CD = Comm.getCompanyDiv(top.gSite.session.USER_GRP_CD);
//		//}
//		//if (this.containsKey(top.gSite.session, "SUPP_CD") == true) {
//		//	loData.SUPP_CD = top.gSite.session.SUPP_CD;
//		//}
//		//if (this.containsKey(top.gSite.session, "DEPT_CD") == true) {
//		//	loData.DEPT_CD = top.gSite.session.DEPT_CD;
//		//}
//		//if (this.containsKey(top.gSite.session, "EMP_CD") == true) {
//		//	loData.EMP_CD = top.gSite.session.EMP_CD;
//		//}
//
//		if (datablock != null) {
//			var tmpDatablock = null;
//			var tmpData = null;
//			for (var i = 0; i < datablock.length; i++) {
//				tmpData = Comm.objectCopy(loData);
//				tmpDatablock = Comm.objectCopy(datablock[i]);
//				Comm.appendObject(tmpData, tmpDatablock);
//				datablock[i] = tmpData;
//			}
//		} else {
//			var loFormData = {};
//			if (dataForm != "") {
//				loFormData = Comm.getFormElement(dataForm);			// dataForm 으로 송신 data 생성
//				for (var key in loFormData) {
//					loData[key] = loFormData[key];
//				}
//			}
//
//			if (data != null) {
//				for (var key in data) {
//					loData[key] = data[key];
//				}
//			}
//		}
//
//		header.DBINFO = dbinfo;
//		header.WORKID = workid;
//		header.QUERYXML = queryxml
//		header.FILENAME = filename;
//		header.QUERYCMD = querycmd;
//		header.QUERYID = queryid;
//
//		if (datablock != null) {
//			if (gbDebug)
//				Comm.printArrayMap(datablock);
//			loTrans.request.DATABLOCK = datablock;
//
//		} else {
//			loTrans.request.DATABLOCK.push(loData);
////			Comm.printMap(loData);
//		}
//
//		header.ROWCNT = loTrans.request.DATABLOCK.length;
//
//		var transMsg = JSON.stringify(loTrans.request);
//
//		$("#excelForm > input[name=MSG]").val(transMsg);
//		//$("#excelForm > input[name=MSG]").val(escape(encodeURIComponent(transMsg)));
//
//		//Comm.alert($("#excelForm > input[name=MSG]").val());
//
//		$("#excelForm").submit();
//
//	},
	dialogOpen: function (asId, aoMap) {
		var loMap = {
			modal: true,
			resizable: false,
			show: "fadeIn",
			hide: "fadeOut",
			close: false
		};
		Comm.appendObject(loMap, aoMap);
		top.gbDialog = true;
		$(asId).dialog(loMap);
	},
	dialogClose: function (asId) {
		top.gbDialog = false;
		$(asId).dialog('close');
	},
	print: function () {
		$("#iPrint").get(0).contentWindow.print();
	},
	getCodeNm: function (asKey, asCd) {
		var lsReturn = "";
		var loCode = null;
		for (var i = 0; i < top.gSite.code[asKey].length; i++) {
			loCode = top.gSite.code[asKey][i];
			if (loCode["CODE_CD"] == asCd) {
				lsReturn = loCode["CODE_NM"];
				break;
			}
		}
		return lsReturn;
	},
	workFuncCall: function () {
		try {
			eval(top.gsWorkFunc);
		} catch (e) {
			Comm.alert(top.gsWorkFunc + " 처리 함수가 존재하지 않습니다 !\n관리자에 문의 바랍니다.");
		}
		top.gsWorkFunc = "";
		top.gomWorkParam = {};
	},
	setCalenderEvent : function ( arrBlock ) {
		var lorReturn = [];
		var loData = null;
		var loTmp = null;
		for (var i = 0; i < arrBlock.length; i++) {
			loData = {};
			loTmp = arrBlock[i];
			loData.title = loTmp.TITLE;
			loData.start = Comm.date(loTmp.S_DT, "-");
			lorReturn.push(Comm.objectCopy(loData));
		}
		return lorReturn;
	},
	// loTrans.datablock > Array 바인딩 
	fileArrayMap: function (aoArray, type) {
		var loArray = null;
		var loMap = null;
		var arr = new Array();
		var arr2 = new Array();
		var a,b,c,d;
		var serverUrl = location.href.substring(0, location.href.lastIndexOf("/"));

		loArray = arguments[0];

		if(loArray == null) {
			arr2 = [];
		} else {
			
			for (var i = 0; i < loArray.length; i++) {
				loMap = loArray[i];
	
				for (var lsKey in loMap) {
					if(lsKey == "FILE_NM") a = loMap["FILE_NM"];
					if(lsKey == "FILE_SIZE") b = loMap["FILE_SIZE"];
					if(lsKey == "FILE_SEQ") c = loMap["FILE_SEQ"];
					if(lsKey == "FILE_LOC") d = serverUrl + "/download.do?_filename=" + loMap["FILE_LOC"];
				}
				//순서는 지켜줘야함!
				if (type == "up"){
					arr.push(a); //파일명
					arr.push(b); //용량
					arr.push(c); //파일구분id
				}else if (type == "down"){
					arr.push(d); //url
					arr.push(a); //파일명
					arr.push(b); //용량
				}else{
					arr2 = [];
				}
				
				arr2.push(Comm.objectCopy(arr)); //2차배열 삽입
				arr = []; //초기화 중요!
			}
		}
		return arr2;
	},
	getBizNth : function(aoData) {
		var loBizNth = {BIZ_CD:[],BIZ_NTH:{}};
		Comm.callAjax({
			DATAFORM	: null,
			DATA		: aoData,
			DATABLOCK	: null,
			CMD			: "SELECT",
			SQLMAPID	: "common.get_biz_nth_s01",
			TRANSKEY	: "get_biz_nth_s01",
			ASYNC		: false
		},
		function (data, context, method) {
			
			var loTrans = top.gSite.trans["get_biz_nth_s01"];
			
			loTrans.success(data);
			
			if( loTrans.header.RESULT == "SUCCESS" ) {
				
//				Comm.printMap("header",loTrans.header);
//				Comm.printArrayMap("datablock",loTrans.datablock);
				
				for (var i = 0; i < loTrans.datablock.length; i++) {
					if(Comm.containsKey(loBizNth.BIZ_NTH, loTrans.datablock[i].BIZ_CD) == true) {	// 키가 이미 존재한다면..
						loBizNth.BIZ_NTH[loTrans.datablock[i].BIZ_CD].push({CODE_CD:loTrans.datablock[i].BIZ_NTH, CODE_NM:loTrans.datablock[i].BIZ_NTH + "회차"});
					} else {	// 키가 존재하지 않는다면
						loBizNth.BIZ_CD.push({CODE_CD:loTrans.datablock[i].BIZ_CD, CODE_NM:loTrans.datablock[i].BIZ_NM});
						loBizNth.BIZ_NTH[loTrans.datablock[i].BIZ_CD] = [{CODE_CD:loTrans.datablock[i].BIZ_NTH, CODE_NM:loTrans.datablock[i].BIZ_NTH + "회차"}];
					}
				}
				
			} else {
				
				Comm.Comm.alert(loTrans.data.ERROR);
				
			}
			
			delete top.gSite.trans["get_biz_nth_s01"];
			
			return Comm.objectCopy(loBizNth);
			
		},
		function (data, context, method) {	// error callback
			Comm.alert(method);
		});
		
		return Comm.objectCopy(loBizNth);
	},
	// seok add start
	/*****************************************************
	* 함수명: normalDataToArray
	* 설명   : 그리드 제외 기본 정보들 array로 반환
	*****************************************************/
	normalDataToArray: function (loadData){
		
		var input1 = new Array();
		input1[0] = loadData;
		return JSON.stringify(input1);
	},

	/*****************************************************
	* 함수명: gridDataToArray
	* 설명   : grid에 있는 정보들 array로 반환
	*****************************************************/
	gridDataToArray: function (asId){
		
		var newid = "#" + asId;
		var rows = $(newid).jqGrid('getDataIDs');
		var newArray = new Array();

		for(var i=0; i < rows.length; i++){
			var rowData = $(newid).getRowData(rows[i]);
			newArray[newArray.length] = rowData;
		}

		return JSON.stringify(newArray);
	},
	
	/*****************************************************
	* 함수명: isDefined
	* 설명   : 파라미터로 넘어온 변수가 null인지 empty인지 확인
	*****************************************************/
	isDefined : function (str)
	{
	    var isResult = false;
	    str_temp = str + "";
	    str_temp = str_temp.replace(" ", "");
	    if(str_temp != "undefined" && str_temp != "" && str_temp != "null")
	    {
	        isResult = true;
	    }
	     
	    return isResult;
	}
	// seok add end

};