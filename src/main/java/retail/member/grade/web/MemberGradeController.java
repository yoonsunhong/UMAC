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

import retail.common.service.CommService;
import retail.member.grade.service.MemberGradeService;

/**
 * 
 * @Class Name : MemberGradeController.java
 * @Description : 회원정보 > 멤버십관리 > 회원등급변경(개별)
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.01           최초생성
 *
 * @author 김경진
 * @since 2017. 02. 01.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class MemberGradeController {

	@Autowired
	private MemberGradeService memberGradeService;
	
	@Autowired
	private CommService commService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 회원등급변경(개별) 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberGrade.do", method = RequestMethod.GET)
	public ModelAndView memberGrade(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/member/grade/memberGrade");
		
		return mav; 
	}
	
	/**
	 * 회원등급변경(개별) 조회
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberGradeDetail.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberGradeDetail(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = memberGradeService.getMemberGradeDetail(param);
			log.debug("result :: " + param.toString());
			
			result.put("list", param.get("CUR"));			// 회원포인트
			result.put("list2", param.get("CUR2"));			// 회원실적
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회원등급변경(개별) 수정, 등록
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateMemberGrade.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateMemberGrade(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = memberGradeService.updateMemberGrade(param);
			log.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
}
