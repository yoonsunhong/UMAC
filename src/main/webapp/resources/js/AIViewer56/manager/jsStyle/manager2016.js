/* Solbitech Manager System (ver. 2016) Copyright ⓒ 2016 by vip125. All rights reserved */
var managerval = {
	'width' : 0,
	'viewflag' : false,
	'deftabmenu' : '#manager-main-view-chk',
	'defmobilemenu' : '',
	'mobilemenu' : {},
	'mobilemenus' : [],
	'managerInfo' : 'managerInfo2016.jsp',
	'openmenu' : ''
};

// 현재날자처리
String.prototype.string = function(len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function(len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function(len) { return this.toString().zf(len); };
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

$(window).bind("orientationchange", function(e) {
	managerJs.autowindows(); // 모바일 회전감지
});

var managerJs = {};

managerJs.convertcalltag = 
{
	'printCallTag' : 'AIprint.jsp',
	'flashCallTag' : 'AIflashprint.jsp',
	'partViewTag' : 'AIPartView.jsp',
	'chainPringCallTag' : 'AIChainPrint.jsp',
	'chainConvertPdfCallTag' : 'AIChainConvertPdf.jsp',
	'chainConvertExcelCallTag' : 'AIChainConvertExcel.jsp',
	'chainConvertAR5Tag' : 'AR5toAI.jsp',
	'signatureCallTag' : 'aiSignatureService.jsp'
}

managerJs.externalTag = 
{
	'externalJs' : 'js/commonJs-1.0.01.js',
	'externalCss' : 'css/commonCss-1.0.01.css'
}

managerJs.loginhome = function() {
	// 로그인 페이지로 이동
	$(parent.location).attr('href', 'index.jsp');
}

managerJs.setproperties = function() {
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : 'managerInit2016.jsp',
		success : function(jsondata) {
			alert(jsondata.msg);
		},
		error : function(e) {
		}
	});
}

managerJs.browser = function() {
	// 접속자 브라우저 확인 (PC, Mobile)
	var filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform){
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0){
            return true;
        } else {
            return false;
        }
    }
}

managerJs.replaceAll = function(str, searchStr, replaceStr) {
	// JavaScript replaceAll 기능
    return str.split(searchStr).join(replaceStr);
}

managerJs.getdatatrim = function(str) {
	if (str == null) {
		return '';
	} else if (str.trim() == '') {
		return '';
	}
	return str;
}

managerJs.bannerhead = function() {
	// 상단 배너기능
	var current = $('#manager-header-banner > .current');
	if (current.next().length == 0) {
		current.removeClass('current').fadeOut(3000);
		$('.header-banner-text:first').addClass('current').fadeIn(3000);
	} else {
		current.removeClass('current').fadeOut(3000);
		current.next().addClass('current').fadeIn(3000);
	}
}

managerJs.scrollbanner = function() {
	// 상단 스크롤링 배너
	if ($('.header-banner-text').length > 1) {
		$('.header-banner-text:first').addClass('current').fadeIn(1000);
		setInterval('managerJs.bannerhead()', 2000);
	}
}

managerJs.changediv = function(flag, idNm) {
	// div 플래그
	$(idNm).css('display', flag ? 'none' : 'block');
}

managerJs.checkall = function(flag, name) {
	// checkbox flag
	$('input[name=' + name + ']').prop('checked', flag);
}

