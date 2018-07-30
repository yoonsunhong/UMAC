<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	request.setCharacterEncoding("UTF-8");
	String titleName = "교환권출력현황";
	titleName = new String(titleName.getBytes("KSC5601"), "8859_1");
	
	response.setHeader("Content-Disposition", "attachment; filename=\""+titleName+".xls\";");
	response.setHeader("Content-Description", "JSP Generated Data");
	
%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<!-- list start -->
<table border="1">
<thead>
<tr>
	<th style="background-color: #E4DEDE">점포명</th>
	<th style="background-color: #E4DEDE">매출일자</th>
	<th style="background-color: #E4DEDE">POS번호</th>
	<th style="background-color: #E4DEDE">거래번호</th>
	<th style="background-color: #E4DEDE">회원번호</th>
	<th style="background-color: #E4DEDE">회원명</th>
	<th style="background-color: #E4DEDE">카드번호</th>
	<th style="background-color: #E4DEDE">카드사명</th>
	<th style="background-color: #E4DEDE">발행수량</th>
	<th style="background-color: #E4DEDE">매출액</th>
</tr>
</thead>
<tbody>
<c:choose>
	<c:when test="${fn:length(excelList) > 0}">
		<c:forEach items="${excelList}" var="list" varStatus="status">
			<tr>
				<td  style='text-align:"center"'>${list.STR_NAME}</td>
				<td  style='text-align:"center"'>${list.SALE_DT}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.POS_NO }</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.TRXN_NO}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.CUST_NO }</td>
				<td  style='text-align:"center"'>${list.CUST_NAME}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.CARD_NO}</td>
				<td  style='text-align:"center"'>${list.MBR_DSNT}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"'>${list.EXCHG_ISSUED_CNT}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"'>${list.SALE_AMT}</td>
			</tr>
			<c:set var= "sum_exchg_issued_cnt" value="${sum_exchg_issued_cnt + list.EXCHG_ISSUED_CNT}"/>
			<c:set var= "sum_sale_amt" value="${sum_sale_amt + list.SALE_AMT}"/>
		</c:forEach>
			<tr>
				<th colspan="8" style="background-color: #E4DEDE">합계</th>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_exchg_issued_cnt}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_sale_amt}" /></td>
			</tr>
	</c:when>
	<c:otherwise>
		<tr><td colspan="10" class="last">목록이 존재 하지 않습니다.</td></tr>
	</c:otherwise>
</c:choose>

</tbody>
</table>