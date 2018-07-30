package retail.salesinfo.item.web;

import java.io.IOException;
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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.common.CommonUtil;
import retail.common.EgovStringUtil;
import retail.common.SessionModel;
import retail.salesinfo.item.service.ItemSalesStateService;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 
 * @Class Name : ItemSalesStateController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 04.26           최초생성
 *
 * @author 
 * @since 2017. 04. 26.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class ItemSalesStateController {
	
	private void initTest(HttpServletRequest request){
		request.setAttribute("ISLOGIN", "Y");
		request.setAttribute("CONF",    "00");
		request.setAttribute("USERNAME", "");
		request.setAttribute("CORP_CODE", "");

		
		SessionModel env = new SessionModel();
		env.setUserId("retail"); 
		env.setUserNm("테스트");  
		env.setCORP_CODE("U1");
		
		env.setGROUP_CODE("");
		env.setSTR_CODE("10015");
		env.setSTR_NAME("외부2");
		env.setDEPT_CODE("");
		env.setPOSITION("");
		env.setEMP_DUTY("");
		env.setSYS_CODE("");
		env.setLIMIT_LEVEL("");
		env.setROLE_ID("");
		
		//사용자 권한별 버튼 활성권한 저장
		env.setAUTH_SEARCH("Y");
		env.setAUTH_NEW("Y");
		env.setAUTH_SAVE("Y");
		env.setAUTH_DELETE("Y");
		env.setAUTH_EXCEL_DOWN("Y");
		env.setAUTH_EXCEL_UPLOAD("Y");
		env.setAUTH_PRINT("Y");
		env.setAUTH_SUBMIT("Y");
		env.setAUTH_CREATE("Y");
		CommonUtil.setEnv(request.getSession(), env); 

	}
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	@RequestMapping(value="/itemSalesState.do", method=RequestMethod.GET)
	public ModelAndView itemSalesState(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
		String url = "";
		url = "retail/salesinfo/item/itemSalesState";
		ModelAndView mav = new ModelAndView(url);
		return mav;
	}
	
	@RequestMapping(value="/itemSalesCustState.do", method=RequestMethod.GET)
	public ModelAndView itemCustSalesState(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
		String 	url = "retail/salesinfo/item/itemSalesCustState";
		ModelAndView mav = new ModelAndView(url);
		return mav;
	}
	
	@RequestMapping(value="/itemSalesEventState.do", method=RequestMethod.GET)
	public ModelAndView itemSalesEventState(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
		String 	url = "retail/salesinfo/item/itemSalesEventState";
		ModelAndView mav = new ModelAndView(url);
		return mav;
	}

	@RequestMapping(value="/deliverDayState.do", method=RequestMethod.GET)
	public ModelAndView deliverDayState(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
		String 	url = "retail/salesinfo/item/deliverDayState";
		ModelAndView mav = new ModelAndView(url);
		return mav;
	}
	
	@Autowired
	private ItemSalesStateService itemSalesStateService;
	
		
	/**
	 * @param request
	 * @param response
	 * @throws IOException 
	 * @throws Exception
	 */
	/*@RequestMapping(value ="/commonSearch.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  commonSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException { 
		//client 에서 던지고 싶은 URL 을 호출한다. param의 url 해당 url 은 sqlMap 하고 일치 하나로 통일
		
		Gson gson = new Gson(); 
		String jsonStr = "";
		
		
		
		Map<String, Object> result = new HashMap<String, Object>();		
		try{
			ArrayList<Object> CUR = new ArrayList<Object>();  
			
			String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			param.put("CUR", CUR);
			List<Map<String, Object>>  resultList=  itemSalesStateService.itemSalesStateList(param);
			log.debug("param>>>>>>>>>>"+param.toString());			

			if(resultList.size() > 0 ){
				log.debug("param>>>>>>>>>>"+param.toString());			
				jsonStr = gson.toJson(resultList);
				result.put("code", "0000");
				result.put("result", jsonStr);	
			}else{
				result.put("code", "9999");
				result.put("Alert", "조회된 건이 없습니다");
				log.debug("result>>>>>>>>>>"+result);			
			}
			
			return result;
		}catch(Exception e){
			log.debug("ERROR>>>>>>>>>>"+e.getMessage());
			result.put("code", "9999");
			result.put("Alert", e.getMessage());
			return result;
		}		 
	}*/	
	
	@RequestMapping(value ="/commonSearch.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  commonSearch( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException { 
		Map<String, Object> result = new HashMap<String, Object>();		
		try{
			String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			log.debug("ItemSalesStateController.commonSearch param :: " + param.toString());	
//			param = itemSalesStateService.itemSalesStateList(param);
			
			param = itemSalesStateService.itemSalesEventPopupList(param);
			
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			result.put("list", jsonList);
			

			/*if(resultList.size() > 0 ){
				log.debug("param>>>>>>>>>>"+param.toString());			
				jsonStr = gson.toJson(resultList);
				result.put("code", "0000");
				result.put("result", jsonStr);	
			}else{
				result.put("code", "9999");
				result.put("Alert", "조회된 건이 없습니다");
				log.debug("result>>>>>>>>>>"+result);			
			}
			
			return result;*/
		}catch(Exception e){
			/*log.debug("ERROR>>>>>>>>>>"+e.getMessage());
			result.put("code", "9999");
			result.put("Alert", e.getMessage());
			return result;*/
			e.printStackTrace();
		}		 
		return result;
	}	
	
	@RequestMapping(value ="/itemSingleSalesStateList.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  itemSingleSalesStateList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException { 
		Map<String, Object> result = new HashMap<String, Object>();		
		try{
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());					
			
			String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			log.debug("ItemSalesStateController.commonSearch param :: " + param.toString());	
			param = itemSalesStateService.itemSalesStateList(param);
			
//			param = itemSalesStateService.itemSalesEventPopupList(param);
			
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			String jsonList2 = gson.toJson(param.get("CUR2"));
			result.put("list", jsonList);
			result.put("list2", jsonList2);
			//result.put("totalCount", param.get("TOT_CNT"));
			
			
			/*if(resultList.size() > 0 ){
				log.debug("param>>>>>>>>>>"+param.toString());			
				jsonStr = gson.toJson(resultList);
				result.put("code", "0000");
				result.put("result", jsonStr);	
			}else{
				result.put("code", "9999");
				result.put("Alert", "조회된 건이 없습니다");
				log.debug("result>>>>>>>>>>"+result);			
			}
			
			return result;*/
		}catch(Exception e){
			/*log.debug("ERROR>>>>>>>>>>"+e.getMessage());
			result.put("code", "9999");
			result.put("Alert", e.getMessage());
			return result;*/
			e.printStackTrace();
		}		 
		return result;
	}	
	
	
	
	@RequestMapping(value ="/itemSingleSalesStateDetailList.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  itemSingleSalesStateDetailList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		try {
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("ItemSalesStateController.commonSearch param :: " + param.toString());
			param = itemSalesStateService.itemSalesStateDetailList(param);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			result.put("list", jsonList);
			result.put("totalCount", param.get("TOT_CNT"));
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	@RequestMapping(value ="/itemSalesStateList.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  itemSalesStateList( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException { 
		Map<String, Object> result = new HashMap<String, Object>();		
		try{
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수
			
			param.put("P_FIRST_INDEX", paginationInfo.getFirstRecordIndex());
			param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());					
			
			String P_SALES_SD = param.get("P_SALES_SD2")==null ? "":((String)param.get("P_SALES_SD2")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED2")==null ? "":((String)param.get("P_SALES_ED2")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			log.debug("ItemSalesStateController.commonSearch param :: " + param.toString());	
			param = itemSalesStateService.itemSalesEventStateList(param);
			
//			param = itemSalesStateService.itemSalesEventPopupList(param);
			
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			result.put("list", jsonList);
			
			
			/*if(resultList.size() > 0 ){
				log.debug("param>>>>>>>>>>"+param.toString());			
				jsonStr = gson.toJson(resultList);
				result.put("code", "0000");
				result.put("result", jsonStr);	
			}else{
				result.put("code", "9999");
				result.put("Alert", "조회된 건이 없습니다");
				log.debug("result>>>>>>>>>>"+result);			
			}
			
			return result;*/
		}catch(Exception e){
			/*log.debug("ERROR>>>>>>>>>>"+e.getMessage());
			result.put("code", "9999");
			result.put("Alert", e.getMessage());
			return result;*/
			e.printStackTrace();
		}		 
		return result;
	}	
	
	@RequestMapping(value ="/commonSearchDownload.do",  method = RequestMethod.POST)
	public ModelAndView  commonSearchDownload( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response )throws Exception { 
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = new HashMap();
		
		try{
			String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			
			log.debug("ItemSalesStateController.commonSearchDownload param :: " + param.toString());	
			
			map = itemSalesStateService.commonSearchDownload(param);

			mav.addObject("excelList", map);
			mav.setViewName("excelDownloadView");			
		}catch(Exception e){
			e.printStackTrace();
		}
		return mav;
	}
	

	@RequestMapping(value ="/deliverDayStateHeader.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  deliverDayStateHeader( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException { 
		//client 에서 던지고 싶은 URL 을 호출한다. param의 url 해당 url 은 sqlMap 하고 일치 하나로 통일
		
		Gson gson = new Gson(); 
		String jsonStr = "";
		
		
		
		Map<String, Object> result = new HashMap<String, Object>();		
		try{
			ArrayList<Object> CUR = new ArrayList<Object>();  
			
			String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			param.put("CUR", CUR);
			List<Map<String, Object>>  resultList=  itemSalesStateService.deliverDayStateHeader(param);
			log.debug("param>>>>>>>>>>"+param.toString());			

			if(resultList.size() > 0 ){
				log.debug("param>>>>>>>>>>"+param.toString());			
				jsonStr = gson.toJson(resultList);
				result.put("code", "0000");
				result.put("result", jsonStr);	
			}else{
				result.put("code", "9999");
				result.put("Alert", "조회된 건이 없습니다");
				log.debug("result>>>>>>>>>>"+result);			
			}
			
			return result;
		}catch(Exception e){
			log.debug("ERROR>>>>>>>>>>"+e.getMessage());
			result.put("code", "9999");
			result.put("Alert", e.getMessage());
			return result;
		}		 
	
	}
	@RequestMapping(value ="/deliverDayStateListCount.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  deliverDayStateListCount( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException { 
		//client 에서 던지고 싶은 URL 을 호출한다. param의 url 해당 url 은 sqlMap 하고 일치 하나로 통일
		
		Gson gson = new Gson(); 
		String jsonStr = "";
		
		
		
		Map<String, Object> result = new HashMap<String, Object>();		
		try{
			ArrayList<Object> CUR = new ArrayList<Object>();  
			
			String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			param.put("CUR", CUR);
			List<Map<String, Object>>  resultList=  itemSalesStateService.deliverDayStateListCount(param);
			log.debug("param>>>>>>>>>>"+param.toString());			
			
			if(resultList.size() > 0 ){
				log.debug("param>>>>>>>>>>"+param.toString());			
				jsonStr = gson.toJson(resultList);
				result.put("code", "0000");
				result.put("result", jsonStr);	
			}else{
				result.put("code", "9999");
				result.put("Alert", "조회된 건이 없습니다");
				log.debug("result>>>>>>>>>>"+result);			
			}
			
			return result;
		}catch(Exception e){
			log.debug("ERROR>>>>>>>>>>"+e.getMessage());
			result.put("code", "9999");
			result.put("Alert", e.getMessage());
			return result;
		}		 
		
	}
	@RequestMapping(value ="/deliverDayStateListSum.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  deliverDayStateListSum( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws IOException { 
		//client 에서 던지고 싶은 URL 을 호출한다. param의 url 해당 url 은 sqlMap 하고 일치 하나로 통일
		
		Gson gson = new Gson(); 
		String jsonStr = "";
		
		
		
		Map<String, Object> result = new HashMap<String, Object>();		
		try{
			ArrayList<Object> CUR = new ArrayList<Object>();  
			
			String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
			String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
			String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
			String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
			
			param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_SALES_SD", P_SALES_SD);
			param.put("P_SALES_ED", P_SALES_ED);			
			param.put("P_START_MM", P_START_MM);
			param.put("P_END_MM", P_END_MM);			
			param.put("CUR", CUR);
			List<Map<String, Object>>  resultList=  itemSalesStateService.deliverDayStateListSum(param);
			log.debug("param>>>>>>>>>>"+param.toString());			
			
			if(resultList.size() > 0 ){
				log.debug("param>>>>>>>>>>"+param.toString());			
				jsonStr = gson.toJson(resultList);
				result.put("code", "0000");
				result.put("result", jsonStr);	
			}else{
				result.put("code", "9999");
				result.put("Alert", "조회된 건이 없습니다");
				log.debug("result>>>>>>>>>>"+result);			
			}
			
			return result;
		}catch(Exception e){
			log.debug("ERROR>>>>>>>>>>"+e.getMessage());
			result.put("code", "9999");
			result.put("Alert", e.getMessage());
			return result;
		}		 
		
	}
	
	
	/**
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value ="/itemSalesCustStateSelect.do",  method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object>  itemSalesCustStateSelect( @RequestParam Map<String, Object> param , HttpServletRequest request,HttpServletResponse response ) throws Exception { 
		//client 에서 던지고 싶은 URL 을 호출한다. param의 url 해당 url 은 sqlMap 하고 일치 하나로 통일
		
		Gson gson = new Gson(); 
		String jsonStr = "";
		
		
		
		Map<String, Object> result = new HashMap<String, Object>();		
		ArrayList<Object> CUR = new ArrayList<Object>();  
		
		String P_SALES_SD = param.get("P_SALES_SD")==null ? "":((String)param.get("P_SALES_SD")).replaceAll("-","");
		String P_SALES_ED = param.get("P_SALES_ED")==null ? "":((String)param.get("P_SALES_ED")).replaceAll("-","");
		String P_START_MM = param.get("P_START_MM")==null ? "":((String)param.get("P_START_MM")).replaceAll("-","");
		String P_END_MM = param.get("P_END_MM")==null ? "":((String)param.get("P_END_MM")).replaceAll("-","");
		
		param.put("P_CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_SALES_SD", P_SALES_SD);
		param.put("P_SALES_ED", P_SALES_ED);			
		param.put("P_START_MM", P_START_MM);
		param.put("P_END_MM", P_END_MM);			
		param.put("CUR", CUR);
		List<Map<String, Object>>  resultList=  itemSalesStateService.itemSalesCustStateSelect(param);
		log.debug("param>>>>>>>>>>"+param.toString());			

		jsonStr = gson.toJson(gson.toJson(param.get("CUR")));
		result.put("result", jsonStr);	
		
		return result;
	}	
}