managerJs.autowindows = function() {
	// UI 자동 사이즈 조정
	managerval.width = parseInt($(window).width());
	//console.log(managerval.mobilemenus);
	if (!managerJs.browser() && $("body").prop("scrollWidth") >= 1350) {
		$('.main-conf-right').css('width', '150px');
		if (!Object.keys) {
			Object.keys = function(obj) {
			    var keys = [];
			    for (var i in obj) {
			    	if (obj.hasOwnProperty(i)) {
			    	  keys.push(i);
			      	}
			    }
			    return keys;
			  };
		}

		if (Object.keys(managerval.mobilemenus).length != 0) {
			for (var diskey in managerval.mobilemenus) {
				$('#' + managerval.mobilemenus[diskey]).attr('style', '');
			}
			managerval.mobilemenus = [];
			managerval.mobilemenu = {};
			if (managerval.defmobilemenu != '') { // 모바일 버전에서 메뉴제어를 한 경우
				managerval.defmobilemenu = '';
			}
		}
		setTimeout(function() {
			$('#manager-main-conf-center').css('width', ((managerval.width >= 900) ? (managerval.width - 826) : 525) + 'px');
		}, 10);
	} else {
		$('.main-conf-right').css('width', (managerval.width - 110) + 'px');
		$('#manager-main-conf-center').css('width', '100%');
	}
	setTimeout(function() {
		var manager_center = $('#manager-main-conf-center').width();
		$('.main-conf-center-right').css('width', (manager_center - 112) + 'px');
	}, 50);
}

managerJs.systemevent = function(idNm) {
	// 버튼 이벤트 처리
	var eventobj = {
		'toggle' : function(toggle1, toggle2) {
			if ($(toggle1).css('display') == 'none' || $(toggle1).css('display') == '') {
				$(toggle2).css('display', 'none');
				setTimeout(function() {
					$(toggle1).fadeIn(500);
				}, 100);
				return true;
			}
			return false;
		},
		'buttovr' : function(buttovr1, buttovr2) {
			$(buttovr1).attr('class', 'header-butt_ovr');
			$(buttovr2).attr('class', 'header-butt');
		},
		'event' : {
			'manager-login' : function event() {
				var managerid = $('#managerId').val();
				var managerpw = $('#managerPw').val();
				if (managerid == '' || managerpw == '') {
					alert('정보를 입력해주세요');
					return;
				}
				
				try {
					var publicKeyModulus = $('#publicKeyModulus').val();
					var publicKeyExponent = $('#publicKeyExponent').val();
					managerJs.submitEncryptedForm(managerid, managerpw, publicKeyModulus, publicKeyExponent);
				} catch (e) {
					// TODO: handle exception
				}
			},
			'header-butt-save' : function event() {
				if (confirm('설정을 저장하시겠습니까?')) {
					$('.placeholdersjs').each(function() {
						if ($(this).attr('placeholder') == $(this).val()) { $(this).val(''); }
					});
					var submit = true;
					$('#manager-form').submit(function(e) {
						if (!submit) return;
						submit = false;
						$.ajax({
							type : 'post',
							dataType : 'json',
							url : managerval.managerInfo,
							data : $(this).serializeArray(),
							success : function(jsondata) {
								alert(jsondata.msg);
								if (jsondata.code != 'error') {
									location.reload(true);
								}
							},
							error : function(e) {
							}
						});
					});
					$('#manager-form').submit();
				}
			},
			'header-butt-exit' : function event() {
				if (confirm('로그아웃 하시겠습니까?')) {
					managerJs.loginhome();
				}
				return;
			},
			'header-butt-view' : function() {
				if (eventobj.toggle('#manager-main-view', '#manager-main-conf')) {
					eventobj.buttovr('#header-butt-view', '#header-butt-conf');
					setTimeout('managerJs.autowindows()', 500);
				}
			},
			'header-butt-conf' : function() {
				if (eventobj.toggle('#manager-main-conf', '#manager-main-view')) {
					eventobj.buttovr('#header-butt-conf', '#header-butt-view');
					setTimeout('managerJs.autowindows()', 500);
				}
			},
			'monitor-loading-close' : function() {
				setTimeout(function() {
					$('#manager-main-view-lding').css('display', 'none');
				}, 500)
			}
		}
	};
	eventobj.event[idNm]();
}

managerJs.keyEvent = function() {
	if (event.keyCode == 13) {
		managerJs.systemevent('manager-login');
	}
}

