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
package retail.member.grade.web;

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

import retail.common.EgovStringUtil;
import retail.common.service.CommService;
import retail.member.grade.service.MemberGradeBatchService;

/**
 * 
 * @Class Name : MemberGradeBatchController.java
 * @Description : 회원정보 > 멤버십관리 > 회원등급변경(일괄)
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.20           최초생성
 *
 * @author 김경진
 * @since 2017. 01. 20.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class MemberGradeBatchController {

	@Autowired
	private MemberGradeBatchService memberGradeBatchService;
	
	@Autowired
	private CommService commService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 회원등급변경(일괄) 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberGradeBatch.do", method = RequestMethod.GET)
	public ModelAndView memberGradeBatch(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/member/grade/memberGradeBatch");
		
		return mav; 
	}
	
	/**
	 * 회원등급변경(일괄) 조회
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberGradeBatchDetail.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberGradeBatchDetail(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = memberGradeBatchService.getMemberGradeBatchDetail(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);			// 회원등급현황
			
			jsonList = gson.toJson(  param.get("CUR2") );
			result.put("list2", jsonList);			// 회원등급기준
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회원등급변경(일괄) 미리보기
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberGradeBatchPreview.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberGradeBatchPreview(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = memberGradeBatchService.memberGradeBatchPreview(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);			// 회원등급현황
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회원등급변경(일괄) 수정, 등록
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateMemberGradeBatch.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateMemberGradeBatch(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = memberGradeBatchService.updateMemberGradeBatch(param);
			log.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
}
