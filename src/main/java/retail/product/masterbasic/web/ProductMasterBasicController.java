package retail.product.masterbasic.web;

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

import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.product.masterbasic.service.ProductMasterBasicService;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Class Name : GroupGridTestController.java
 * @Description : 기본상품마스터조회
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 04.03 
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class ProductMasterBasicController {
	
	@Autowired
	private ProductMasterBasicService pmbService;
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/productMasterBasic.do", method = RequestMethod.GET)
	public ModelAndView productStore(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/product/masterbasic/productMasterBasic"); 
		 
		return   mav; 
	}
	
	@RequestMapping(value = "/selectProductMasterBasic.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> selectProductMasterBasic(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		/** pageing setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
		paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 25));	// 한 페이지당 게시되는 게시물 건 수
		paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		param.put("P_VEN_CODE", request.getParameter("P_VEN_CODE"));
		param.put("P_GRE_GB", request.getParameter("P_GRE_GB"));
		param.put("P_MBR_DC_YN", request.getParameter("P_MBR_DC_YN"));
		param.put("P_ROUTE_GB", request.getParameter("P_ROUTE_GB"));
		param.put("P_LRG_CODE", request.getParameter("P_LRG_CODE"));
		param.put("P_MID_CODE", request.getParameter("P_MID_CODE"));
		param.put("P_CLS_CODE", request.getParameter("P_CLS_CODE"));
		param.put("P_ITM_CODE", request.getParameter("P_ITM_CODE"));
		param.put("P_ITM_NAME", request.getParameter("P_ITM_NAME"));
		param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
		param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
		
		pmbService.selectProductMasterBasic(param);
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		
		result.put("list", jsonList);
		result.put("totalCount", param.get("TOT_CNT"));
		
		return result;
		
	}
	
	
	@RequestMapping(value = "/excelProductMasterBasic.do", method = RequestMethod.POST)
	public ModelAndView excelProductMasterBasic(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE", (String) param.get("P_STR_CODE"));
		param.put("P_VEN_CODE", (String) param.get("P_VEN_CODE"));
		param.put("P_GRE_GB", (String) param.get("P_GRE_GB"));
		param.put("P_MBR_DC_YN", (String) param.get("P_MBR_DC_YN"));
		param.put("P_ROUTE_GB", (String) param.get("P_ROUTE_GB"));
		param.put("P_LRG_CODE", (String) param.get("P_LRG_CODE"));
		param.put("P_ITM_CODE", (String) param.get("P_ITM_CODE"));

		param.put("P_ITM_NAME", (String) param.get("P_ITM_NAME"));
		
		map = pmbService.excelProductMasterBasic(param);
		
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
		
		return mav;
		
	}

}
