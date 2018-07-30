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
package retail.member.info.web;

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
import retail.member.info.service.MemberInfoService;

/**
 * 
 * @Class Name : MemberInfoController.java
 * @Description : 회원정보 > 멤버십관리 > 회원정보관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.05           최초생성
 *
 * @author 김경진
 * @since 2017. 01. 15.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class MemberInfoController {

	@Autowired
	private MemberInfoService memberInfoService;
	
	@Autowired
	private CommService commService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 회원정보관리 진입
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberInfo.do", method = RequestMethod.GET)
	public ModelAndView memberInfo(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		
		mav.setViewName("retail/member/info/memberInfo");
		mav.addObject("CUST_NO", param.get("CUST_NO")); 
		log.info( param );
		log.info(mav);
		
		return mav; 
	}
	
	/**
	 * 회원정보 상세
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberInfoDetail.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberInfoDetail(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			String corpCode = EgovStringUtil.isNullToString(param.get("B_CORP_CODE"), "");
			String custNo = EgovStringUtil.isNullToString(param.get("B_CUST_NO"), "");
			
			if(!"".equals(corpCode) && !"".equals(custNo))	// 사업자탭 조회시 파라미터 변경
			{
				param.put("P_CORP_CODE", corpCode);
				param.put("P_CUST_NO", custNo);
			}
			
			log.debug("param :: " + param.toString());
			param = memberInfoService.getMemberInfoDetail(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR2") );
			
			result.put("point", param.get("CUR"));	// 회원포인트
			result.put("list", jsonList);			// 멤버십카드
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회원명으로 검색 후 회원 수 조회
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberInfoCount.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberInfoCount(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = memberInfoService.memberInfoCount(param);
			log.debug("result :: " + param.toString());
			
			result.put("count", param.get("TOT_CNT"));		// 회원이름 갯수
			result.put("cust_no", param.get("R_CUST_NO"));	// 1명일때만 담김
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 전체 회원의 휴대폰번호 중복체크
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberPhoneCount.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberPhoneCount(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = memberInfoService.memberPhoneCount(param);
			log.debug("result :: " + param.toString());
			
			result.put("count", param.get("TOT_CNT"));		// 회원이름 갯수
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 사업자 중복 체크
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberBusiNoCount.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberBusiNoCount(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = memberInfoService.memberBusiNoCount(param);
			log.debug("result :: " + param.toString());
			
			result.put("count", param.get("TOT_CNT"));		// 회원이름 갯수
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회원번호로 회원정보 검색
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberInfoSelect.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberInfoSelect(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			Map<String, Object> rs = memberInfoService.memberInfoSelect(param);
			log.debug("result :: " + rs.toString());
			
			result.put("info", rs);	// 회원이름 갯수
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회원정보 수정, 등록 (개인)
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateMemberInfoPersonal.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateMemberInfoPersonal(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("ori param :: " + param.toString());
			String smsYn = EgovStringUtil.isNullToString(param.get("P_SMS_YN"), "");
			String dmYn = EgovStringUtil.isNullToString(param.get("P_DM_YN"), "");
			String emailYn = EgovStringUtil.isNullToString(param.get("P_EMAIL_YN"), "");
			String sendEmail_1 = EgovStringUtil.isNullToString(param.get("P_SEND_EMAIL_1"), "");
			String sendEmail_2 = EgovStringUtil.isNullToString(param.get("P_SEND_EMAIL_2"), "");
			
			if("".equals(smsYn))	// 단건 체크박스 uncheck 일때 처리를 위함
			{
				param.put("P_SMS_YN", "N");
			}
			
			if("".equals(dmYn))
			{
				param.put("P_DM_YN", "N");
			}
			
			if("".equals(emailYn))
			{
				param.put("P_EMAIL_YN", "N");
			}
			
			if(!"".equals(sendEmail_1) && !"".equals(sendEmail_2))
			{
				param.put("P_SEND_EMAIL", sendEmail_1 + "@" + sendEmail_2);
			}
			
			log.debug("param2 :: " + param.toString());
			param = memberInfoService.updateMemberInfoPersonal(param);
			log.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			result.put("RETURN_CUST_NO", param.get("RETURN_CUST_NO"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 회원정보 수정, 등록 (사업자)
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/updateMemberInfoBuisness.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateMemberInfoBuisness(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("ori param :: " + param.toString());
			String smsYn = EgovStringUtil.isNullToString(param.get("B_SMS_YN"), "");
			String dmYn = EgovStringUtil.isNullToString(param.get("B_DM_YN"), "");
			String emailYn = EgovStringUtil.isNullToString(param.get("B_EMAIL_YN"), "");
			String sendEmail_1 = EgovStringUtil.isNullToString(param.get("B_SEND_EMAIL_1"), "");
			String sendEmail_2 = EgovStringUtil.isNullToString(param.get("B_SEND_EMAIL_2"), "");
			
			if("".equals(smsYn))	// 단건 체크박스 uncheck 일때 파리미터 전송되지 않아 값셋팅
			{
				param.put("B_SMS_YN", "N");
			}
			
			if("".equals(dmYn))
			{
				param.put("B_DM_YN", "N");
			}
			
			if("".equals(emailYn))
			{
				param.put("B_EMAIL_YN", "N");
			}
			
			if(!"".equals(sendEmail_1) && !"".equals(sendEmail_2))
			{
				param.put("B_SEND_EMAIL", sendEmail_1 + "@" + sendEmail_2);
			}
			
			log.debug("param2 :: " + param.toString());
			param = memberInfoService.updateMemberInfoBuisness(param);
			log.debug("result :: " + param);
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			result.put("RETURN_CUST_NO", param.get("RETURN_CUST_NO"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
}
