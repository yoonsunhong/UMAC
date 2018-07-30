/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package retail.user.web;

 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.user.service.UserService;


/**
 * 사용자관리 관리
 * @author 문희훈
 * @since 2016. 12.23
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class UserController {

	@Autowired
	private UserService userService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 사용자관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/userManagement.do", method = RequestMethod.GET)
	public ModelAndView userManagement(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/user/user_management"); 
		return   mav; 
	}
	
	
	/**
	 * 사용자목록을 조회한다.
	 * 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getUserList.do", method=RequestMethod.POST)
	@ResponseBody
	public void getUserList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_USER_NM", request.getParameter("TOP_USER_NM"));
		paramMap.put("P_EMP_DUTY", request.getParameter("TOP_EMP_DUTY"));
		paramMap.put("P_JOB_FLAG", request.getParameter("TOP_JOB_FLAG"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//사용자목록 목록조회
		userService.getUserList(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
			
	}
	
	/**
	 * 사용자목록을 조회한다.
	 * 
	 * @param searchVO
	 * @param model
	 * @return "egovSampleList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getUserDetail.do", method=RequestMethod.POST)
	@ResponseBody
	public void getUserDetail( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		//System.out.println(request.getParameter("USER_ID"));		
		paramMap.put("P_USER_ID", request.getParameter("USER_ID"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//사용자정보 상세조회
		userService.getUserDetail(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
			
	}
	
	
	/**
	 * 아이디 중복 검사  
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectCountUserId.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  selectCountUserId( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_USER_ID", request.getParameter("USER_ID"));
		paramMap.put("CUR", CUR);
		
		//USER_ID 중복 검사  
		userService.selectCountUserId(paramMap);
 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}	
	
	/**
	 * 사용자 정보 등록/수정
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/setUserInfo.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> setUserInfo( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_SET_FLAG", request.getParameter("SET_FLAG"));
		paramMap.put("P_USER_ID", request.getParameter("USER_ID"));
		paramMap.put("P_USER_NM", request.getParameter("USER_NM"));
		paramMap.put("P_MOBIL_NO", request.getParameter("MOBIL_NO"));
		paramMap.put("P_DEPT_CODE", request.getParameter("DEPT_CODE"));
		paramMap.put("P_DEPT_NAME", request.getParameter("DEPT_NAME"));
		paramMap.put("P_POSITION", request.getParameter("POSITION"));
		paramMap.put("P_EMP_DUTY", request.getParameter("EMP_DUTY"));
		paramMap.put("P_ROLE_ID", request.getParameter("ROLE_ID"));
		paramMap.put("P_JOB_FLAG", request.getParameter("JOB_FLAG"));
		paramMap.put("P_REMARK", request.getParameter("REMARK"));
		paramMap.put("P_IEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_UEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//사용자 정보 등록/수정
		userService.setUserInfo(paramMap);
		 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	
	
	/**
	 * 사원 비밀번호 초기화
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/resetUserPassWd.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> resetUserPassWd( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_USER_ID", request.getParameter("USER_ID"));
		paramMap.put("P_UEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//사원 비밀번호 초기화
		userService.resetUserPassWd(paramMap);
		 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	
	
}
