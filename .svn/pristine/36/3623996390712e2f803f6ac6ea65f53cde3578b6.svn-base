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
package retail.posclosed.cash.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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

import retail.common.EgovStringUtil;
import retail.common.service.CommService;
import retail.posclosed.cash.service.PosClosedCashService;

/**
 * 
 * @Class Name : PosClosedCashController.java
 * @Description : 영업정보 > POS정산 > POS마감정산
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 03.15           최초생성
 *
 * @author 김경진
 * @since 2017. 03. 15
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PosClosedCashController {

	@Autowired
	private PosClosedCashService posClosedCashService;
	
	@Autowired
	private CommService commService;

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedCashController.class);
	
	/**
	 * POS마감정산 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedCash.do", method = RequestMethod.GET)
	public ModelAndView posClosedCash(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posclosed/cash/posClosedCash");
		
		return mav; 
	}
	
	/**
	 * POS마감정산 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedCashList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedCashList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedCashService.getPosClosedCash(param);
			LOGGER.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			
			result.put("list2", param.get("CUR2"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * POS정산 정보 가져오기
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedCash2.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedCash2(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedCashService.getPosClosedCash2(param);
			LOGGER.debug("result :: " + param.toString());
			
			result.put("list", param.get("CUR"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * POS마감정산 등록, 수정 
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedCash.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedCash(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			String P_CHECK_AMT_ETC = EgovStringUtil.isNullToString(param.get("P_CHECK_AMT_ETC"), "0");
			String P_GIFT_AMT_ETC = EgovStringUtil.isNullToString(param.get("P_GIFT_AMT_ETC"), "0");	
			String P_GIFT_AMT1 = EgovStringUtil.isNullToString(param.get("P_GIFT_AMT1"), "0");
			
			P_CHECK_AMT_ETC = P_CHECK_AMT_ETC.replaceAll("\\,", "");
			P_GIFT_AMT_ETC = P_GIFT_AMT_ETC.replaceAll("\\,", "");
			P_GIFT_AMT1 = P_GIFT_AMT1.replaceAll("\\,", "");
			
			// 금액 콤마 제거후 담기
			param.put("P_CHECK_AMT_ETC", P_CHECK_AMT_ETC);
			param.put("P_GIFT_AMT1", P_GIFT_AMT1);
			param.put("P_GIFT_AMT_ETC", P_GIFT_AMT_ETC);
			System.out.println(param.toString());
			param.put("P_SALE_DT", ((String)param.get("P_SALE_DT")).replaceAll("-",""));
			System.out.println(param.toString());
			 
			LOGGER.debug("param :: " + param.toString());
			param = posClosedCashService.updatePosClosedCash(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
