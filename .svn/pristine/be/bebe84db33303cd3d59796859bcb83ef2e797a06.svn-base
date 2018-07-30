package retail.posclosed.report.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.common.CommonUtil;
import retail.posclosed.report.service.CreditDpotDtlStateService;

@Controller
public class CreditDpotDtlStateController {

	
	@Autowired
	private CreditDpotDtlStateService ceditDpotDtlStateService;
	
	
	/**
	 * 외상입금상세내역 화면
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/creditDpotDtlState.do", method = RequestMethod.GET)
	public ModelAndView creditDpotDtlState(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		mav.setViewName("retail/posclosed/report/creditDpotDtlState");
		
		return mav; 
	}
	/**
	 * 외상입금상세내역 화면조회
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value="/creditDpotDtlSelect.do", method=RequestMethod.POST)
	public void creditDpotDtlSelect(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		
			List<Map<String, Object>> resultList = ceditDpotDtlStateService.creditDpotDtlSelect(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
	}	
	
	
	/**
	 * 외상입금상세내역 입금방법 셀렉트박스 조회
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value="/getDpotFlag.do", method=RequestMethod.POST)
	public void getDpotFlag(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		List<Map<String, Object>> resultList = ceditDpotDtlStateService.getDpotFlag(param);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
	}	
	
	
}
