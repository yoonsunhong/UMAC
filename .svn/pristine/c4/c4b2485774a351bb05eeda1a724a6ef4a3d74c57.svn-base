package retail.common;

import java.util.ArrayList;
import java.util.List;

public class RMateGridResult {

	
	private boolean specialCharConvert = false;
	
	private List<String> jsonDataSet = new ArrayList<String>();
	
	
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
		
		jsonDataSet.add(jsonData.toString());
	}
	
	public String getJsonString() {
		StringBuilder result = new StringBuilder();
		result.append("[");
		
		for(int i=0; i<jsonDataSet.size(); i++) {
			result.append("{");
			if(i==0) {
				result.append(jsonDataSet.get(i));
			} else {
				
				result.append("," + jsonDataSet.get(i));
			}
			result.append("}");
		}
		result.append("]");
		
		return result.toString();
	}
	
	
}
