package retail.member.sales.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.common.CommonUtil;
import retail.member.sales.service.MemberSalesStateService;

import com.google.gson.Gson;

/**
 * 회원매출상세내역
 * @author 문희훈
 * @since 2017. 01.17
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class MemberSalesStateController {

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private MemberSalesStateService mSSServcie;
	
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/memberSalesState.do", method = RequestMethod.GET)
	public ModelAndView memberSalesState(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/member/sales/memberSalesState"); 
		return   mav; 
	}
	
	/**
	 * 회원매출상세내역 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/memberSalesStateList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  memberSalesStateList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_SALE_SD", ((String)param.get("P_SALE_SD")).replaceAll("-",""));
		param.put("P_SALE_ED", ((String)param.get("P_SALE_ED")).replaceAll("-",""));
		param.put("CUR", CUR);
		
		List<Map<String, Object>> resultList = mSSServcie.memberSalesStateList(param);
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(resultList);
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 회원매출상세출력 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/memberSalesStatePrint.do", method = RequestMethod.GET)
	public ModelAndView memberSalesStatePrint(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/member/sales/memberSalesStatePrint"); 
		return   mav; 
	}
	
	/**
	 * 회원매출상세내역 조회(HDR)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/memberSalesStateHdrList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  memberSalesStateHdrList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_SALE_SD", ((String)param.get("P_SALE_SD")).replaceAll("-",""));
		param.put("P_SALE_ED", ((String)param.get("P_SALE_ED")).replaceAll("-",""));
		param.put("CUR", CUR);
		
		List<Map<String, Object>> resultList = mSSServcie.memberSalesStateHdrList(param);
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(resultList);
		
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 * 회원매출상세내역 조회(DTL)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/memberSalesStateDtlList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  memberSalesStateDtlList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		
		ArrayList<Object> CUR = new ArrayList<Object>();  
		
		paramMap.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SALE_DT", ((String)param.get("SALE_DT")).replaceAll("-",""));
		paramMap.put("P_STR_CODE", ((String)param.get("STR_CODE")));
		paramMap.put("P_POS_NO", ((String)param.get("POS_NO")));
		paramMap.put("P_TRXN_NO", ((String)param.get("TRXN_NO")));
		paramMap.put("CUR", CUR); 
		
		List<Map<String, Object>> resultList = mSSServcie.memberSalesStateDtlList(paramMap);
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
}
