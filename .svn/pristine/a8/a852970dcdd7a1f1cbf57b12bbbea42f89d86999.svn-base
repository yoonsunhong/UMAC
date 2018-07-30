package retail.member.receivables;

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
import retail.member.receivables.service.CustReceivablesLedgerService;

import com.google.gson.Gson;

@Controller
public class CustReceivablesLedgerController {

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private CustReceivablesLedgerService cRLServcie;
	
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/custReceivablesLedger.do", method = RequestMethod.GET)
	public ModelAndView custReceivablesLedger(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/member/receivables/custReceivablesLedger"); 
		return   mav; 
	}
	
	/**
	 * 고객미수원장 조회(HDR)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/custReceivablesLedgerHdrList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  custReceivablesLedgerHdrList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("CUR", CUR);
		System.out.println(param.toString());
		List<Map<String, Object>> resultList = cRLServcie.custReceivablesLedgerHdrList(param);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
		 
	}
	/**
	 * 고객미수원장 조회(DTL)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/custReceivablesLedgerDtlList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  custReceivablesLedgerDtlList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		System.out.println(param.toString());
		ArrayList<Object> CUR = new ArrayList<Object>();  
		paramMap.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SALE_SD", ((String)param.get("P_SALE_SD")).replaceAll("-",""));
		paramMap.put("P_SALE_ED", ((String)param.get("P_SALE_ED")).replaceAll("-",""));
		paramMap.put("P_STR_CODE", ((String)param.get("STR_CODE")));
		paramMap.put("P_CUST_NO", ((String)param.get("CUST_NO")));
		paramMap.put("CUR", CUR); 
		System.out.println(paramMap.toString());
		List<Map<String, Object>> resultList = cRLServcie.custReceivablesLedgerDtlList(paramMap);
		System.out.println(resultList);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
	}
	/**
	 * 고객미수원장 조회(팝업:외상매출발생)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/custReceivablesLedgerSalesPop.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  custReceivablesLedgerSalesPop( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();  
		paramMap.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SALE_DT", ((String)param.get("SALE_DT")).replaceAll("-",""));
		paramMap.put("P_STR_CODE", ((String)param.get("STR_CODE")));
		paramMap.put("P_CUST_NO", ((String)param.get("CUST_NO")));
		paramMap.put("CUR", CUR); 
		System.out.println(paramMap.toString());
		List<Map<String, Object>> resultList = cRLServcie.custReceivablesLedgerSalesPop(paramMap);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		System.out.println(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
	}
	/**
	 * 고객미수원장 조회(팝업:외상매출입금)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/custReceivablesLedgerDpotPop.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  custReceivablesLedgerDpotPop( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		
		ArrayList<Object> CUR = new ArrayList<Object>();  
		paramMap.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_SALE_DT", ((String)param.get("SALE_DT")).replaceAll("-",""));
		paramMap.put("P_STR_CODE", ((String)param.get("STR_CODE")));
		paramMap.put("P_CUST_NO", ((String)param.get("CUST_NO")));
		paramMap.put("CUR", CUR); 
		System.out.println(paramMap.toString());
		List<Map<String, Object>> resultList = cRLServcie.custReceivablesLedgerDpotPop(paramMap);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		System.out.println(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
		
	}
}