managerJs.submitEncryptedForm = function(username, password, rsaPublicKeyModulus, rsaPpublicKeyExponent) {
	var rsa = new RSAKey();
	rsa.setPublic(rsaPublicKeyModulus, rsaPpublicKeyExponent);
	
	var securedKey = rsa.encrypt(username);
	var securedCode = rsa.encrypt(password);
	
	var securedLoginForm = document.getElementById("manager-login");
	securedLoginForm.securedKey.value = securedKey;
	securedLoginForm.securedCode.value = securedCode;
	securedLoginForm.submit();
}

managerJs.mobileevent = function(grpNm) {
	// 모바일 버전 타이틀이벤트
	if (managerval.defmobilemenu != grpNm) {
		$('#' + grpNm).slideToggle(1000);
		$('#' + managerval.defmobilemenu).slideToggle(500);
		managerval.defmobilemenu = grpNm;
		/*managerval.mobilemenu[grpNm] = '';*/
	} else {
		$('#' + managerval.defmobilemenu).slideToggle(500);
		managerval.defmobilemenu = '';
	}
	managerval.mobilemenus.push(grpNm);
}

managerJs.ajaxmainview = {
	// 모니터링 AJAX 컨트롤 
	'obj' : {},
	'datalist' : [],
	'count' : 0,
	'list' : function() {
		managerJs.ajaxmainview.datalist = [];
		$('input[name=' + managerJs.ajaxmainview.obj.name + ']:checked').each(function() {
			var infokey = $(this).attr('id');
			managerJs.ajaxmainview.datalist.push(infokey);
			$('.' + infokey).html('<img src="jsStyle/subloading2016.gif">');
			$('.' + infokey + '-msg').css('color', '#000000');
			$('.' + infokey + '-msg').html(managerJs.ajaxmainview.obj.msg);
		});
		if (managerJs.ajaxmainview.datalist.length == 0) {
			return 0;
		}
		managerJs.ajaxmainview.ajax();
	},
	'ajax' : function() {
		var count = managerJs.ajaxmainview.count;
		var data = {};
		data['infoKey'] =  managerJs.ajaxmainview.datalist[count];
		if (managerJs.ajaxmainview.datalist.length == managerJs.ajaxmainview.count) {
			managerval.viewflag = false;
			managerJs.ajaxmainview.count = 0;
			return alert(managerJs.ajaxmainview.obj.success);
		}
		$.ajax({
			type : 'post',
			dataType : 'json',
			url : managerval.managerInfo,
			data : data,
			success : function(jsondata) {
				if (jsondata.resultcode == 403) {
					managerJs.loginhome();
					return alert('세션이 만료되었습니다.');
				}
				$('.' + jsondata.id).css('color', jsondata.color);
				$('.' + jsondata.id).html(jsondata.resultcode);
				$('.' + jsondata.id + '-msg').css('color', jsondata.color);
				$('.' + jsondata.id + '-msg').html(jsondata.message);
				managerJs.ajaxmainview.count++;
				setTimeout('managerJs.ajaxmainview.ajax()', 1000);
			},
			error : function(e) {
				$('.' + data['infoKey']).css('color', '#000000');
				$('.' + data['infoKey']).html('[ERROR]');
				$('.' + data['infoKey'] + '-msg').css('color', '#000000');
				$('.' + data['infoKey'] + '-msg').html('▶ 통신중 에러가 발생하였습니다.');
				managerJs.ajaxmainview.count++;
				setTimeout('managerJs.ajaxmainview.ajax()', 1000);
			}
		});
	},
	'run' : function(obj) {
		if (managerval.viewflag) {
			return alert('검증이 끝난후 실행가능합니다.');
		}
		managerval.viewflag = true;
		managerJs.ajaxmainview.obj = obj;
		if (managerJs.ajaxmainview.list() == 0) {
			alert(managerJs.ajaxmainview.obj.alert);
		}
	}
}

