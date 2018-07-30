package retail.business.promotionlist.web;

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

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.business.promotionlist.service.PromotionStrItmListService;
import retail.business.promotionlist.service.PromotionStrItmListVO;
import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.product.customer.service.ProductCustomerVO;


/**
 * @Class Name : PromotionStrItmListController.java
 * @Description : 프로모션점상품내역조회
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 이성진
 * @since 2017. 03.06
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class PromotionStrItmListController {
	
	@Autowired
	private PromotionStrItmListService pssService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/promotionStrItmList.do", method = RequestMethod.GET)
	public ModelAndView promotionStrItmList(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/business/promotionlist/promotionStrItmList"); 
		 
		return   mav; 
	}
	
	/**
	 * 프로모션 점상품내역조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/promotionStoreItemSearch.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> promotionStoreItemSearch(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {

		Map<String, Object> result = new HashMap<String, Object>();
		
		/** pageing setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
		paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
		paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE",   request.getParameter("S_STR_CODE"));
		param.put("P_EVT_TP",     request.getParameter("S_EVT_TP"));
		param.put("P_EVT_STR_DT", request.getParameter("S_EVT_STR_DT"));
		param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
		param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
		System.out.println("PromotionStrItmListController");		
		System.out.println("param ::: "+param);	
		
		pssService.promotionStoreItemSearch(param);
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		
		result.put("list", jsonList);
		result.put("totalCount", param.get("TOT_CNT"));
		
		return result;
		
	}

	
	
	
}
