package retail.common;

import java.util.ArrayList;
import java.util.List;

public class JqGridResult {

	
	private int page;				// 현재페이지
	//private int rows;				// 목록데이터
	private int total;				// 총페이지수
	private int records;            // 총목록수
	private boolean specialCharConvert = false;
	
	private List<String> jsonDataSet = new ArrayList<String>();
	
	public JqGridResult(int page, int rows, int records) {
		this.page = page;
		//this.rows = rows;
		this.records = records;
		if(rows == 0) {
			this.total = 0;
		} else {
			this.total = records/rows;
			if(records%rows != 0) {
				this.total++;
			}
		}
	}
	
	public JqGridResult(int page, int total, int records, String temp) {
		
		this.page = page;
		this.total = total;
		this.records = records;
		
	}
	
	public JqGridResult(JqGridParam jqGridParam, int records) {
		this(jqGridParam.getPage(), jqGridParam.getRows(), records);
	}

	public JqGridResult(int records) {
		this(1, records, records);
	}
	
	public void setSpecialCharConvert(boolean value) {
		this.specialCharConvert = value;
	}
	
	public void addData(Object id, Object...values) {
//		JSONArray cols = new JSONArray();
//		for(int i=0; i<values.length; i++) {
//			String value = values[i]+"";
//			cols.add(value);
//		}
//		
//		JSONObject rec = new JSONObject();
//		rec.put("id", id);
//		rec.put("cell", cols);
//		
//		String jsonStr = rec.toString();
//		//System.out.println("json string:"+jsonStr);
//		jsonDataSet.add(jsonStr);
		
		StringBuilder jsonData = new StringBuilder();
		jsonData.append("{\"id\": \""+id+"\",\"cell\": [");
		for(int i=0; i<values.length; i++) {
			Object value = values[i];
			if(i > 0) {
				jsonData.append(",");
			}
			if(value == null) {
				jsonData.append("null");
			} else if(value instanceof Number) {
				jsonData.append(value+"");
			} else {
				if(specialCharConvert) {
					value = CommonUtil.toHtmlValue(value.toString());
				}
				jsonData.append("\"" + CommonUtil.nvl(value, "").toString().replace("\\", "\\\\").replace("\"", "\\\"").replace("'", "\'") + "\"");
			}
		}
		jsonData.append("]}");
		
		jsonDataSet.add(jsonData.toString());
	}
	
	public String getJsonString() {
		StringBuilder result = new StringBuilder();
		result.append("{");
		result.append("\"page\": \"" + page + "\", \"total\": " + total + ",\"records\": \"" + records + "\", \"rows\": [\n");
		for(int i=0; i<jsonDataSet.size(); i++) {
			if(i==0) {
				result.append(jsonDataSet.get(i));
			} else {
				result.append("," + jsonDataSet.get(i));
			}
		}
		result.append("]}");
		
		return result.toString();
	}
	
	
}
