package retail.common;
 

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import net.winis.common.util.WisConvertUtil;

public class CommonUtil {

	
	/**
	 * 
	 * 아이피 가져오기
	 * @throws UnknownHostException 
	 * */
	public static String getIpAddr() throws UnknownHostException {
		InetAddress addr = InetAddress.getLocalHost(); 
		String strIP = addr.getHostAddress(); 
//		String strHostName = addr.getHostName(); 
		return strIP;
	}
	
	 
	/**
	 * '공통' 으로 사용되는 '숫자 포멧변환' Method 'String 형태의 숫자와 원하는 포멧' 를 받아 '변환' 한다. 포멧 사용
	 * ex) "#,###" <-천단위마다 콤마
	 * 
	 * @param numberString
	 * @param format
	 * @return
	 */
	public static String NumberFormatter(String numberString, String format) {

		int number = Integer.parseInt(numberString);
		DecimalFormat decimalFormat = new DecimalFormat(format);
		String result = (String) decimalFormat.format(number);

		return result;

	}

	public static String NumberFormatter(Integer number, String format) {

		DecimalFormat decimalFormat = new DecimalFormat(format);
		String result = (String) decimalFormat.format(number);

		return result;

	}

	/** 세션의 사용자 환경정보 반환 */
	public static SessionModel getEnv(HttpSession session) {
		return (SessionModel) session.getAttribute(BaseEnv.PROP_ENV);
	}

	/** 세션에 사용자 환경정보 저장. */
	public static void setEnv(HttpSession session, SessionModel env) {
		session.setAttribute(BaseEnv.PROP_ENV, env);
	}

	/** 보안정책 검증한다. */
	public static void validatePolicy(HttpServletRequest request) {
		// validateProtocol(request);
		validateSession(request);
	}

	/** 세션을 검증한다. */
	public static void validateSession(HttpServletRequest request) {
		// 로긴상태인지 확인
		if (CommonUtil.getEnv(request.getSession()) == null) {
			throw new SessionException();
		}
	}

	/** 프로토콜을 검증한다. */
	public static void validateProtocol(HttpServletRequest request) {
		// boolean ssl = BaseEnv.get(request.getServletContext()).isSSL();
		// String protocol = request.getProtocol().toLowerCase();
		//
		// if((ssl && !protocol.startsWith("https"))
		// || (!ssl && protocol.startsWith("https"))) {
		// throw new SessionException("프로토콜 보안 위배입니다.", null);
		// }
	}

	/** 관리자 보안검증 */
	public static void validateAdmin(HttpServletRequest request) {
		// SessionModel model = CommonUtil.getEnv(request.getSession());
		//
		// //로긴상태인지 확인
		// if(model == null || !"Y".equals(model.getAdminYn())) {
		// throw new SessionException("관리자 보안 위배 입니다.", null);
		// }
	}

	/** 문자열 데이트를 형식문자열로 반환 */
	public static String formatDate(String dateStr, int type) {
		String result = null;
		if (dateStr != null && !"".equals(dateStr)) {
			if (type == 4) {
				result = dateStr.substring(0, 2) + "시 "
						+ dateStr.substring(2, 4) + "분";
			} else if (type == 8) {
				result = dateStr.substring(0, 4) + "-"
						+ dateStr.substring(4, 6) + "-"
						+ dateStr.substring(6, 8);
			} else if (type == 12) {
				result = dateStr.substring(0, 4) + "-"
						+ dateStr.substring(4, 6) + "-"
						+ dateStr.substring(6, 8) + " "
						+ dateStr.substring(8, 10) + ":"
						+ dateStr.substring(10, 12);
			} else if (type == 14) {
				result = dateStr.substring(0, 4) + "-"
						+ dateStr.substring(4, 6) + "-"
						+ dateStr.substring(6, 8) + " "
						+ dateStr.substring(8, 10) + ":"
						+ dateStr.substring(10, 12) + ":"
						+ dateStr.substring(12, 14);
			}
		}

		return result;
	}
 

	/** 필수입력항목표시 마크 반환 */
	public static String getRequiredMark() {
		return "*";
	}

	/** 업무시간을 계산하여 반환 **/
	public static String getJobTime(String startDt, String endDt,
			String oldJobTime) {
		Date sDate = WisConvertUtil.get().toDate(startDt, "yyyyMMddHHmm");
		Date eDate = WisConvertUtil.get().toDate(endDt, "yyyyMMddHHmm");

		float difTime = eDate.getTime() - sDate.getTime();
		int difMinute = Math.round(difTime / (60 * 1000))
				+ getMinuteFromJobTime(oldJobTime);

		return getHourMinute(difMinute);
	}

