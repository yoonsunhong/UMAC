/*******************************************************************************
 * Date 객체 관련
 사용법 :   $(":input[name=test]").val(new CommDateManager(new Date().after(0,1,10)).getDate("yyyy-mm-dd"));
			$(":input[name=test2]").val(new CommDateManager().getDate("yyyy-mm-dd"));
 ******************************************************************************/

var CommDateManager = function () {
    this.date = null;
    this.yyyy = null;
    this.mm = null;
    this.dd = null;
    this.hh = null;
    this.mi = null;
    this.ss = null;
    this.pm = false;
    this.weekday = null;
    this.dayKor = "";
    this.dayEng = "";
    this.dayCnt = 0;
    this.weekOfMonth = "";
    this.weekName = "";
    this.weekOfMonth = "";
    this.arrDayCnt = CommLang.DAYCNT;
    this.arrDayKor = CommLang.DAYNAME_ORGINAL;
    this.arrDayEng = CommLang.DAYENG_ORGINAL;
    this.arrWeekOfMonth = CommLang.WEEKOFMONTH;
    this.arrWeekName = CommLang.WEEKNAME;
    this.hashDayName = CommLang.HASH_DAYNAME;
    this.hashWeekOfMonth = CommLang.HASH_WEEKOFMONTH;
    this.hashWeekName = CommLang.HASH_WEEKNAME;

    if (typeof arguments[0] == "undefined")
    	this.date = new Date();
    else if (typeof arguments[0] == "object") {
    	this.date = arguments[0];
    }
    else
        this.setDate(arguments[0]);

    this.init();
};

CommDateManager.prototype.getWeekCnt = function () {
    return Math.ceil((this.dd + new Date(this.yyyy, this.mm - 1, 1).getDay()) / 7);
};

CommDateManager.prototype.init = function () {
    this.yyyy = this.date.getFullYear();
    this.mm = this.date.getMonth() + 1;
    this.dd = this.date.getDate();
    this.hh = this.date.getHours();
    this.mi = this.date.getMinutes();
    this.ss = this.date.getSeconds();

    if ((this.yyyy % 4 == 0 || this.yyyy % 100 == 0) && (this.yyyy % 400 == 0))
        this.arrDayCnt[1] = 29;
    else
        this.arrDayCnt[1] = 28;

    this.dayKor = this.arrDayKor[this.date.getDay()];
    this.dayEng = this.arrDayEng[this.date.getDay()];

    if (this.getWeekCnt() <= 4)
        this.weekOfMonth = this.arrWeekOfMonth[this.getWeekCnt()];
    else
        this.weekOfMonth = this.arrWeekOfMonth[5];
};

CommDateManager.prototype.setDate = function (asDate) {
    var lsDate = asDate.toUpperCase();
    lsDate = Comm.replace(lsDate, "-", "");
    lsDate = Comm.replace(lsDate, ".", "");
    lsDate = Comm.replace(lsDate, "/", "");
    lsDate = Comm.replace(lsDate, ":", "");
    lsDate = Comm.replace(lsDate, " ", "");
    lsDate = Comm.replace(lsDate, "년", "");
    lsDate = Comm.replace(lsDate, "월", "");
    lsDate = Comm.replace(lsDate, "일", "");
    lsDate = Comm.replace(lsDate, "시", "");
    lsDate = Comm.replace(lsDate, "분", "");
    lsDate = Comm.replace(lsDate, "초", "");
    lsDate = Comm.replace(lsDate, "월", "");
    lsDate = Comm.replace(lsDate, "화", "");
    lsDate = Comm.replace(lsDate, "수", "");
    lsDate = Comm.replace(lsDate, "목", "");
    lsDate = Comm.replace(lsDate, "금", "");
    lsDate = Comm.replace(lsDate, "토", "");
    lsDate = Comm.replace(lsDate, "일", "");
    lsDate = Comm.replace(lsDate, "(", "");
    lsDate = Comm.replace(lsDate, ")", "");
    lsDate = Comm.replace(lsDate, "T", "");
    lsDate = Comm.replace(lsDate, "Z", "");
    lsDate = Comm.replace(lsDate, "D", "");

    if (lsDate.indexOf("오후") > 0)
        this.pm = true;

    lsDate = Comm.replace(lsDate, "오전", "");
    lsDate = Comm.replace(lsDate, "오후", "");

    if (lsDate.indexOf("PM") > 0)
        this.pm = true;

    lsDate = Comm.replace(lsDate, "AM", "");
    lsDate = Comm.replace(lsDate, "PM", "");

    this.yyyy = Comm.number(lsDate.substring(0, 4));
    this.mm = Comm.number(lsDate.substring(4, 6));
    this.dd = Comm.number(lsDate.substring(6, 8));

    if (lsDate.length >= 10) {
        this.hh = Comm.number(lsDate.substring(8, 10));

        if (this.pm)
            this.hh += 12;
    } else
        this.hh = 0;

    if (lsDate.length >= 12)
        this.mi = Comm.number(lsDate.substring(10, 12));
    else
        this.mi = 0;

    if (lsDate.length >= 14)
        this.ss = Comm.number(lsDate.substring(12, 14));
    else
        this.ss = 0;

    this.date = new Date(this.yyyy, this.mm - 1, this.dd, this.hh, this.mi,
			this.ss);

    this.init();
};

