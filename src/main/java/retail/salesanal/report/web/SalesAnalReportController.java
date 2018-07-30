package retail.salesanal.report.web;

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
import retail.common.EgovStringUtil;
import retail.salesanal.report.service.SalesAnalReportService;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 
 * @Class Name : SalesAnalReportController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.09          			최초생성
 * @ 2017. 09.01		윤태희			면과세매출내역 추가
 *
 * @author 김창열
 * @since 2017. 01. 10.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class SalesAnalReportController {
	@Autowired
	private SalesAnalReportService salesAnalReportService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	
	/************************** Best/Worst 20선 ***************************/
	//best/worst현황
	@RequestMapping(value="/salesAnalReportWorst.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportWorst() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportWorst");
		
		return mav;
	}
	
	//best/worst현황 리스트
	@RequestMapping(value="/salesAnalReportWorstList.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesAnalReportWorstList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportWorstList param :: " + param.toString());
			/*List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportWorstList(param);			
			log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);	*/
			
			param = salesAnalReportService.salesAnalReportWorstList(param);
			//log.debug("result : " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list1", jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	
	
	
	/************************** 단품별매출손익 ***************************/
	//단품별손익현황
	@RequestMapping(value="/salesAnalReportSingle.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportSingle() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportSingle");
		return mav;
	}
	
	//단품별손익현황
	@RequestMapping(value="/salesAnalReportSingleList.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesAnalReportSingleList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportSingleList param :: " + param.toString());
			param = salesAnalReportService.salesAnalReportSingleList(param);			
			//log.debug("result : " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));			
		}catch(Exception e){
			e.printStackTrace();
		}
		return result;		
	}
	
	//단품별손익현황 엑셀다운
	@RequestMapping(value = "/salesAnalReportSingleExcelDownload.do", method=RequestMethod.POST)
	public ModelAndView salesAnalReportSingleExcelDownload(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			//Map<String, Object> paramMap = new HashMap<String, Object>();
			Map<String, Object>  CUR =  new HashMap<String, Object>();

			paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			paramMap.put("CUR", CUR);
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportSingleExcelDownload param :: " + paramMap.toString());
			
			map = salesAnalReportService.salesAnalReportSingleExcelDownload(paramMap);

			//log.debug("SalesAnalReportController.salesAnalReportSingleExcelDownload result :: " + map);
			log.debug("result SIZE:: " + map.size());
			
			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}
		return mav;
	}	
	
	
	/************************** 목표대비달성율 ***************************/
	//영업점별현황
	@RequestMapping(value="/salesAnalReportGoal.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportGoal() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportGoal");
		
		return mav;
	}
	
	//
	@RequestMapping(value="/salesAnalReportGoalList.do", method=RequestMethod.POST)
	public void salesAnalReportGoalList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportGoalList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportGoalList(param);			
			//log.debug("result :: " + resultList);
			
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
	
	//상품분류별실적
	@RequestMapping(value="/salesAnalReportGoalIList.do", method=RequestMethod.POST)
	public void salesAnalReportGoalIList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportGoalIList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportGoalIList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}		
	
	
	
	
	/************************** 재고회전율분석 ***************************/
	//영업점별현황
	@RequestMapping(value="/salesAnalReportRotation.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportRotation() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportRotation");
		
		return mav;
	}
	
	//
	@RequestMapping(value="/salesAnalReportRotationList.do", method=RequestMethod.POST)
	public void salesAnalReportRotationList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportRotationList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportRotationList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	

	//상품분류별실적
	@RequestMapping(value="/salesAnalReportRotationIList.do", method=RequestMethod.POST)
	public void salesAnalReportRotationIList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportRotationIList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportRotationIList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	
	/************************** 상품ABC분석 ***************************/
	//ABC분석
	@RequestMapping(value="/salesAnalReportAbc.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportAbc() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportAbc");
		
		return mav;
	}
	
	//
	@RequestMapping(value="/salesAnalReportAbcList.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesAnalReportAbcList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
			Map<String, Object> result = new HashMap<String, Object>();
			
		try{
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());					
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportAbcList param :: " + param.toString());

			param = salesAnalReportService.salesAnalReportAbcList(param);
			//log.debug("result : " + param.get("CUR").toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			System.out.println(jsonList);
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));			
		}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}	
	
	@RequestMapping(value = "/salesAnalReportAbcDownload.do", method=RequestMethod.POST)
	public ModelAndView salesAnalReportAbcDownload(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			//Map<String, Object> paramMap = new HashMap<String, Object>();
			Map<String, Object>  CUR =  new HashMap<String, Object>();

			paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			paramMap.put("CUR", CUR);
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportAbcDownload param :: " + paramMap.toString());
			
			map = salesAnalReportService.salesAnalReportAbcDownload(paramMap);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}

		return mav;
	}	
	
	
	/************************** 무실적(매출)조회 ***************************/
	//무실적(매출)현황
	@RequestMapping(value="/salesAnalReportNoYield.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportNoYield() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportNoYield");
		
		return mav;
	}
	
	@RequestMapping(value="/salesAnalReportNoYieldList.do", method=RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object> salesAnalReportNoYieldList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{			
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());			
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportNoYieldList param :: " + param.toString());
			param = salesAnalReportService.salesAnalReportNoYieldList(param);
			//log.debug("result : " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));	
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}	
	
	//무실적(매입/대입)현황 엑셀다운
	@RequestMapping(value = "/salesAnalReportNoYieldExcelDownload.do", method=RequestMethod.POST)
	public ModelAndView salesAnalReportNoYieldExcelDownload(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			//Map<String, Object> paramMap = new HashMap<String, Object>();
			Map<String, Object>  CUR =  new HashMap<String, Object>();

			paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			paramMap.put("CUR", CUR);
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportNoYieldExcelDownload param :: " + paramMap.toString());
			
			map = salesAnalReportService.salesAnalReportNoYieldExcelDownload(paramMap);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}

		return mav;
	}
	
	
	
	/************************** 무실적(매입)관리 ***************************/
	//무실적(매입/대입)현황
	@RequestMapping(value="/salesAnalReportNoYieldPurchase.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportNoYieldPurchase() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportNoYieldPurchase");
		
		return mav;
	}
	
	@RequestMapping(value="/salesAnalReportNoYieldPurchaseList.do", method=RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object> salesAnalReportNoYieldPurchaseList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{			
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());			
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportNoYieldPurchaseList param :: " + param.toString());
			param = salesAnalReportService.salesAnalReportNoYieldPurchaseList(param);
			//log.debug("result : " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));	
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	//무실적(매입/대입)현황 일괄중지
	@RequestMapping(value="/salesAnalReportNoYieldPurchaseUpdate.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesAnalReportNoYieldPurchaseUpdate(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{
			param.put("D_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("D_UEMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
						
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportNoYieldPurchaseUpdate param :: " + param.toString());
 			result = salesAnalReportService.salesAnalReportNoYieldPurchaseUpdate(param);			
			//log.debug("result :: " + result);
						
			result.put("RETURN_CODE", result.get("RETURN_CODE"));			
			result.put("RETURN_MSG", result.get("RETURN_MSG"));			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	//무실적(매입/대입)현황 엑셀다운
	@RequestMapping(value = "/salesAnalReportNoYieldPurchaseExcelDownload.do", method=RequestMethod.POST)
	public ModelAndView salesAnalReportNoYieldPurchaseExcelDownload(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			//Map<String, Object> paramMap = new HashMap<String, Object>();
			Map<String, Object>  CUR =  new HashMap<String, Object>();

			paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			paramMap.put("CUR", CUR);
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportNoYieldPurchaseExcelDownload param :: " + paramMap.toString());
			
			map = salesAnalReportService.salesAnalReportNoYieldPurchaseExcelDownload(paramMap);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}

		
		return mav;
	}	
	
	
	/************************** 상품재고조회 ***************************/
	//영업점별현황
	@RequestMapping(value="/salesAnalReportStock.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportStock() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportStock");
		
		return mav;
	}
	
	//영업점별현황 조회
	@RequestMapping(value="/salesAnalReportStockList.do", method=RequestMethod.POST)
	public void salesAnalReportStockList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportStockList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportStockList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
	
	//영업점별현황 조회
	@RequestMapping(value="/salesAnalReportStockDList.do", method=RequestMethod.POST)
	public void salesAnalReportStockDList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportStockDList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportStockDList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}		
	
	
	
	/************************** 주문/접수집계현황 ***************************/
	//주문접수집계
	@RequestMapping(value="/salesAnalReportOrder.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportOrder() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportOrder");
		
		return mav;
	}
	
	//점포별
	@RequestMapping(value="/salesAnalReportOrderList.do", method=RequestMethod.POST)
	public void salesAnalReportOrderList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportOrderList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportOrderList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	//영업사원
	@RequestMapping(value="/salesAnalReportOrderBsnEmplList.do", method=RequestMethod.POST)
	public void salesAnalReportOrderBsnEmplList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportOrderBsnEmplList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportOrderBsnEmplList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	

	//회원그룹
	@RequestMapping(value="/salesAnalReportOrderUserList.do", method=RequestMethod.POST)
	public void salesAnalReportOrderUserList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportOrderUserList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportOrderUserList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	
	
	/************************** 현금영수증적립현황 ***************************/
	//협금영수증발행내역
	@RequestMapping(value="/salesAnalReportCash.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportCash() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportCash");
		
		return mav;
	}
	
	//
	@RequestMapping(value="/salesAnalReportCashList.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesAnalReportCashList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());			
			
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportCashList param :: " + param.toString());
			param = salesAnalReportService.salesAnalReportCashList(param);
			//log.debug("result :: " + param);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	@RequestMapping(value = "/salesAnalReportCashListExcelDownload.do", method=RequestMethod.POST)
	public ModelAndView salesAnalReportCashListExcelDownload(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			//Map<String, Object> paramMap = new HashMap<String, Object>();
			Map<String, Object>  CUR =  new HashMap<String, Object>();

			paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			paramMap.put("CUR", CUR);
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportCashListExcelDownload param :: " + paramMap.toString());
			
			map = salesAnalReportService.salesAnalReportCashListExcelDownload(paramMap);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}

		
		return mav;
	}	
	
	
	
	/************************** 신용카드집계현황 ***************************/
	//신용카드집계
	@RequestMapping(value="/salesAnalReportCard.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportCard() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportCard");
		
		return mav;
	}
	
	//신용카드 카드사별
	@RequestMapping(value="/salesAnalReportCardList.do", method=RequestMethod.POST)
	public void salesAnalReportCardList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportCardList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportCardList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	

	//신용카드 일자별
	@RequestMapping(value="/salesAnalReportCardDList.do", method=RequestMethod.POST)
	public void salesAnalReportCardDList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportCardDList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportCardDList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	

	//거래건별
	@RequestMapping(value="/salesAnalReportCardTList.do", method=RequestMethod.POST)
	public void salesAnalReportCardTList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportCardTList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportCardTList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
	
	
	
	
	/************************** 매출TR조회 ***************************/
	//매출TR
	@RequestMapping(value="/salesAnalReportTr.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportTr() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportTr");
		
		return mav;
	}
	
	//
	/*@RequestMapping(value="/salesAnalReportTrList.do", method=RequestMethod.POST)
	public void salesAnalReportTrList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportTrList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportTrList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}*/	
	@RequestMapping(value="/salesAnalReportTrList.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesAnalReportTrList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());					
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportTrList param :: " + param.toString());
			param = salesAnalReportService.salesAnalReportTrList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));			
		}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}	
	
	@RequestMapping(value ="/salesAnalReportTrListDownload.do",  method = RequestMethod.POST)
	public ModelAndView  salesAnalReportTrListDownload( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportTrListDownload param :: " + param.toString());
			
			map = salesAnalReportService.salesAnalReportTrListDownload(param);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}
		return mav;
	}		

	@RequestMapping(value="/salesAnalReportTrDList.do", method=RequestMethod.POST)
	public void salesAnalReportTrDList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportTrDList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportTrDList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}		
	
	/************************** 분류별 점포별 매출조회 ***************************/
	@RequestMapping(value="/salesAnalReportClStore.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportClStore() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportClStore");
		return mav;
	}
	
	@RequestMapping(value="/salesAnalReportClStoreList.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesAnalReportClStoreList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportTrDList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportClStoreList(param);
			log.debug("resultSize :: " + resultList.size());
			Gson gson = new Gson();
			
			String jsonList = gson.toJson(param.get("CUR"));
//			String jsonList2 = gson.toJson(param.get("CUR2"));
			
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("list", jsonList);
			result.put("list2", param.get("CUR2"));	
			System.out.println(result.toString());
		return result;
	}
	
	/************************** 재고결과현황(분류) ***************************/
	@RequestMapping(value="/salesAnalReportInvntrySttus.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportInventoryStatus() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportInvntrySttus");
		return mav;
	}
	
	/*재고결과현황(분류) - 조회 */
	@RequestMapping(value="/salesAnalReportInvntrySttusList.do", method=RequestMethod.POST)
	public void salesAnalReportInventoryStatusList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception {
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportInvntrySttusList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportInvntrySttusList(param);
			log.debug("resultSize :: " + resultList.size());
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/*재고결과현황(분류) - 엑셀다운로드 */
	@RequestMapping(value ="/salesAnalReportInvntrySttusListExcel.do",  method = RequestMethod.POST)
	public ModelAndView salesAnalReportInventoryStatusListExcel(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response)throws Exception { 
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("salesAnalReportService.salesAnalReportInvntrySttusListExcel param :: " + param.toString());
			
			map = salesAnalReportService.salesAnalReportInvntrySttusListExcel(param);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");
		}catch(Exception e){
			e.printStackTrace();
		}
		return mav;
	}
	

	
	@RequestMapping(value = "/selectSalesAnalReportTrPay.do", method = RequestMethod.POST)
	public void selectSalesAnalReportTrPay(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		paramMap.put("P_SALE_DT", request.getParameter("P_SALE_DT"));
		paramMap.put("P_POS_NO", request.getParameter("P_POS_NO"));
		paramMap.put("P_TRXN_NO", request.getParameter("P_TRXN_NO"));
		paramMap.put("CUR", CUR);
		
		salesAnalReportService.selectSalesAnalReportTrPay(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	/**
	 *  상품 목록 조회(분류).    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesAnalProductList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  salesAnalProductList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("P_CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ; 
		param.put("P_STR_CODE"    	, request.getParameter("P_STR_CODE" )  ) ;   
		param.put("P_CLS_CODE"      , request.getParameter("P_CLS_CODE" )  ) ;  
		param.put("P_SCAN_CODE"    	, request.getParameter("P_SCAN_CODE"  )  ) ;  
		param.put("P_INV_MT"    	, request.getParameter("P_INV_MT"  )  ) ;   
		
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = salesAnalReportService.salesAnalProductList(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/**
	 *  상품 목록 조회(경리).    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesAnalProductList_kungri.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  salesAnalProductList_kungri( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("P_CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ; 
		param.put("P_STR_CODE"    	, request.getParameter("P_STR_CODE" )  ) ;   
		param.put("P_CLS_CODE"      , request.getParameter("P_CLS_CODE" )  ) ;  
		param.put("P_SCAN_CODE"    	, request.getParameter("P_SCAN_CODE"  )  ) ;  
		param.put("P_INV_MT"    	, request.getParameter("P_INV_MT"  )  ) ;   
		
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = salesAnalReportService.salesAnalProductList_kungri(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
  
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	/************************** 면과세매출내역 ***************************/
	@RequestMapping(value="/salesAnalReportTaxHistory.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportTaxHistory() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportTaxHistory");
		return mav;
	}
	/************************** 재고결과현황(경리평균) ***************************/
	@RequestMapping(value="salesAnalReportSttusAccount.do", method=RequestMethod.GET)
	public ModelAndView salesAnalReportInventoryStatusAccount() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesanal/report/salesAnalReportInvntrySttusAccount");
		return mav;
	}
	/**
	 *  면과세매출내역 조회.    
	 * @param Map
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesAnalReportTaxHistoryList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesAnalReportTaxHistoryList(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = salesAnalReportService.salesAnalReportTaxHistoryList(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			
			result.put("list", jsonList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 *  면과세매출내역 엑셀.    
	 * @param Map
	 * @return "mav"
	 * @exception Exception
	 */
	/*@RequestMapping(value ="/salesAnalReportTaxHistoryListExcel.do",  method = RequestMethod.POST)
	public ModelAndView  salesAnalReportTaxHistoryListExcel( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportTaxHistoryListExcel param :: " + param.toString());
			
			map = salesAnalReportService.salesAnalReportTaxHistoryListExcel(param);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}
		return mav;
	}	*/
	
	@RequestMapping(value="/salesAnalReportInvntrySttusListAccount.do", method=RequestMethod.POST)
	public void salesAnalReportInvntrySttusListAccount(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception {
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesAnalReportController.salesAnalReportInvntrySttusList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesAnalReportService.salesAnalReportInvntrySttusListAccount(param);
																		  
			log.debug("resultSize :: " + resultList.size());
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 면과세매출내역 엑셀다운 
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesAnalReportTaxHistoryListExcel.do", method = RequestMethod.POST)
	public ModelAndView salesAnalReportTaxHistoryListExcel(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		List<Map<String, Object>> result = null;
		
		try {
			
			log.debug("param :: " + param.toString());
			result = salesAnalReportService.salesAnalReportTaxHistoryListExcel(param);
			log.debug("result :: " + result.toString());
			
			mav.addObject("excelList", result);
			mav.setViewName("retail/salesanal/report/salesAnalReportTaxHistoryExcel");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return mav;
	}
	
	
}


