<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	request.setCharacterEncoding("UTF-8");
	String titleName = "매출부가세전송_자동분개";
	titleName = new String(titleName.getBytes("KSC5601"), "8859_1");
	
	response.setHeader("Content-Disposition", "attachment; filename=\""+titleName+".xls\";");
	response.setHeader("Content-Description", "JSP Generated Data");
	
%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<!-- list start -->
<table border="1">
<thead>
<tr>
	<th style="background-color: #FAF20A">IN_DT</th>
	<th style="background-color: #FAF20A">CO_CD</th>
	<th style="background-color: #FAF20A">DIV_CD</th>
	<th style="background-color: #FAF20A">DEPT_CD</th>
	<th style="background-color: #FAF20A">ISU_DT</th>
	<th style="background-color: #FAF20A">IN_SQ</th>
	<th style="background-color: #FAF20A">LN_SQ</th>
	<th style="background-color: #FAF20A">ACCT_CD</th>
	<th style="background-color: #FAF20A">DRCR_FG</th>
	<th style="background-color: #F5AC7E">RMK_DC</th>
	<th style="background-color: #FAF20A">ACCT_AM</th>
	<th style="background-color: #FAF20A">TR_CD</th>
	<th style="background-color: #4BAEE7">CT_DEPT</th>
	<th style="background-color: #4BAEE7">PJT_CD</th>
	<th style="background-color: #4BAEE7">CT_NB</th>
	<th style="background-color: #4BAEE7">FR_DT</th>
	<th style="background-color: #4BAEE7">TO_DT</th>
	<th style="background-color: #4BAEE7">CT_QT</th>
	<th style="background-color: #4BAEE7">CT_AM</th>
	<th style="background-color: #4BAEE7">CT_RT</th>
	<th style="background-color: #4BAEE7">CT_DEAL</th>
	<th style="background-color: #4BAEE7">CT_USER1</th>
	<th style="background-color: #4BAEE7">CT_USER2</th>
	<th style="background-color: #4BAEE7">ATTR_CD</th>
	<th style="background-color: #FAF20A">ISU_DOC</th>
	<th style="background-color: #FAF20A">LOGIC_CD</th>
	<th style="background-color: #4BAEE7">DUMMY1</th>
	<th style="background-color: #4BAEE7">DUMMY2</th>
	<th style="background-color: #4BAEE7">JEONJA_YN</th>
</tr>
<tr>
	<th style="background-color: #C7F7E4" rowspan="2">처리일자(0)</th>
	<th style="background-color: #C7F7E4" rowspan="2">회사코드(1)</th>
	<th style="background-color: #C7F7E4" rowspan="2">사업장코드(2)</th>
	<th style="background-color: #C7F7E4" rowspan="2">부서코드(3)</th>
	<th style="background-color: #C7F7E4" rowspan="2">결의일자(4)</th>
	<th style="background-color: #C7F7E4" rowspan="2">자동전표번호(5)</th>
	<th style="background-color: #C7F7E4" rowspan="2">라인번호(6)</th>
	<th style="background-color: #C7F7E4" rowspan="2">계정과목(7)</th>
	<th style="background-color: #C7F7E4" rowspan="2">차대구분(8)</th>
	<th style="background-color: #C7F7E4" rowspan="2">적요(9)</th>
	<th style="background-color: #C7F7E4" rowspan="2">금액(10)</th>
	<th style="background-color: #C7F7E4">관리항목</th>
	<th style="background-color: #C7F7E4">사용부서등</th>
	<th style="background-color: #C7F7E4">프로젝트코드</th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4">발생일</th>
	<th style="background-color: #C7F7E4">만기일</th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4" rowspan="2">품의내역(24)</th>
	<th style="background-color: #C7F7E4" rowspan="2">전표유형(25)</th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4"></th>
	<th style="background-color: #C7F7E4"></th>
</tr>
<tr>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(11)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(12)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(13)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(14)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(15)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(16)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(17)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(18)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(19)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(20)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(21)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(22)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(23)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(26)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(27)</th>
	<th style="background-color: #C7F7E4; mso-number-format: '@'">(28)</th>
</tr>
</thead>
<tbody>
<c:choose>
	<c:when test="${fn:length(excelList) > 0}">
		<c:forEach items="${excelList}" var="list" >
			<tr>
				<td>${list.IN_DT }</td>
				<td>${list.CO_CD }</td>
				<td>${list.DIV_CD }</td>
				<td>${list.DEPT_CD }</td>
				<td>${list.ISU_DT }</td>
				<td>${list.IN_SQ }</td>
				<td>${list.LN_SQ }</td>
				<td>${list.ACCT_CD }</td>
				<td>${list.DRCR_FG }</td>
				<td>${list.RMK_DC }</td>
				<td style='mso-number-format: "\#\,\#\#0"'>${list.ACCT_AM }</td>
				<td style='mso-number-format: "@"'>${list.TR_CD }</td>
				<td>${list.CT_DEPT }</td>
				<td>${list.PJT_CD }</td>
				<td>${list.CT_NB }</td>
				<td style='mso-number-format: "@"'>${list.FR_DT }</td>
				<td style='mso-number-format: "@"'>${list.TO_DT }</td>
				<td>${list.CT_QT }</td>
				<td style='mso-number-format: "\#\,\#\#0"'>${list.CT_AM }</td>
				<td>${list.CT_RT }</td>
				<td>${list.CT_DEAL }</td>
				<td>${list.CT_USER1 }</td>
				<td>${list.CT_USER2 }</td>
				<td>${list.ATTR_CD }</td>
				<td>${list.ISU_DOC }</td>
				<td>${list.LOGIC_CD }</td>
				<td>${list.DUMMY1 }</td>
				<td>${list.DUMMY2 }</td>
				<td>${list.JEONJA_YN }</td>
			</tr>
		</c:forEach>
	</c:when>
	<c:otherwise>
		<tr><td colspan="29" class="last">목록이 존재 하지 않습니다.</td></tr>
	</c:otherwise>
</c:choose>

</tbody>
</table>