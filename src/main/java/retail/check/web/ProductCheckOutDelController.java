package retail.check.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

import retail.check.service.ProductCheckInOutDelService;
import retail.common.CommonUtil;
import retail.order.store.service.OrderStoreExcelVO;
 
/**
 * @Class Name : ProductCheckOutDelController.java
 * @Description : 점간대출 삭제
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 권용욱
 * @since 2017. 04.13
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class ProductCheckOutDelController {
	
	@Autowired
	private ProductCheckInOutDelService pcioService;
	
	/**
	 * 초기 화면 로드
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/productCheckOutDel.do", method = RequestMethod.GET)
	public ModelAndView productCheckOut(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/check/out/productCheckOutDel"); 
		 
		return   mav; 
	}
	
	/**
	 * 점대출 목록 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectProductCheckOutDel.do", method = RequestMethod.POST)
	public void selectProductCheckOutDel(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		paramMap.put("P_DIN_STR_CODE", request.getParameter("P_DIN_STR_CODE"));
		paramMap.put("P_DOUT_STR_DT", request.getParameter("P_DOUT_STR_DT"));
		paramMap.put("P_DOUT_END_DT", request.getParameter("P_DOUT_END_DT"));
		paramMap.put("P_CFM_YN", request.getParameter("P_CFM_YN"));
		paramMap.put("CUR", CUR);
		
		pcioService.selectProductCheckOutDel(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
 
	
	/**
	 * 점간 대출입  삭제 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCheckOutDelete.do", method = RequestMethod.POST)
	@ResponseBody
	public   void productCheckOutDelete(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
//		Date d = new Date();    
//		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
         
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;   
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;   
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		    
		List<Map<String, Object>> resultList = pcioService.productCheckOutDelete(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	
	/**
	 * 점대출 상세 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectProductCheckOutDtlDel.do", method = RequestMethod.POST)
	public void selectProductCheckOutDtlDel(HttpServletRequest request, HttpServletResponse response )throws Exception {
		
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		paramMap.put("P_SLIP_NO", request.getParameter("P_SLIP_NO"));
		paramMap.put("P_DOUT_DT", request.getParameter("P_DOUT_DT"));
		paramMap.put("CUR", CUR);
		
		pcioService.selectProductCheckOutDtlDel(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	

	/**
	 * 점간 대출   확정  취소  
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/productCheckOutCancel.do", method = RequestMethod.POST)
	@ResponseBody
	public   void productCheckOutCancel(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
 
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
        
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;   
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;  
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		   
		
		List<Map<String, Object>> resultList = pcioService.productCheckOutCancel(param);
		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	
//	/**
//	 * 점대출 목록 저장
//	 * @param request
//	 * @param response
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/registProductCheckOut.do", method = RequestMethod.POST)
//	public void registProductCheckOut(HttpServletRequest request, HttpServletResponse response )throws Exception {
//		
//		Map<String, Object>  paramMap = new HashMap<String, Object>();
//		ArrayList<Object> CUR = new ArrayList<Object>();
//		
//		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
//		paramMap.put("P_SLIP_NO", request.getParameter("P_SLIP_NO"));
//		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
//		paramMap.put("P_DIN_STR_CODE", request.getParameter("P_DIN_STR_CODE"));
//		paramMap.put("P_REMARK", request.getParameter("P_REMARK"));
//		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
//		paramMap.put("GRID_XML_DATA", request.getParameter("GRID_XML_DATA"));
//		paramMap.put("CUR", CUR);
//		
//		pcioService.registProductCheckOut(paramMap);
//		
//		Gson gson = new Gson(); 
//		String jsonStr = gson.toJson(paramMap.get("CUR"));
//		
//		System.out.println(jsonStr);
//		response.setContentType("text/json; charset=utf-8");
//		response.getWriter().print(jsonStr);
//		 
//	}
 	
	
 
//	/**
//	 * 점대출 목록 확정
//	 * @param request
//	 * @param response
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/determineProductCheckOut.do", method = RequestMethod.POST)
//	public void determineProductCheckOut(HttpServletRequest request, HttpServletResponse response )throws Exception {
//		
//		Map<String, Object>  paramMap = new HashMap<String, Object>();
//		ArrayList<Object> CUR = new ArrayList<Object>();
//		
//		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
//		paramMap.put("GRID_XML_DATA", request.getParameter("GRID_XML_DATA"));
//		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
//		paramMap.put("CUR", CUR);
//		
//		pcioService.determineProductCheckOut(paramMap);
//		
//		Gson gson = new Gson(); 
//		String jsonStr = gson.toJson(paramMap.get("CUR"));
//		
//		System.out.println(jsonStr);
//		response.setContentType("text/json; charset=utf-8");
//		response.getWriter().print(jsonStr);
//		 
//	}
	

}
