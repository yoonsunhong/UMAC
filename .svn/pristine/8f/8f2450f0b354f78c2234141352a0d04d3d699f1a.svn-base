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
package retail.batchMonitoring.web;

 
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.batchMonitoring.service.BatchMonitoringService;
import retail.common.CommonUtil;

import com.google.gson.Gson;


/**
 * SYS - BatchMonitoring
 * @author 송원두
 * @since 2018. 02.14
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class BatchMonitoringController {

	@Autowired
	private BatchMonitoringService batchMonitoringService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 모니터링 화면 출력
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	
	@RequestMapping(value = "/batchMonitoring.do", method = RequestMethod.GET)
	public ModelAndView batchMonitoring(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/batchmonitoring/batchMonitoring"); 
		return   mav; 
	}
	
	
	/**
	 * Batch Log 조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getBatchMonitoringList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getBatchMonitoringList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_DATE", ((String) param.get("P_STR_DATE")).replaceAll("-", ""));
		param.put("P_END_DATE", ((String) param.get("P_END_DATE")).replaceAll("-", ""));
		
		
		log.debug("param :: " + param.toString());
		batchMonitoringService.getBatchMonitoringList(param);
		log.debug("result :: " + param.toString());
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   
		}

	/**
	 *  LOG_NAME 리스트
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getBatchLogNameList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getBatchLogNameList(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		batchMonitoringService.getBatchLogNameList(paramMap);
		
		System.out.println(":: result : " + paramMap.toString());
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 	
	}
	
	/**
	 *  LOG_STATUS 리스트
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getBatchLogStatusList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getBatchLogStatusList(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		batchMonitoringService.getBatchLogStatusList(paramMap);
		
		System.out.println(":: result : " + paramMap.toString());
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 	
	}
	
}
