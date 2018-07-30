package retail.product.reservation.web;

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

import retail.common.CommonUtil;
import retail.order.store.service.OrderStoreExcelVO;
import retail.product.reservation.service.ChangeReservationPriceService;

import com.google.gson.Gson;

/**
 * 예약매가변경
 * @author 권용욱
 * @since 2017. 06.09
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class ChangeReservationPriceController {
	
	@Autowired
	private ChangeReservationPriceService crpService;
	
	/**
	 * 예약매가변경
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/changeReservationPrice.do", method = RequestMethod.GET)
	public ModelAndView changeReservationPrice(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/product/reservation/changeReservationPrice"); 
		return   mav; 
	}
	
	/**
	 * 예약매가변경 조회
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectChangeReservationPrice.do", method = RequestMethod.POST)
	public void selectChangeReservationPrice(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("P_STR_CODE"));
		paramMap.put("P_APPL_STR_DT", request.getParameter("P_APPL_STR_DT"));
		paramMap.put("P_APPL_END_DT", request.getParameter("P_APPL_END_DT"));
		paramMap.put("P_ITM_CODE", request.getParameter("P_ITM_CODE"));
		paramMap.put("CUR", CUR);
		
		crpService.selectChangeReservationPrice(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	@RequestMapping(value = "/excelChangeReservationPrice.do", method = RequestMethod.POST)
	public ModelAndView excelChangeReservationPrice(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map;
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_STR_CODE", (String) param.get("P_STR_CODE"));
		param.put("P_APPL_STR_DT", (String) param.get("P_APPL_STR_DT"));
		param.put("P_APPL_END_DT", (String) param.get("P_APPL_END_DT"));
		param.put("P_ITM_CODE", (String) param.get("P_ITM_CODE"));
		
		map = crpService.excelChangeReservationPrice(param);
		
		mav.addObject("excelList", map);
		mav.setViewName("excelDownloadView");
		
		return mav;
		
	}
	
	/**
	 * 예약매가변경 저장
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/registChangeReservationPrice.do", method = RequestMethod.POST)
	public void registChangeReservationPrice(HttpServletRequest request, HttpServletResponse response ) throws Exception {
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		paramMap.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		paramMap.put("P_STR_CODE", request.getParameter("ADD_STR_CODE"));
		paramMap.put("P_APPL_DT", request.getParameter("ADD_APPL_DT"));
		paramMap.put("P_SCAN_CODE", request.getParameter("ADD_SCAN_CODE"));
		paramMap.put("P_ITM_CODE", request.getParameter("ADD_ITM_CODE"));
		paramMap.put("P_TAX_GB", request.getParameter("ADD_TAX_GB"));
		paramMap.put("P_WPRC", request.getParameter("ADD_WPRC"));
		paramMap.put("P_WVAT", request.getParameter("ADD_WVAT"));
		paramMap.put("P_SPRC", request.getParameter("ADD_SPRC"));
		paramMap.put("P_CHG_WPRC", request.getParameter("ADD_CHG_WPRC"));
		paramMap.put("P_CHG_WVAT", request.getParameter("ADD_CHG_WVAT"));
		paramMap.put("P_CHG_SPRC", request.getParameter("ADD_CHG_SPRC"));
		paramMap.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		paramMap.put("CUR", CUR);
		
		crpService.registChangeReservationPrice(paramMap);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(paramMap.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		
	}
	
	
	/**
	 * 변경데이터 로드 - 엑셀 데이터를 DB 에 던지고 다시 리턴 받는다. 
	 * 
	 * @param  
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/changeReserExcel.do", method = RequestMethod.POST)
	@ResponseBody
	public void changeReserExcel(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
		    
		param.put("P_CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		param.put("P_STR_CODE", CommonUtil.getEnv(request.getSession()).getSTR_CODE());
		param.put("EXCEL_DATA",  request.getParameter("EXCEL_DATA"));
		param.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		/*param.put("P_ADD_APPL_DT" 		, request.getParameter("ADD_APPL_DT" )    				 		) ;  
		param.put("P_ADD_SCAN_CODE" 		, request.getParameter("ADD_SCAN_CODE" )    				 		) ;  
		param.put("P_ADD_CHG_WPRC" 		, request.getParameter("ADD_CHG_WPRC" )    				 		) ;  
		param.put("P_ADD_CHG_WVAT" 		, request.getParameter("ADD_CHG_WVAT" )    				 		) ;  
		param.put("P_ADD_CHG_SPRC" 		, request.getParameter("ADD_CHG_SPRC" )    				 		) ;  */
		param.put("CUR"			, CUR														); 
		System.out.println("tttt : " + param);
		
		 
		 
		List<Map<String, Object>> resultList = crpService.changeReserExcel(param);
		
		
 		System.out.println("zzzzzz : " + resultList); 
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	/**
	 * POS마감정산 > 엑셀다운로드(더존) 조건 체크
	 * @param  
	 *             
	 * @param model
	 * @exception Exception
	 */
	@RequestMapping(value = "/changeReserExcel_map.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> changeReserExcel_map(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result_out = new HashMap<String, Object>();
		
		ArrayList<Object> CUR = new ArrayList<Object>();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		param.put("P_RETURN_CODE", "1111");	//1111 성공코드셋팅하고
		param.put("P_CORP_CODE" 	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		param.put("P_STR_CODE", CommonUtil.getEnv(request.getSession()).getSTR_CODE());
		param.put("EXCEL_DATA",  request.getParameter("EXCEL_DATA"));
		param.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
		/*param.put("P_ADD_APPL_DT" 		, request.getParameter("ADD_APPL_DT" )    				 		) ;  
		param.put("P_ADD_SCAN_CODE" 		, request.getParameter("ADD_SCAN_CODE" )    				 		) ;  
		param.put("P_ADD_CHG_WPRC" 		, request.getParameter("ADD_CHG_WPRC" )    				 		) ;  
		param.put("P_ADD_CHG_WVAT" 		, request.getParameter("ADD_CHG_WVAT" )    				 		) ;  
		param.put("P_ADD_CHG_SPRC" 		, request.getParameter("ADD_CHG_SPRC" )    				 		) ;  */
		System.out.println("tttt : " + param);
		
		try {
			
			crpService.changeReserExcel_map(param);
			
			/*Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			System.out.println(jsonList);
			result.put("list", jsonList);*/
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  result.get("CUR") );
			
			result.put("list", jsonList);
			
			//result.put("list", param.get("CUR"));
			
			/*result.put("RETURN_CODE", result.get("RETURN_CODE"));
			result.put("RETURN_MSG", result.get("RETURN_MSG"));
			result.put("CUR", result.get("CUR"));*/
			
			
			/*param.put("EXCEL_DATA", param.get("EXCEL_DATA").toString().replace("&lt;", "<"));
			param.put("EXCEL_DATA", param.get("EXCEL_DATA").toString().replace("&gt;", ">"));
			result.put("list", param.get("EXCEL_DATA"));*/
			result.put("RETURN_CODE", result.get("RETURN_CODE"));
			result.put("RETURN_MSG", result.get("RETURN_MSG"));
			System.out.println("aaa : " + param);
			System.out.println("bbb : " + result);
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return param;
	}
	
	
	

}
