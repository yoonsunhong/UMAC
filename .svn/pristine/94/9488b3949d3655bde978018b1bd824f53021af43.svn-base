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
 * @Class Name : BusinessGiftGrantController.java
 * @Description : 사은품증정
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 03.10
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessGiftGrantController {
	
	@Autowired
	private BusinessGiftService bgService;

	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessGiftGrant.do", method = RequestMethod.GET)
	public ModelAndView businessGiftGrant(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/gift/businessGiftGrant"); 
		 
		return   mav; 
	}
	
	/**
	 * 사은권 증정 사은행사 조회 팝업
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectGiftEvent.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectGiftEvent(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SERACH_WORD", request.getParameter("SEARCH_WORD" ) ) ;
		paramMap.put("CUR", CUR);
		
		bgService.selectGiftEvent(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 영수증번호 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectTrxnNo.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectTrxnNo(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_TRXN_NO", request.getParameter("P_TRXN_NO" ) ) ;
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_SALE_DT", request.getParameter("P_SALE_DT" ) ) ;
		paramMap.put("P_POS_NO", request.getParameter("P_POS_NO" ) ) ;
		paramMap.put("CUR", CUR);
		
		bgService.selectTrxnNo(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 사은품 증정 저장
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/registBusinessGiftGrant.do", method = RequestMethod.POST)
	@ResponseBody
	public void registBusinessGiftGrant(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("GRID_XML_DATA1", request.getParameter("GRID_XML_DATA1" ) ) ;
		paramMap.put("GRID_XML_DATA2", request.getParameter("GRID_XML_DATA2" ) ) ;
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bgService.registBusinessGiftGrant(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 사은품 증정내역 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessGiftGrant.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessGiftGrant(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_GIFT_CODE", request.getParameter("P_GIFT_CODE" ) ) ;
		paramMap.put("CUR", CUR);
		
		bgService.selectBusinessGiftGrant(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 사은품 증정내역 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessGiftGrantItem.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessGiftGrantItem(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_GIFT_CODE", request.getParameter("P_GIFT_CODE" ) ) ;
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_TRXN_NO", request.getParameter("P_TRXN_NO" ) ) ;
		paramMap.put("P_SALE_DT", request.getParameter("P_SALE_DT" ) ) ;
		paramMap.put("P_POS_NO", request.getParameter("P_POS_NO" ) ) ;
		paramMap.put("CUR", CUR);
		
		bgService.selectBusinessGiftGrantItem(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
}
