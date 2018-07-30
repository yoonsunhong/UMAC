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
package retail.code.web;

 
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
import retail.code.service.CodeService;


/**
 * 공통코드 관리
 * @author 문희훈
 * @since 2016. 10.28
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class CodeController {

	@Autowired
	private CodeService codeService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 공통코드 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/commCodeManagement.do", method = RequestMethod.GET)
	public ModelAndView commCodeManagement(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/code/code_management"); 
		return   mav; 
	}
	
	
	/**
	 * 공통코드 리스트 조회  
	 * @param 공통코드 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getCodeCategory.do", method = RequestMethod.POST)
	@ResponseBody
	public void getCodeCategory(HttpServletRequest request, HttpServletResponse response )throws Exception { 

		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CD_NM", request.getParameter("P_CD_NM"));
		paramMap.put("P_USE_YN", request.getParameter("P_USE_YN"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//공통코드 리스트 조회  
		codeService.getCodeCategory(paramMap);
		
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		  
	}

	
	/**
	 *공통코드 상세 조회 
	 * @param 공통코드 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getCodeDetail.do", method = RequestMethod.POST)
	@ResponseBody
	public void getCodeDetail(HttpServletRequest request, HttpServletResponse response )throws Exception { 

		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CD_ID", request.getParameter("CD_ID"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//공통코드 상세 조회
		codeService.getCodeDetail(paramMap);
 
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 코드 중복 검사  
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/selectCountCode.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  selectCountCode( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CD_CL", request.getParameter("CD_CL"));
		paramMap.put("P_CD_ID", request.getParameter("CD_ID"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//코드 중복 검사  
		codeService.selectCountCode(paramMap);
 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	
	/**
	 * 공통코드 신규등록
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/insertCategory.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insertCategory( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CD_NM", request.getParameter("CD_NM"));
		paramMap.put("P_CD_ID", request.getParameter("CD_ID"));
		paramMap.put("P_CD_DESCRIPTION", request.getParameter("CD_DESCRIPTION"));
		paramMap.put("P_DEL_YN", request.getParameter("DEL_YN"));
		paramMap.put("P_REG_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_REG_IP", CommonUtil.getIpAddr());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//공통코드 신규등록
		codeService.insertCategory(paramMap);
		 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	
	/**
	 * 공통코드 수정 
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateCategory.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateCategory( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CD_NM", request.getParameter("CD_NM"));
		paramMap.put("P_CD_ID", request.getParameter("CD_ID"));
		paramMap.put("P_CD_DESCRIPTION", request.getParameter("CD_DESCRIPTION"));
		paramMap.put("P_DEL_YN", request.getParameter("DEL_YN"));
		paramMap.put("P_UPD_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_UPD_IP", CommonUtil.getIpAddr());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//공통코드 수정
		codeService.updateCategory(paramMap);
		 
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	

	/**
	 *  공통코드 삭제  
	 * @param  
	 * @return " "
	 * @exception Exception 
	 */
	@RequestMapping(value = "/deleteCode.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteCode( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CD_ID", request.getParameter("CD_ID"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//공통코드 삭제
		codeService.deleteCode(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}

	/**
	 * 공통코드 상세 등록 
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/insertCodeDetail.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insertCodeDetail( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CD_CL", request.getParameter("CD_CL"));
		paramMap.put("P_CD_ID", request.getParameter("CD_ID"));
		paramMap.put("P_CD_NM", request.getParameter("CD_NM"));
		paramMap.put("P_CD_SHORT_NM", request.getParameter("CD_SHORT_NM"));
		paramMap.put("P_CD_DESCRIPTION", request.getParameter("CD_DESCRIPTION"));
		paramMap.put("P_SORT_ORDER", request.getParameter("SORT_ORDER"));
		paramMap.put("P_MGMT_ENTRY_1", request.getParameter("MGMT_ENTRY_1"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_1", request.getParameter("MGMT_ENTRY_DESCRIPTION_1"));
		paramMap.put("P_MGMT_ENTRY_2", request.getParameter("MGMT_ENTRY_2"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_2", request.getParameter("MGMT_ENTRY_DESCRIPTION_2"));
		paramMap.put("P_MGMT_ENTRY_3", request.getParameter("MGMT_ENTRY_3"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_3", request.getParameter("MGMT_ENTRY_DESCRIPTION_3"));
		paramMap.put("P_MGMT_ENTRY_4", request.getParameter("MGMT_ENTRY_4"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_4", request.getParameter("MGMT_ENTRY_DESCRIPTION_4"));
		paramMap.put("P_MGMT_ENTRY_5", request.getParameter("MGMT_ENTRY_5"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_5", request.getParameter("MGMT_ENTRY_DESCRIPTION_5"));
		paramMap.put("P_DEL_YN", request.getParameter("DEL_YN"));
		paramMap.put("P_REG_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_REG_IP", CommonUtil.getIpAddr());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//공통코드 상세 등록 
		codeService.insertCodeDetail(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
		
	}

	/**
	 * 상세코드 수정 
	 * @param  
	 * @return " "
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateCodeDetail.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateCodeDetail( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_ORIGIN_CD_ID", request.getParameter("D_ORIGIN_CD_ID"));
		paramMap.put("P_CD_CL", request.getParameter("CD_CL"));
		paramMap.put("P_CD_ID", request.getParameter("CD_ID"));
		paramMap.put("P_CD_NM", request.getParameter("CD_NM"));
		paramMap.put("P_CD_SHORT_NM", request.getParameter("CD_SHORT_NM"));
		paramMap.put("P_CD_DESCRIPTION", request.getParameter("CD_DESCRIPTION"));
		paramMap.put("P_SORT_ORDER", request.getParameter("SORT_ORDER"));
		paramMap.put("P_MGMT_ENTRY_1", request.getParameter("MGMT_ENTRY_1"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_1", request.getParameter("MGMT_ENTRY_DESCRIPTION_1"));
		paramMap.put("P_MGMT_ENTRY_2", request.getParameter("MGMT_ENTRY_2"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_2", request.getParameter("MGMT_ENTRY_DESCRIPTION_2"));
		paramMap.put("P_MGMT_ENTRY_3", request.getParameter("MGMT_ENTRY_3"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_3", request.getParameter("MGMT_ENTRY_DESCRIPTION_3"));
		paramMap.put("P_MGMT_ENTRY_4", request.getParameter("MGMT_ENTRY_4"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_4", request.getParameter("MGMT_ENTRY_DESCRIPTION_4"));
		paramMap.put("P_MGMT_ENTRY_5", request.getParameter("MGMT_ENTRY_5"));
		paramMap.put("P_MGMT_ENTRY_DESCRIPTION_5", request.getParameter("MGMT_ENTRY_DESCRIPTION_5"));
		paramMap.put("P_DEL_YN", request.getParameter("DEL_YN"));
		paramMap.put("P_UPD_ID", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_UPD_IP", CommonUtil.getIpAddr());
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		
		
		//상세코드 수정
		codeService.updateCodeDetail(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	
	/**
	 * 상세코드 삭제  
	 * @param  
	 * @return " "
	 * @exception Exception 
	 */
	@RequestMapping(value = "/deleteCodeDetail.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteCodeDetail( HttpServletRequest request, HttpServletResponse response  )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CD_CL", request.getParameter("CD_CL"));
		paramMap.put("P_CD_ID", request.getParameter("CD_ID"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//상세코드 삭제  
		codeService.deleteCodeDetail(paramMap);
	  
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	
	
}
