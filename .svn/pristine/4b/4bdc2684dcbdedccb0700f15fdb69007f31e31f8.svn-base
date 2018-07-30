package retail.business.campaignmaster.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.business.campaignmaster.service.BusinessCampaignMasterService;
import retail.common.CommonUtil;

/**
 * @Class Name : GroupGridTestController.java
 * @Description : 행사코드마스터관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2016. 12.26
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class BusinessCampaignMasterController {
	
	@Autowired
	private BusinessCampaignMasterService bcmService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCampaignMaster.do", method = RequestMethod.GET)
	public ModelAndView businessCampaignMaster(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/campaignmaster/businessCampaignMaster"); 
		 
		return   mav; 
	}
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessExchangeMaster.do", method = RequestMethod.GET)
	public ModelAndView businessExchangeMaster(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/exchangemaster/businessExchangeMaster"); 
		 
		return   mav; 
	}
	
	
	/**
	 * 행사코드마스터 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCampaignMst.do", method = RequestMethod.POST)
	public void selectBusinessCampaignMst(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_EVT_STR_DT", request.getParameter("EVT_STR_DT"));
		paramMap.put("P_EVT_END_DT", request.getParameter("EVT_END_DT"));
		paramMap.put("P_EVT_FLAG", request.getParameter("EVT_FLAG"));
		paramMap.put("P_SEARCH_FLAG", request.getParameter("SEARCH_FLAG"));
		paramMap.put("CUR", CUR);
		
		bcmService.selectBusinessCampaignMst(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 저장 및 수정을 위해 중복된 일정이 존재하는지 체크를 위해 일정 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/validationCampaignDate.do", method = RequestMethod.POST)
	public void validationCampaignDate(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("CUR", CUR);
		
		bcmService.validationCampaignDate(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 행사코드마스터 저장
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/registBusinessCampaignMst.do", method = RequestMethod.POST)
	public void registBusinessCampaignMst(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_EVT_CODE", request.getParameter("EVT_CODE"));
		paramMap.put("P_EVT_NAME", toTEXT(request.getParameter("EVT_NAME")));
		paramMap.put("P_EVT_FLAG", request.getParameter("EVT_FLAG"));
		paramMap.put("P_EVT_STR_DT", request.getParameter("EVT_STR_DT"));
		paramMap.put("P_EVT_END_DT", request.getParameter("EVT_END_DT"));
		paramMap.put("P_ORD_STR_DT", request.getParameter("ORD_STR_DT"));
		paramMap.put("P_ORD_END_DT", request.getParameter("ORD_END_DT"));
		paramMap.put("P_REMARK", toTEXT(request.getParameter("REMARK")));
		
		paramMap.put("P_EVT_TYPE", request.getParameter("P_EVT_TYPE"));
		paramMap.put("P_CARD_BASE_AMT", request.getParameter("P_CARD_BASE_AMT"));
		paramMap.put("P_DC_FLAG", request.getParameter("P_DC_FLAG"));
		paramMap.put("P_DC_AMT", request.getParameter("P_DC_AMT"));
		paramMap.put("P_DC_RATE", request.getParameter("P_DC_RATE"));
		paramMap.put("P_EXCHG_PRT_YN", request.getParameter("P_EXCHG_PRT_YN"));
		paramMap.put("P_EXCHG_BASE_AMT", request.getParameter("P_EXCHG_BASE_AMT"));
		paramMap.put("P_EXCHG_CONTS", toTEXT(request.getParameter("P_EXCHG_CONTS")));
		paramMap.put("GRID_XML_DATA", request.getParameter("GRID_XML_DATA"));
		paramMap.put("GRID_XML_DATA2", request.getParameter("GRID_XML_DATA2"));
		paramMap.put("P_TGET_CUST", request.getParameter("P_TGET_CUST"));
		paramMap.put("P_POINT_NET_YN", request.getParameter("P_POINT_NET_YN"));
		paramMap.put("P_CARD_FLAG", request.getParameter("P_CARD_FLAG"));
		
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);

		bcmService.registBusinessCampaignMst(paramMap);
	}
	
	/**
	 * 행사코드마스터 삭제
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteBusinessCampaignMst.do", method = RequestMethod.POST)
	public void deleteBusinessCampaignMst(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_EVT_CODE", request.getParameter("EVT_CODE"));
		paramMap.put("CUR", CUR);
		
		bcmService.deleteBusinessCampaignMst(paramMap);
		
	}
	
	/**
	 * 카드행사 카드 정보 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCampaignCard.do", method = RequestMethod.POST)
	public void selectBusinessCampaignCard(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CARD_CODE", request.getParameter("P_CARD_CODE"));
		paramMap.put("P_MBR_DSNT", request.getParameter("P_MBR_DSNT"));
		paramMap.put("P_EVT_TYPE", request.getParameter("B_EVT_TYPE"));
		paramMap.put("CUR", CUR);
		
		bcmService.selectBusinessCampaignCard(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 행사 등록된 카드 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectEventCard.do", method = RequestMethod.POST)
	public void selectEventCard(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_EVT_CODE", request.getParameter("EVT_CODE"));
		paramMap.put("CUR", CUR);
		
		bcmService.selectEventCard(paramMap);
		
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
