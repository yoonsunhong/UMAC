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
package retail.posclosed.cal.web;

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

import retail.common.service.CommService;
import retail.posclosed.cal.service.PosClosedCalService;

/**
 * 
 * @Class Name : PosClosedCalController.java
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
public class PosClosedCalController {

	@Autowired
	private PosClosedCalService posClosedCalService;
	
	@Autowired
	private CommService commService;

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedCalController.class);
	
	/**
	 * POS마감정산 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedCal.do", method = RequestMethod.GET)
	public ModelAndView posClosedCal(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posclosed/cal/posClosedCal");
		
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
	@RequestMapping(value = "/posClosedCalList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedCalList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedCalService.getPosClosedCal(param);
			LOGGER.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
