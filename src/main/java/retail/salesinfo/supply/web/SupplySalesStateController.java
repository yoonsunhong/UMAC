package retail.salesinfo.supply.web;

import java.util.HashMap;
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
import retail.salesinfo.supply.service.SupplySalesStateService;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 
 * @Class Name : SupplySalesStateController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 04.26           최초생성
 *
 * @author 문희훈
 * @since 2017. 04. 26.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class SupplySalesStateController {
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	//협력업체매출현황
	@RequestMapping(value="/supplySalesState.do", method=RequestMethod.GET)
	public ModelAndView salesInfoReportPrompt() throws Exception{
		ModelAndView mav = new ModelAndView("retail/salesinfo/supply/supplySalesState");
		
		return mav;
	}
	
	@Autowired
	private SupplySalesStateService supplySalesServcie;
	
		
	/**
	 * WMS > 출고현황조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	/*@RequestMapping(value ="/supplySalesStateList.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  salesTrHdrList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();  
		param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_SALES_SD", ((String)param.get("P_SALES_SD")).replaceAll("-",""));
		param.put("P_SALES_ED", ((String)param.get("P_SALES_ED")).replaceAll("-",""));
		param.put("CUR", CUR);
		supplySalesServcie.supplySalesStateList(param);
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		System.out.println(param.toString());
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}*/
	
	@RequestMapping(value ="/supplySalesStateList.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesTrHdrList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
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
			
			param.put("P_SALES_SD", ((String)param.get("P_SALES_SD")).replaceAll("-",""));
			param.put("P_SALES_ED", ((String)param.get("P_SALES_ED")).replaceAll("-",""));
			
			log.debug("===========================================================================");
			log.debug("SupplySaleStateController.supplySalesStateList param :: " + param.toString());	
			
			param = supplySalesServcie.supplySalesStateList(param);
			//log.debug("result : " + param.get("CUR").toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			String jsonList2 = gson.toJson(param.get("CUR2"));
			
			result.put("list", jsonList);
			result.put("list2", jsonList2);
							
		}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}
	
	
	@RequestMapping(value ="/supplySalesStateDtList.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesTrDtList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		Map<String, Object> result = new HashMap<String, Object>();
		
		try{
			/** pageing setting */
//			PaginationInfo paginationInfo = new PaginationInfo();
//			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
//			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
//			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
//			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
//			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());					
			
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			param.put("P_SALES_SD", ((String)param.get("P_SALES_SD")).replaceAll("-",""));
			param.put("P_SALES_ED", ((String)param.get("P_SALES_ED")).replaceAll("-",""));
			
			log.debug("===========================================================================");
			log.debug("SupplySaleStateController.supplySalesStateDtList param :: " + param.toString());	
			
			param = supplySalesServcie.supplySalesStateDtList(param);
			//log.debug("result : " + param.get("CUR").toString());
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			String jsonList2 = gson.toJson(param.get("CUR2"));
			
			result.put("list", jsonList);
			result.put("list2", jsonList2);
							
		}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}
	
	
	@RequestMapping(value ="/supplySalesStateListDownload.do",  method = RequestMethod.POST)
	public ModelAndView  supplySalesStateListDownload( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			//Map<String, Object> paramMap = new HashMap<String, Object>();
			Map<String, Object>  CUR =  new HashMap<String, Object>();
			
			param.put("P_SALES_SD", ((String)param.get("P_SALES_SD")).replaceAll("-",""));
			param.put("P_SALES_ED", ((String)param.get("P_SALES_ED")).replaceAll("-",""));			

			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("CUR", CUR);
			
			log.debug("===========================================================================");
			log.debug("SupplySaleStateController.supplySalesStateListDownload param :: " + param.toString());
			
			map = supplySalesServcie.supplySalesStateListDownload(param);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}
		return mav;
	}	
	
	
}