CommDateManager.prototype.getApm = function () {
    return CommDate.getApm(this.hh);
};

CommDateManager.prototype.getApmHh = function () {
    return CommDate.getApmHh(this.hh);
};

CommDateManager.prototype.getApmEng = function () {
    return CommDate.getApmEng(this.hh);
};

CommDateManager.prototype.getDate = function (asFormat) {
    if (asFormat == "object")
        return this.date;
    else {
        var lsReturn = asFormat;

        lsReturn = Comm.replace(lsReturn, "yyyy", this.yyyy);

        if (lsReturn.indexOf("yy") > -1)
            lsReturn = Comm.replace(lsReturn, "yy", Comm.right(this.yyyy
					.toString(), 2));

        if (lsReturn.indexOf("mmN") > -1)
            lsReturn = Comm.replace(lsReturn, "mmN", this.mm);

        if (lsReturn.indexOf("mm") > -1)
            lsReturn = Comm.replace(lsReturn, "mm", Comm.fill(this.mm, "0", 2));

        if (lsReturn.indexOf("ddN") > -1)
            lsReturn = Comm.replace(lsReturn, "ddN", this.dd);

        if (lsReturn.indexOf("dd") > -1)
            lsReturn = Comm.replace(lsReturn, "dd", Comm.fill(this.dd, "0", 2));

        if (lsReturn.indexOf("APMhh") > -1)
            lsReturn = Comm.replace(lsReturn, "APMhh", this.getApmHh());

        if (lsReturn.indexOf("hhN") > -1)
            lsReturn = Comm.replace(lsReturn, "hhN", this.hh);

        if (lsReturn.indexOf("hh") > -1)
            lsReturn = Comm.replace(lsReturn, "hh", Comm.fill(
					Comm.nvl(this.hh), "0", 2));

        if (lsReturn.indexOf("miN") > -1)
            lsReturn = Comm.replace(lsReturn, "miN", this.mi);

        if (lsReturn.indexOf("mi") > -1)
            lsReturn = Comm.replace(lsReturn, "mi", Comm.fill(
					Comm.nvl(this.mi), "0", 2));

        if (lsReturn.indexOf("ssN") > -1)
            lsReturn = Comm.replace(lsReturn, "ssN", this.ss);

        if (lsReturn.indexOf("ss") > -1)
            lsReturn = Comm.replace(lsReturn, "ss", Comm.fill(
					Comm.nvl(this.ss), "0", 2));
        if (lsReturn.indexOf("day") > -1)
        	lsReturn = Comm.replace(lsReturn, "eday", this.arrDayCnt[this.mm-1]);

        if (lsReturn.indexOf("day") > -1)
            lsReturn = Comm.replace(lsReturn, "day", this.dayKor);

        if (lsReturn.indexOf("KAMPM") > -1)
            lsReturn = Comm.replace(lsReturn, "KAMPM", this.getApm());

        if (lsReturn.indexOf("AMPM") > -1)
            lsReturn = Comm.replace(lsReturn, "AMPM", this.getApmEng());

        if (lsReturn.indexOf("KWOM") > -1)
            lsReturn = Comm.replace(lsReturn, "KWOM",
					this.hashWeekOfMonth[this.weekOfMonth]);

        if (lsReturn.indexOf("WOM") > -1)
            lsReturn = Comm.replace(lsReturn, "WOM", this.weekOfMonth);

        return lsReturn;
    }
};

/*******************************************************************************
 * 연중 몇째 주인지 가져오기
 ******************************************************************************/
