package retail.payment.ledgerSearch.web;

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
import retail.common.SessionModel;
import retail.payment.ledgerSearch.service.PaymentLedgerSearchService;
import retail.payment.purchase.service.PaymentPurchaseService;

import com.google.gson.Gson;

@Controller
public class PaymentLedgerSearchController {
	
	@Autowired
	private PaymentLedgerSearchService paymentLedgerSearchSevice;
	
	/**
	 * 거래선별 매입집계조회 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerPurchaseInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentLedgerPurchaseInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		System.out.println("@@Start!!!!!!!!!");
		ModelAndView mav = new  ModelAndView("retail/payment/ledgerSearch/paymentLedgerPurchaseSearch");
		return   mav; 
	}
	
	/**
	 * 거래선별 매출집계조회 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerSalesInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentLedgerSalesInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		System.out.println("@@Start!!!!!!!!!");
		ModelAndView mav = new  ModelAndView("retail/payment/ledgerSearch/paymentLedgerSalesSearch");
		return   mav; 
	}
	
	/**
	 * 거래선별 지불 예정조회 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerSearchInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentLedgerSearchInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		System.out.println("@@Start!!!!!!!!!");
		ModelAndView mav = new  ModelAndView("retail/payment/ledgerSearch/paymentLedgerSearch");
		return   mav; 
	}
	
	/**
	 * 거래선별 매입조회 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerPurchList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentLedgerPurchList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			List<Map<String, Object>> resultList = paymentLedgerSearchSevice.selectPaymentLedgerPurch(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson( resultList );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 거래선별 매입조회 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerSalesList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentLedgerSalesList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			List<Map<String, Object>> resultList = paymentLedgerSearchSevice.selectPaymentLedgerSales(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson( resultList );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 거래선별 매입조회 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerSearchList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentLedgerSearchList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			List<Map<String, Object>> resultList = paymentLedgerSearchSevice.selectPaymentLedgerSearch(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson( resultList );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
