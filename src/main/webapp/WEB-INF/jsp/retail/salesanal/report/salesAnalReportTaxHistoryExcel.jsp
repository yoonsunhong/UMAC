<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	request.setCharacterEncoding("UTF-8");
	String titleName = "면과세매출내역";
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
	<th style="background-color: #E4DEDE">면세금액</th>
	<th style="background-color: #E4DEDE">과세금액</th>
	<th style="background-color: #E4DEDE">부가세액</th>
	<th style="background-color: #E4DEDE">공병금액</th>
	<th style="background-color: #E4DEDE">소모품</th>
	<th style="background-color: #E4DEDE">전체합계</th>
</tr>
</thead>
<tbody>
<c:choose>
	<c:when test="${fn:length(excelList) > 0}">
		<c:forEach items="${excelList}" var="list" varStatus="status">
			<tr>
				<td  style='text-align:"center"'>${list.STR_NAME}</td>
				<td  style='mso-number-format: "@"; text-align:"center"'>${list.SALE_DT}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"'>${list.SALE_AMT }</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"'>${list.SALE_TAX}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"'>${list.SALE_BUKA }</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"'>${list.BOT_AMT}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"'>${list.SO_SALE_AMT}</td>
				<td  style='mso-number-format: "\#\,\#\#0"; text-align:"right"'>${list.ROW_TOTAL}</td>
			</tr>
			<%--소계값 셋팅--%>
			<c:set var= "sum_sale_amt" value="${sum_sale_amt + list.SALE_AMT}"/>
			<c:set var= "sum_sale_tax" value="${sum_sale_tax + list.SALE_TAX}"/>
			<c:set var= "sum_sale_buka" value="${sum_sale_buka + list.SALE_BUKA}"/>
			<c:set var= "sum_bot_amt" value="${sum_bot_amt + list.BOT_AMT}"/>
			<c:set var= "sum_so_sale_amt" value="${sum_so_sale_amt + list.SO_SALE_AMT}"/>
			<c:set var= "sum_row" value="${sum_row + list.ROW_TOTAL}"/>
			
			<c:if test="${excelList[status.index].STR_NAME != excelList[status.index+1].STR_NAME}"> <%-- 점포이름이 바뀐지 체크 --%>
				<tr>
					<th  colspan="2" style="background-color: #FFF19F">소계</th>
					<td  style='mso-number-format: "\#\,\#\#0"; background-color: #FFF19F; text-align:"right"'>${sum_sale_amt }</td>
					<td  style='mso-number-format: "\#\,\#\#0"; background-color: #FFF19F; text-align:"right"'>${sum_sale_tax }</td>
					<td  style='mso-number-format: "\#\,\#\#0"; background-color: #FFF19F; text-align:"right"'>${sum_sale_buka }</td>
					<td  style='mso-number-format: "\#\,\#\#0"; background-color: #FFF19F; text-align:"right"'>${sum_bot_amt }</td>
					<td  style='mso-number-format: "\#\,\#\#0"; background-color: #FFF19F; text-align:"right"'>${sum_so_sale_amt }</td>
					<td  style='mso-number-format: "\#\,\#\#0"; background-color: #FFF19F; text-align:"right"'>${sum_row }</td>
				</tr>
			<%-- 합계 누적 시키기 --%>
			<c:set var= "total_sum_sale_amt" value="${sum_sale_amt + total_sum_sale_amt}"/>
			<c:set var= "total_sum_sale_tax" value="${sum_sale_tax + total_sum_sale_tax}"/>
			<c:set var= "total_sum_sale_buka" value="${sum_sale_buka + total_sum_sale_buka}"/>
			<c:set var= "total_sum_bot_amt" value="${sum_bot_amt + total_sum_bot_amt}"/>
			<c:set var= "total_sum_so_sale_amt" value="${sum_so_sale_amt + total_sum_so_sale_amt}"/>
			<c:set var= "total_sum_row" value="${sum_row + total_sum_row}"/>
			
			
			<%--점포명이 바뀌면, 소계 초기화--%>
			<c:set var= "sum_sale_amt" value="0"/>
			<c:set var= "sum_sale_tax" value="0"/>
			<c:set var= "sum_sale_buka" value="0"/>
			<c:set var= "sum_bot_amt" value="0"/>
			<c:set var= "sum_so_sale_amt" value="0"/>
			<c:set var= "sum_row" value="0"/>
			</c:if>
		</c:forEach>
			<tr>
				<th colspan="2" style="background-color: #E4DEDE">합계</th>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${total_sum_sale_amt}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${total_sum_sale_tax}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${total_sum_sale_buka}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${total_sum_bot_amt}" /></td>
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${total_sum_so_sale_amt}" /></td> 
				<td style='mso-number-format: "\#\,\#\#0"; background-color: #E4DEDE; text-align:"right"'><c:out value="${total_sum_row}" /></td> 
			</tr>
	</c:when>
	<c:otherwise>
		<tr><td colspan="8" class="last">목록이 존재 하지 않습니다.</td></tr>
	</c:otherwise>
</c:choose>

</tbody>
</table>