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
package retail.inoutcenter.mng.web;
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
import retail.inoutcenter.mng.service.InOutCenterMngService;
import retail.order.store.service.OrderStoreExcelVO;

import com.google.gson.Gson;
 

/**
 * @Class Name : InOutCenterMngController.java
 * @Description : 대출입
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class InOutCenterMngController {

	@Autowired
	private InOutCenterMngService	inOutCenterMngService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	 
	
	 //	대출입 등록 화면 
	@RequestMapping(value = "/inoutcenterMng.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView inoutcenterMng(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/inoutcenter/mng/inOutCenterMng");  
		return   mav; 
	}
	
	

	/**
	 * 대출입헤더 목록 조회.    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/inOutCenterHeadSearch.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  inOutCenterHeadSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
   
		Map<String, Object>  paramMap = new HashMap<String, Object>();
 	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
		 
		param.put("CORP_CODE"		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() )  ;
		param.put("INOUT_GB" 		, request.getParameter("INOUT_GB" )		) ; 
		param.put("STR_CODE"    	, request.getParameter("STR_CODE" )  	) ;  
		param.put("VEN_CODE"    	, request.getParameter("VEN_CODE" )  	) ;  
		
		param.put("DIN_OUT_DT_FROM" , request.getParameter("DIN_OUT_DT_FROM" )	) ; 
		param.put("DIN_OUT_DT_TO"   , request.getParameter("DIN_OUT_DT_TO" )	) ;  
		param.put("CFM_YN"    		, request.getParameter("CFM_YN" )		) ;  
		param.put("CUR"				, CUR	); 
		 
		List<Map<String, Object>> resultList = inOutCenterMngService.inOutCenterHeadSearch(param);
   
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
   
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}

	
	
	/**
	 * 대출입상품 리스트 정보 보여주기    
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/inOutCenterDetailInfo.do",  method = RequestMethod.POST)
	@ResponseBody
	public void  inOutCenterDetailInfo( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
	  
		ArrayList<Object> CUR = new ArrayList<Object>();  
 
		param.put("CORP_CODE"		  ,  CommonUtil.getEnv(request.getSession()).getCORP_CODE() ) ;
		param.put("INOUT_GB"    	  ,  request.getParameter("INOUT_GB")						) ; 
		param.put("STR_CODE"    	  ,  request.getParameter("STR_CODE")						) ; 
		param.put("SLIP_NO"    		  ,  request.getParameter("SLIP_NO")						) ; 
		param.put("CUR"				  ,  CUR													) ; 
		
		log.debug("===========================================================================");
		log.debug("InOutCenterMngController.inOutCenterDetailInfo param :: " + param.toString());
		
		List<Map<String, Object>> resultList = inOutCenterMngService.inOutCenterDetailInfo(param);
  
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  resultList  );
   
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
		 
	}


	/**
	 * 대출입  확정 등록      
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/inOutCenterConfirm.do", method = RequestMethod.POST)
	@ResponseBody
	public   void inOutCenterConfirm(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
 
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		    
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
		
		Date d = new Date();    
		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
        
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;   
		param.put("INOUT_GB"    	        , request.getParameter("INOUT_GB" )    						) ; 
		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;  
		param.put("UEMP_NO"    	  		, CommonUtil.getEnv(request.getSession()).getUserId() 	) ;   
		param.put("RETURN_CUR"	      		, RETURN_CUR												);
		   
		
		List<Map<String, Object>> resultList = inOutCenterMngService.inOutCenterConfirm(param);
		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
	
	
	 //	report  
	@RequestMapping(value = "/inOutCenterMngPrint.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView inOutCenterMngPrint(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/aireport/inoutcenter/mng/inOutCenterMngPrint");  
		 
		return   mav; 
	}
	
	
	
	
	
	/**
	 * 대출입  저장 ( 디테일) 업데이트     
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/inOutRegister.do", method = RequestMethod.POST)
	@ResponseBody
	public   void inOutRegister(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
 
//		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
		ArrayList<Object> CUR = new ArrayList<Object>(); 
	 
		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO();  
		    
		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;
		param.put("EMP_NO"    	 	  		, CommonUtil.getEnv(request.getSession()).getUserId()		) ;   
		param.put("SLIP_NO"      			, request.getParameter("SLIP_NO" )    				) ;  
		param.put("PURCH_DETAIL"      	    , request.getParameter("purchDetail" )    				) ; 
		param.put("INOUT_GB"      	        , request.getParameter("INOUT_GB" )    				) ; 
		
		param.put("RETURN_CUR"	      		, RETURN_CUR);
		   
		
		List<Map<String, Object>> resultList = inOutCenterMngService.inOutRegister(param);
		   
		Gson gson = new Gson();  
		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
		 
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
		  
	}
 
 
//	
//	
//	/**
//	 * 매입 생성 등록      
//	 * 
//	 * @param  
//	 * @param model
//	 * @return "mav"
//	 * @exception Exception
//	 */
//	@RequestMapping(value = "/jobOrderToPurch.do", method = RequestMethod.POST)
//	@ResponseBody
//	public   void jobOrderToPurch(@RequestParam Map<String, Object> param ,HttpServletRequest request, HttpServletResponse response )throws Exception { 
//  
////		Map<String, Object>  paramMap = new HashMap<String, Object>();		    
//		ArrayList<Object> CUR = new ArrayList<Object>(); 
//		    
//		OrderStoreExcelVO  RETURN_CUR  = new  OrderStoreExcelVO(); 
//		
//		Date d = new Date();    
//		SimpleDateFormat curDate = new SimpleDateFormat("yyyyMMdd");
//         
//		param.put("CORP_CODE"    	  		, CommonUtil.getEnv(request.getSession()).getCORP_CODE() 	) ;  
//		param.put("ORD_DT"      			, curDate.format(d)   										) ;   
//		param.put("REG_PATH"    	        , request.getParameter("REG_PATH" )    						) ; 
//		param.put("STR_CODE"    	        , request.getParameter("STR_CODE" )    						) ;  
//		
//		param.put("ITM_GB"    	            , request.getParameter("ITM_GB" )    						) ;  
//		param.put("LRG_CODE"    	        , request.getParameter("LRG_CODE" )    						) ; 
//		param.put("SLIP_NO"    	            , request.getParameter("SLIP_NO" )    						) ;  
//		
//		param.put("RETURN_CUR"	      		, RETURN_CUR												);
//		   
//		
//		List<Map<String, Object>> resultList = purchMngService.jobOrderToPurch(param);
// 		   
//		Gson gson = new Gson();  
//		String jsonStr_RETURN_CUR 	= gson.toJson( resultList );
//		
//		 
//		response.setContentType("text/json; charset=utf-8");
//		response.getWriter().print(jsonStr_RETURN_CUR);
//		  
//	}
//	
//	
	
	 
	 //	대출입 등록 화면 
	@RequestMapping(value = "/inoutcenterSumMng.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView inoutcenterSumMng(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/inoutcenter/mng/inoutcenterSumMng");  
		return   mav; 
	}
	
	
	//점대출,점매입,센터대출,센터매입
	@RequestMapping(value = "/inoutcenterSumMng_check.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> inoutcenterSumMng_check(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			log.debug("param :: " + param.toString());
			param = inOutCenterMngService.inoutcenterSumMng_check(param);
			log.debug("result :: " + param.toString());
			
			Gson gson = new Gson(); 
			String jsonList1 = gson.toJson(  param.get("RETURN_CUR_1") );
			String jsonList2 = gson.toJson(  param.get("RETURN_CUR_2") );
			String jsonList3 = gson.toJson(  param.get("RETURN_CUR_3") );
			String jsonList4 = gson.toJson(  param.get("RETURN_CUR_4") );
			String jsonList5 = gson.toJson(  param.get("RETURN_CUR_5") );
			
			result.put("list1", jsonList1);
			result.put("list2", jsonList2);
			result.put("list3", jsonList3);
			result.put("list4", jsonList4);
			result.put("list5", jsonList5);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	 //	매입집계표(대출입포함)
	@RequestMapping(value = "/supplyPurchStateInout.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView supplyPurchStateInout(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/inoutcenter/mng/supplyPurchStateInout");  
		return   mav; 
	}
	
	//매입집계표(대출입포함) 조회
	@RequestMapping(value = "/supplyPurchStateInout_list.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> supplyPurchStateInout_list(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();

		try {
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			System.out.println("@@PARAM : " + param);
			
			param = inOutCenterMngService.supplyPurchStateInout_list(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			System.out.println("SUPPLY_PURCH_INOUT : " + param);
			result.put("list", jsonList);
			result.put("totalList", param.get("CUR2"));
			//result.put("totalCount", param.get("TOT_CNT"));
			
			/*result.put("RESULT_COUNT", param.get("RESULT_COUNT"));
			result.put("RESULT_DEC_QTY", param.get("RESULT_DEC_QTY"));
			result.put("RESULT_PUR_WPRC", param.get("RESULT_PUR_WPRC"));
			result.put("RESULT_PUR_WVAT", param.get("RESULT_PUR_WVAT"));
			result.put("RESULT_SUM", param.get("RESULT_SUM"));
			result.put("TOT_BOT_SUM", param.get("TOT_BOT_SUM"));
			result.put("TOT_PAY", param.get("TOT_PAY"));*/
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
    /**
     * 평균단가 조정등록(대출입)
     * @param model
     * @return "mav"
     * @exception Exception
     */	
	 //	평균단가 조정등록
	@RequestMapping(value = "/inoutUnitpriceAvg.do", method =  {RequestMethod.GET, RequestMethod.HEAD} )
	public ModelAndView inoutUnitpriceAvg(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/inoutcenter/mng/inoutUnitpriceAvg");  
		return   mav; 
	}
	
	/**
     * 평균단가 조정등록 내역조회(대출입)
     * @param model
     * @return "mav"
     * @exception Exception
     */
	@RequestMapping(value = "/getUnitPriceAvgList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getUnitPriceAvgList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		param.put("P_CORP_CODE", 	CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_APP_DT", 		request.getParameter("P_APP_DT").replace("-",""));
		
		//log.debug("inOutCenterMngService.getUnitPriceAvgList param :: " + param.toString());
		//log.debug("result :: " + param.toString());
		inOutCenterMngService.getUnitPriceAvgList(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR1"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}
	
	
	/**
     * 평균단가 조정등록 유효성검사
     * @param model
     * @return "mav"
     * @exception Exception
     */
	@RequestMapping(value = "/countInoutUnitpriceAvgInfo.do", method = RequestMethod.POST)
	@ResponseBody
	public void countInoutUnitpriceAvgInfo(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		
		param.put("P_CORP_CODE"		, CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_INS_APP_DT"	, request.getParameter("P_INS_APP_DT").replace("-", ""));
		param.put("CUR"				, CUR);
		
		//log.debug("inOutCenterMngService.countInoutUnitpriceAvgInfo param :: " + param.toString());
		inOutCenterMngService.countInoutUnitpriceAvgInfo(param);
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   
	}
	
	
	/**
     * 평균단가 조정신규등록(대출입)
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/saveInoutUnitpriceAvg.do", method = RequestMethod.POST)
    @ResponseBody
    public void saveInoutUnitpriceAvg(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response, HttpSession session ) throws Exception {

        ArrayList<Object> CUR = new ArrayList<Object>(); 

        SessionModel sessionModel = CommonUtil.getEnv(session);
        param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
        param.put("P_IEMP_NO",   sessionModel.getUserId());
        param.put("CUR", CUR);
        
        System.out.println("@@UPDATE-PARAM : " + param);

        inOutCenterMngService.saveInoutUnitpriceAvg(param);

        Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   

    }
    
    
	/**
     * 평균단가 조정내역 수정(대출입)
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/updateInoutUnitpriceAvg.do", method = RequestMethod.POST)
    @ResponseBody
    public void updateInoutUnitpriceAvg(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response, HttpSession session ) throws Exception {

        ArrayList<Object> CUR = new ArrayList<Object>(); 

        SessionModel sessionModel = CommonUtil.getEnv(session);
        param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
        param.put("P_IEMP_NO",   sessionModel.getUserId());
        param.put("CUR", CUR);
        
        System.out.println("@@UPDATE-PARAM : " + param);

        inOutCenterMngService.updateInoutUnitpriceAvg(param);

        Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   

    }
	
	
}
