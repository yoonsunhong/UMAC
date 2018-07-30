package retail.claim.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import retail.claim.service.UserClaimService;
import retail.common.CommonUtil;

import com.google.gson.Gson;

/**
 * @Class Name : BusinessCallOrderController.java
 * @Description : 컴플레인관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 04.06
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class UserClaimManageController {
	
	@Autowired
	private UserClaimService ucService;
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userClaimManage.do", method = RequestMethod.GET)
	public ModelAndView userClaimManage(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/claim/manage/userClaimManage"); 
		 
		return   mav; 
	}
	
	/**
	 * 컴플레인관리 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUserClaimManage.do", method = RequestMethod.POST)
	public void selectUserClaimManage(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_RCPT_NO", request.getParameter("P_RCPT_NO"));
		paramMap.put("P_SEQ", request.getParameter("P_SEQ"));
		paramMap.put("CUR", CUR);
		
		ucService.selectUserClaimManage(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 컴플레인관리 저장
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/registUserClaimManage.do", method = RequestMethod.POST)
	public void registUserClaimManage(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_RCPT_NO", request.getParameter("P_RCPT_NO"));
		paramMap.put("P_SEQ", request.getParameter("P_SEQ"));
		paramMap.put("P_CONTS", toTEXT(request.getParameter("P_CONTS")));
		paramMap.put("P_CLAIM_STAT", toTEXT(request.getParameter("P_CLAIM_STAT")));
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		ucService.registUserClaimManage(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	public static String toTEXT(String str) {
		if(str == null)
		return null;

		String returnStr = str;
		returnStr = returnStr.replaceAll("<br>", "\n");
		returnStr = returnStr.replaceAll("&gt;", ">");
		returnStr = returnStr.replaceAll("&lt;", "<");
		returnStr = returnStr.replaceAll("&quot;", "\"");
		returnStr = returnStr.replaceAll("&nbsp;", " ");
		returnStr = returnStr.replaceAll("&amp;", "&");
		returnStr = returnStr.replaceAll("\"", "&#34;");
		// returnStr = returnStr.replaceAll("&#34;", "\"");

		return returnStr;
	}

}
