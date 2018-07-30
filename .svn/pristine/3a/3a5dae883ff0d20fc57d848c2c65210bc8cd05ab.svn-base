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
package retail.business.exchangeprint.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.business.exchangeprint.service.BusinessExchangePrintService;
import retail.common.CommonUtil;
import retail.common.service.CommService;

import com.google.gson.Gson;

/**
 * 
 * @Class Name : BusinessExchangePrintController.java
 * @Description : 영업정보 > 영업관리 > 교환권출력현황
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 08.23           최초생성
 *
 * @author 윤태희
 * @since 2017. 08. 23
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessExchangePrintController {

	@Autowired
	private BusinessExchangePrintService BusinessExchangePrintService;
	
	@Autowired
	private CommService commService;

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(BusinessExchangePrintController.class);
	
	/**
	 * 교환권출력현황 진입        
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessExchangePrint.do", method = RequestMethod.GET)
	public ModelAndView posClosedOverAndShorts(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/business/exchangeprint/businessExchangePrint");
		
		return mav; 
	}
	
	/**
	 * 교환권출력현황 목록          
	 * @param Map
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessExchangePrintList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedOverAndShortsList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			result = BusinessExchangePrintService.businessExchangePrintList(param);
			LOGGER.debug("result :: " + result.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  result.get("CUR") );
			
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 교환권출력현황 엑셀다운 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessExchangePrintListExcel.do", method = RequestMethod.POST)
	public ModelAndView businessExchangePrintListExcel(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		List<Map<String, Object>> result = null;
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			result = BusinessExchangePrintService.businessExchangePrintListExcel(param);
			LOGGER.debug("result :: " + result.toString());
			
			mav.addObject("excelList", result);
			mav.setViewName("retail/business/exchangeprint/businessExchangePrintListExcel");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return mav;
	}
	
	/**
	 * 행사 select box 초기 셋팅 
	 * @param Map
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value ="/first_commonSearch.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  first_commonSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException { 
		Map<String, Object> result = new HashMap<String, Object>();		
		try{
			String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			LOGGER.debug("BusinessExchangePrintController.first_commonSearch param :: " + param.toString());	
//			param = itemSalesStateService.itemSalesStateList(param);
			
			param = BusinessExchangePrintService.BusinessExchangePrintPopupList(param);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			result.put("list", jsonList);

		}catch(Exception e){
			/*log.debug("ERROR>>>>>>>>>>"+e.getMessage());
			result.put("code", "9999");
			result.put("Alert", e.getMessage());
			return result;*/
			e.printStackTrace();
		}		 
		return result;
	}

}
