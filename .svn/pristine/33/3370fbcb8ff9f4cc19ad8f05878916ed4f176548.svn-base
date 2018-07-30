// jsp 레포트 맨 하단에 추가 할것 <script  type="text/javascript" src="/AiReport/AIViewer50/common/js/XDomain.js"></script>

function addEvent(el, type, func)
{
    if (el.addEventListener)
    {
        el.addEventListener(type, func, false);
    }
    else if (el.attachEvent)
    {
        el.attachEvent('on' + type, func);
    }
    else
    {
        el['on' + type] = el['e' + type + func];
    }
}

function contentLoaded()
{
    addEvent(window, "message", receiveMessage);
}

function receiveMessage(e)
{
    if (e.origin == "http://localhost:8085" || e.origin == "http://192.168.0.29:8085" || e.origin.indexOf("file:") > -1)
    {
        var jsonObject = null;
        var recevieData = e.data;
        
        try
        {
            jsonObject = JSON.parse(recevieData);
        }
        catch(e)
        {
            alert(recevieData);
            return;
        }

        if (jsonObject && jsonObject.reportid)
        {
            switch (jsonObject.command)
            {
                case "first":
                    goScroll(startPage);
                    break;
                case "prev":
                    goScroll(currentPage - 1);
                    break;
                case "next":
                    goScroll(currentPage + 1);
                    break;
                case "last":
                    goScroll(endPage);
                    break;
                //case "zoomin":
                //    goZoomIn();
                //    break;
                //case "zoomout":
                //    goZoomOut();
                //    break;
                case "print":
                	//ImagePrint();
                    PDFPrint();
                    break;
                case "exportpdf":
                    PDFConvert();
                    break;
                case "exportexcel":
                    ExcelConvert();
                    break;
                case "exporthwp":
                    hwpConvert();
                    break;
                case "exportmsword":
                    mswordConvert();
                    break;
                case "exportpowerpoint":
                    powerPointConvert();
                    break;
                case "contentdocument":
                    contentDocument(jsonObject.eid, jsonObject.command);
                    break;
            }
        }
    }
}

function contentDocument(eid, command)
{
	var html = document.documentElement.outerHTML;
	var jsonObject = { "reportid": eid, "command": command, "result": html };
	//parent.contentWindow.postMessage(JSON.stringify(jsonObject), "http://192.168.0.29:8080");
    parent.contentWindow.postMessage(JSON.stringify(jsonObject), "*");
}

if (document.addEventListener)
{
    document.addEventListener('DOMContentLoaded', contentLoaded);
}
else
{
    addEvent(window, 'load', contentLoaded);
}