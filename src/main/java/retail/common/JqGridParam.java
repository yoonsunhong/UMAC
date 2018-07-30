package retail.common;

import javax.servlet.http.HttpServletRequest;

public class JqGridParam {
	
	private int page;
	private int rows;
	private String sidx;
	private String sord;
	private int offset;
	private int limit;
	
	public JqGridParam(int page, int rows, String sidx, String sord) {
		this.page = page;
		this.rows = rows;
		this.sidx = sidx;
		this.sord = sord;
		offset = (page - 1) * rows;
		limit = offset + rows;
		//System.out.println("page:"+page);
		//System.out.println("rows:"+rows);
		//System.out.println("sidx:"+sidx);
		//System.out.println("sord:"+sord);
		//System.out.println("range:"+offset+"~"+limit);
		
	}
	public JqGridParam(HttpServletRequest request) {
		this(Integer.parseInt(request.getParameter("page"))
				, Integer.parseInt(request.getParameter("rows"))
				, request.getParameter("sidx")
				, request.getParameter("sord"));
	}
	
	public int getPage() {
		return page;
	}
	
	public int getRows() {
		return rows;
	}
	
	public String getSidx() {
		return sidx;
	}
	
	public String getSord() {
		return sord;
	}
	
	public int getOffset() {
		return offset;
	}
	
	public int getLimit() {
		return limit;
	}
}