CommDateManager.prototype.getWeek = function () {
    var onejan = new Date(this.date.getFullYear(), 0, 1);

    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};
CommDateManager.prototype.after = function (years, months, dates, hours, miniutes, seconds, mss) { 
	if (typeof years == "undefined")
    	years = 0;
    if (typeof months == "undefined")
        months = 0;
    if (typeof dates == "undefined")
        dates = 0;
    if (typeof hours == "undefined")
        hours = 0;
    if (typeof miniutes == "undefined")
        miniutes = 0;
    if (typeof seconds == "undefined")
        seconds = 0;
    if (typeof mss == "undefined")
        mss = 0;
    this.date = this.date.after(years, months, dates, hours, miniutes, seconds, mss);
    this.init();
    return this;
};
CommDateManager.prototype.before = function (years, months, dates, hours, miniutes, seconds, mss) { 
	if (typeof years == "undefined")
    	years = 0;
    if (typeof months == "undefined")
        months = 0;
    if (typeof dates == "undefined")
        dates = 0;
    if (typeof hours == "undefined")
        hours = 0;
    if (typeof miniutes == "undefined")
        miniutes = 0;
    if (typeof seconds == "undefined")
        seconds = 0;
    if (typeof mss == "undefined")
        mss = 0;
    this.date = this.date.before(years, months, dates, hours, miniutes, seconds, mss);
    this.init();
    return this;
};
CommDateManager.prototype.dateCompare = function (startDate, endDate) { 
	var Sdt = new Date(startDate.substring(0, 4) + "-" + startDate.substring(4, 6) + "-" + startDate.substring(6, 9));
	var Edt = new Date(endDate.substring(0, 4) + "-" + endDate.substring(4, 6) + "-" + endDate.substring(6, 9));
	
	if((Edt - Sdt) < 0) {
		return false;
	}
	
	return true;
};

CommDateManager.prototype.dateYMCompare = function (startDate, endDate) { 
	var Sdt = new Date(startDate.substring(0,4) + "-" + startDate.substring(5,7) + "-01");
	var Edt = new Date(endDate.substring(0,4) + "-" + endDate.substring(5,7) + "-01");
	
	if((Edt - Sdt) < 0){
		return false;
	}
	
	return true;
};

CommDateManager.prototype.dateToIntCompare = function (DateType) { 
	var Dttm = "";
	if(DateType.split('-').length > 1 ){
		for(var i = 0; i >= DateType.split('-').length; i++ ){
			Dttm += DateType.split('-')[i];
		}
	}else{
		Dttm = DateType;
	}
	return Dttm;
};



/*******************************************************************************
 * Date format function
 ******************************************************************************/
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
    });}; 

//한자리일경우 앞에 0을 붙여준다.
String.prototype.string = function(len){
    var s = '', i = 0; 
    while (i++ < len) { s += this; } 
    return s;
}; 
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

/*******************************************************************************
 * @type : Prototype Function
 * @object : Date
 * @access : public
 * @desc : 현재 Date 객체의 날짜보다 이후 날짜를 가진 Date 객체를 리턴한다. 예를 들어 내일 날짜를 얻으려면 다음과 같이 하면
 *       된다.
 * 
 * <pre>
 * 사용예 :
 *     주로 format()과 함께 사용한다.
 *     var oneDayAfter = new Date.after(0, 0, 1); =&gt; Fri Apr 11 13:19:45 UTC+0900 2003
 *     var oneDayAfter = new Date.after(0, 0, 1).format(&quot;YYYYYMMDD&quot;); =&gt; 20030411
 * 
 *     - 다음날의 경우 : after(0, 0, 1);
 *     - 다음달의 경우 : after(0, 1, 0);
 *     - 내년의 경우   : after(1, 0, 0);
 * </pre>
 * 
 * @sig : [years[, months[, dates[, hours[, minutes[, seconds[, mss]]]]]]]
 * @param :
 *            years optional 이후 년수
 * @param :
 *            months optional 이후 월수
 * @param :
 *            dates optional 이후 일수
 * @param :
 *            hours optional 이후 시간수
 * @param :
 *            minutes optional 이후 분수
 * @param :
 *            seconds optional 이후 초수
 * @param :
 *            mss optional 이후 밀리초수
 * @return : 이후 날짜를 표현하는 Date 객체
 ******************************************************************************/
