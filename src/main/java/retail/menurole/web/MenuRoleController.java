package retail.menurole.web;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.common.SessionModel;
import retail.login.service.LoginVO;
import retail.menurole.service.MenuRoleService;


/**
 * @Class Name 	: MenuRoleController.java
 * @Description : 사용자 기능별 권한관리
 * @Modification Information 
 * @author mhh
 * @since 2017.12.18
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class MenuRoleController {

	@Autowired
	private MenuRoleService menuRoleService;

	/** log **/
	private final Log log = LogFactory.getLog(this.getClass());

	
	/**
	 * 사용자 기능별 권한관리 페이지 이동 
	 * @param MenuRoleVO
	 * @exception Exception
	 */
	@RequestMapping(value = "/userMenuRole.do", method = RequestMethod.GET)
	public String userMenuRole(HttpServletRequest request, HttpServletResponse response, ModelMap model)throws Exception {
		return "retail/menurole/userMenuRole";
	}
	
	
	/**
	 * 사용자목록을 조회한다.
	 * 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getUserRoleList.do", method=RequestMethod.POST)
	@ResponseBody
	public void getUserRoleList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_USER_NM", request.getParameter("TOP_USER_NM"));
		paramMap.put("P_POSITION", request.getParameter("TOP_POSITION"));
		paramMap.put("P_DEPT_CODE", request.getParameter("TOP_DEPT_CODE"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//사용자목록 목록조회
		menuRoleService.getUserRoleList(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
			
	}
	
	
	/**
	 * 부서 리스트박스 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getDeptCodeList.do", method=RequestMethod.POST)
	public void getDeptCodeList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//점포리스트박스 조회
		menuRoleService.getDeptCodeList(paramMap);
		
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);	
		
	}
	
	/**
	 * 사용자 기능별 권한 리스트 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/getUserMenuRoleList.do", method = RequestMethod.POST)
	@ResponseBody	
	public void getUserMenuRoleList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_USER_ID", request.getParameter("USER_ID"));

			List<Map<String, Object>> resultList = menuRoleService.getUserMenuRoleList(param);
			log.debug("result :: " + resultList);

			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  resultList );
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);

		}catch(Exception e){
			e.printStackTrace();
		}		
	}
	
	/**
	 * 메뉴별 권한 복사 등록 실행  DELETE/SELECT/INSERT
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/copyUserRoleList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> copyUserRoleList(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_USER_ID" 	    		, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_ORI_IEMP_NO" 	, ((String) param.get("ORI_IEMP_NO")) ) ;
		param.put("P_TO_IEMP_NO" 			, ((String) param.get("TO_IEMP_NO")) ) ;
		param.put("CUR", CUR);
		
		
		//메뉴별 권한 복사 등록 실행 DELETE/SELECT/INSERT
		menuRoleService.copyUserRoleList(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}
	
	/**
	 * 사용자 메뉴별 권한 저장
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/userMenuRoleUpdate.do", method = RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object>  userMenuRoleUpdate(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		param.put("P_CORP_CODE"        , CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_UEMP_NO"    	   , CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_GRIDXMLDATA"      , request.getParameter("gridXmlData" )    		 ) ; 
		
		//사용자 메뉴별 권한 저장
		menuRoleService.userMenuRoleUpdate(param);

		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}
	
	
}
