<%@ page contentType="text/csv" %>

<%
    response.setCharacterEncoding("EUC-KR"); // set to client(windows) native charset.
    response.setHeader("Content-Disposition", "attachment; filename=aireport.csv");

    //시큐어 코딩 관련
    //HTML data가 아니기 때문에(CSV format) data값에 대한 검증이 필요하지않음.
    //data값에 대한 치환이 일어나면 오류data가 client에 전송됨.
    String data=request.getParameter("data");
    if(data==null)
        data="";
    request.setCharacterEncoding("UTF-8");
    out.print(data);
    out.close();
%>
