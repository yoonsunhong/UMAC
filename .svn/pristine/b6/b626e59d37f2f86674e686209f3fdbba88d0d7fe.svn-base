package retail.payment.request.web;

import java.util.HashMap;
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
import retail.payment.request.service.PaymentRequestService;

import com.google.gson.Gson;

/**
 * 
 * @Class Name : PaymentRequestController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.25           최초생성
 *
 * @author 오동근
 * @since 2017. 01. 25.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PaymentRequestController {
	
	@Autowired
	private PaymentRequestService paymentRequestService;
	
	/**
	 * 대금지불 의뢰조회 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentRequestInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentRequestInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/request/paymentRequestInfo");
		return   mav; 
	}
	
	/**
	 * 대금지불 의뢰조회 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentRequestInfoList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> PaymentRequestList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = paymentRequestService.selectPaymentRequest(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 대금지불 의뢰조회 은행제출용 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentRequestInfoList_Bank.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> PaymentRequestList_Bank(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = paymentRequestService.selectPaymentRequest_Bank(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
