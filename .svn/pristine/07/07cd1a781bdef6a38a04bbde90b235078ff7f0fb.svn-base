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
import retail.member.report.service.MemberSalesCategoryService;

import com.google.gson.Gson;

@Controller
public class MemberSalesCategoryController {

	
	@Autowired
	private MemberSalesCategoryService memberSalesCategoryService;
	
	

	/**
	 * 분류별회원매출조회
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/memberSalesCategory.do", method = RequestMethod.GET)
	public ModelAndView memberSalesCategory(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/member/report/memberSalesCategory");
		return   mav; 
	}
	@RequestMapping(value="/memberSalesCategoryHdrList.do", method=RequestMethod.POST)
	public void memberSalesCategoryHdrList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			
			
			List<Map<String, Object>> resultList = memberSalesCategoryService.memberSalesCategoryHdrList(param);
			
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	@RequestMapping(value="/memberSalesCategoryDtlList.do", method=RequestMethod.POST)
	public void memberSalesCategoryDtlList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			List<Map<String, Object>> resultList = memberSalesCategoryService.memberSalesCategoryDtlList(param);
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}

}
