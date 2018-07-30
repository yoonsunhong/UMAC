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
package retail.member.sms.web;

import java.util.HashMap;
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

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.member.sms.service.MemberSmsService;

/**
 * 
 * @Class Name : MemberSmsController.java
 * @Description : SMS 발송관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.07           최초생성
 *
 * @author 김경진
 * @since 2017. 02. 07
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class MemberSmsController {

	@Autowired
	private MemberSmsService memberSmsService;
	
	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberSmsController.class);
	
	/**
	 * SMS 발송관리 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberSms.do", method = RequestMethod.GET)
	public ModelAndView memberSms(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/member/sms/memberSms");
		
		return mav; 
	}
	
	/**
	 * SMS 발송관리 대상회원 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberSmsList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberSmsList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = memberSmsService.getMemberSms(param);
			//LOGGER.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 문자 발송 (즉시, 예약)
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberSmsSend.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberSmsSend(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = memberSmsService.updateMemberSmsSend(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 비회원 문자발송(즉시)
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberSmsSend2.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberSmsSend2(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			LOGGER.debug("param :: " + param.toString());
			param = memberSmsService.updateMemberSmsSend2(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 알림톡 발송
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/alimtalSend.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> alimtalSend(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		String corpCode = EgovStringUtil.isNullToString(param.get("P_CORP_CODE"), "");
		
		try {
			
			if("".equals(corpCode))
			{
				param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			}
			
			LOGGER.debug("param :: " + param.toString());
			param = memberSmsService.updateAlimtalSend(param);
			LOGGER.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * SMS 발송관리 대상회원 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/alimtalkList102.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> alimtalkList102(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("ATK_pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("ATK_pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("ATK_pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
			
			param.put("ATK_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("ATK_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
			
			LOGGER.debug("param :: " + param.toString());
			param = memberSmsService.getAlimtalkList102(param);
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
	
}
