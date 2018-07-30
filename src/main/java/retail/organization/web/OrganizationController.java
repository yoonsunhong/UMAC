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
package retail.organization.web;

 
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
import retail.organization.service.OrganizationService;


/**
 * 조직마스터 관리
 * @author 문희훈
 * @since 2016. 12.23
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class OrganizationController {

	@Autowired
	private OrganizationService organizationService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 조직마스터관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/organizationrManagement.do", method = RequestMethod.GET)
	public ModelAndView organizationrManagement(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/organization/organization_management"); 
		return   mav; 
	}
	
	/**
	 * 조직목록의 트리메뉴 리스트 조회
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getOrganizationList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getOrganizationList(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		organizationService.getOrganizationList(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 	
	}
	
	/**
	 * 조직 상세정보 조회
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getOrganizationDetailInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public void getOrganizationDetailInfo(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_DEPT_CODE", request.getParameter("DEPT_CODE"));
		paramMap.put("CUR", CUR);
		
		organizationService.getOrganizationDetailInfo(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 	
	}
		
	/**
	 * 부서코드 중복 검사  
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectCountDeptCode.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  selectCountDeptCode( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_DEPT_CODE", request.getParameter("DEPT_CODE"));
		paramMap.put("CUR", CUR);
		
		//USER_ID 중복 검사  
		organizationService.selectCountDeptCode(paramMap);
 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}	
	
	/**
	 * 조직정보 등록/수정
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/setDeptInfo.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> setDeptInfo( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_DEPT_CODE", request.getParameter("DEPT_CODE"));
		paramMap.put("P_DEPT_NAME", request.getParameter("DEPT_NAME"));
		paramMap.put("P_UPPER_DEPT", request.getParameter("UPPER_DEPT"));
		paramMap.put("P_GRADE", request.getParameter("GRADE"));
		paramMap.put("P_ORG_TYPE", request.getParameter("ORG_TYPE"));
		paramMap.put("P_USE_YN", request.getParameter("USE_YN"));
		paramMap.put("P_SALE_YN", request.getParameter("SALE_YN"));
		paramMap.put("P_REP_NAME", request.getParameter("REP_NAME"));
		paramMap.put("P_POST_NO", request.getParameter("POST_NO"));
		paramMap.put("P_ADDR", request.getParameter("ADDR"));
		paramMap.put("P_ADDR_DTL", request.getParameter("ADDR_DTL"));
		paramMap.put("P_TEL_NO", request.getParameter("TEL_NO"));
		paramMap.put("P_FAX_NO", request.getParameter("FAX_NO"));
		paramMap.put("P_BUSI_NO", request.getParameter("BUSI_NO"));
		paramMap.put("P_UPJONG", request.getParameter("UPJONG"));
		paramMap.put("P_UPTAE", request.getParameter("UPTAE"));
		paramMap.put("P_UPTAE_FLAG", request.getParameter("UPTAE_FLAG"));
		paramMap.put("P_OPEN_DT", request.getParameter("OPEN_DT"));
		paramMap.put("P_STR_AREA", request.getParameter("STR_AREA"));
		paramMap.put("P_CAR_AREA", request.getParameter("CAR_AREA"));
		paramMap.put("P_ACCT_DEPT", request.getParameter("ACCT_DEPT"));
		paramMap.put("P_ACCT_UPPER_DEPT", request.getParameter("ACCT_UPPER_DEPT"));
		paramMap.put("P_TERM_ID_VAN", request.getParameter("TERM_ID_VAN"));
		paramMap.put("P_CENTA_CODE", request.getParameter("CENTA_CODE"));
		paramMap.put("P_SALE_TRM", request.getParameter("SALE_TRM"));
		paramMap.put("P_SIGN_AMT", request.getParameter("SIGN_AMT"));
		paramMap.put("P_CRUD_FLAG", request.getParameter("CRUD_FLAG"));
		paramMap.put("P_IEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_UEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		paramMap.put("CUR", CUR);
		
		//조직정보 등록/수정
		organizationService.setDeptInfo(paramMap);
		 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	
}
