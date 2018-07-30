<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	request.setCharacterEncoding("UTF-8");
	String titleName = "고객관리(비회원)";
	titleName = new String(titleName.getBytes("KSC5601"), "8859_1");
	
	response.setHeader("Content-Disposition", "attachment; filename=\""+titleName+".xls\";");
	response.setHeader("Content-Description", "JSP Generated Data");
	
%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<!-- list start -->
<table border="1">
<thead>
<tr>
	<th style="background-color: #E4DEDE">관리번호</th>
	<th style="background-color: #E4DEDE">회원명</th>
	<th style="background-color: #E4DEDE">휴대전화</th>
	<th style="background-color: #E4DEDE">DM여부</th>
	<th style="background-color: #E4DEDE">우편번호</th>
	<th style="background-color: #E4DEDE">주소</th>
	<th style="background-color: #E4DEDE">상세주소</th>
</tr>
</thead>
<tbody>
<c:choose>
	<c:when test="${fn:length(excelList) > 0}">
		<c:forEach items="${excelList}" var="list" >
			<tr>
				<td style='mso-number-format: "@"'>${list.MGMT_NO }</td>
				<td>${list.CUST_NAME}</td>
				<td style='mso-number-format: "@"'>${list.MOBIL_NO }</td>
				<td>${list.DM_YN_NM }</td>
				<td style='mso-number-format: "@"'>${list.POST_NO }</td>
				<td>${list.ADDR }</td>
				<td>${list.ADDR_DTL }</td>
			</tr>
		</c:forEach>
	</c:when>
	<c:otherwise>
		<tr><td colspan="8" class="last">목록이 존재 하지 않습니다.</td></tr>
	</c:otherwise>
</c:choose>

</tbody>
</table>