
    if (window.aiXtabLoader === undefined) {
        window.ie78 = ($.browser.msie && parseInt($.browser.version, 10) < 9);
        window.aiXtabLoader = newLoader();
        window.dataDownloader = installPath + "common/AIdataFileDownloader.jsp";
    }

    function newLoader() {
        // IE의 setTimeout()에서 argument를 패싱하기 위한 설정
        if (document.all && !window.setTimeout.isPolyfill) {
            var __nativeST__ = window.setTimeout;
            window.setTimeout = function (vCallback, nDelay, arg1) {
                var aArgs = Array.prototype.slice.call(arguments, 2);
                return __nativeST__(vCallback instanceof Function ? function () {
                    vCallback.apply(null, aArgs);
                } : vCallback, nDelay);
            };
            window.setTimeout.isPolyfill = true;
        }

        var binders = []; // 문서내 크로스탭(binder)을 유지

        function newBinder(containerID, meta, records, config) {
            var xBinder = new XtabBinder(containerID);
            xBinder.bind(meta, records, config, binders.length);
            addXTabContextMenu(containerID);
            binders.push(xBinder);
        }

        return {
            createBinder: function(containerID, meta, records, config) {
                newBinder(containerID, meta, records, config);
            },
            getBinder: function(index) {
                return binders[index];
            },
            getBinderFromID: function(containerID) {
                for (var i = 0; i < binders.length; i++) {
                    if (binders[i].containerID == containerID) return binders[i];
                }
                return null;
            },
            copyToClipboard: function(binder) {
                var msg = "";
                if (binder.rows > 1000 || binder.cols > 1000) {
                    msg = "데이타가 많아서 문제가 발생할 수 있으니 유의하세요.\n\n";
                }
                msg += "모두선택(좌상단 헤더)을  클릭하고 Ctrl-C Key를 입력하면 데이타가 복사됩니다.\n";
                msg += "엑셀에서 위치(셀)를 선택한 후 붙여넣기(Ctrl-V)하세요.";

                alert(msg);
            },
            saveToCSV: function(binder) {
                if (binder.rows > 1000 || binder.cols > 1000) {
                    if (!confirm("데이타가 너무 많아서 문제가 발생할 수 있습니다.\n" +
                                 "그래도 엑셀화일저장을 진행하시겠습니까?")) return;
                }
                
                var data = binder.sheet.getCsv(0, 0, binder.rows, binder.cols, "\r", ",");
                document.dataUpload.setAttribute("action", dataDownloader);
                document.dataUpload.data.value = data;
                document.dataUpload.submit();
                document.dataUpload.data.value = null;
            }
        };
    }

    function appendStyleElement(textContent) {
        var head = document.head || document.getElementsByTagName("head")[0];
        var style = document.createElement("style");
        style.type = "text/css";
        if (style.styleSheet) { // IE
            style.styleSheet.cssText = textContent;
        } else {
            style.appendChild(document.createTextNode(textContent));
        }

        head.appendChild(style);
    }

    function getReportName() {
        var reportName = window.location.pathname; // [/path]
        var st = reportName.lastIndexOf('/');
        var ed = reportName.indexOf('.', ++st);
        if (ed == -1) {
            return (reportName.substring(st));
        } else {
            return (reportName.substring(st, ed));
        }
    }

    $(window).resize(function() {
        if (aiXtabLoader) {
            var binder = aiXtabLoader.getBinder(0);
            if (binder) binder.resize();
        }
    });
