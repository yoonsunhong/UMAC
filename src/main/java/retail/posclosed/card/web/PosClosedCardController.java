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
package retail.posclosed.card.web;

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

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.common.EgovStringUtil;
import retail.common.service.CommService;
import retail.posclosed.card.service.PosClosedCardService;

/**
 * 
 * @Class Name : PosClosedCardController.java
 * @Description : 영업정보 > POS정산 > 매출부가세 신용카드안분
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 06.07           최초생성
 *
 * @author 김경진
 * @since 2017. 06. 07
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PosClosedCardController {

	@Autowired
	private PosClosedCardService posClosedCardService;
	
	@Autowired
	private CommService commService;

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedCardController.class);
	
	/**
	 * 매출부가세 신용카드안분 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedCard.do", method = RequestMethod.GET)
	public ModelAndView posClosedCard(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posclosed/card/posClosedCard");
		
		return mav; 
	}
	
	/**
	 * 매출부가세 신용카드안분 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedCardList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedCardList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedCardService.getPosClosedCard(param);
			//LOGGER.debug("result :: " + param.toString());
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(  param.get("CUR") );
			String jsonList2 = gson.toJson(  param.get("CUR2") );
			
			result.put("list", jsonList);
			result.put("list2", jsonList2);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 엑셀다운 
	 * @param  
	 * 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedCardListExcel.do", method = RequestMethod.POST)
	public ModelAndView posClosedCardListExcel(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		List<Map<String, Object>> result = null;
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			result = posClosedCardService.posClosedCardListExcel(param);
			LOGGER.debug("result :: " + result.toString());
			
			mav.addObject("excelList", result);
			mav.setViewName("retail/posclosed/card/posClosedCardListExcel");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return mav;
	}
	
}
