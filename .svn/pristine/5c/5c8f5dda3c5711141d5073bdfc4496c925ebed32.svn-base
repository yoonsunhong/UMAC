package retail.business.daysales.web;

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
import org.springframework.web.servlet.ModelAndView;

import retail.business.daysales.service.DaySalesSettlementService;
import retail.common.CommonUtil;

import com.google.gson.Gson;

/**
 * @Class Name : DaySalesSettlementController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.05           최초생성
 *
 * @author 문희훈
 * @since 2017. 5. 10.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class DaySalesSettlementController {
	
	@Autowired
	private DaySalesSettlementService dSSService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	@RequestMapping(value="/daySalesSettlement.do", method=RequestMethod.GET)
	public ModelAndView businessDocMember() throws Exception{
		ModelAndView mv = new ModelAndView("retail/business/daysales/daySalesSettlement");
		return mv;
	}
	
	/*
	 * 매출합계 그리드 조회 grid1
	 */
	@RequestMapping(value="/daySalesSettlementList.do", method=RequestMethod.POST)
	public void businessDocMemberList(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_BUSI_DT", ((String) param.get("P_BUSI_DT")).replaceAll("-", ""));
			List<Map<String, Object>> resultList = dSSService.daySalesSettlementList(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
	}
	
	/*
	 * 외상매출입금 그리드 조회 grid2
	 */
	@RequestMapping(value="/daySalesSettlementList2.do", method=RequestMethod.POST)
	public void businessDocMemberList2(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_BUSI_DT", ((String) param.get("P_BUSI_DT")).replaceAll("-", ""));
		List<Map<String, Object>> resultList = dSSService.daySalesSettlementList2(param);
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
	}
	
	/*
	 * POS별매출집계 그리드 조회 grid3
	 */
	@RequestMapping(value="/daySalesSettlementList3.do", method=RequestMethod.POST)
	public void businessDocMemberList3(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_BUSI_DT", ((String) param.get("P_BUSI_DT")).replaceAll("-", ""));
		List<Map<String, Object>> resultList = dSSService.daySalesSettlementList3(param);
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
	}
	
	/*
	 * 외상매출입금 팝업 그리드 조회 grid4
	 */
	@RequestMapping(value="/daySalesSettlementList4.do", method=RequestMethod.POST)
	public void businessDocMemberList4(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_BUSI_DT", ((String) param.get("P_BUSI_DT")).replaceAll("-", ""));
		List<Map<String, Object>> resultList = dSSService.daySalesSettlementList4(param);
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
	}
	
	/*
	 * 외상매출발생 팝업 그리드 조회 grid5
	 */
	@RequestMapping(value="/daySalesSettlementList5.do", method=RequestMethod.POST)
	public void businessDocMemberList5(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_BUSI_DT", ((String) param.get("P_BUSI_DT")).replaceAll("-", ""));
		List<Map<String, Object>> resultList = dSSService.daySalesSettlementList5(param);
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
	}

}