managerJs.mainviewcontrol = function(obj) {
	var viewcontrol = {
		'main-view-report' : { // 샘플 리포트 호출
			'run' : function() {
				$('#manager-main-view-lding').css('display', 'block');
				var installPath = $('input:text[name="installPath"]').val();
				installPath += 'manager/@REPORT.jsp';
				$('.main-view-rpt-frame').attr('src', installPath.replace('@REPORT', obj.code));
				managerJs.systemevent('monitor-loading-close');
			}
		},
		'main-view-log' : { // 로그 정보 로드
			'run' : function() {
				$('#manager-main-view-lding').css('display', 'block');
				$('#' + obj.code + '-msg').html('로그를 불러오는 중입니다.');
				$.ajax({
					type : 'post',
					dataType : 'json',
					url : managerval.managerInfo,
					data : {'infoKey' : obj.code},
					success : function(jsondata) {
						managerJs.systemevent('monitor-loading-close');
						$('#' + jsondata.id + '-msg').html(jsondata.message);
					},
					error : function(e) {
						alert(e);
					}
				});
			}
		},
		'main-view-back' : { // 파일 백업 정보 로드
			'run' : function() {
				$('#manager-main-view-lding').css('display', 'block');
				$('#' + obj.code + '-msg').html('모듈 백업을 요청하는 중입니다.');
				$.ajax({
					type : 'post',
					dataType : 'json',
					url : managerval.managerInfo,
					data : {'infoKey' : obj.code},
					success : function(jsondata) {
						managerJs.systemevent('monitor-loading-close');
						$('#' + jsondata.id + '-msg').html(jsondata.message);
					},
					error : function(e) {
						alert(e);
					}
				});
			}
		},
		'main-view-pro' : { // 프로퍼티 정보 로드
			'run' : function() {
				$('#manager-main-view-lding').css('display', 'block');
				$('#' + obj.code + '-msg').html('프로퍼티를 불러오는 중입니다.');
				var unipass = '';
				var pass = prompt('프로퍼티를 불러오기 위해서는 다시한번 패스워드 입력이 필요합니다.' , '');
				if (pass == null) {
					$('#manager-main-view-lding').css('display', 'none');
					return;
				}
				for(var i = 0 ; i < pass.length ; i++) { unipass += pass.charCodeAt(i) + 'z'; }
				$.ajax({
					type : 'post',
					dataType : 'json',
					url : managerval.managerInfo,
					data : {'infoKey' : obj.code, 'openKey' : unipass},
					success : function(jsondata) {
						managerJs.systemevent('monitor-loading-close');
						$('#' + jsondata.id + '-msg').html(jsondata.message);
					},
					error : function(e) {
						alert(e);
					}
				});
			}
		},
		'main-view-test' : { // 통합 검증 테스트 시작
			'run' : function() {
				var data = {
					'name' : 'verification',
					'msg' : '▶ 모듈 테스트가 진행되었습니다.',
					'alert' : '최소 한개의 항목을 선택하셔야 테스트가 가능합니다.',
					'success' : '검증 테스트가 완료되었습니다.'
				}
				managerJs.ajaxmainview.run(data);
			}
		},
		'main-view-del' : { // 통합 스토리지 정리 시작
			'run' : function() {
				var data = {
					'name' : 'filedelete',
					'msg' : '▶ 파일 삭제가 진행되었습니다.',
					'alert' : '최소 한개의 항목을 선택하셔야 삭제가 가능합니다.',
					'success' : '파일 삭제가 완료되었습니다.'
				}
				managerJs.ajaxmainview.run(data);
			}
		}
	};
	
	var monitortab = {
		'run' : function(code) { // 모니터링 버튼 토글
			var tab_toggle = '#' + $('#' + code).attr('name');
			if (tab_toggle != managerval.deftabmenu) {
				$('.main-header-butt-ovr').attr('class', 'main-header-butt');
				$('#' + code).attr('class', 'main-header-butt-ovr');
				$(tab_toggle).fadeIn(1000);
				$(managerval.deftabmenu).css('display', 'none');
				managerval.deftabmenu = tab_toggle;
			}
		}
	};
	if (viewcontrol[obj.key] != null) {
		viewcontrol[obj.key].run();
	} else {
		monitortab.run(obj.code);
	}
}

