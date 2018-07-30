package retail.business.orderdelivery.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.business.orderdelivery.service.BusinessOrderDeliveryService;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;


/**
 * @Class Name : BusinessOrderDeliveryController.java
 * @Description : 주문배달관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 02.09
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessOrderDeliveryController {
	
	@Autowired
	private BusinessOrderDeliveryService bodService;

	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/businessOrderDelivery.do", method = RequestMethod.GET)
	public ModelAndView businessOrderDelivery(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/orderdelivery/businessOrderDelivery"); 
		 
		return   mav; 
	}
	
	@RequestMapping(value = "/selectCallOrderPay.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> selectCallOrderPay(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		/** pageing setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
		paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
		paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
		
		System.out.println(param.toString());
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
		param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
		
		bodService.selectCallOrderPay(param);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		
		result.put("list", jsonList);
		result.put("totalCount", param.get("TOT_CNT"));
		result.put("totalAmt", param.get("TOT_AMT"));
		
		return result;
		
	}
	
	@RequestMapping(value = "/excelCallOrderPay.do", method = RequestMethod.POST)
	public ModelAndView excelCallOrderPay(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		map = bodService.excelCallOrderPay(param);
		
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
		
		return mav;
		
	}
	
	@RequestMapping(value = "/selectCallOrderPayRegist.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectCallOrderPayRegist(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();		
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_ORD_STAT"    , request.getParameter("P_ORD_STAT" ) ) ;
		paramMap.put("P_FISH_DT"    , request.getParameter("P_FISH_DT" ) ) ;
		paramMap.put("GRID_XML_DATA"    , request.getParameter("gridXmlData" ) ) ;
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		bodService.selectCallOrderPayRegist(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	@RequestMapping(value = "/selectCallOrderDetail.do", method = RequestMethod.POST)
	@ResponseBody
	public void selectCallOrderDetail(HttpServletRequest request, HttpServletResponse response ) throws Exception { 
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		paramMap.put("P_SALE_DT", request.getParameter("P_SALE_DT"));
		paramMap.put("P_POS_NO", request.getParameter("P_POS_NO"));
		paramMap.put("P_TRXN_NO", request.getParameter("P_TRXN_NO"));
		paramMap.put("CUR", CUR);
		
		bodService.selectCallOrderDetail(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	/**
	 * 배달사원가져오기
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value="/getOrderEmp.do", method=RequestMethod.POST)
	public void getDpotFlag(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		List<Map<String, Object>> resultList = bodService.getOrderEmp(param);
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(resultList);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonList);
	}		
}
