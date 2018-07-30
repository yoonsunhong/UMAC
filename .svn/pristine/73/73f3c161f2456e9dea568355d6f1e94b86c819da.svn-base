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
package retail.stock.stockSchedule.web;

 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.stock.stockSchedule.service.StockScheduleService;


/**
 * 영업정보 -재고조사 일정 관리
 * @author 문희훈
 * @since 2017. 02.01
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class StockScheduleController {

	@Autowired
	private StockScheduleService stockScheduleService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 재고조사 일정 관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/stockSchedule.do", method = RequestMethod.GET)
	public ModelAndView stockSchedule(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/stock/stockSchedule/stockSchedule"); 
		return   mav; 
	}
	
	
	
	/**
	 * 조직목록의 트리메뉴 리스트 조회(물류센터 제외)
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getStockOrganizationList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getOrganizationList(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		stockScheduleService.getStockOrganizationList(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	 	
	}
	
	/**
	 * 재고조사 일정 목록조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getgetInventorySchedule.do", method = RequestMethod.POST)
	@ResponseBody
	public void getgetInventorySchedule(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		stockScheduleService.getInventorySchedule(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
			
	}
	
		
	/**
	 * 재고조사일정ID 발번
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getSchdId.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getSchdId(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> param = new HashMap<String, Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		stockScheduleService.getSchdId(param);
		
		return param;
	}
	
	/**
	 * 재고조사일정 INSERT/UPDATE    
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/setInvInspSchdtInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> setInvInspSchdtInfo(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		 
		param.put("P_CORP_CODE"    			, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_USER_ID" 	    		, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_INV_INSP_SCHD_ID" 	, ((String) param.get("P_INV_INSP_SCHD_ID")).replaceAll("-", "") ) ;
		param.put("P_INV_INSP_DT" 			, ((String) param.get("P_INV_INSP_DT")).replaceAll("-", "") ) ;
		param.put("CUR", CUR);
		
		
		
		//재고조사일정 INSERT/UPDATE
		stockScheduleService.setInvInspSchdtInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}
	
		
		
}
