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
package retail.wms.auto.web;

 
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
import com.google.gson.GsonBuilder;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.product.customer.service.ProductCustomerVO;
import retail.wms.auto.service.WmsAutoService;
import retail.wms.in.service.WmsInService;


/**
 * WMS - 자동할당
 * @author 정해성
 * @since 2017. 07.03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class WmsAutoController {

	@Autowired
	private WmsAutoService wmsAutoService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 자동할당(R1) 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/wmsAutoAssign.do", method = RequestMethod.GET)
	public ModelAndView wmsAutoAssign(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/auto/wmsAutoAssign"); 
		return mav;
	}
	
	/**
	 * 자동할당(R1) 출고목록 조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsAutoAssignList.do", method = RequestMethod.POST)
	@ResponseBody
	public void wmsAutoAssignList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {

		try {
			ArrayList<Object> CUR = new ArrayList<Object>();
			param.put("CUR", CUR);
			
			log.debug("param :: " + param.toString());
			List<Map<String, Object>> resultList = wmsAutoService.selectWmsAutoAssignList(param);
			log.debug("result :: " + param.toString());
			
			  
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create(); 
			String jsonStr = gson.toJson(  resultList  );
	  
			
			log.debug("JSON :: " + jsonStr);
				
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonStr); 
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 자동할당(R1) 재고목록 조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsAutoStockList.do", method = RequestMethod.POST)
	@ResponseBody
	public void wmsAutoStockList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {

		try {
			ArrayList<Object> CUR = new ArrayList<Object>();
			param.put("CUR", CUR);
			
			log.debug("param :: " + param.toString());
			List<Map<String, Object>> resultList = wmsAutoService.selectWmsAutoStockList(param);
			log.debug("result :: " + param.toString());
			
			  
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create(); 
			String jsonStr = gson.toJson(  resultList  );
	  
			log.debug("JSON :: " + jsonStr);
				
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonStr); 
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 자동할당(R1) 자동할당
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsAutoAssignCreate.do", method = RequestMethod.POST)
	@ResponseBody
	public void wmsAutoAssignCreate(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {

		try {
			
			param.put("CUR", "");
			
			log.debug("param :: " + param.toString());
			Map<String, Object> resultList = wmsAutoService.selectWmsAutoAssignSave(param);
			log.debug("result :: " + param.toString());
			
			  
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create(); 
			String jsonStr = gson.toJson(  resultList  );
	  
			log.debug("JSON :: " + jsonStr);
				
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonStr); 
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**********************************************************************************************************************/
	/******************************************** 자동할동(R1) 취소 관련 Controller **************************************************/
	/**********************************************************************************************************************/
	
	
	/**
	 * 자동할당(R1) 취소 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/wmsAutoAssignCancel.do", method = RequestMethod.GET)
	public ModelAndView wmsAutoAssignCancel(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/auto/wmsAutoAssignCancel"); 
		return mav;
	}
	
	
	/**
	 * 자동할당(R1)취소 자동할당 목록 조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsAutoAssignCancelList.do", method = RequestMethod.POST)
	@ResponseBody
	public void wmsAutoAssignCancelList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {

		try {
			ArrayList<Object> CUR = new ArrayList<Object>();
			param.put("CUR", CUR);
			
			log.debug("param :: " + param.toString());
			List<Map<String, Object>> resultList = wmsAutoService.selectWmsAutoAssignCancelList(param);
			log.debug("result :: " + param.toString());
			
			  
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create(); 
			String jsonStr = gson.toJson(  resultList  );
	  
			
			log.debug("JSON :: " + jsonStr);
				
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonStr); 
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	/**
	 * 자동할당(R1)취소 자동할당 출고 상세
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsAutoAssignCancelDetail.do", method = RequestMethod.POST)
	@ResponseBody
	public void wmsAutoAssignCancelDetail(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {

		try {
			ArrayList<Object> CUR = new ArrayList<Object>();
			param.put("CUR", CUR);
			
			log.debug("param :: " + param.toString());
			List<Map<String, Object>> resultList = wmsAutoService.selectWmsAutoAssignCancelDetail(param);
			log.debug("result :: " + param.toString());
			
			  
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create(); 
			String jsonStr = gson.toJson(  resultList  );
	  
			
			log.debug("JSON :: " + jsonStr);
				
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonStr); 
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 자동할당(R1) 자동할당취소
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsAutoAssignDelete.do", method = RequestMethod.POST)
	@ResponseBody
	public void wmsAutoAssignDelete(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {

		try {
			
			log.debug("param :: " + param.toString());
			Map<String, Object> resultList = wmsAutoService.deleteWmsAutoAssign(param);
			log.debug("result :: " + param.toString());
			
			  
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create(); 
			String jsonStr = gson.toJson(  resultList  );
	  
			log.debug("JSON :: " + jsonStr);
				
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonStr); 
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
}
