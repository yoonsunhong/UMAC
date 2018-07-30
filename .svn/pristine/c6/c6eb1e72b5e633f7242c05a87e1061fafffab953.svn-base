package retail.payment.close.web;

import java.util.ArrayList;
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
import retail.payment.close.service.PaymentCloseService;
import retail.posclosed.douzoneDayMsSql.service.DouzoneDayMsSqlService;
import retail.posclosed.douzoneDayMsSql.service.DouzoneDayMsSqlVO;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 
 * @Class Name : PaymentCloseController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.24           최초생성
 *
 * @author 오동근
 * @since 2017. 01. 24.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PaymentCloseController {
	
	@Autowired
	private PaymentCloseService paymentCloseService;
	
	@Autowired
	private DouzoneDayMsSqlService douzoneDayMsSqlService;
	
	/**
	 * 공제등록 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentCloseInfo.do", method = RequestMethod.GET)
	public ModelAndView paymentCloseInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/close/paymentCloseInfo");
		return   mav; 
	}

	/**
	 * 대금지불 마감관리 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentCloseInfoList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> PaymentCloseList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = paymentCloseService.selectPaymentClose(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 대금지불 마감관리 Update
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/paymentCloseUpdate.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> paymentCloseUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentCloseService.updatePaymentClose(param);
			
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
	 * 매입마감 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchClosed.do", method = RequestMethod.GET)
	public ModelAndView purchClosed(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/payment/close/purchClosed");
		return   mav; 
	}
	
	/**
	 * 매입마감 리스트
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchClosedList.do", method = RequestMethod.POST)
	@ResponseBody
	//public Map<String, Object> purchClosedList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
	public Map<String, Object> purchClosedList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
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
			
			param = paymentCloseService.purchClosedList(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 대금지불 마감관리 Update
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/updatePurchClosed.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePurchClosed(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_EMP_NO", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentCloseService.updatePurchClose(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@RequestMapping(value = "/selectPurchClosed.do", method = RequestMethod.POST)
	public void selectPurchClosed(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE"    , request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_PUR_DT"    , request.getParameter("P_PUR_DT" ) ) ;
		paramMap.put("CUR", CUR);
		
		paymentCloseService.selectPurchClosed(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	@RequestMapping(value = "/selectPurchClosedDetail.do", method = RequestMethod.POST)
	public void selectPurchClosedDetail(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE"    , request.getParameter("P_STR_CODE" ) ) ;
		paramMap.put("P_PUR_DT"    , request.getParameter("P_PUR_DT" ) ) ;
		paramMap.put("P_VEN_CODE"    , request.getParameter("P_VEN_CODE" ) ) ;
		paramMap.put("P_TAX_GB"    , request.getParameter("P_TAX_GB" ) ) ;
		paramMap.put("CUR", CUR);
		
		paymentCloseService.selectPurchClosedDetail(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	@RequestMapping(value = "/updatePurchClosedConf.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updatePurchClosedConf(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_EMP_NO", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentCloseService.updatePurchClosedConf(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	@RequestMapping(value = "/insertPurchClosedDouzone.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insertPurchClosedDouzone(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_EMP_NO", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = paymentCloseService.insertPurchClosedDouzone(param);
			
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
	 * oracle 에서 XML 추출해서 파일로 저장하기
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/insertPurchClosedDouzoneSend.do", method = RequestMethod.POST)
	@ResponseBody
	public void insertPurchClosedDouzoneSend(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();  
		try {
			
			System.out.println( "====== oracle - select start ========="    );
			List<Map<String, Object>> resultList  = paymentCloseService.insertPurchClosedDouzoneSend(param);
			System.out.println("*************************** " + resultList.size() + "건 ************************************");
			System.out.println( "====== MSSQL - insert start ========="   );
			for(int i=0; i<resultList.size(); i++) { 
						DouzoneDayMsSqlVO params = new DouzoneDayMsSqlVO();
						
						System.out.println("*************************** SEQ : " + String.valueOf(i+1) + " ************************************");
						params.setIN_DT(		resultList.get(i).get("IN_DT").toString() );
						params.setIN_SQ(		resultList.get(i).get("IN_SQ").toString() );
						params.setLN_SQ(		resultList.get(i).get("LN_SQ").toString() );
						params.setCO_CD(		resultList.get(i).get("CO_CD").toString() );
						params.setIN_DIV_CD(	resultList.get(i).get("IN_DIV_CD").toString() );
						params.setLOGIC_CD(		resultList.get(i).get("LOGIC_CD").toString() );
						params.setISU_DT(		resultList.get(i).get("ISU_DT").toString() );
						params.setISU_SQ(		resultList.get(i).get("ISU_SQ").toString() );
						params.setDIV_CD(		resultList.get(i).get("DIV_CD").toString() );
						params.setDEPT_CD(		resultList.get(i).get("DEPT_CD").toString() );
						params.setEMP_CD(		resultList.get(i).get("EMP_CD").toString() );
						params.setACCT_CD(		resultList.get(i).get("ACCT_CD").toString() );
						params.setDRCR_FG(		resultList.get(i).get("DRCR_FG").toString() );
						params.setACCT_AM(		resultList.get(i).get("ACCT_AM").toString() );
						params.setRMK_NB(		resultList.get(i).get("RMK_NB").toString() );
						params.setRMK_DC(		resultList.get(i).get("RMK_DC").toString() );
						params.setATTR_CD(		resultList.get(i).get("ATTR_CD").toString() );
						params.setTRCD_TY(		resultList.get(i).get("TRCD_TY").toString() );
						params.setTRNM_TY(		resultList.get(i).get("TRNM_TY").toString() );
						params.setDEPTCD_TY(	resultList.get(i).get("DEPTCD_TY").toString() );
						params.setPJTCD_TY(		resultList.get(i).get("PJTCD_TY").toString() );
						params.setCTNB_TY(		resultList.get(i).get("CTNB_TY").toString() );
						params.setFRDT_TY(		resultList.get(i).get("FRDT_TY").toString() );
						params.setTODT_TY(		resultList.get(i).get("TODT_TY").toString() );
						params.setQT_TY(		resultList.get(i).get("QT_TY").toString() );
						params.setAM_TY(		resultList.get(i).get("AM_TY").toString() );
						params.setRT_TY(		resultList.get(i).get("RT_TY").toString() );
						params.setDEAL_TY(		resultList.get(i).get("DEAL_TY").toString() );
						params.setUSER1_TY(		resultList.get(i).get("USER1_TY").toString() );
						params.setUSER2_TY(		resultList.get(i).get("USER2_TY").toString() );
						params.setTR_CD(		resultList.get(i).get("TR_CD").toString() );
						params.setTR_NM(		resultList.get(i).get("TR_NM").toString() );
						params.setCT_DEPT(		resultList.get(i).get("CT_DEPT").toString() );
						params.setDEPT_NM(		resultList.get(i).get("DEPT_NM").toString() );
						params.setPJT_CD(		resultList.get(i).get("PJT_CD").toString() );
						params.setPJT_NM(		resultList.get(i).get("PJT_NM").toString() );
						params.setCT_NB(		resultList.get(i).get("CT_NB").toString() );
						params.setFR_DT(		resultList.get(i).get("FR_DT").toString() );
						params.setTO_DT(		resultList.get(i).get("TO_DT").toString() );
						params.setCT_QT(		resultList.get(i).get("CT_QT").toString() );
						params.setCT_AM(		resultList.get(i).get("CT_AM").toString() );
						params.setCT_RT(		resultList.get(i).get("CT_RT").toString() );
						params.setCT_DEAL(		resultList.get(i).get("CT_DEAL").toString() );
						params.setDEAL_NM(		resultList.get(i).get("DEAL_NM").toString() );
						params.setCT_USER1(		resultList.get(i).get("CT_USER1").toString() );
						params.setUSER1_NM(		resultList.get(i).get("USER1_NM").toString() );
						params.setCT_USER2(		resultList.get(i).get("CT_USER2").toString() );
						params.setUSER2_NM(		resultList.get(i).get("USER2_NM").toString() );
						params.setEXCH_TY(		resultList.get(i).get("EXCH_TY").toString() );
						params.setEXCH_AM(		resultList.get(i).get("EXCH_AM").toString() );
						params.setPAYMENT(		resultList.get(i).get("PAYMENT").toString() );
						params.setISU_NM(		resultList.get(i).get("ISU_NM").toString() );
						params.setENDORS_NM(	resultList.get(i).get("ENDORS_NM").toString() );
						params.setBILL_FG1(		resultList.get(i).get("BILL_FG1").toString() );
						params.setBILL_FG2(		resultList.get(i).get("BILL_FG2").toString() );
						params.setDUMMY1(		resultList.get(i).get("DUMMY1").toString() );
						params.setDUMMY2(		resultList.get(i).get("DUMMY2").toString() );
						params.setDUMMY3(		resultList.get(i).get("DUMMY3").toString() );
						params.setISU_DOC(		resultList.get(i).get("ISU_DOC").toString() );
						params.setJEONJA_YN(	resultList.get(i).get("JEONJA_YN").toString() );
						params.setEX_FG(		resultList.get(i).get("EX_FG").toString() );
						params.setYN(			resultList.get(i).get("YN").toString() );
						
//						params.setINSERT_DT(	resultList.get(i).get("INSERT_DT").toString() );
						
						System.out.println("IN_DT : " + resultList.get(i).get("IN_DT"));
						
						//데이터 확인후 주석 해제
						douzoneDayMsSqlService.insertAccountMsSqlPurch(params);
				 
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		 
	}

}
