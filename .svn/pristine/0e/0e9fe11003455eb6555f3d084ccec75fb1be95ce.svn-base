
//캔버스 초기화
var canvas;
var ctx;
function initCanvas(id){
	 canvas=document.getElementById(id);
	 ctx=canvas.getContext("2d");
}
//캔버스 초기화의 체크
function chkCtx(){
	if(!ctx){
		alert("canvas가 초기화 되지 않았거나 지원하지 않는 웹 브라우저입니다.");
		return false;
	}
}

//fill color
function fillColor(x, y, width, height, fillColor){
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}
	
	if(fillColor!="")
	{
		ctx.fillStyle=fillColor;
		ctx.fillRect(x, y, width, height);
	}
	
}

//rect
function drawRect(x, y, width, height, lineWidth, lineColor, fillColor){
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}

    if (ctx.setLineDash) {
        //ctx.setLineDash([12, 3, 3, 3]);
    }
    else{

    }

	if(fillColor!="")
	{
		ctx.fillStyle=fillColor;
		ctx.fillRect(x, y, width, height);
	}

	if(lineWidth!=-1)
	{
		ctx.lineWidth=lineWidth;
		ctx.strokeStyle=lineColor;
		ctx.strokeRect(x, y, width, height);
	}
	
	ctx.strokeRect(x, y, width, height);
	ctx.restore();
}


//Draw roundRect
function drawRoundRect(x, y, width, height, radius, lineWidth, lineColor, fillColor) {   
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}

    if (ctx.setLineDash) {

    }
	else{

    }

	ctx.beginPath();
	ctx.moveTo(x+radius, y);
	ctx.lineTo(x+width-radius, y);
	ctx.quadraticCurveTo(x+width, y, x+width, y+radius);   
	ctx.lineTo(x+width, y+height-radius);   
	ctx.quadraticCurveTo(x+width, y+height, x+width-radius, y+height);   
	ctx.lineTo(x+radius, y+height);   
	ctx.quadraticCurveTo(x, y+height, x, y+height-radius);   
	ctx.lineTo(x, y+radius);   
	ctx.quadraticCurveTo(x, y, x+radius, y);   

	if(fillColor!="") {
		ctx.fillStyle=fillColor;
		ctx.fill();
	}
	
	if(lineColor!="") {
		ctx.lineWidth=lineWidth;   
		ctx.strokeStyle=lineColor;
		ctx.stroke();
	}
}

function drawEllipse(x, y, width, height, lineWidth, lineColor, fillColor) {
  var kappa = .5522848;
  var ox = (width / 2) * kappa; 	// control point offset horizontal
  var oy = (height / 2) * kappa; 	// control point offset vertical
  var xe = x + width;           		// x-end
  var ye = y + height;           		// y-end
  var xm = x + width / 2;       		// x-middle
  var ym = y + height / 2;       		// y-middle

    if (ctx.setLineDash) {
        //ctx.setLineDash([]);
    }
    else{

    }

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath();
  
  if(fillColor!=""){
	ctx.fillStyle=fillColor;
	ctx.fill();
  }

  if(lineColor!="") {
		ctx.lineWidth=lineWidth;   
		ctx.strokeStyle=lineColor;
		ctx.stroke();
  }

}

function drawLine(x1, y1, x2, y2, lineWidth, lineColor) {
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}

	ctx.lineWidth=lineWidth;
	ctx.strokeStyle=lineColor;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2); 
	
	ctx.stroke();
}

function drawLine2(x1, y1, x2, y2, lineWidth, lineColor, type) {
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}
	
	if(lineWidth==0)
		lineWidth=1;
	
	//type 0 - None, 1 - Solid, 2 - Dash, 3 - Dot, 4 - DashDot, 5 - DashDotDot, 8 - DoubleSlim
	
	if(type==2 || type==3 || type==4 || type==5){
		drawDottedLine(x1, y1, x2, y2, lineWidth, lineColor);
		return;
	}
	
	if(type==8)
		lineWidth=3;

	ctx.lineWidth=lineWidth;
	ctx.strokeStyle=lineColor;
	
	ctx.beginPath();

	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2); 
	
	ctx.stroke();
}

function drawDottedLine(x1, y1, x2, y2, lineWidth, lineColor) {
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}
	
	ctx.lineWidth=lineWidth;
	ctx.lineWidth=1.5;
	ctx.strokeStyle=lineColor;
	
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	
	var dashLen = 2;
	var dX = x2 - x1;
    var dY = y2 - y1;
    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
    var dashX = dX / dashes;
    var dashY = dY / dashes;
	
    var q = 0;
    while (q++ < dashes) {
     x1 += dashX;
     y1 += dashY;
     ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
    }
    ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);

	ctx.stroke();
	ctx.closePath();
}

function drawDashedLine(x1, y1, x2, y2, lineWidth, lineColor) {
    var chkCtxReturn=chkCtx();
    if(chkCtxReturn==false){return false;}

    ctx.lineWidth=lineWidth;
    ctx.lineWidth=1.5;
    ctx.strokeStyle=lineColor;

    ctx.beginPath();
    ctx.moveTo(x1, y1);

    var dashLen = 4;
    var dX = x2 - x1;
    var dY = y2 - y1;
    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
    var dashX = dX / dashes;
    var dashY = dY / dashes;

    var q = 0;
    while (q++ < dashes) {
        x1 += dashX;
        y1 += dashY;
        ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
    }
    ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);

    ctx.stroke();
    ctx.closePath();
}

function drawText(x, y, text, fontStyle, fontColor, horAlign)
{
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}
	
	ctx.font=fontStyle;
	var size=ctx.measureText(text).width;
	//alert(size);
	
	//drawRect(x, y, size, 13.33, 1.33, "rgb(255,0,0)", "");
	
	ctx.fillStyle=fontColor;
	ctx.textBaseline="top";
	ctx.textAlign=horAlign;

  	ctx.fillText(text, x, y);
}

function drawText2(x, y, text, font, fontColor, horAlign, width)
{
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}
	
	ctx.font=font;
 
	ctx.fillStyle=fontColor;
	ctx.textBaseline="Bottom";
	ctx.textAlign=horAlign;
	//var size=ctx.measureText(text).width;
 	  	
  	ctx.fillText(text, x, y);
}


function drawTextLine2(x, y, text, color, align)
{
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}
	
	var textWidth =ctx.measureText(text).width;

	var startX;
	var startY = y+3;
	var endX;
	var endY = startY;

	ctx.beginPath();
	if(align == "center"){
		startX = x - (textWidth/2);
	    endX = x + (textWidth/2);
	}else if(align == "right"){
	    startX = x-textWidth;
	    endX = x;
	}else{
	    startX = x;
	    endX = x + textWidth;
	}

	ctx.strokeStyle = color;
	//ctx.lineWidth = underlineHeight;
	ctx.lineWidth=1;
	ctx.moveTo(startX,startY);
	ctx.lineTo(endX,endY);
	ctx.stroke();
}

function drawImage(x, y, width, height, imageUrl)
{
	var chkCtxReturn=chkCtx();
	if(chkCtxReturn==false){return false;}

    var imageDownloadCheckTimer;
	
	var img = new Image();

	img.onload = function() {
		ctx.drawImage(img, x, y, width, height);
	};
	
	img.src=imageUrl;

    imageDownloadCheckTimer = window.setInterval(function () {
        if (cookieValue == "success") {

            window.clearInterval(fileDownloadCheckTimer);
            return;
        }

    }, 500);
}


