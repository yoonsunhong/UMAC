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
package retail.wms.in.web;

 
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
import retail.product.customer.service.ProductCustomerVO;
import retail.wms.in.service.WmsInService;


/**
 * WMS -입고예정관리
 * @author 문희훈
 * @since 2017. 01.04
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class WmsInController {

	@Autowired
	private WmsInService wmsInService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 입고예정관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/wmsIn.do", method = RequestMethod.GET)
	public ModelAndView wmsIn(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/in/wmsIn/wmsIn"); 
		return   mav; 
	}
	
	/**
	 * WMS 입고목록 조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsInList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getWmsInList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		/** pageing setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
		paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
		paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
		
		param.put("P_PUR_SDAY", ((String) param.get("P_PUR_SDAY")).replaceAll("-", ""));
		param.put("P_PUR_EDAY", ((String) param.get("P_PUR_EDAY")).replaceAll("-", ""));
		param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
		param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		log.debug("param :: " + param.toString());
		wmsInService.getWmsInList(param);
		log.debug("result :: " + param.toString());
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		
		result.put("list", jsonList);
		result.put("totalCount", param.get("TOT_CNT"));
			
		return result;
	}
	
	
	/**
	 * 입고현황 상세조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsInDtlList.do", method=RequestMethod.POST)
	@ResponseBody
	public void getWmsInDtlList( HttpServletRequest request,HttpServletResponse response)throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();

		paramMap.put("P_PUR_DT", request.getParameter("PUR_DT").replaceAll("-", ""));
		paramMap.put("P_SLIP_NO", request.getParameter("SLIP_NO"));
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		//입고현황 상세조회
		wmsInService.getWmsInDtlList(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
			
	}

	
	/**
	 * WMS 입고 저장.    
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/saveWmsInCnt.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveWmsInCnt(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		String P_GRID_XML_DATA2 = request.getParameter("gridXmlData2" ); 
		
		System.out.println("GRID_XML_DATA2 : " + P_GRID_XML_DATA2 );
		 
		param.put("P_CORP_CODE"    		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("P_UEMP_NO" 	    	, CommonUtil.getEnv(request.getSession()).getUserId()) ;   
		param.put("P_GRID_XML_DATA2"    , P_GRID_XML_DATA2 ) ;   
		param.put("CUR"	     	, CUR);
		
		
		
		//WMS 입고 저장.
		wmsInService.saveWmsInCnt(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  param.get("CUR") );
		param.put("CUR"	, jsonStr);           
				
		return param;
	}
	
	
	/**
	 * WMS 입고 확정   
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sumitWmsIn.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> sumitWmsIn(HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_SLIP_LIST", request.getParameter("P_SLIP_LIST"));
		paramMap.put("P_CORP_CODE"    		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		paramMap.put("P_UEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		//WMS 입고확정
		wmsInService.sumitWmsIn(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(  paramMap.get("CUR") );
		paramMap.put("CUR"	, jsonStr);           
				
		return paramMap;
	}
	
	
}
