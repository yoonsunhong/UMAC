package retail.salesinfo.report.web;

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
import retail.salesinfo.report.service.SalesInfoReportService;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 
 * @Class Name : SalesInfoReportController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.09           최초생성
 *
 * @author 김창열
 * @since 2017. 01. 09.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class SalesInfoReportController {
	@Autowired
	private SalesInfoReportService salesInfoReportPromptService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	
	/************************** 매출속보(시간대별) ***************************/
	//매출속보(시간대별)
	@RequestMapping(value="/salesInfoReportPrompt.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportPrompt() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportPrompt");
		
		return mav;
	}
	
	//매출속보(시간대별) 매출속보 불러오기		
	@RequestMapping(value="/salesInfoReportPromptList.do", method=RequestMethod.POST)
	public void salesInfoReportPromptList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportPromptList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportPromptList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	//매출속보(시간대별) 상품분류별 목표		
	@RequestMapping(value="/salesInfoReportPromptSalesList.do", method=RequestMethod.POST)
	public void salesInfoReportPromptSalesList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{	
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportPromptSalesList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportPromptSalesList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	
	
	
	/************************** 매출실적조회 ***************************/
	//매출실적조회
	@RequestMapping(value="/salesInfoReportYield.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportYield() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportYield");
		
		return mav;
	}
	
	//매출실적조회 매출실적 불러오기
	@RequestMapping(value="/salesInfoReportYieldList.do", method=RequestMethod.POST)
	public void salesInfoReportYieldList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportYieldList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportYieldList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	//매출실적조회 매출실적 상품별 불러오기
	@RequestMapping(value="/salesInfoReportYieldDetailList.do", method=RequestMethod.POST)
	public void salesInfoReportYieldDetailList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportYieldDetailList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportYieldDetailList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
	
	
	
	
	
	/************************** 기간별매출실적 ***************************/	
	//기간별매출실적 매출실적
	@RequestMapping(value="/salesInfoReportTerm.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportTerm() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportTerm");
		
		return mav;
	}
	
	//기간별매출실적 매출실적 조회
	@RequestMapping(value="/salesInfoReportTermList.do", method=RequestMethod.POST)
	public void salesInfoReportTermList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportTermList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportTermList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	

	//기간별매출실적 매출실적 조회
	@RequestMapping(value="/salesInfoReportTermDetailList.do", method=RequestMethod.POST)
	public void salesInfoReportTermDetailList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportTermDetailList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportTermDetailList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}		
	
	
	
	/************************** 월별매출추이분석 ***************************/	
	//월별매출추이분석 매출추이
	@RequestMapping(value="/salesInfoReportMonth.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportMonth() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportMonth");
		
		return mav;
	}
	
	//월별매출추이분석 매출추이 조회
	@RequestMapping(value="/salesInfoReportMonthList.do", method=RequestMethod.POST)
	public void salesInfoReportMonthList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportMonthList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportMonthList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	

	//월별매출추이분석 매출추이 조회
	@RequestMapping(value="/salesInfoReportMonthDetailList.do", method=RequestMethod.POST)
	public void salesInfoReportMonthDetailList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportMonthDetailList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportMonthDetailList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
	
	
	
	/************************** 지불수단별매출현황 ***************************/	
	//지불수단별매출현황 점포별지불수단
	@RequestMapping(value="/salesInfoReportPayment.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportPayment() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportPayment");
		
		return mav;
	}
	
	//지불수단별매출현황 점포별지불수단 조회
	@RequestMapping(value="/salesInfoReportPaymentList.do", method=RequestMethod.POST)
	public void salesInfoReportPaymentList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportPaymentList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportPaymentList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	

	//일자별지불수단
	@RequestMapping(value="/salesInfoReportPaymentDetailList.do", method=RequestMethod.POST)
	public void salesInfoReportPaymentDetailList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportPaymentDetailList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportPaymentDetailList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
	
	
	
	
	/************************** 임대을매출현황 ***************************/
	//임대을매출현황 임대을매출현황
	@RequestMapping(value="/salesInfoReportLease.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportLease() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportLease");
		
		return mav;
	}
	
	//임대을매출현황 임대을매출현황 조회
	@RequestMapping(value="/salesInfoReportLeaseList.do", method=RequestMethod.POST)
	public void salesInfoReportLeaseList(@RequestParam Map<String, Object> param, HttpServletResponse response) throws Exception{
		try{
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportLeaseList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportLeaseList(param);			
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}	
	
	/************************** 일상품수불장조회 ***************************/
	@RequestMapping(value="/salesInfoReportRcvPayDate.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportRcvPayDate()throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportRcvPayDate");
		return mav;
	}
	
	@RequestMapping(value="/salesInfoReportRcvPayDateList.do", method=RequestMethod.POST)
	public void salesInfoReportRcvPayDateList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try{			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportRcvPayDateList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportRcvPayDateList(param);
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/salesInfoReportRcvPayDateDetailList.do", method=RequestMethod.POST)
	public void salesInfoReportRcvPayDateDetailList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try{
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportRcvPayDateDetailList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportRcvPayDateDetailList(param);
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("rext/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/************************** 월상품수불장조회 ***************************/
	@RequestMapping(value="/salesInfoReportRcvPayMonth.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportRcvPayMonth()throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportRcvPayMonth");
		return mav;
	}
	
	@RequestMapping(value="/salesInfoReportRcvPayMonthList.do", method=RequestMethod.POST)
	public void salesInfoReportRcvPayMonthList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try{			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportRcvPayMonthList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportRcvPayMonthList(param);
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/salesInfoReportRcvPayMonthDetailList.do", method=RequestMethod.POST)
	public void salesInfoReportRcvPayMonthDetailList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		try{
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportRcvPayMonthDetailList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportRcvPayMonthDetailList(param);
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("rext/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value="/salesInfoReportRcvPayMonthBatch.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesInfoReportRcvPayMonthBatch(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportRcvPayMonthBatch param :: " + param.toString());
			result = salesInfoReportPromptService.salesInfoReportRcvPayMonthBatch(param);
			
			//log.debug("result :: " + result);
			
			result.put("RETURN_CODE", result.get("RETURN_CODE"));			
			result.put("RETURN_MSG", result.get("RETURN_MSG"));		
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}

	
	/************************** 단품별재고현황 ***************************/
	@RequestMapping(value="/salesInfoReportGIS.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportGoodsInvntrySttus()throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportGIS");
		return mav;
	}
	
	@RequestMapping(value="/salesInfoReportGISList.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesInfoReportGISList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request)throws Exception{
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
			log.debug("SalesInfoGoalController.salesInfoReportGISList param :: " + param.toString());
			
			param = salesInfoReportPromptService.salesInfoReportGISList(param);
						
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			
			result.put("list", jsonList);
			result.put("list2", param.get("CUR2"));
			result.put("totalCount", param.get("TOT_CNT"));		
		}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}	
	
	
	@RequestMapping(value = "/salesInfoReportGISDownload.do", method=RequestMethod.POST)
	public ModelAndView salesInfoReportGISDownload(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			//Map<String, Object> paramMap = new HashMap<String, Object>();
			Map<String, Object>  CUR =  new HashMap<String, Object>();

			paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			paramMap.put("CUR", CUR);
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportGISDownload param :: " + paramMap.toString());
			
			map = salesInfoReportPromptService.salesInfoReportGISDownload(paramMap);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}		
		return mav;
	}		
	
	
	/************************** 배달내역조회 ***************************/
	@RequestMapping(value="/salesInfoReportDlvr.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportDlvr() throws Exception{
		ModelAndView mv = new ModelAndView("retail/salesinfo/report/salesInfoReportDlvr");
		return mv;
	}
	
	@RequestMapping(value="/salesInfoReportDlvrList.do", method=RequestMethod.POST)
	public void salesInfoReportDlvrList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		
		try{
			List<Map<String, Object>> resultList = null;
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			//영업사원일경우
			//if("01".equals(param.get("member_ch")))
			//{
				//param.put("P_USER_NM", param.get("P_USER_NM_01"));
				//param.put("P_EMP_DUTY", param.get("P_USER_ID_01"));
				
				//log.debug("===========================================================================");
				//log.debug("salesInfoReportPromptService.salesInfoReportvrList param :: " + param.toString());
				resultList = salesInfoReportPromptService.salesInfoReportvrList(param);
			/*}
			//배달사원일경우 
			
			else if("02".equals(param.get("member_ch")))
			{
				//param.put("P_USER_NM", param.get("P_USER_NM_02"));
				param.put("P_USER_ID", param.get("P_USER_ID_02"));
				log.debug("======배달=====================================================================");
				log.debug("salesInfoReportPromptService.salesInfoReportDlvrList param :: " + param.toString());
				resultList = salesInfoReportPromptService.salesInfoReportDlvrList(param);
			}*/
			//log.debug("result :: " + resultList.toString());			
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	//배달상세내역
	@RequestMapping(value="/salesInfoReportDlvrDList.do", method=RequestMethod.POST)
	public void salesInfoReportDlvrDList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportDlvrDList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportDlvrDList(param);
			log.debug("result :: " + resultList.size());
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	/************************** 행사상품로그조회 ***************************/
	@RequestMapping(value="/salesInfoReportEGL.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportEGL(){
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportEGL");
		return mav;
	}
	
	@RequestMapping(value="/salesInfoReportEGLList.do", method=RequestMethod.POST)
	public void salesInfoReportEGL_List(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportEGLList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportEGLList(param);
			log.debug("result :: " + resultList.size());
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	/************************** 시간대별매출속보 ***************************/
	@RequestMapping(value="/salesInfoReportNewsFlash.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportNewsFlash(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		log.debug("시간대별매출속보 화면 요청");
		
		ModelAndView mav = new ModelAndView("retail/salesinfo/report/salesInfoReportNewsFlash");
		return mav;
	}
	
	
	@RequestMapping(value="/salesInfoReportNewsFlashList.do", method=RequestMethod.POST)
	public void salesInfoReportNewsFlashList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		try {
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("SalesInfoGoalController.salesInfoReportEGLList param :: " + param.toString());
			List<Map<String, Object>> resultList = salesInfoReportPromptService.salesInfoReportNewsFlashList(param);
			log.debug("result :: " + resultList.size());
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}
}

	