managerJs.automenu = function(jqbtn) {
	jqbtn.on('click', function() { // 메뉴바 토글기능 (Mobile 환경)
		if (!managerJs.browser() && managerval.width >= 900) {
			return;
		}
		var toggle_menu = jQuery(this).attr('class');
		if (toggle_menu != null) {
			toggle_menu = toggle_menu.split(' ')[0];
			toggle_menu = '#' + toggle_menu;
		}
		if (managerval.openmenu == toggle_menu) {
			jQuery(toggle_menu).slideToggle('1000');
			managerval.openmenu = '';
		} else {
			jQuery(toggle_menu).slideToggle('1000');
			jQuery(managerval.openmenu).slideToggle('1000');
			managerval.openmenu = toggle_menu;
		}
	});
}

managerJs.installpath = function() {
	// calltag Auto Path
	var convertControl = $('#convertControl').val();
	if (convertControl == 'off') {
		if (event.keyCode == 37 || event.keyCode == 39) {
			return; // 좌우 방향키 사용시 커서 이동방지
		}
		var savepath = $('input:text[name="installPath"]').val().replace(/\\/gi, '/');
		var installPath = savepath.replace(/\/+/gi, '/');
		
		if (installPath.length > 1 && installPath.charAt(installPath.length - 1) != '/') {
			installPath = installPath + '/';
		} else {
			if (savepath != installPath) { // 커서 이동 방지 (/////// or \\\\\ 들어올때만 커서 이동)
				$('input:text[name="installPath"]').val(installPath);
			}
		}
		installPath += 'common/';
		for (var convert in managerJs.convertcalltag) {
			$('input:text[name="' + convert + '"]').val(installPath + managerJs.convertcalltag[convert]);
		}
	}
}

managerJs.JsCsspath = function() {
	var changediv = $('#externalControl option:selected').val() == 'off';
	var savepath = $('input:text[name="installPath"]').val().replace(/\\/gi, '/');
	var installPath = savepath.replace(/\/+/gi, '/');
	if (changediv) {
		for (var convert in managerJs.externalTag) {
			$('input:text[name="' + convert + '"]').val('');
		}
	} else {
		// externalJs, externalCss Auto Path
		if (installPath.length > 1 && installPath.charAt(installPath.length - 1) != '/') {
			installPath = installPath + '/';
		}
		installPath += 'support/';
		for (var convert in managerJs.externalTag) {
			$('input:text[name="' + convert + '"]').val(installPath + managerJs.externalTag[convert]);
		}
	}
}

managerJs.convertControl = function() {
	// 프레임워크 사용여부
	var convertControl = $('#convertControl').val();
	for (var convert in managerJs.convertcalltag) {
		if (convertControl == 'true') {
			$('input:text[name="' + convert + '"]').attr('readonly', false);
		} else {
			$('input:text[name="' + convert + '"]').attr('readonly', true);
		}
	}
}

