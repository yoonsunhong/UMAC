/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package retail.purch.mng.web;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import retail.common.SessionModel;
import retail.order.store.service.OrderStoreExcelVO;
//import retail.product.customer.service.ProductCustomerVO;
import retail.purch.mng.service.PurchMngService;
import retail.purch.mng.service.PurchMngVO;

import com.google.gson.Gson;
 

/**
 * @Class Name : PurchMngController.java
 * @Description : 매입
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class PurchMngController {

	@Autowired
	private PurchMngService   purchMngService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	 
	
	 //	매입 등록 화면 
	@RequestMapping(value = "/purchMng.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView orderStoreRegister(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/purch/mng/purchMng");  
		return   mav; 
	}
	
	

	/**
	 * 매입헤더 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchHeadSearch.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  purchHeadSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"	, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("STR_CODE"    , request.getParameter("STR_CODE" )  	) ;  
		param.put("VEN_CODE" 	, request.getParameter("VEN_CODE" )		) ; 
		param.put("PUR_DT_FROM" , request.getParameter("PUR_DT_FROM" )	) ; 
		param.put("PUR_DT_TO"   , request.getParameter("PUR_DT_TO" )	) ; 
		param.put("PUR_GB"    	, request.getParameter("PUR_GB" )		) ; 
		param.put("CFM_YN"    	, request.getParameter("CFM_YN" )		) ; 
		param.put("PUR_CFM_DT"  , request.getParameter("PUR_CFM_DT" )	) ; 
		param.put("SLIP_NO"     , request.getParameter("SLIP_NO" )		) ; 
		
		param.put("CUR"			, CUR); 
		 
		List<Map<String, Object>> resultList = purchMngService.purchHeadSearch(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
   
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	
	/**
	 * 매입상품 리스트 정보 보여주기    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchDetailInfo.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  purchDetailInfo( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
 
		param.put("CORP_CODE"		  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ; 
		param.put("PUR_DT"    		  ,  request.getParameter("PUR_DT")							) ; 
		param.put("STR_CODE"    ,  request.getParameter("STR_CODE")					) ; 
		param.put("SLIP_NO"    		  ,  request.getParameter("SLIP_NO")						) ; 
		param.put("CUR"				  ,  CUR													); 
		 
		List<Map<String, Object>> resultList = purchMngService.purchDetailInfo(param);
  
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
   
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}
	
	
	
	/**
	 * 매입  저장 (헤더 , 디테일) 업데이트     
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchRegister.do", method = RequestMethod.POST)
	@ResponseBody
	public   void purchRegister(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
 
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
	 
		PurchMngVO  RETURN_CUR  = new  PurchMngVO();  
		    
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("SLIP_NO"      			, request.getParameter("SLIP_NO" )    				) ;  
		param.put("PURCH_DETAIL"      	    , request.getParameter("purchDetail" )    				) ; 
		param.put("RETURN_CUR"	      		, RETURN_CUR);
		   
		
		List<Map<String, Object>> resultList = purchMngService.purchRegister(param);
		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	


	/**
	 * 매입수량 수정  저장  업데이트     
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchRegisterAmt.do", method = RequestMethod.POST)
	@ResponseBody
	public   void purchRegisterAmt(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
 
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
	 
		PurchMngVO  RETURN_CUR  = new  PurchMngVO();  
		    
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("SLIP_NO"      			, request.getParameter("SLIP_NO" )    				) ;  
		param.put("PURCH_DETAIL"      	    , request.getParameter("purchDetail" )    				) ; 
		param.put("RETURN_CUR"	      		, RETURN_CUR);
		    
		List<Map<String, Object>> resultList = purchMngService.purchRegisterAmt(param);
		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}	
	
	
	
	/**
	 * 매입 확정 등록      
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchConfirm.do", method = RequestMethod.POST)
	@ResponseBody
	public   void purchConfirm(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
         
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		 
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;  
		
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		
		param.put("P_USER_ID", CommonUtil.getEnv(request.getSession()).getUserId() 	) ;  
		   
		
		List<Map<String, Object>> resultList = purchMngService.purchConfirm(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	 
	
	
	/**
	 * 매입 생성 등록      
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/jobOrderToPurch.do", method = RequestMethod.POST)
	@ResponseBody
	public   void jobOrderToPurch(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
         
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("ORD_DT"      			, curDate.format(d)   										) ;   
		param.put("REG_PATH"    	        , request.getParameter("REG_PATH" )    						) ; 
		param.put("STR_CODE"    	        , request.getParameter("STR_CODE" )    						) ;  
		
		param.put("ITM_GB"    	            , request.getParameter("ITM_GB" )    						) ;  
		param.put("LRG_CODE"    	        , request.getParameter("LRG_CODE" )    						) ; 
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;  
		param.put("ONLY_FRESH_PROCESS_GB"   , request.getParameter("ONLY_FRESH_PROCESS_GB" )     		) ;  
		
		
		  
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		    
		List<Map<String, Object>> resultList = purchMngService.jobOrderToPurch(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	 
	
	 //	report  
	@RequestMapping(value = "/purchMngPrint.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView purchMngPrint(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/aireport/purch/mng/purchMngPrint");  
		 
		return   mav; 
	}
	
	/**
	 * 시세정보등록관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchMarketPriceInfo.do", method = RequestMethod.GET)
	public ModelAndView purchMarketPriceInfo(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/purch/mng/purchMarketPrice");
		return   mav; 
	}
	
	/**
	 * 시세정보등록관리 List
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchMarketPriceList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> purchMarketPriceList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = purchMngService.selectPurchMarketPrice(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			String codeList = gson.toJson(  param.get("CUR2") );
			result.put("list", jsonList);
			result.put("codeList", codeList);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 시세정보등록관리 Insert
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchMarketPriceInsert.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> purchMarketPriceInsert(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = purchMngService.insertPurchMarketPrice(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/**
	 * 시세정보등록관리 DELETE
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchMarketPriceDelete.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> purchMarketPriceDelete(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			// P_USER_ID
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			param.put("P_USER_ID", sessionModel.getUserId());
			
			System.out.println("@@PARAM : " + param);
			
			param = purchMngService.deletePurchMarketPrice(param);
			
			System.out.println("@@RETURN_CODE : " + param.get("RETURN_CODE"));
			System.out.println("@@RETURN_MSG : " + param.get("RETURN_MSG"));
			
			result.put("RETURN_CODE", param.get("RETURN_CODE"));
			result.put("RETURN_MSG", param.get("RETURN_MSG"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	/**
	 * 점포별매입전표현황
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 * @author 김창열
	 * @since 2017. 04.19
	 */	
	/************************** 점포별매입전표현황 ***************************/
	//점포별매입전표현황
	@RequestMapping(value="/purchStoreChitStatus.do", method=RequestMethod.GET)
	public ModelAndView purchStoreChitStatus() throws Exception{
		ModelAndView mv = new ModelAndView("retail/purch/mng/purchStoreChitStatus");
		return mv;
	}
	
	//매입전표현황
	@RequestMapping(value="/purchStoreChitStatusList.do", method=RequestMethod.POST)
	public void purchStoreChitStatusList(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("PurchMngController.purchStoreChitStatusList param :: " + param.toString());
			List<Map<String, Object>>resultList = purchMngService.purchStoreChitStatusList(param);
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	//매입전표상세
	@RequestMapping(value="/purchStoreChitStatusDetail.do", method=RequestMethod.POST)
	public void purchStoreChitStatusDetail(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("PurchMngController.purchStoreChitStatusDetail param :: " + param.toString());
			List<Map<String,Object>>resultList = purchMngService.purchStoreChitStatusDetail(param);
			//log.debug("result :: " + resultList);
			
			Gson gson = new Gson();
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	
	
	/**
	 * 매입 삭제 - (헤더 , 디테일)  삭제 
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/purchDel.do", method = RequestMethod.POST)
	@ResponseBody
	public   void purchDel(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
   
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		PurchMngVO  RETURN_CUR  = new  PurchMngVO();  
		    
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
		param.put("SLIP_NO_XML"      		, request.getParameter("purchDelXml" )    						) ;  
		param.put("RETURN_CUR"	      		, RETURN_CUR);
		    
		List<Map<String, Object>> resultList = purchMngService.purchDel(param);
 		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		   
	}
	
	
	
	
	
	
	
	
	
	
}













