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
package retail.business.estimate.web;

import java.util.HashMap;
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
import retail.business.estimate.service.BusinessEstimateService;

/**
 * 
 * @Class Name : BusinessEstimateController.java
 * @Description : 영업정보 > 영업관리 > 견적서관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.27           최초생성
 *
 * @author 김경진
 * @since 2017. 02. 27.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessEstimateController {

	@Autowired
	private BusinessEstimateService businessEstimateService;
	
	@Autowired
	private CommService commService;
	
	/** LOGGER */
	private static final Logger LOGGER = LoggerFactory.getLogger(BusinessEstimateController.class);
	
	/**
	 * 견적서관리 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessEstimate.do", method = RequestMethod.GET)
	public ModelAndView businessEstimate(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/business/estimate/businessEstimate");
		
		return mav; 
	}
	
	/**
	 * 견적서 목록 조회
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessEstimateList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> businessEstimateList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 10));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
			
			param.put("S_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("S_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
			
			LOGGER.debug("param :: " + param.toString());
			param = businessEstimateService.getBusinessEstimateList(param);
			LOGGER.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 견적상품 목록 조회
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/businessEstimateProList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> businessEstimateProList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = businessEstimateService.getBusinessEstimateProList(param);
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
	 * 견적서관리 수정, 등록
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateBusinessEstimate.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateBusinessEstimate(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("ori param :: " + param.toString());
			String sendEmail_1 = EgovStringUtil.isNullToString(param.get("P_SEND_EMAIL_1"), "");
			String sendEmail_2 = EgovStringUtil.isNullToString(param.get("P_SEND_EMAIL_2"), "");
			
			String email_1 = EgovStringUtil.isNullToString(param.get("P_EMAIL_1"), "");
			String email_2 = EgovStringUtil.isNullToString(param.get("P_EMAIL_2"), "");
			
			if(!"".equals(sendEmail_1) && !"".equals(sendEmail_2))
			{
				param.put("P_SEND_EMAIL", sendEmail_1 + "@" + sendEmail_2);
			}
			
			if(!"".equals(email_1) && !"".equals(email_2))
			{
				param.put("P_EMAIL", email_1 + "@" + email_2);
			}
			
			LOGGER.debug("param2 :: " + param.toString());
			param = businessEstimateService.updateBusinessEstimate(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
}
