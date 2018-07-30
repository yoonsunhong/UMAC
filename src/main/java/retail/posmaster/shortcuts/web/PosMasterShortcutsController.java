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
package retail.posmaster.shortcuts.web;

import java.util.HashMap;
import java.util.Map;

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

import retail.common.service.CommService;
import retail.posmaster.shortcuts.service.PosMasterShortcutsService;

/**
 * 
 * @Class Name : PosMasterShortcutsController.java
 * @Description : POS관리 > POS단축키 관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.22           최초생성
 *
 * @author 김경진
 * @since 2017. 01. 03.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PosMasterShortcutsController {

	@Autowired
	private PosMasterShortcutsService posMasterShortcutsService;
	
	@Autowired
	private CommService commService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * POS단축키 관리 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posMasterShortcuts.do", method = RequestMethod.GET)
	public ModelAndView posMasterShortcuts(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posmaster/shortcuts/posMasterShortcuts");
		
		return mav; 
	}
	
	/**
	 * POS단축키 관리 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posMasterShortcutsList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posMasterShortcutsList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = posMasterShortcutsService.getPosMasterShortcuts(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			result.put("count", param.get("USE_POS_KEY_NO"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * POS단축키 상품 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posMasterShortcutsList2.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posMasterShortcutsList2(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = posMasterShortcutsService.getPosMasterShortcuts2(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * POS단축키 상품 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/delPosShortCuts.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delPosShortCuts(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = posMasterShortcutsService.delPosShortCuts(param);
			log.debug("result :: " + param.toString());
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * POS단축키 관리 등록, 수정 
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosMasterShortcuts.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosMasterShortcuts(@RequestParam Map<String, Object> param) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = posMasterShortcutsService.updatePosMasterShortcuts(param);
			log.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
