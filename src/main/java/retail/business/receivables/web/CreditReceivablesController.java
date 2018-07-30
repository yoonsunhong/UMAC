package retail.business.receivables.web;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.business.receivables.service.CreditReceivablesService;
import retail.common.CommonUtil;

import com.google.gson.Gson;


/**
 * @Class Name : CreditReceivablesController.java
 * @Description : 외상매출미수채권
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 문희훈
 * @since 2017. 04.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class CreditReceivablesController {
	
	@Autowired
	private CreditReceivablesService cRServcie;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/creditReceivables.do", method = RequestMethod.GET)
	public ModelAndView creditReceivables(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/receivables/creditReceivables"); 
		return   mav; 
	}
	
	/**
	 * 외상매출미수채권 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/creditReceivablesList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  creditReceivablesList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		
		param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
//		param.put("P_WORK_EXEC_DT", ((String)param.get("P_WORK_EXEC_DT")).replaceAll("-",""));
		param.put("CUR", CUR); 
		 
		cRServcie.creditReceivablesList(param);
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
}
