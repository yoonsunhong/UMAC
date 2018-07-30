package retail.member.report.web;

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

import retail.common.CommonUtil;
import retail.member.report.service.MemberSalesMonthStateService;

import com.google.gson.Gson;

@Controller
public class MemberSalesMonthStateController {
	
	@Autowired
	private MemberSalesMonthStateService memberSalesMonthStateService;
	
	/**
	 * 월별회원매출조회
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberSalesMonthState.do", method = RequestMethod.GET)
	public ModelAndView memberSalesMonthState(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/member/report/memberSalesMonthState");
		return   mav; 
	}
	@RequestMapping(value="/memberSalesMonthStateList.do", method=RequestMethod.POST)
	public void memberSalesMonthStateList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			List<Map<String, Object>> resultList = memberSalesMonthStateService.memberSalesMonthStateList(param);
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
