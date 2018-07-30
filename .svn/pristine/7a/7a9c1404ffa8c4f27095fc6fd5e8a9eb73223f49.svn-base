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
package retail.posmaster.info.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import retail.common.SessionModel;
import retail.common.service.CommService;
import retail.posmaster.info.service.PosMasterInfoService;

/**
 * 
 * @Class Name : PosMasterInfoController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.05           최초생성
 *
 * @author 김경진
 * @since 2016. 12. 15.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PosMasterInfoController {

	@Autowired
	private PosMasterInfoService posMasterInfoService;
	
	@Autowired
	private CommService commService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * POS 마스터 관리 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posMasterInfo.do", method = RequestMethod.GET)
	public ModelAndView posMasterInfo(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/posmaster/info/posMasterInfo");
		
		return mav; 
	}
	
	/**
	 * 점포의 POS 리스트 가져오기 
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/getPosList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getPosList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		try {
			
			String pStrCode = EgovStringUtil.isNullToString(param.get("P_STR_CODE"), "");
			String dStrCode = EgovStringUtil.isNullToString(param.get("D_STR_CODE"), "");
			String sStrCode = EgovStringUtil.isNullToString(param.get("S_STR_CODE"), "");
			
			if("".equals(pStrCode) && !"".equals(dStrCode))
			{
				param.put("P_STR_CODE", dStrCode);
			}
			else if("".equals(pStrCode) && !"".equals(sStrCode))
			{
				param.put("P_STR_CODE", sStrCode);
			}
			
			log.debug("param :: " + param.toString());
			List<Map<String, Object>> posList = posMasterInfoService.getPos(param);
			log.debug("result :: " + posList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  posList );
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * POS 마스터 관리 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/posMasterInfoList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> posMasterInfoList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
			
			log.debug("param :: " + param.toString());
			param = posMasterInfoService.getPosMaster(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));
			
			//response.setContentType("text/json; charset=utf-8");
			//response.getWriter().print(jsonStr);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * POS 수정, 삭제 
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePosMaster.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePosMaster(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("D_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("D_USER_ID", sessionModel.getUserId());
			
			log.debug("param :: " + param.toString());
			param = posMasterInfoService.updatePosMaster(param);
			log.debug("result :: " + param);
			
			/*Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(rs);*/
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}