	/** 업무시간을 분으로 계산하여 반환 **/
	public static int getMinuteFromJobTime(String jobTime) {
		if (jobTime != null) {
			String[] times = jobTime.split(":");
			return Integer.parseInt(times[0]) * 60 + Integer.parseInt(times[1]);
		}

		return 0;
	}

	/** 분을 입력받아 시:분 형식으로 반환 **/
	public static String getHourMinute(Integer min) {
		if (min <= 0)
			return "0:00";

		return min / 60 + ":" + (min % 60 < 10 ? "0" + min % 60 : min % 60);
	}

	/** null 일 경우 대체값 반환 */
	public static <D extends Object> D nvl(D value, D replacement) {
		return value == null ? replacement : value;
	}

	/** text/plain 문자열을 text/html로 변경 */
	public static String convertTextToHtml(String text) {
		if (text == null) {
			return "";
		} else {
			return text.replace("<", "&lt;").replace(">", "&gt;")
					.replace("\n", "<br>").replace("\r", "");
		}
	}

	public static String toHtmlValue(String value) {
		if (value != null) {
			return value.replace("&", "&#38;").replace("<", "&lt;")
					.replace(">", "&gt;").replace("\"", "&quot;")
					.replace("'", "&#39;").replace(",", "&#44;")
					.replace("/", "&#47;").replace("\n", "<br>")
					.replace("\r", "").replace("\t", "");
		} else {
			return null;
		}
	}

	public static String toString(Date date, String pattern) {
		String result = null;
//		try {
			if (date != null) {
				if (pattern == null)
					pattern = "yyyy-MM-dd";
				;
				SimpleDateFormat format = new SimpleDateFormat(pattern,
						new Locale("KOREA", "KOREA"));
				result = format.format(date);
			}
//		} catch (Exception e) {
//		}
		return result;
	}

	/**
	 * 년계산
	 * 
	 * @param date
	 * @param months
	 * @return
	 */
	public static Date addYear(Date date, int year) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.YEAR, year);

		return cal.getTime();
	}
	
	/**
	 * 월계산
	 * 
	 * @param date
	 * @param months
	 * @return
	 */
	public static Date addMonth(Date date, int months) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, months);
		
		return cal.getTime();
	}

	/**
	 * 일계산
	 * 
	 * @param date
	 * @param months
	 * @return
	 */
	public static Date addDay(Date date, int days) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, days);

		return cal.getTime();
	}

	public static void printMap(Map aoMap) {
		CommonUtil.printMap("HashMap Print", aoMap);
	}

	public static void printMap(String asTitle, Map aoMap) {
		StringBuilder loSb = new StringBuilder();

		loSb.append("------------------------------------------------------------------");
		loSb.append("\n " + asTitle + " \n");
		loSb.append("------------------------------------------------------------------\n");

		Iterator loItor = aoMap.keySet().iterator();

		while (loItor.hasNext()) {
			String lsKey = loItor.next().toString();
			loSb.append(lsKey).append(" = ").append(aoMap.get(lsKey))
					.append("\n");
		}
		loSb.append("------------------------------------------------------------------");

//		 System.out.println("\n\n");
//		System.out.println(loSb.toString());
//		System.out.println("\n\n"); 
	}

	public static void printListMap(List<Map> aoList) {
		CommonUtil.printListMap("ListMap Print", aoList);
	}

	public static void printListMap(String asTitle, List<Map> aoList) {
		StringBuilder loSb = new StringBuilder();

		loSb.append("------------------------------------------------------------------");
		loSb.append("\n " + asTitle + " \n");
		loSb.append("------------------------------------------------------------------\n");

		for (int i = 0; i < aoList.size(); i++) {
			CommonUtil.printMap(i + "번째 Map", (Map) aoList.get(i));
		}

		loSb.append("------------------------------------------------------------------");

//		 System.out.println("\n\n");
//		System.out.println(loSb.toString());
//		System.out.println("\n\n"); 
	}

	public static void printJSONObject(JSONObject aoJson) {
		CommonUtil.printJSONObject("JSONObject Print", aoJson);
	}

	public static void printJSONObject(String asTitle, JSONObject aoJson) {
		StringBuilder loSb = new StringBuilder();

		loSb.append("------------------------------------------------------------------");
		loSb.append("\n " + asTitle + " \n");
		loSb.append("------------------------------------------------------------------\n");

		Iterator loItor = aoJson.keySet().iterator();

		while (loItor.hasNext()) {
			String lsKey = loItor.next().toString();
			loSb.append(lsKey).append(" = ").append(aoJson.get(lsKey))
					.append("\n");
		}
		loSb.append("------------------------------------------------------------------");

//		 System.out.println("\n\n");
//		System.out.println(loSb.toString());
//		System.out.println("\n\n"); 
	}

	public static void printRequest(HttpServletRequest aoJson) {
		CommonUtil.printRequest("JSONObject Print", aoJson);
	}

	public static void printRequest(String asTitle, HttpServletRequest request) {
		StringBuilder loSb = new StringBuilder();

		loSb.append("------------------------------------------------------------------");
		loSb.append("\n " + asTitle + " \n");
		loSb.append("------------------------------------------------------------------\n");

		Enumeration enuNames = request.getParameterNames();

		while (enuNames.hasMoreElements()) {
			String lsKey = enuNames.nextElement().toString();

			loSb.append(lsKey).append(" = ")
					.append((String) request.getParameter(lsKey)).append("\n");
		}

		loSb.append("------------------------------------------------------------------");

//		 System.out.println("\n\n");
//		System.out.println(loSb.toString());
//		System.out.println("\n\n"); 
	}

	public static void printJSONArray(JSONArray aorJson) {
		CommonUtil.printJSONArray("JSONArray Print", aorJson);
	}

	public static void printJSONArray(String asTitle, JSONArray aorJson) {
		StringBuilder loSb = new StringBuilder();

		loSb.append("------------------------------------------------------------------");
		loSb.append("\n " + asTitle + " \n");
		loSb.append("------------------------------------------------------------------\n");

		//System.out.println(loSb.toString());

		for (int i = 0; i < aorJson.size(); i++) {
			CommonUtil.printJSONObject(i + "번째 JSONObject",
					aorJson.getJSONObject(i));
		}

	}

	public static void setMapFromJsonString(HashMap aoHashMap, String asJson) {

		CommonUtil.setMapFromJsonObject(aoHashMap,
				JSONObject.fromObject(asJson));

	}

	public static void setMapFromJsonObject(Map aoMap, JSONObject aoJson) {

		Iterator loItor = aoJson.keySet().iterator();
		String lsKey, lsVal;

		while (loItor.hasNext()) {
			lsKey = loItor.next().toString();
			lsVal = (String) aoJson.getString(lsKey);

			aoMap.put(lsKey, lsVal);
		}
		
		aoMap.put("RTNCNT",Integer.parseInt("0"));

		loItor = null;
	}
	
