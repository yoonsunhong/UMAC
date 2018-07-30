    /**
     * SwfStore - a JavaScript library for cross-domain flash cookies
     *
     * http://github.com/nfriedly/Javascript-Flash-Cookies
     *
     * Copyright (c) 2010 by Nathan Friedly - http://nfriedly.com
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */

    /*jslint browser: true, devel: true, vars: true, white: true, nomen: true, plusplus: true, regexp: true */
    /*globals SwfStore */

    if(window.console == undefined)
        console = window.console || { log: function() {} };

    (function() {

        "use strict"; // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/

        var counter = 0; // a counter for element id's and whatnot

        var alpnum = /[^a-z0-9_\/]/ig; //a regex to find anything thats not letters, numbers underscore and forward slash

        /**
         * SwfStore constructor - creates a new SwfStore object and embeds the .swf into the web page.
         *
         * usage:
         * var mySwfStore = new SwfStore({
         *   namespace: "my_cool_app",
         *   swf_url: "http://example.com/path/to/storage.swf",
         *   onready: function() {
         *     console.log('ready!', mySwfStore.get('my_key'));
         *   },
         *   onerror: function() {
         *     console.error('swfStore failed to load :(');
         *   }
         * });
         *
         * @param {object} config
         * @param {string} [config.swf_url=storage.swf] - Url to storage.swf. Must be an absolute url (with http:// and all) to work cross-domain
         * @param {functon} [config.onready] Callback function that is fired when the SwfStore is loaded. Recommended.
         * @param {function} [config.onerror] Callback function that is fired if the SwfStore fails to load. Recommended.
         * @param {string} [config.namespace="swfstore"] The namespace to use in both JS and the SWF. Allows a page to have more than one instance of SwfStore.
         * @param {integer} [config.timeout=10] The number of seconds to wait before assuming the user does not have flash.
         * @param {boolean} [config.debug=false] Is debug mode enabled? If so, mesages will be logged to the console and the .swf will be rendered on the page (although it will be an empty white box unless it cannot communicate with JS. Then it will log errors to the .swf)
         */
        window.SwfStore = function(config) {
            // make sure we have something of a configuration
            config = config || {};
            var defaults = {
                swf_url: 'storage.swf', // this should be a complete protocol-relative url (//example.com/path/to/storage.swf) for cross-domain, cross-protocol usage
                namespace: 'swfstore',
                debug: false,
                timeout: 10, // number of seconds to wait before concluding there was an error
                onready: null,
                onerror: null
            };
            var key;
            for (key in defaults) {
                if (defaults.hasOwnProperty(key)) {
                    if (!config.hasOwnProperty(key)) {
                        config[key] = defaults[key];
                    }
                }
            }
            config.namespace = config.namespace.replace(alpnum, '_');

            if (window.SwfStore[config.namespace]) {
                throw "There is already an instance of SwfStore using the '" + config.namespace + "' namespace. Use that instance or specify an alternate namespace in the config.";
            }

            this.config = config;

            // a couple of basic timesaver functions
            function id() {
                return "SwfStore_" + config.namespace.replace("/", "_") + "_" + (counter++);
            }

            function div(visible) {
                var d = document.createElement('div');
                document.body.appendChild(d);
                d.id = id();
                if (!visible) {
                    // setting display:none causes the .swf to not render at all
                    d.style.position = "absolute";
                    d.style.top = "-2000px";
                    d.style.left = "-2000px";
                }
                return d;
            }

            // get a logger ready
            // if we're in a browser that doesn't have a console, build one
            if (typeof console === "undefined") {
                var loggerOutput = div(true);
                this.console = {
                    log: function(msg) {
                        var m = div(true);
                        m.innerHTML = msg;
                        loggerOutput.appendChild(m);
                    }
                };
            } else {
                this.console = console;
            }
            this.log = function(type, source, msg) {
                if (config.debug) {
                    // only output to log if debug is currently enabled
                    source = (source === 'swfStore') ? 'swf' : source;
                    if (typeof(this.console[type]) !== "undefined") {
                        this.console[type]('SwfStore - ' + config.namespace + ' (' + source + '): ' + msg);
                    } else {
                        this.console.log('SwfStore - ' + config.namespace + ": " + type + ' (' + source + '): ' + msg);
                    }
                }
            };

            this.log('info', 'js', 'Initializing...');

            // the callback functions that javascript provides to flash must be globally accessible
            SwfStore[config.namespace.replace("/", "_")] = this;

            var swfContainer = div(config.debug);

            var swfName = id();

            var flashvars = "namespace=" + encodeURIComponent(config.namespace);


            swfContainer.innerHTML = '<object height="1px" width="1px" codebase="http://www.adobe.com/go/getflash" id="' +
                swfName + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' +
                '	<param value="' + config.swf_url + '" name="movie">' +
                '	<param value="' + flashvars + '" name="FlashVars">' +
                '	<param value="always" name="allowScriptAccess">' +
                '	<embed height="1px" align="middle" width="1px" pluginspage="https://www.macromedia.com/go/getflashplayer" ' +
                'flashvars="' + flashvars + '" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" loop="false" play="true" ' +
                'name="' + swfName + '" bgcolor="#ffffff" src="' + config.swf_url + '">' +
                '</object>';


            this.swf = document[swfName] || window[swfName];

            this._timeout = setTimeout(function() {
                SwfStore[config.namespace].log('error', 'js', 'Timeout reached, assuming ' + config.swf_url + ' failed to load and firing the onerror callback.');
                if (config.onerror) {
                    config.onerror();
                }
            }, config.timeout * 1000);
        };

        // we need to check everything we send to flash because it can't take functions as arguments
        function checkData(data) {
            if (typeof data === "function") {
                throw new Error('SwfStore Error: Functions cannot be used as keys or values.');
            }
        }

        SwfStore.prototype = {

            /**
             * This is an indicator of whether or not the SwfStore is initialized.
             * Use the onready and onerror config options rather than checking this variable.
             */
            ready: false,

            /**
             * Sets the given key to the given value in the swf
             * @param {string} key
             * @param {string} value
             */
            set: function(key, value) {
                this._checkReady();
                checkData(key);
                checkData(value);
                if (value === null || typeof value == "undefined") {
                    this.swf.clear(key);
                } else {
                    this.swf.set(key, value);
                }
            },

            /**
             * Retrieves the specified value from the swf.
             * @param {string} key
             * @return {string} value
             */
            get: function(key) {
                this._checkReady();
                checkData(key);
                //this.log('debug', 'js', 'Reading ' + key);
                return this.swf.get(key);
            },

            /**
             * Retrieves all stored values from the swf.
             * @return {object}
             */
            getAll: function() {
                this._checkReady();
                var pairs = this.swf.getAll();
                var data = {};
                for (var i = 0, len = pairs.length, pair; i < len; i++) {
                    pair = pairs[i];
                    data[pair.key] = pair.value;
                }
                return data;
            },

            clearAll: function() {
                var all = this.getAll();
                for (var key in all) {
                    if (all.hasOwnProperty(key)) {
                        this.clear(key);
                    }
                }
            },

            /**
             * Delete the specified key from the swf
             *
             * @param {string} key
             */
            clear: function(key) {
                this._checkReady();
                checkData(key);
                this.swf.clear(key);
            },

            /**
             * We need to run this check before tying to work with the swf
             *
             * @private
             */
            _checkReady: function() {
                if (!this.ready) {
                    throw 'SwfStore is not yet finished initializing. Pass a config.onready callback or wait until this.ready is true before trying to use a SwfStore instance.';
                }
            },

            /**
             * This is the function that the swf calls to announce that it has loaded.
             * This function in turn fires the onready function if provided in the config.
             *
             * @private
             */
            onload: function() {
                // deal with scope the easy way
                var that = this;
                // wrapping everything in a timeout so that the JS can finish initializing first
                // (If the .swf is cached in IE, it fires the callback *immediately* before JS has
                // finished executing.  setTimeout(function, 0) fixes that)
                setTimeout(function() {
                    clearTimeout(that._timeout);
                    that.ready = true;

                    //this.log('info', 'js', 'Ready!')
                    if (that.config.onready) {
                        that.config.onready();
                    }
                }, 0);
            },


            /**
             * If the swf had an error but is still able to communicate with JavaScript, it will call this function.
             * This function is also called if the time limit is reached and flash has not yet loaded.
             * This function is most commonly called when either flash is not installed or local storage has been disabled.
             * If an onerror function was provided in the config, this function will fire it.
             *
             * @private
             */
            onerror: function() {
                clearTimeout(this._timeout);
                //this.log('info', 'js', 'Error reported by storage.swf');
                if (this.config.onerror) {
                    this.config.onerror();
                }
            }
        };
    }());


    /***************************************************************
     * 보고서에 대한 (exeViewer)호출 API제공 (ActiveX뷰어는 기존 API사용) *
     * <body>를 가지는 문서에만 사용가능 (head에서 포함하여 반복사용)     *
     * <frameset>구조인 경우에는 하위의 특정frame 문서에 배치하여 사용    *
     ***************************************************************/
    var customUri="aireport:///";
    var aireportSignature = "AIREPORTEXE";
    var aireportVersion = 55021;

    //사용자 setting...
    //*****************************************************************************************
    var installUrl="http://14.52.171.231:8085/springViewer/AIUpdate/NonActiveXInstall.html";
    var sessionIDGetUrl="http://14.52.171.231:8085/springViewer/test/AIsessionIDGet.jsp";
    var updateUrl="http://14.52.171.231:8085/springViewer/AIUpdate/";
    var viewerSetup="AIViewer50Setup.exe";
    var fullSetup="AIViewer55Install.exe";
    var swfUrl="http://14.52.171.231:8085/springViewer/test7/storage.swf";

    var paramSaveUrl="http://14.52.171.231:8085/springViewer/test/AIParamSave.jsp";
    var reportCallUrl="http://14.52.171.231:8085/springViewer/test/AIReportCall.jsp";
    //******************************************************************************************

    var method='GET';
    var sessionID;

    var match = navigator.userAgent.match(/(CrOS\ \w+|Windows\ NT|Mac\ OS\ X|Linux)\ ([\d\._]+)?/);
    var os = (match || [])[1] || "Unknown";

    var cookie=document.cookies;
    var myCookie;

    $(document).ready(function(){

        $.ajax({
            type: method,
            dataType: "json",
            url: sessionIDGetUrl,
            success: function (result) {
                sessionID="&JSESSIONID="+result.sessionID;
            },
            error:function (error) {
                sessionID="";
                alert("AIsessionIDGet 호출 에라입니다.\n호출url 확인바랍니다.");
            }
        });
    });

    $(function(){

        var mySwfStore = new SwfStore({

            namespace: 'aireport',  // the this must match all other instances that want to share cookies

            swf_url: swfUrl,        // to work cross-domain, use the same absolute url on both pages (meaning http://site.com/path/to/store.swf not just /path/to.store.swf)

            debug: true,            // depending on your browser, this will either go to the console or the bottom of the page.

            onready: function(){

                myCookie=mySwfStore.get(aireportSignature);
            },

            onerror: function(){
                // in case we had an error. (The most common cause is that the user disabled flash cookies.)
                alert("flash cookie unenabled...");
            }
        });
    });

    function checkProduct(str) {
        var isInstalled = str.lastIndexOf(aireportSignature);
        if (isInstalled >= 0)
            return true;
        return false;
    }

    function checkVersion(str) {
        var version = str.split('#');
        if (version.length >= 1) {
            return parseInt(version[1]) - aireportVersion;
        }
        return -1;
    }

    function launchAIReportExe(reportURL, ai_params, cgi_params) {

        if(!AIReportInstallCheck())
            return;

        if(sessionID == undefined)
            sessionID = "";
        if(sessionID == 'undefined')
            sessionID = "";

        if(cookie == undefined)
            cookie = "undefined";

        /*
        $.ajax({
            type: method,
            data: cgi_params,
            dataType: "json",
            url: paramSaveUrl,
            success: function (result) {
                cgi_params="param=" + result.target + "&reportMode=AR5";
                var callUrl=customUri  + ",," + reportCallUrl + ",," + ai_params+sessionID + ",," + cgi_params +
                    ",," + updateUrl + ",," + cookie + ",," + viewerSetup + ",," + fullSetup;
                launchApp(callUrl);
            },
            error:function (error) {
                cgi_params="";
                alert("AIParamSave 호출 에라입니다.\n호출url 확인바랍니다.");
            }
        });
        */

        if(cgi_params == undefined)
            cgi_params = "undefined";

        var callUrl=customUri  + ",," + reportURL + ",," + ai_params+sessionID + ",," + cgi_params +
            ",," + updateUrl + ",," + cookie + ",," + viewerSetup + ",," + fullSetup;
        launchApp(callUrl);
    }

    function launchApp(callUrl) {
        var browser = getBrowser();

        if (browser === 'MSIE') {
            //window.location.href = callUrl;
            /*
            var aireportiframe = document.createElement("iframe");
            var aireportAppendTag = document.getElementById('aireport');
            aireportiframe.style.border = "none";
            aireportiframe.style.width = "1px";
            aireportiframe.style.height = "1px";
            aireportiframe.style.display = "none";
            aireportiframe.src = callUrl;

            var child = aireportAppendTag.children[aireportAppendTag.children.length-1];
            if(child) aireportAppendTag.removeChild(child);
            aireportAppendTag.appendChild(aireportiframe);
            */

            var iframe = document.createElement('iframe');
            //iframe.style.visibility = 'none';
            iframe.style.display = "none";
            iframe.style.position = 'absolute';
            iframe.style.left = '-999px';
            iframe.style.height = '1px';
            iframe.style.width = '1px';
            document.body.appendChild(iframe);
            iframe.contentWindow.location = callUrl;
            iframe.onload = function () {
                document.body.removeChild(iframe);
            };

        }
        else if( browser === 'Opera' || browser === 'Safari' ){
            window.location.href = callUrl;
        }
        else {

            var aireportiframe = document.createElement("iframe");
            var aireportAppendTag = document.getElementById('aireport');
            aireportiframe.style.border = "none";
            aireportiframe.style.width = "1px";
            aireportiframe.style.height = "1px";
            aireportiframe.style.display = "none";
            aireportiframe.src = callUrl;

            aireportAppendTag.appendChild(aireportiframe);
            aireportAppendTag.removeChild(aireportiframe);
        }


    }

    function getBrowser() {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'MSIE';
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/)
            if (tem != null) {
                return 'Opera';
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }

        if(navigator.userAgent.indexOf( 'Windows NT 10.0' ) != -1){
            return 'MSIE';
        }
        return M[0];
    }

    function getBrowserVersion() {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return tem[1];
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/)
            if (tem != null) {
                return tem[1];
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }
        return M[1];
    }

    function AIReportInstallCheck() {
        if (os === 'Windows NT'){
            ;
        }
        else{
            alert('windows만 지원 가능합니다');
            return false;
        }

        if(myCookie==null){
            alert('프로그램이 설치되어있지않아 설치 페이지로 이동 합니다.');
            document.location=installUrl;
            return false;
        }

        var validProduct = checkProduct(myCookie);
        var validVer = checkVersion(myCookie) >= 0 ? true : false;
        if (validProduct == true && validVer == true) {
            ;
        }
        else {
            alert('프로그램이 설치되어있지않아 설치 페이지로 이동 합니다.');
            document.location=installUrl;
            return false;
        }

        return true;
    }
