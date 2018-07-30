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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import retail.claim.service.UserClaimService;
import retail.common.CommonUtil;

import com.google.gson.Gson;

/**
 * @Class Name : BusinessCallOrderController.java
 * @Description : 컴플레인접수등록
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 04.06
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class UserClaimRegistController {
	
	@Autowired
	private UserClaimService ucService;
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userClaimRegist.do", method = RequestMethod.GET)
	public ModelAndView userClaimRegist(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/claim/regist/userClaimRegist"); 
		 
		return   mav; 
	}
	
	/**
	 * 컴플레인접수등록 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUserClaimRegist.do", method = RequestMethod.POST)
	public void selectUserClaimRegist(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		paramMap.put("P_RCPT_DTTM_STR", request.getParameter("P_RCPT_DTTM_STR"));
		paramMap.put("P_RCPT_DTTM_END", request.getParameter("P_RCPT_DTTM_END"));
		paramMap.put("P_CLAIM_STAT", request.getParameter("P_CLAIM_STAT"));
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO"));
		paramMap.put("P_CLAIM_TP", request.getParameter("P_CLAIM_TP"));
		paramMap.put("CUR", CUR);
		
		ucService.selectUserClaimRegist(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	@RequestMapping(value = "/excelUserClaimRegist.do", method = RequestMethod.POST)
	public ModelAndView excelUserClaimRegist(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE", (String) param.get("P_STR_CODE"));
		param.put("P_RCPT_DTTM_STR", (String) param.get("P_RCPT_DTTM_STR"));
		param.put("P_RCPT_DTTM_END", (String) param.get("P_RCPT_DTTM_END"));
		param.put("P_CLAIM_STAT", (String) param.get("P_CLAIM_STAT"));
		param.put("P_CUST_NO", (String) param.get("P_CUST_NO"));
		param.put("P_CLAIM_TP", (String) param.get("P_CLAIM_TP"));
		
		map = ucService.excelUserClaimRegist(param);
		
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
		
		return mav;
		
	}
	
	/**
	 * 컴플레인접수등록 저장
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/registUserClaimRegist.do", method = RequestMethod.POST)
	public void registUserClaimRegist(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_RCPT_NO", request.getParameter("P_RCPT_NO"));
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		paramMap.put("P_RCPT_EMP", request.getParameter("P_RCPT_EMP"));
		paramMap.put("P_SUBJECT", toTEXT(request.getParameter("P_SUBJECT")));
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO"));
		paramMap.put("P_CUST_NAME", toTEXT(request.getParameter("P_CUST_NAME")));
		paramMap.put("P_CLAIM_TP", request.getParameter("P_CLAIM_TP"));
		paramMap.put("P_CLAIM_STAT", request.getParameter("P_CLAIM_STAT"));
		paramMap.put("P_MOBIL_NO", request.getParameter("P_MOBIL_NO"));
		paramMap.put("P_CONTS", toTEXT(request.getParameter("P_CONTS")));
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		ucService.registUserClaimRegist(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 컴플레인접수등록 삭제
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteUserClaimRegist.do", method = RequestMethod.POST)
	public void deleteUserClaimRegist(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_RCPT_NO", request.getParameter("P_RCPT_NO"));
		paramMap.put("CUR", CUR);
		
		ucService.deleteUserClaimRegist(paramMap);
		
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