managerJs.multicontrol = function(objectNm) {
	// 데이터베이스, 워터마크 멀티 추가/수정/삭제
	var datamap = {
		'database' : {
			'select' : '#databaseList',
			'savename' : 'dbManager',
			'savebox' : '.databaseBox'
		},
		'wartermark' : {
			'select' : '#wartermarkList',
			'savename' : 'markManager',
			'savebox' : '.wartermarkBox'
		}
	}
	
	var event = {
		'add' : function(objmap, codemap) {
			var addmap = JSON.stringify(objmap);
			if ($('#' + codemap.id).attr('id') == null) {
				var mapinput = document.createElement('input');
				mapinput.setAttribute('type', 'hidden');
				mapinput.setAttribute('name', codemap.savename);
				mapinput.setAttribute('id', codemap.id);
				mapinput.setAttribute('value', addmap);
				$(codemap.savebox).append(mapinput);
				var mapoption = document.createElement('option');
				mapoption.setAttribute('value', codemap.id);
				mapoption.innerHTML = codemap.id;
				$(codemap.select).append(mapoption);
				$(codemap.select).val(codemap.id).attr('selected', 'selected');
			} else {
				$('#' + codemap.id).attr('value', addmap);
			}
		},
		'opt' : function(flag, data) {
			var listdata = $(data.select + ' option:selected');
			if (flag) { // 제거
				if (listdata.val() == null) {
					return alert('삭제할 목록이 없습니다.');
				}
				$('#' + listdata.val()).remove();
				listdata.remove();
				listdata = $(data.select + ' option:selected');
			}
			if (listdata.val() == null) {
				if (data.type != null) {
					$('#' + data.type).val('off');
				}
				for (var key in data.reset) {
					$('#' + data.reset[key]).val('');
				}
				$(data.select + ' input').each(function() {
					if ($(this).attr('id') != null) {
						$(this).val('');
					}
				});
				return;
			}
			$(data.select).val(listdata.val());
			var listMap = JSON.parse(managerJs.replaceAll($('#' + listdata.val()).val(), "'", "\""));
			for (var key in listMap) {
				$('#' + key).val(listMap[key]);
			}
		}
	}
	var addordel = {
		'databaseList' : {
			'run' : function() {
				event.opt(false, datamap.database);
			}
		},
		'wartermarkList' : {
			'run' : function() {
				event.opt(false, datamap.wartermark);
			}
		},
		'main-conf-db-add' : {
			'run' : function() {
				var objmap = {
					'databaseType' :$('#databaseType').val(),
					'databaseKey' : $('#databaseKey').val(),
					'databaseIp' : $('#databaseIp').val(),
					'databasePort' : $('#databasePort').val(),
					'databaseSid' : $('#databaseSid').val(),
					'databaseNm' : $('#databaseNm').val(),
					'databaseOpt' : $('#databaseOpt').val(),
					'databaseId' : $('#databaseId').val(),
					'databasePw' : $('#databasePw').val()
				};
				if (objmap.databaseKey == '') {
					return alert('DB KEY값을 입력해 주세요.');
				}
				if (confirm(objmap.databaseKey + ' 정보를 추가(수정) 하시겠습니까?')) {
					datamap.database['id'] = objmap.databaseKey;
					if (objmap.databaseType == 'off') {
						return alert('DB TYPE을 선택해 주세요.');
					} else if (objmap.databaseType != 'jndi' && objmap.databaseType != 'mdb') {
						if (objmap.databaseId == '') {
							return alert('DB ID값을 입력해 주세요.');
						} else if (objmap.databasePw == '') {
							return alert('DB PW값을 입력해 주세요.');
						}
					}
					
					if (objmap.databaseSid == '' && objmap.databaseNm == '') {
						return alert('DB SID 또는 DB Service Name값을 입력해 주세요.');
					}
					
					if (objmap.databasePw.indexOf('#') != -1) {
						objmap.databasePw = managerJs.replaceAll(objmap.databasePw, '#', '[#]')
					}
					event.add(objmap, datamap.database);
				}
				return;
			}
		},
		'main-conf-wm-add' : {
			'run' : function() {
				var objmap = {
					'wartermarkCode' : $('#wartermarkCode').val(),
					'wartermarkUrl' : $('#wartermarkUrl').val(),
					'wartermarkWidth' : $('#wartermarkWidth').val(),
					'wartermarkHeight' : $('#wartermarkHeight').val()
				};
				if (objmap.wartermarkCode == '') {
					return alert('워터마크코드를 입력해주세요.');
				}
				if (confirm(objmap.wartermarkCode + ' 정보를 추가(수정) 하시겠습니까?')) {
					datamap.wartermark['id'] = objmap.wartermarkCode;
					if (objmap.wartermarkUrl == '') {
						return alert('이미지경로를 입력해주세요.');
					} else if (objmap.wartermarkWidth == '') {
						return alert('이미지너비를 입력해주세요.');
					} else if (objmap.wartermarkHeight == '') {
						return alert('이미지높이를 입력해주세요.');
					}
					event.add(objmap, datamap.wartermark);
				}
				return;
			}
		},
		'main-conf-db-del' : {
			'run' : function() {
				if (confirm('선택한 DB설정정보를 제거하시겠습니까?')) {
					datamap.database['type'] = 'databaseType';
					datamap.database['reset'] = ['databaseKey', 'databaseIp', 'databasePort', 'databaseSid', 'databaseNm', 'databaseOpt', 'databaseId', 'databasePw'];
					event.opt(true, datamap.database);
				}
				return;
			}
		},
		'main-conf-wm-del' : {
			'run' : function() {
				if (confirm('선택한 워터마크정보를 제거하시겠습니까?')) {
					datamap.wartermark['reset'] = ['wartermarkCode', 'wartermarkUrl', 'wartermarkWidth', 'wartermarkHeight'];
					event.opt(true, datamap.wartermark);
				}
				return;
			}
		}
	}
	if (addordel[objectNm] != null) {
		addordel[objectNm].run();
	}
}

