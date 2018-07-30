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
import retail.wms.in.service.WmsInNonPaymentService;


/**
 * WMS -미납현황조회
 * @author 문희훈
 * @since 2017. 01.13
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class WmsInNonPaymentController {

	@Autowired
	private WmsInNonPaymentService wmsInNonPaymentService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * 미납현황조회 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/wmsInNonPayment.do", method = RequestMethod.GET)
	public ModelAndView wmsInNonPayment(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/in/wmsInNonPayment/wmsInNonPayment"); 
		return   mav; 
	}
	
	/**
	 * WMS 미납현황조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsNonPaymentList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getWmsNonPaymentList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
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
		wmsInNonPaymentService.getWmsNonPaymentList(param);
		log.debug("result :: " + param.toString());
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		
		result.put("list", jsonList);
		result.put("totalCount", param.get("TOT_CNT"));
			
		return result;
	}
	
	
	/**
	 * 미납현황 엑셀을 다운
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/wmsNonPaymentExcelDown.do", method=RequestMethod.POST)
	public ModelAndView wmsNonPaymentExcelDown(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		//Map<String, Object> paramMap = new HashMap<String, Object>();
		Map<String, Object>  CUR =  new HashMap<String, Object>();
		
		System.out.println(paramMap.get("P_PUR_SDAY"));
		paramMap.put("P_PUR_SDAY", ((String) paramMap.get("P_PUR_SDAY")).replaceAll("-", ""));
		paramMap.put("P_PUR_EDAY", ((String) paramMap.get("P_PUR_EDAY")).replaceAll("-", ""));
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("CUR", CUR);
		
		
		map = wmsInNonPaymentService.wmsNonPaymentExcelDown(paramMap);


		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");


		
		return mav;
	}
	
	
}
