package retail.business.gift.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.business.gift.service.BusinessGiftService;
import retail.common.CommonUtil;


/**
 * @Class Name : BusinessGiftMasterController.java
 * @Description : 사은행사마스터
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 03.10
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessGiftMasterController {
	
	@Autowired
	private BusinessGiftService bgService;
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessGiftMaster.do", method = RequestMethod.GET)
	public ModelAndView businessGiftMaster(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/gift/businessGiftMaster"); 
		 
		return   mav; 
	}
	
	/**
	 * 사은행사마스터 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessGiftMaster.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessGiftMaster(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_GIFT_NAME", request.getParameter("P_GIFT_NAME" ) ) ;
		paramMap.put("CUR", CUR);
		
		bgService.selectBusinessGiftMaster(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 사은행사마스터 저장, 수정
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/registBusinessGiftMaster.do", method = RequestMethod.POST)
	@ResponseBody
	public void registBusinessGiftMaster(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_GIFT_CODE", request.getParameter("P_GIFT_CODE" ) ) ;
		paramMap.put("P_GIFT_NAME", toTEXT(request.getParameter("P_GIFT_NAME" )) ) ;
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_GIFT_CMP_FLAG", request.getParameter("P_GIFT_CMP_FLAG" ) ) ;
		paramMap.put("P_GIFT_STR_DT", request.getParameter("P_GIFT_STR_DT" ) ) ;
		paramMap.put("P_GIFT_END_DT", request.getParameter("P_GIFT_END_DT" ) ) ;
		paramMap.put("P_TGET_CUST", request.getParameter("P_TGET_CUST" ) ) ;
		paramMap.put("P_REMARK", toTEXT(request.getParameter("P_REMARK" )) ) ;
		paramMap.put("P_PUBLISH_CNT", request.getParameter("P_PUBLISH_CNT" ) ) ;
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("P_EVT_CODE", request.getParameter("P_EVT_CODE" ) );
		paramMap.put("GRID_XML_DATA", request.getParameter("GRID_XML_DATA" ) );
		paramMap.put("CUR", CUR);
		
		bgService.registBusinessGiftMaster(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 사은행사 교환권 행사 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectPresentEvent.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectPresentEvent(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SERACH_WORD", request.getParameter("SEARCH_WORD" ) ) ;
		paramMap.put("CUR", CUR);
		
		bgService.selectPresentEvent(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 사은행사 증정권 행사 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectGiftItem.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectGiftItem(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_GIFT_CODE", request.getParameter("P_GIFT_CODE" ) ) ;
		paramMap.put("CUR", CUR);
		
		bgService.selectGiftItem(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
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