$(document).keydown(function(e) {
	if (e.target.nodeName != 'INPUT') {
		if(e.keyCode === 8){   
        	return false;
        }
	}
});

$(document).ready(function() {
	managerJs.autowindows();
	managerJs.scrollbanner();
	$(window).resize(function() { // 브라우저 사이즈감지후 사이즈조정
		if (!managerJs.browser()) { // 모바일 사용시 사이즈 감지 차단
			managerJs.autowindows();
		} else { // 모바일 회전감지
			$(window).trigger("orientationchange");
		}
	});
	
	// 로그인 버튼 이벤트
	$('#managerlogin').click(function() {
		managerJs.systemevent('manager-login');
	});

	// 상단버튼 통합 이벤트
	$('#manager-header input').click(function() {
		managerJs.systemevent($(this).attr('id'));
	});
	
	// 메인버튼 통합 이벤트 컨트롤
	$('#manager-main-view input[type="button"]').click(function() {
		managerJs.mainviewcontrol({'key' : $(this).attr('name'), 'code' : $(this).attr('id')});
	});
	
	 // 체크박스 전체 선택
	$('.main-view-title-chk').click(function() {
		managerJs.checkall($(this).prop('checked'), $(this).attr('name').replace('all', ''));
	});
	
	// 이미지처리 플래그 (이미지옵션)
	$('#imageAbsoluteURL').change(function() {
		managerJs.changediv($('#imageAbsoluteURL option:selected').val() == 'on', '#urltolocalImage');
	});
	
	// 로그레벨 플래그 (로그파일명)
	$('#managerLogLevel').change(function() {
		managerJs.changediv($('#managerLogLevel option:selected').val() == 'OFF', '#manasgerlog');
	});
	
	// 변환연결 플래그 (변환연결설정)
	$('#convertServerLink').change(function() {
		managerJs.changediv($('#convertServerLink option:selected').val() != 'userhost', '#convertuserhost');
	});
	
	// 외부인포트 플래그
	$('#externalControl').change(function() {
		managerJs.JsCsspath();
	});
	
	// 데이터베이스, 워터마크 추가/수정
	$('.main-conf-box input[type=button]').click(function() {
		managerJs.multicontrol($(this).attr('class'));
	});
	
	// 데이터베이스, 워터마크 목록 선택
	$('.main-conf-select').change(function() {
		managerJs.multicontrol($(this).attr('id'));
	});
	
	// 타이틀 버튼 (모바일 토글)
	$('.main-conf-title-box input').click(function() {
		if (managerJs.browser() || managerval.width < 900) {
			managerJs.mobileevent($(this).attr('class'));
		}
	});
	
	// 아이프레임 로드 확인
	$('.main-view-rpt-frame').load(function() {
		managerJs.systemevent('monitor-loading-close');
	});
	
});