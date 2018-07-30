package retail.auth.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;











import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import retail.auth.service.AuthService;
import retail.auth.service.AuthVO;
import retail.common.CommonUtil;
import retail.common.SessionModel;
import retail.login.service.LoginVO;



/**
 * @Class Name 	: AuthController.java
 * @Description : 권한그룹 관리
 * @Modification Information 
 * @author 문희훈
 * @since 2016.12.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class AuthController {

	@Autowired
	private AuthService authService;

	/** log **/
	private final Log log = LogFactory.getLog(this.getClass());

	
	/**
	 * 권한그룹관리 페이지 이동 (pageing)
	 * @param AuthVO
	 * @exception Exception
	 */
	@RequestMapping(value = "/authManagement.do", method = RequestMethod.GET)
	public String authManagement(HttpServletRequest request, HttpServletResponse response, ModelMap model)throws Exception {
		return "retail/auth/auth_management";
	}
	
	
	/**
	 * 권한그룹목록을 조회한다.
	 * 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/readAthGroupList.do", method=RequestMethod.POST)
	@ResponseBody
	public void readAthGroupList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_USE_YN", request.getParameter("USE_YN"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//권한그룹 목록조회
		authService.readAthGroupList(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
			
	}
	
	/**
	 * 사용가능  메뉴 목록 조회
	 * 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/readAppointMenuList.do", method=RequestMethod.POST)
	@ResponseBody
	public void readAppointMenuList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_ROLE_ID", request.getParameter("ROLE_ID"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);

		//지정 메뉴 목록 조회
		authService.readAppointMenuList(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 사용불가 메뉴 목록 조회
	 * 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/notAppointMenuList.do", method=RequestMethod.POST)
	@ResponseBody
	public void notAppointMenuList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_ROLE_ID", request.getParameter("ROLE_ID"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//사용불가 목록조회
		authService.notAppointMenuList(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	
	/**
	 * 권한그룹 저장
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/saveAth.do", method=RequestMethod.POST)
	@ResponseBody
	public void saveAth(HttpServletRequest request,HttpServletResponse response)throws Exception {

		String json = jsonStringParser(request, "menus");
		
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject) jsonParser.parse(json);
		
		JSONArray arrMenus = (JSONArray) jsonObject.get("menus");
		
		// System.out.println("jsonObj : " + arrMenus);
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
			
		SessionModel sessionModel = CommonUtil.getEnv(request.getSession());
		AuthVO params = new AuthVO();
		JSONObject athObj = (JSONObject) arrMenus.get(0);
		
		paramMap.put("CUR", CUR);
		
		String NEW_ROLE_ID ="";
		
		//권한 아이디 신규 유무 체크
		if(athObj.get("ROLE_ID").equals("")) {
			//생성될 신규 권한 아이디 생성
			authService.selectAthGroupId(paramMap);
			List<AuthVO> RETURN_CUR = (List<AuthVO>) paramMap.get("CUR");
			NEW_ROLE_ID = RETURN_CUR.get(0).getROLE_ID();
		}else{
			NEW_ROLE_ID = athObj.get("ROLE_ID").toString();
		}
		
		paramMap.put("P_ROLE_ID", NEW_ROLE_ID);
		paramMap.put("P_ROLE_NM", athObj.get("ROLE_NM").toString());
		paramMap.put("P_ROLE_DC", athObj.get("ROLE_DC").toString());
		paramMap.put("P_USE_YN", athObj.get("USE_YN").toString());
		
		//버튼 사용권한
		paramMap.put("P_AUTH_SEARCH", athObj.get("AUTH_SEARCH").toString());
		paramMap.put("P_AUTH_NEW", athObj.get("AUTH_NEW").toString());
		paramMap.put("P_AUTH_SAVE", athObj.get("AUTH_SAVE").toString());
		paramMap.put("P_AUTH_DELETE", athObj.get("AUTH_DELETE").toString());
		paramMap.put("P_AUTH_EXCEL_DOWN", athObj.get("AUTH_EXCEL_DOWN").toString());
		paramMap.put("P_AUTH_EXCEL_UPLOAD", athObj.get("AUTH_EXCEL_UPLOAD").toString());
		paramMap.put("P_AUTH_PRINT", athObj.get("AUTH_PRINT").toString());
		paramMap.put("P_AUTH_SUBMIT", athObj.get("AUTH_SUBMIT").toString());
		paramMap.put("P_AUTH_CREATE", athObj.get("AUTH_CREATE").toString());
		paramMap.put("P_IP_ADDR", CommonUtil.getIpAddr());
		paramMap.put("P_REG_IP", CommonUtil.getIpAddr());
		paramMap.put("P_UPD_IP", CommonUtil.getIpAddr());
		paramMap.put("P_USER_ID", sessionModel.getUserId());
		paramMap.put("P_REG_ID", sessionModel.getUserId());
		paramMap.put("P_UPD_ID", sessionModel.getUserId());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		// 권한 아이디가 없으면 신규
		if(athObj.get("ROLE_ID").equals("")) {
			// System.out.println("권한 신규 항목");
			
			//권한그룹 추가(관리자,사용자등의 권한)
			authService.insertAth(paramMap);
			
			// 현재 권한 아이디에 메뉴 목록 추가
			for(int i=1; i<arrMenus.size(); i++) {
				
				JSONObject tempObj = (JSONObject) arrMenus.get(i);
				
				paramMap.put("P_MENU_NM", tempObj.get("MENU_NM").toString());
				paramMap.put("P_BIGO", tempObj.get("BIGO").toString());
				paramMap.put("P_MENU_ID", tempObj.get("MENU_ID").toString());
				
				//권한에 사용할  메뉴 등록
				authService.saveAth(paramMap);
			}
		}
		// 권한 아이디가 있으면 수정
		else {
			// System.out.println("권한 수정 항목");
			
			//권한명, 비고, 사용유무등 수정
			authService.updateAth(paramMap);

			//권한에 지정된  메뉴 삭제
			authService.deleteAth(paramMap);
			
			// 현재 권한 아이디에 메뉴 목록 추가
			for(int i=1; i<arrMenus.size(); i++) {
				
				JSONObject tempObj = (JSONObject) arrMenus.get(i);

				paramMap.put("P_MENU_NM", tempObj.get("MENU_NM").toString());
				paramMap.put("P_BIGO", tempObj.get("BIGO").toString());
				paramMap.put("P_MENU_ID", tempObj.get("MENU_ID").toString());
				
				//권한에 지정된  메뉴 등록
				authService.saveAth(paramMap);
			}
		}
			
		
	}
	
	
	/**
	 * 권한 그룹 삭제
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteAthGroup.do", method=RequestMethod.POST)
	@ResponseBody
	public void deleteAthGroup(HttpServletRequest request, HttpServletResponse response)throws Exception {
		
		String json = jsonStringParser(request, "");
		
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject) jsonParser.parse(json);
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_ROLE_ID", jsonObject.get("ROLE_ID").toString());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		
		//권한룰 삭제
		authService.deleteAthGroup(paramMap);
	}
	
	
	
	
	private String jsonStringParser(HttpServletRequest request, String key)
	{
		String rtnVal = null;
		
		try
		{
			
			StringBuffer json = new StringBuffer();
			String line = null;
			
			BufferedReader reader = request.getReader();
			
			while ((line = reader.readLine()) != null) {
				json.append(line);
			}
			
			if(key != null && !key.equals(""))
			{
				rtnVal = "{\"" + key + "\":" + json.toString() + "}";
			}
			else
			{
				rtnVal = json.toString();
			}
		}
		catch(IOException e)
		{
			System.err.println("IOException Occured");
		}
		
		return rtnVal;
	}
	
	
}