Date.prototype.after = function (years, months, dates, hours, miniutes, seconds,
		mss) {
	if (typeof years == "undefined")
    	years = 0;
    if (typeof months == "undefined")
        months = 0;
    if (typeof dates == "undefined")
        dates = 0;
    if (typeof hours == "undefined")
        hours = 0;
    if (typeof miniutes == "undefined")
        miniutes = 0;
    if (typeof seconds == "undefined")
        seconds = 0;
    if (typeof mss == "undefined")
        mss = 0;

    return new Date(this.getFullYear() + years, this.getMonth() + months, this
			.getDate()
			+ dates, this.getHours() + hours, this.getMinutes() + miniutes,
			this.getSeconds() + seconds, this.getMilliseconds() + mss);
};

/*******************************************************************************
 * @type : Prototype Function
 * @object : Date
 * @access : public
 * @desc : 현재 Date 객체의 날짜보다 이전 날짜를 가진 Date 객체를 리턴한다. 예를 들어 어제 날짜를 얻으려면 다음과 같이 하면
 *       된다.
 * 
 * <pre>
 * 사용예 :
 *     주로 format()과 함께 사용한다.
 *     var oneDayBefore = new Date.before(0, 0, 1); =&gt; Fri Apr 11 13:19:45 UTC+0900 2003
 *     var oneDayBefore = new Date.before(0, 0, 1).format(&quot;YYYYYMMDD&quot;); =&gt; 20030411
 * 
 *     - 하루전 : before(0, 0, 1);
 *     - 한달전 : before(0, 1, 0);
 *     - 일년전 : before(1, 0, 0);
 * </pre>
 * 
 * @sig : [years[, months[, dates[, hours[, minutes[, seconds[, mss]]]]]]]
 * @param :
 *            years optional 이전으로 돌아갈 년수
 * @param :
 *            months optional 이전으로 돌아갈 월수
 * @param :
 *            dates optional 이전으로 돌아갈 일수
 * @param :
 *            hours optional 이전으로 돌아갈 시간수
 * @param :
 *            minutes optional 이전으로 돌아갈 분수
 * @param :
 *            seconds optional 이전으로 돌아갈 초수
 * @param :
 *            mss optional 이전으로 돌아갈 밀리초수
 * @return : 이전 날짜를 표현하는 Date 객체
 ******************************************************************************/
Date.prototype.before = function (years, months, dates, hours, miniutes,
		seconds, mss) {
    if (typeof years == undefined)
        years = 0;
    if (typeof months == undefined)
        months = 0;
    if (typeof dates == undefined)
        dates = 0;
    if (typeof hours == undefined)
        hours = 0;
    if (typeof miniutes == undefined)
        miniutes = 0;
    if (typeof seconds == undefined)
        seconds = 0;
    if (typeof mss == undefined)
        mss = 0;

    return new Date(this.getFullYear() - years, this.getMonth() - months, this
			.getDate()
			- dates, this.getHours() - hours, this.getMinutes() - miniutes,
			this.getSeconds() - seconds, this.getMilliseconds() - mss);
};

var CommLang = {
    AM: "오전",
    PM: "오후",
    RECURRING_TRUE: "설정",
    RECURRING_FALSE: "해제",
    DAYNAME: ["월", "화", "수", "목", "금", "토", "일"],
    DAYNAME_ORGINAL: ["일", "월", "화", "수", "목", "금", "토"],
    DAYENG_ORGINAL: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
			"Friday", "Saturday"],
    WEEKNAME: ["", "January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"],
    WEEKOFMONTH: ["", "First", "Second", "Third", "Fourth", "Last"],
    DAYCNT: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    REMINDER: [0, 15, 30, 60, 120, 180, 720, 1440, 2880, 4320, 10080, 20160,
			30240],
    HASH_WEEKOFMONTH: {
        "First": "첫째주",
        "Second": "둘째주",
        "Third": "셋째주",
        "Fourth": "넷째주",
        "Last": "마지막주"
    },
    HASH_DAYNAME: {
        "Monday": "월요일",
        "Tuesday": "화요일",
        "Wednesday": "수요일",
        "Thursday": "목요일",
        "Friday": "금요일",
        "Saturday": "토요일",
        "Sunday": "일요일"
    },
    HASH_WEEKNAME: {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    },
    HASH_REMINDER: {
        0: "해제",
        15: "15분",
        30: "30분",
        60: "1시간",
        120: "2시간",
        180: "3시간",
        720: "12시간",
        1440: "1일",
        2880: "2일",
        4320: "3일",
        10080: "1주",
        20160: "2주",
        30240: "3주"
    }
};