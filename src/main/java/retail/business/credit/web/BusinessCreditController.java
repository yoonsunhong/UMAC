package retail.business.credit.web;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.business.credit.service.BusinessCreditService;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;


/**
 * @Class Name : GroupGridTestController.java
 * @Description : 외상매출관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 02.16
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class BusinessCreditController {
	
	@Autowired
	private BusinessCreditService bcService;
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCredit.do", method = RequestMethod.GET)
	public ModelAndView businessCredit(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/credit/businessCredit"); 
		 
		return   mav; 
	}
	
	/**
	 * 외상매출내역 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCredit.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCredit(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
//		paramMap.put("P_SALE_STR_DT", request.getParameter("P_SALE_STR_DT" ) ) ;
//		paramMap.put("P_SALE_END_DT", request.getParameter("P_SALE_END_DT" ) ) ;
		paramMap.put("P_DPOT_FISH_YN", request.getParameter("P_DPOT_FISH_YN" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO" ) ) ;
		paramMap.put("P_CUST_NAME", request.getParameter("P_CUST_NAME" ) ) ;
		paramMap.put("P_POS_NO", request.getParameter("P_POS_NO" ) ) ;
		paramMap.put("P_TRXN_NO", request.getParameter("P_TRXN_NO" ) ) ;
		paramMap.put("P_CANC_FLAG", request.getParameter("P_CANC_FLAG" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCredit(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	
	/**
	 * 외상매출 입금등록
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/registBusinessCredit.do", method = RequestMethod.POST)
	@ResponseBody
	public void registBusinessCredit(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("GRID_XML_DATA1", request.getParameter("gridXmlData" ) ) ;
		paramMap.put("GRID_XML_DATA2", request.getParameter("gridXmlData2" ) ) ;
		paramMap.put("P_DPOT_FLAG", request.getParameter("P_DPOT_FLAG" ) ) ;
		paramMap.put("P_PREPAY_ZAN_AMT", request.getParameter("P_PREPAY_ZAN_AMT" ) ) ;
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO" ) ) ;
		paramMap.put("P_IEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bcService.registBusinessCredit(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 외상매출 입금내역 조회 (상세)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCreditLedger.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCreditLedger(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE" ) ) ;
		paramMap.put("P_POS_NO", request.getParameter("POS_NO" ) ) ;
		paramMap.put("P_TRXN_NO", request.getParameter("TRXN_NO" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO" ) ) ;
		paramMap.put("P_SALE_DT", request.getParameter("SALE_DT" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCreditLedger(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 외상매출 입금내역 조회 (마스터)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCreditSlip.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCreditSlip(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE" ) ) ;
		paramMap.put("P_POS_NO", request.getParameter("POS_NO" ) ) ;
		paramMap.put("P_TRXN_NO", request.getParameter("TRXN_NO" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO" ) ) ;
		paramMap.put("P_SALE_DT", request.getParameter("SALE_DT" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCreditSlip(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	@RequestMapping(value = "/selectBusinessCreditDetail.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCreditDetail(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SLIP_NO", request.getParameter("P_SLIP_NO" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCreditDetail(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 외상매출관리 선입금내역 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCreditOverDpot.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCreditOverDpot(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCreditOverDpot(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 외상매출내역 조회(점별)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCreditStore.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCreditStore(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SALE_STR_DT", request.getParameter("P_SALE_STR_DT" ) ) ;
		paramMap.put("P_SALE_END_DT", request.getParameter("P_SALE_END_DT" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCreditStore(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 당일 입금내역조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCreditToday.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCreditToday(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO" ) ) ;
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCreditToday(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 카드프리픽스 유효성 검사
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCreditCard.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCreditCard(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CARD_PREFIX", request.getParameter("P_CARD_PREFIX" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCreditCard(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	
	/**
	 * 카드프리픽스 유효성 검사
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCreditEditAvailable.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectBusinessCreditEditAvailable(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_SALE_DT", request.getParameter("P_RCP_DT" ) ) ;
		paramMap.put("CUR", CUR);
		
		bcService.selectBusinessCreditEditAvailable(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	/**
	 * 외상매출 입금전표 수정
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateBusinessCreditEditSlip.do", method = RequestMethod.POST)
	@ResponseBody
	public void updateBusinessCreditEditSlip(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO" ) ) ;
		paramMap.put("P_RCP_DT", request.getParameter("P_RCP_DT" ) ) ;
		paramMap.put("P_RCP_DT_OLD", request.getParameter("P_RCP_DT_OLD" ) ) ;
		paramMap.put("P_SLIP_NO", request.getParameter("P_SLIP_NO" ) ) ;
		paramMap.put("P_DPOT_FLAG", request.getParameter("P_DPOT_FLAG" ) ) ;
		paramMap.put("P_CARD_NO", request.getParameter("P_CARD_NO" ) ) ;
		paramMap.put("P_APP_NO", request.getParameter("P_APP_NO" ) ) ;
		paramMap.put("P_PAY_PERIOD", request.getParameter("P_PAY_PERIOD" ) ) ;
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bcService.updateBusinessCreditEditSlip(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	@RequestMapping(value = "/insertBusinessCreditAccount.do", method = RequestMethod.POST)
	@ResponseBody
	public void insertBusinessCreditAccount(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO" ) ) ;
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bcService.insertBusinessCreditAccount(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}

}
