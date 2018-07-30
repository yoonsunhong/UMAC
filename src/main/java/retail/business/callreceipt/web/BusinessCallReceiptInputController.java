package retail.business.callreceipt.web;

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

import retail.business.callreceipt.service.BusinessCallReceiptInputService;
import retail.common.CommonUtil;


/**
 * @Class Name : BusinessCallReceiptInput.java
 * @Description : 콜센터주문접수
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 01.11
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessCallReceiptInputController {
	
	@Autowired
	private BusinessCallReceiptInputService bcrService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallReceiptInput.do", method = RequestMethod.GET)
	public ModelAndView businessCallReceiptInput(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/callreceipt/businessCallReceiptInput"); 
		 
		return   mav; 
	}
	
	/**
	 * 콜센터 주문 고객정보 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallReceiptUserInfo.do", method = RequestMethod.POST)
	public void businessCallReceiptUserInfo(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO"));
		paramMap.put("CUR", CUR);
		
		bcrService.businessCallReceiptUserInfo(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}

	/**
	 * 콜센터 주문접수 주문이력 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallOrderHistory.do", method = RequestMethod.POST)
	public void businessCallOrderHistory(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO"));
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("CUR", CUR);
		
		bcrService.businessCallOrderHistory(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 콜센터 주문 확정
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallDetermine.do", method = RequestMethod.POST)
	public void businessCallDetermine(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO"));
		paramMap.put("P_SLIP_NO", request.getParameter("SLIP_NO"));
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bcrService.businessCallDetermine(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 콜센터 주문 상품 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallOrderProduct.do", method = RequestMethod.POST)
	public void businessCallOrderProduct(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO"));
		paramMap.put("P_SLIP_NO", request.getParameter("SLIP_NO"));
		paramMap.put("CUR", CUR);
		
		
		//System.out.println("bcrService.businessCallOrderProduct param :: " + paramMap.toString());
		bcrService.businessCallOrderProduct(paramMap);
		//System.out.println("bcrService.businessCallOrderProduct result :: " + paramMap.toString());
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 콜센터 주문 고객 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallOrderUser.do", method = RequestMethod.POST)
	public void businessCallOrderUser(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO"));
		paramMap.put("P_SLIP_NO", request.getParameter("SLIP_NO"));
		paramMap.put("CUR", CUR);
		
		bcrService.businessCallOrderUser(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 콜센터주문접수 상품 검색 팝업
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallSelectProduct.do", method = RequestMethod.POST)
	public void businessCallSelectProduct(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_SEARCH_WORD", request.getParameter("SEARCH_WORD"));
		paramMap.put("P_CUST_NO", request.getParameter("P_CUST_NO"));
		paramMap.put("CUR", CUR);
		
		bcrService.businessCallSelectProduct(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	@RequestMapping(value = "/businessCallSelectProduct2.do", method = RequestMethod.POST)
	public void businessCallSelectProduct2(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_ITM_CODE", request.getParameter("ITM_CODE"));
		paramMap.put("CUR", CUR);
		
		bcrService.businessCallSelectProduct2(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 콜센터 주문접수 행사상품조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallSelectEvent.do", method = RequestMethod.POST)
	public void businessCallSelectEvent(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_SEARCH_WORD1", request.getParameter("SEARCH_WORD1"));
		paramMap.put("P_SEARCH_WORD2", request.getParameter("SEARCH_WORD2"));
		paramMap.put("P_IMAGE_NUM", request.getParameter("IMAGE_NUM"));
		paramMap.put("CUR", CUR);
		
		bcrService.businessCallSelectEvent(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 콜센터주문접수 등록
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallReceiptRegist.do", method = RequestMethod.POST)
	public void businessCallReceiptRegist(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("GRID_XML_DATA"    , request.getParameter("gridXmlData" ) ) ;
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO"));
		paramMap.put("P_ORD_DT", request.getParameter("ORD_DT"));
		paramMap.put("P_CUST_NAME", toTEXT(request.getParameter("CUST_NAME")));
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_PAY_METH", request.getParameter("PAY_METH"));
		paramMap.put("P_SMS_YN", request.getParameter("SMS_YN"));
		paramMap.put("P_ORD_ADDR", toTEXT(request.getParameter("ORD_ADDR")));
		paramMap.put("P_ORD_ADDR_DTL", toTEXT(request.getParameter("ORD_ADDR_DTL")));
		paramMap.put("P_SLIP_NO", request.getParameter("SLIP_NO"));
		paramMap.put("P_RESERVE_DT", request.getParameter("RESERVE_DT"));
		paramMap.put("P_RESERVE_TIME", request.getParameter("RESERVE_TIME"));
		paramMap.put("P_ORD_MTHD", request.getParameter("ORD_MTHD"));
		paramMap.put("P_REMARK", toTEXT(request.getParameter("REMARK")));
		paramMap.put("P_IDATE", toTEXT(request.getParameter("IDATE")));
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		/*System.out.println("1 : "+paramMap.get("GRID_XML_DATA"));
		System.out.println("2 : "+paramMap.get("P_CUST_NO"));
		System.out.println("3 : "+paramMap.get("P_ORD_DT"));
		System.out.println("4 : "+paramMap.get("P_CUST_NAME"));
		System.out.println("5 : "+paramMap.get("P_STR_CODE"));
		System.out.println("6 : "+paramMap.get("P_PAY_METH"));
		System.out.println("7 : "+paramMap.get("P_SMS_YN"));
		System.out.println("8 : "+paramMap.get("P_ORD_ADDR"));
		System.out.println("9 : "+paramMap.get("P_ORD_ADDR_DTL"));
		System.out.println("10 : "+paramMap.get("P_SLIP_NO"));
		System.out.println("11 : "+paramMap.get("P_RESERVE_DT"));
		System.out.println("12 : "+paramMap.get("P_RESERVE_TIME"));
		System.out.println("13 : "+paramMap.get("P_ORD_MTHD"));
		System.out.println("14 : "+paramMap.get("P_REMARK"));
		System.out.println("15 : "+paramMap.get("P_EMP_NO"));*/
		
		bcrService.businessCallReceiptRegist(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	/**
	 * 콜센터 주문접수 행사상품조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallSelectSlip.do", method = RequestMethod.POST)
	public void businessCallSelectSlip(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CUST_NM", request.getParameter("CUST_NM"));
		paramMap.put("P_ORD_DT", request.getParameter("ORD_DT"));
		paramMap.put("P_STR_CODE", request.getParameter("STR_CODE"));
		paramMap.put("P_SLIP_NO", request.getParameter("SLIP_NO"));
		paramMap.put("CUR", CUR);
		
		bcrService.businessCallSelectSlip(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 콜센터 주문정보 조회 시 POS 입력 내용 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBusinessCallPos.do", method = RequestMethod.POST)
	public void selectBusinessCallPos(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_CUST_NO", request.getParameter("CUST_NO"));
		paramMap.put("P_SLIP_NO", request.getParameter("SLIP_NO"));
		paramMap.put("CUR", CUR);
		
		bcrService.selectBusinessCallPos(paramMap);
		
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
