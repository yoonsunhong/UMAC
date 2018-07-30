<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	request.setCharacterEncoding("UTF-8");
	String titleName = "매출부가세_신용카드_안분";
	titleName = new String(titleName.getBytes("KSC5601"), "8859_1");
	
	response.setHeader("Content-Disposition", "attachment; filename=\""+titleName+".xls\";");
	response.setHeader("Content-Description", "JSP Generated Data");
	
%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<!-- list start -->
<table border="1">
<thead>
<tr>
	<th style="background-color: #E4DEDE">No</th>
	<th style="background-color: #E4DEDE">회원번호</th>
	<th style="background-color: #E4DEDE">회계코드</th>
	<th style="background-color: #E4DEDE">거래처명</th>
	<th style="background-color: #E4DEDE">사업자번호</th>
	<th style="background-color: #E4DEDE">세무구분</th>
	<th style="background-color: #E4DEDE">공급가액</th>
	<th style="background-color: #E4DEDE">부가세</th>
	<th style="background-color: #E4DEDE">합계액</th>
	<th style="background-color: #E4DEDE">신용카드(안분)</th>
	<th style="background-color: #E4DEDE">현금영수증</th>
</tr>
</thead>
<tbody>
<c:choose>
	<c:when test="${fn:length(excelList) > 0}">
		<c:forEach items="${excelList}" var="list" >
			<tr>
				<td>${list.RNUM }</td>
				<td style='mso-number-format: "@"'>${list.CUST_NO}</td>
				<td style='mso-number-format: "@"'>${list.ACCT_DEPT }</td>
				<td>${list.CUST_NAME }</td>
				<td style='mso-number-format: "@"'>${list.BUSI_NO }</td>
				<td>${list.TAX_GB_NM }</td>
				<td style='mso-number-format: "\#\,\#\#0"'>${list.SALE_AMT }</td>
				<td style='mso-number-format: "\#\,\#\#0"'>${list.TAX_AMT }</td>
				<td style='mso-number-format: "\#\,\#\#0"'>${list.SUM_SALE_AMT }</td>
				<td style='mso-number-format: "\#\,\#\#0"'>${list.SUM_AN_AMT }</td>
				<td style='mso-number-format: "\#\,\#\#0"'>${list.SUM_CASH_AMT }</td>
			</tr>
		</c:forEach>
	</c:when>
	<c:otherwise>
		<tr><td colspan="11" class="last">목록이 존재 하지 않습니다.</td></tr>
	</c:otherwise>
</c:choose>

</tbody>
</table>