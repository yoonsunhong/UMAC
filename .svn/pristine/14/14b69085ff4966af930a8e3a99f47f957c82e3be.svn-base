package retail.payment.purchase.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.common.SessionModel;
import retail.payment.purchase.service.PaymentPurchaseService;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
public class PaymentPurchaseController {
	
	@Autowired
	private PaymentPurchaseService paymentPurchaseService;
	
	/**
	 * 거래선별 매입조회 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentPurchaseInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentPurchaseInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		System.out.println("@@Start!!!!!!!!!");
		ModelAndView mav = new  ModelAndView("retail/payment/purchase/paymentPurchaseSearch");
		return   mav; 
	}
	@RequestMapping(value = "/paymentPurchaseInfo_v2.do", method = RequestMethod.GET)
	public ModelAndView paymentPurchaseInfo_v2(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		System.out.println("@@Start!!!!!!!!!");
		ModelAndView mav = new  ModelAndView("retail/payment/purchase/paymentPurchaseSearch_v2");
		return   mav; 
	}
	
	/**
	 * 거래선별 매입조회 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentPurchaseInfoList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> PaymentPurchaseList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		/** pageing setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
		paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 25));	// 한 페이지당 게시되는 게시물 건 수
		paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
		
		param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
		param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		System.out.println("@@PARAM : " + param);
		
		param = paymentPurchaseService.selectPaymentPurchase(param);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		result.put("list", jsonList);
		result.put("totalList", param.get("CUR2"));
		result.put("totalCount", param.get("TOT_CNT"));
		
		result.put("RESULT_COUNT", param.get("RESULT_COUNT"));
		result.put("RESULT_DEC_QTY", param.get("RESULT_DEC_QTY"));
		result.put("RESULT_PUR_WPRC", param.get("RESULT_PUR_WPRC"));
		result.put("RESULT_PUR_WVAT", param.get("RESULT_PUR_WVAT"));
		result.put("RESULT_SUM", param.get("RESULT_SUM"));
		result.put("TOT_BOT_SUM", param.get("TOT_BOT_SUM"));
		result.put("TOT_PAY", param.get("TOT_PAY"));
		
		
		return result;
	}
	@RequestMapping(value = "/paymentPurchaseInfoList_v2.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> PaymentPurchaseList_v2(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();

		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = paymentPurchaseService.selectPaymentPurchase_v2(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			result.put("totalList", param.get("CUR2"));
			//result.put("totalCount", param.get("TOT_CNT"));
			
			result.put("RESULT_COUNT", param.get("RESULT_COUNT"));
			result.put("RESULT_DEC_QTY", param.get("RESULT_DEC_QTY"));
			result.put("RESULT_PUR_WPRC", param.get("RESULT_PUR_WPRC"));
			result.put("RESULT_PUR_WVAT", param.get("RESULT_PUR_WVAT"));
			result.put("RESULT_SUM", param.get("RESULT_SUM"));
			result.put("TOT_BOT_SUM", param.get("TOT_BOT_SUM"));
			result.put("TOT_PAY", param.get("TOT_PAY"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 거래선별 매출조회 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentSalesInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentSalesInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/purchase/paymentSalesSearch");
		return   mav; 
	}

	
	/**
	 * 거래선별 매출(임대을)조회 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentSalesInfoSelect.do", method = RequestMethod.POST)
	@ResponseBody
	public  Map<String, Object> paymentSalesInfoSelect(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		/** pageing setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
		paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 25));	// 한 페이지당 게시되는 게시물 건 수
		paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
		
		param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
		param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		System.out.println("@@PARAM : " + param);

		param = paymentPurchaseService.selectPaymentSales(param);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		result.put("list", jsonList);
		result.put("totalList", param.get("CUR2"));
		result.put("totalCount", param.get("TOT_CNT"));
			
		
		return result;
		
	}
	
	/**
	 * 취소구분 COMBOBOX
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getPaymentCancelSelectBoxList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getPaymentCancelSelectBoxList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@param : " + param);
			
			param = paymentPurchaseService.getPaymentCancelSelectBoxList(param);
			result.put("list", param.get("CUR"));
			System.out.println("@@list : " + param.get("CUR"));
			System.out.println("result : " + result);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 거래선별 매입조회 List ExcelDownload
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/excelPaymentPurchaseInfoList.do", method = RequestMethod.POST)
	public ModelAndView excelPaymentPurchaseInfoList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE", (String) param.get("P_STR_CODE"));
		param.put("P_SEARCH_START_DT", (String) param.get("P_SEARCH_START_DT"));
		param.put("P_SEARCH_END_DT", (String) param.get("P_SEARCH_END_DT"));
		//param.put("P_VEN_CODE", (String) param.get("P_VEN_NAME"));
		param.put("P_VEN_CODE", (String) param.get("P_VEN_CODE"));
		//param.put("P_CANC_FLAG", (String) param.get("P_CANC_FLAG"));
		param.put("P_PUR_GB", (String) param.get("P_PUR_GB"));
		param.put("P_GRE_GB", (String) param.get("P_GRE_GB"));
		param.put("P_LIMIT_LEVEL", (String) param.get("P_LIMIT_LEVEL"));
		System.out.println("@@param : " + param);

		map = paymentPurchaseService.excelPaymentPurchaseInfoList(param);
		
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
		
		return mav;
		
	}
	
	/**
	 * 거래선별 매출(임대을)조회 List Excel Download
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/excelPaymentSalesInfoList.do", method = RequestMethod.POST)
	public ModelAndView excelPaymentSalesInfoList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE", (String) param.get("P_STR_CODE"));
		param.put("P_SEARCH_START_DT", (String) param.get("P_SEARCH_START_DT"));
		param.put("P_SEARCH_END_DT", (String) param.get("P_SEARCH_END_DT"));
		//param.put("P_VEN_CODE", (String) param.get("P_VEN_NAME"));
		param.put("P_VEN_CODE", (String) param.get("P_VEN_CODE"));
		param.put("P_CANC_FLAG", (String) param.get("P_CANC_FLAG"));
		param.put("P_LIMIT_LEVEL", (String) param.get("P_LIMIT_LEVEL"));
		//param.put("P_PUR_GB", (String) param.get("P_PUR_GB"));
		System.out.println("@@param : " + param);

		map = paymentPurchaseService.excelPaymentSalesInfoList(param);
		
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
		
		return mav;
		
	}

}
