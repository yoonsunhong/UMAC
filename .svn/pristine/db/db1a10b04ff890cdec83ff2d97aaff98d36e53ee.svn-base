package retail.payment.ledger.web;

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

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.common.SessionModel;
import retail.payment.ledger.service.PaymentLedgerService;

/**
 * 
 * @Class Name : PaymentLedgerController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 02.08           최초생성
 *
 * @author 오동근
 * @since 2017. 02. 08.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PaymentLedgerController {
	
	@Autowired
	private PaymentLedgerService paymentLedgerService;
	
	/**
	 * 업체별 여신한도관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentLedgerInfo(HttpServletRequest ledger, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/ledger/paymentLedger");
		return   mav; 
	}
	
	/**
	 * 외상대금(회차별) 생성
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerProcess.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentLedgerProcess(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentLedgerService.paymentLedgerProcess(param);
			
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
	 * 원장생성 집계 취소
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePaymentLedgerCancle.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePaymentLedgerCancle(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentLedgerService.updatePaymentLedgerCancle(param);
			
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
	 * 원장생성 지불년월조회 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentLedgerInfo_PayList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentLedgerInfo_PayList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		/** pageing setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
		paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 25));	// 한 페이지당 게시되는 게시물 건 수
		paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_FIRST_INDEX", paginationInfo.getCurrentPageNo()); //paginationInfo.getFirstRecordIndex()
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
			System.out.println("@@PARAM : " + param);
			
			param = paymentLedgerService.paymentLedgerInfo_PayList(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
