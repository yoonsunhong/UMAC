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
package retail.posclosed.overandshorts.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import retail.common.service.CommService;
import retail.posclosed.overandshorts.service.PosClosedOverAndShortsService;

import com.google.gson.Gson;

/**
 * 
 * @Class Name : PosClosedOverAndShortsController.java
 * @Description : 영업정보 > POS정산 > 계산원과부족현황
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
public class PosClosedOverAndShortsController {

	@Autowired
	private PosClosedOverAndShortsService posClosedOverAndShortsService;
	
	@Autowired
	private CommService commService;

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedOverAndShortsController.class);
	
	/**
	 * 계산원과부족현황 진입   
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posOverAndShorts.do", method = RequestMethod.GET)
	public ModelAndView posClosedOverAndShorts(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posclosed/overandshorts/posClosedOverAndShorts");
		
		return mav; 
	}
	
	
	/**
	 * 계산원과부족현황 목록          
	 * @param Map
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedOverAndShortsList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedOverAndShortsList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedOverAndShortsService.getPosClosedOverAndShorts(param);
			LOGGER.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 계산원과부족현황 엑셀다운 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedOverAndShortsListExcel.do", method = RequestMethod.POST)
	public ModelAndView posClosedCardListExcel(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		List<Map<String, Object>> result = null;
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			result = posClosedOverAndShortsService.posClosedOverAndShortsListExcel(param);
			LOGGER.debug("result :: " + result.toString());
			
			mav.addObject("excelList", result);
			mav.setViewName("retail/posclosed/overandshorts/posClosedOverAndShortsListExcel");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return mav;
	}
	
}
