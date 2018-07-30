package retail.business.callorder.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.business.callorder.service.BusinessCallOrderService;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Class Name : BusinessCallOrderController.java
 * @Description : 주문서관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 02.03
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessCallOrderController {
	
	@Autowired
	private BusinessCallOrderService bcoService;
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessCallOrder.do", method = RequestMethod.GET)
	public ModelAndView businessCallOrder(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/callorder/businessCallOrder"); 
		 
		return   mav; 
	}
	
	
	@RequestMapping(value = "/selectCallOrder.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> selectCallOrder(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		param.put("P_ORD_DT_START", request.getParameter("ORD_DT_START"));
		param.put("P_ORD_DT_END", request.getParameter("ORD_DT_END"));
		param.put("P_ORD_STAT", request.getParameter("P_ORD_STAT"));
		param.put("P_CUST_NO", request.getParameter("P_CUST_NO"));
		
		bcoService.selectCallOrder(param);
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		
		result.put("list", jsonList);
		result.put("totalCount", "0");
		
		return result;
		
	}
	
	@RequestMapping(value = "/registCallOrder.do", method = RequestMethod.POST)
	@ResponseBody
	public void registCallOrder(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("GRID_XML_DATA", request.getParameter("GRID_XML_DATA"));
		paramMap.put("P_ORD_STAT", request.getParameter("P_ORD_STAT"));
		paramMap.put("P_FISH_DT", request.getParameter("P_FISH_DT"));
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		
		bcoService.registCallOrder(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
		
	}
	
	@RequestMapping(value = "/excelCallOrder.do", method = RequestMethod.POST)
	public ModelAndView excelCallOrder(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE", (String) param.get("P_STR_CODE"));
		param.put("P_ORD_DT_START", (String) param.get("ORD_DT_START"));
		param.put("P_ORD_DT_END", (String) param.get("ORD_DT_END"));
		param.put("P_ORD_STAT", (String) param.get("P_ORD_STAT"));
		param.put("P_CUST_NO", (String)param.get("P_CUST_NO"));
		
		System.out.println("엑셀다운로드 고객번호 : " + (String)param.get("P_CUST_NO"));
		
		map = bcoService.excelCallOrder(param);
		
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
		
		return mav;
		
	}

}