/** seok add start **/
	
//	public static Map jsonToMap(JSONObject json) throws JSONException {
//		Map<String, Object> retMap = new HashMap<String, Object>();
//
//		if (json != null) {
//			retMap = toMap(json);
//		}
//		return retMap;
//	}
	
	public static List<Map> jsonStringToList(String jsonString) throws JSONException, UnsupportedEncodingException {
		JSONArray jsonArray;
		JSONObject jsonObject = null;
		List<Map> list = new ArrayList<Map>();
		
		if(jsonString != null){
			String strTemp = new String(jsonString).replaceAll("&quot;", "\"");
			
			jsonArray = JSONArray.fromObject(strTemp);
			for (int i = 0; i < jsonArray.size(); i++) {
				jsonObject = jsonArray.getJSONObject(i);
	            list.add((Map)toMap(jsonObject));
	        }
		}
		
		return list;
	}

	public static Map toMap(JSONObject object) throws JSONException {
		Map<String, Object> map = new HashMap<String, Object>();

		Iterator<String> keysItr = object.keys();
		while (keysItr.hasNext()) {
			String key = keysItr.next();
			Object value = object.get(key);

			if (value instanceof JSONArray) {
				value = toList((JSONArray) value);
			}

			else if (value instanceof JSONObject) {
				value = toMap((JSONObject) value);
			}
			map.put(key, value);
		}
		return map;
	}

	public static List toList(JSONArray array) throws JSONException {
		List<Object> list = new ArrayList<Object>();
		for (int i = 0; i < array.size(); i++) {
			list.add(array.get(i));
		}
		return list;
	}
	
	/** seok add end **/
	
	
	// PATH_TRAVERSAL (외부의 입력에서 경로 조작에 사용될 수 있는 문자를 필터링)
	public static String getPathTraversal(String fileName) {
		
		if(fileName != null && !"".equals(fileName)) {
				   
		    fileName = fileName.replaceAll("/", "");
		    fileName = fileName.replaceAll("\\", "");
		    fileName = fileName.replaceAll(".", "");
		    fileName = fileName.replaceAll("&", "");
		   
		    return fileName;
		}
		else {
			
			return "";
			
		}
		
	}
	
	public static String getXSS(String variable) {
		
		if(variable != null) {
			
			variable = variable.replaceAll("<", "&lt;");
			variable = variable.replaceAll(">", "&gt;");
			
			return variable;
		}
		else {
			return "";
		}
		
	}
}
