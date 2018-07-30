package retail.payment.deduction.web;

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
import retail.payment.deduction.service.PaymentDeductionService;

import com.google.gson.Gson;


/**
 * 
 * @Class Name : PaymentDeductionController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.11           최초생성
 *
 * @author 오동근
 * @since 2017. 01. 11.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PaymentDeductionController {
	
	@Autowired
	private PaymentDeductionService paymentDeductionService;
	
	/**
	 * 공제등록 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentDeductionInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentDeductionInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/deduction/paymentDeductionInfo");
		return   mav; 
	}
	
	/**
	 * 보류등록 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentDeductionHoldInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentDeductionHoldInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/deduction/paymentDeductionHoldInfo");
		return   mav; 
	}
	
	/**
	 * 보류(해제)등록 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentDeductionHoldCancle.do", method = RequestMethod.GET)
	public ModelAndView paymentDeductionHoldCancle(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/deduction/paymentDeductionHoldCancle");
		return   mav; 
	}
	
	/**
	 * 공제등록 관리 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentDeductionInfoList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentDeductionInfoList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = paymentDeductionService.selectPaymentDeduction(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 보류등록(해제) 관리 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/PaymentDeductionHoldList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> PaymentDeductionHoldList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = paymentDeductionService.selectPaymentDeductionHold(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 협력업체, 지불주기, 지불차수 selectBoxList
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getPaymentSelectBoxList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getPaymentSelectBoxList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		System.out.println("@@PARAM : " + param);
		
		try {
			// 여기부터
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			
			param = paymentDeductionService.getPaymentSelectBoxList(param);
			result.put("list", param.get("CUR"));
			System.out.println("@@pointMap : " + param.get("CUR"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 공제등록 관리 Update
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentDeductionUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentDeductionUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			
			/*
			String ductVal = "";
			String ductYm = "";

			if(param.get("P_DUCT_DT") != null && !param.get("P_DUCT_DT").equals("")){
				ductVal = (String) param.get("P_DUCT_DT");
				ductYm = ductVal.substring(0, 7);
				param.put("P_DUCT_YM", ductYm);
			}
			*/
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentDeductionService.updatePaymentDeduction(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 공제등록 관리 Delete
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentDeductionDelete.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentDeductionDelete(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			param.put("P_TYPE", "DELETE");
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentDeductionService.updatePaymentDeduction(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 보류등록 관리 Update
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentDeductionHoldUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentDeductionHoldUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			String ductVal = "";
			String ductYm = "";
			
			if(param.get("P_HOLD_DT") != null && !param.get("P_HOLD_DT").equals("")){
				ductVal = (String) param.get("P_HOLD_DT");
				ductYm = ductVal.substring(0, 7);
				param.put("P_HOLD_YM", ductYm);
			}
			
			System.out.println("@@PARAM : " + param);
						
			param = paymentDeductionService.updatePaymentDeductionHold(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 보류등록(해제) 관리 Update
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentReleHoldUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentReleHoldUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			String ductVal = "";
			String ductYm = "";
			
			if(param.get("P_RELE_HOLD_DT") != null && !param.get("P_RELE_HOLD_DT").equals("")){
				ductVal = (String) param.get("P_RELE_HOLD_DT");
				ductYm = ductVal.substring(0, 7);
				param.put("P_RELE_HOLD_YM", ductYm);
			}
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentDeductionService.updatePaymentReleHold(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	

}
