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
package retail.posclosed.douzone.web;

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
import retail.posclosed.douzone.service.PosClosedDouzoneService;

/**
 * 
 * @Class Name : PosClosedDouzoneController.java
 * @Description : 영업정보 > POS정산 > 매출부가세전송
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 04.03           최초생성
 *
 * @author 김경진
 * @since 2017. 04. 03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PosClosedDouzoneController {

	@Autowired
	private PosClosedDouzoneService posClosedDouzoneService;
	
	@Autowired
	private CommService commService;

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedDouzoneController.class);
	
	/**
	 * 매출부가세전송 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzone.do", method = RequestMethod.GET)
	public ModelAndView posClosedDouzone(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posclosed/douzone/posClosedDouzone");
		
		return mav; 
	}
	
	/**
	 * 매출부가세전송 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzoneList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posClosedDouzoneList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
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
			param = posClosedDouzoneService.getPosClosedDouzone(param);
			//LOGGER.debug("result :: " + param.toString());
			
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
	 * 확정전송
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedDouzone1.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedDouzone1(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneService.updatePosClosedDouzone1(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_CODE2", param.get("RETURN_CODE2"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 마감생성
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosClosedDouzone2.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosClosedDouzone2(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = posClosedDouzoneService.updatePosClosedDouzone2(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_CODE2", param.get("RETURN_CODE2"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 엑셀다운 (자동분개)
	 * @param  
	 * 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzoneListExcel1.do", method = RequestMethod.POST)
	public ModelAndView posClosedDouzoneListExcel1(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		List<Map<String, Object>> result = null;
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			result = posClosedDouzoneService.posClosedDouzoneListExcel1(param);
			LOGGER.debug("result :: " + result.toString());
			
			mav.addObject("excelList", result);
			mav.setViewName("retail/posclosed/douzone/posClosedDouzoneListExcel1");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return mav;
	}
	
	/**
	 * 엑셀다운 (면과세)
	 * @param  
	 * 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posClosedDouzoneListExcel2.do", method = RequestMethod.POST)
	public ModelAndView posClosedDouzoneListExcel2(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		List<Map<String, Object>> result = null;
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			result = posClosedDouzoneService.posClosedDouzoneListExcel2(param);
			LOGGER.debug("result :: " + result.toString());
			
			mav.addObject("excelList", result);
			mav.setViewName("retail/posclosed/douzone/posClosedDouzoneListExcel2");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return mav;
	}
	
}
