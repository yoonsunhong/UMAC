<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%

	request.setCharacterEncoding("UTF-8");
	String str_code = (String)request.getAttribute("str_code");
	String sale_dt	=	(String)request.getAttribute("sale_dt");
	String str_name ="";
	
	if("10015".equals(str_code)){
		str_name ="일곡점";
	}else if("10016".equals(str_code)){
		str_name ="화정점";
	}else if("10018".equals(str_code)){
		str_name ="아중점";
	}else if("10019".equals(str_code)){
		str_name ="신가점";
	}else if("10020".equals(str_code)){
		str_name ="송정점";
	}else if("10030".equals(str_code)){
		str_name ="하남물류";
	}
	
	String titleName =  str_name + "_" + sale_dt;
	titleName = new String(titleName.getBytes("KSC5601"), "8859_1");
	
	response.setHeader("Content-Disposition", "attachment; filename=\""+titleName+".xls\";");
	response.setHeader("Content-Description", "JSP Generated Data");
	
%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<!-- list start -->
<table border="1">
<thead>
<tr>
	<th style="background-color: #E4DEDE">IN_DT</th>
	<th style="background-color: #E4DEDE">CO_CD</th>
	<th style="background-color: #E4DEDE">DIV_CD</th>
	<th style="background-color: #E4DEDE">DEPT_CD</th>
	<th style="background-color: #E4DEDE">ISU_DT</th>
	
	
	<th style="background-color: #E4DEDE">IN_SQ</th>
	<th style="background-color: #E4DEDE">LN_SQ</th>
	<th style="background-color: #E4DEDE">ACCT_CD</th>
	<th style="background-color: #E4DEDE">DRCR_FG</th>
	<th style="background-color: #E4DEDE">RMK_DC</th>
	
	
	<th style="background-color: #E4DEDE">ACCT_AM</th>
	<th style="background-color: #E4DEDE">TR_CD</th>
	<th style="background-color: #E4DEDE">CT_DEPT</th>
	<th style="background-color: #E4DEDE">PJT_CD</th>
	<th style="background-color: #E4DEDE">CT_NB</th>
	
	
	<th style="background-color: #E4DEDE">FR_DT</th>
	<th style="background-color: #E4DEDE">TO_DT</th>
	<th style="background-color: #E4DEDE">CT_QT</th>
	<th style="background-color: #E4DEDE">CT_AM</th>
	<th style="background-color: #E4DEDE">CT_RT</th>
	
	
	<th style="background-color: #E4DEDE">CT_DEAL</th>
	<th style="background-color: #E4DEDE">CT_USER1</th>
	<th style="background-color: #E4DEDE">CT_USER2</th>
	<th style="background-color: #E4DEDE">ATTR_CD</th>
	<th style="background-color: #E4DEDE">ISU_DOC</th>
	
	
	<th style="background-color: #E4DEDE">LOGIC_CD</th>
	<th style="background-color: #E4DEDE">DUMMY1</th>
	<th style="background-color: #E4DEDE">DUMMY2</th>
	<th style="background-color: #E4DEDE">JEONJA_YN</th>
	<th style="background-color: #E4DEDE">PAYMENT_PT</th>
	
	
	<th style="background-color: #E4DEDE">ISU_NM</th>
	<th style="background-color: #E4DEDE">BILL_FG1</th>
	<th style="background-color: #E4DEDE">BILL_FG2</th>
	<th style="background-color: #E4DEDE">DEAL_FG</th>
	
	<th style="background-color: #E4DEDE">RMK_NB</th>
	
	
</tr>
</thead>
<tbody>
<c:choose>
	<c:when test="${fn:length(excelList) > 0}">
		<c:forEach items="${excelList}" var="list" varStatus="status">
			<tr>
				<td  style='text-align:"center"'>${list.IN_DT}</td>
				<td  style='text-align:"center"'>${list.CO_CD}</td>
				<td  style='text-align:"center"'>${list.DIV_CD}</td>
				<td  style='text-align:"center"'>${list.DEPT_CD}</td>
				<td  style='text-align:"center"'>${list.ISU_DT}</td>
				
				
				<td  style='text-align:"center"'>${list.IN_SQ}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.LN_SQ}</td>
				<td  style='text-align:"center"'>${list.ACCT_CD}</td>
				<td  style='text-align:"center"'>${list.DRCR_FG}</td>
				<td  style='text-align:"center"'>${list.RMK_DC}</td>
				
				
				<td  style='mso-number-format: "@"; text-align:"right"'>${list.ACCT_AM}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.TR_CD}</td>
				<td  style='text-align:"center"'>${list.CT_DEPT}</td>
				<td  style='text-align:"center"'>${list.PJT_CD}</td>
				<td  style='text-align:"center"'>${list.CT_NB}</td>
				
				
				<td  style='text-align:"center"'>${list.FR_DT}</td>
				<td  style='text-align:"center"'>${list.TO_DT}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.CT_QT}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.CT_AM}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.CT_RT}</td>
				
				
				<td  style='text-align:"center"'>${list.CT_DEAL}</td>
				<td  style='text-align:"center"'>${list.CT_USER1}</td>
				<td  style='text-align:"center"'>${list.CT_USER2}</td>
				<td  style='text-align:"center"'>${list.ATTR_CD}</td>
				<td  style='text-align:"center"'>${list.ISU_DOC}</td>
				
				
				<td  style='text-align:"center"'>${list.LOGIC_CD}</td>
				<td  style='text-align:"center"'>${list.DUMMY1}</td>
				<td  style='text-align:"center"'>${list.DUMMY2}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.JEONJA_YN}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>0</td>
				
				
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.ISU_NM}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.BILL_FG1}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>0</td>
				<td  style='text-align:"center"'></td>
				
				
				<td  style='text-align:"center"'>${list.RMK_NB}</td>
			</tr>
		</c:forEach>
	</c:when>
	<c:otherwise>
		<tr><td colspan="30" class="last">목록이 존재 하지 않습니다.</td></tr>
	</c:otherwise>
</c:choose>

</tbody>
</table>