<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	request.setCharacterEncoding("UTF-8");
	String titleName = "계산원과부족현황관리";
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
	<th style="background-color: #E4DEDE">사원번호</th>
	<th style="background-color: #E4DEDE">사원명</th>
	<th style="background-color: #E4DEDE">매출일자</th>
	<th style="background-color: #E4DEDE">POS</th>
	<th style="background-color: #E4DEDE">객수</th>
	<th style="background-color: #E4DEDE">현금</th>
	<th style="background-color: #E4DEDE">신용카드</th>
	<th style="background-color: #E4DEDE">외상매출</th>
	<th style="background-color: #E4DEDE">포인트</th>
	<th style="background-color: #E4DEDE">매출합계</th>
	<th style="background-color: #E4DEDE">과부족</th>
</tr>
</thead>
<tbody>
<c:choose>
	<c:when test="${fn:length(excelList) > 0}">
		<c:forEach items="${excelList}" var="list" varStatus="status">
			<tr>
				<td  style='text-align:"center"'>${list.STR_NAME}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.EMP_NO}</td>
				<td  style='text-align:"center"'>${list.EMP_NAME }</td>
				<td  style='text-align:"center"'>${list.SALE_DT}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.POS_NO }</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"''>${list.AS_TOT_CNT}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"''>${list.AS_CASH_SALE_TOTAL}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"''>${list.AS_CARD_TOTAL}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"''>${list.AS_CREDIT_AMT}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"''>${list.AS_POINT_USE_AMT}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"''>${list.AS_SALE_TOTAL}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"''>${list.CASH_SHORT_OVER}</td>
			</tr>
			<c:set var= "sum_tot_cnt" value="${sum_tot_cnt + list.AS_TOT_CNT}"/>
			<c:set var= "sum_cash_sale_total" value="${sum_cash_sale_total + list.AS_CASH_SALE_TOTAL}"/>
			<c:set var= "sum_card_total" value="${sum_card_total + list.AS_CARD_TOTAL}"/>
			<c:set var= "sum_credit_amt" value="${sum_credit_amt + list.AS_CREDIT_AMT}"/>
			<c:set var= "sum_point_use_amt" value="${sum_point_use_amt + list.AS_POINT_USE_AMT}"/>
			<c:set var= "sum_sale_total" value="${sum_sale_total + list.AS_SALE_TOTAL}"/>
			<c:set var= "sum_cash_short_over" value="${sum_cash_short_over + list.CASH_SHORT_OVER}"/>
		</c:forEach>
			<tr>
				<th colspan="5" style="background-color: #E4DEDE">합계</th>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_tot_cnt}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_cash_sale_total}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_card_total}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_credit_amt}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_point_use_amt}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_sale_total}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${sum_cash_short_over}" /></td>
			</tr>
	</c:when>
	<c:otherwise>
		<tr><td colspan="11" class="last">목록이 존재 하지 않습니다.</td></tr>
	</c:otherwise>
</c:choose>

</tbody>
</table>