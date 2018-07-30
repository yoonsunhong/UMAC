
package retail.business.salesmst.web;

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

import retail.business.salesmst.service.SalesMstService;
import retail.common.CommonUtil;

@Controller
public class SalesMstController {

	@Autowired
	private SalesMstService salesMstService;
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	@RequestMapping(value = "/SalesMstDo.do", method = RequestMethod.GET)
	public ModelAndView SalesMstDo(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();		
		mav.setViewName("retail/business/salesMst/salesMst");		
		return mav; 
	}
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/salesMstInit.do", method = RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object> salesMstInit(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_EMP_NO", CommonUtil.getEnv(request.getSession()).getUserId());
			
			param.remove("P_STR_CODE");
			log.debug("param start :: " + param.toString());
			
			List<Map<String, Object>> resultList = salesMstService.salesMstInit(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson( resultList);
			log.debug("cur==>"+jsonList);
			result.put("result", jsonList);			// 회원등급현황	
		}catch(Exception e){
			e.printStackTrace();
		}		
		return result; 
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/salesMstSearch.do", method = RequestMethod.POST)
	@ResponseBody	
	public void salesMstSearch(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());

			List<Map<String, Object>> resultList = salesMstService.salesMstSearch(param);
			log.debug("result :: " + resultList);

			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  resultList );
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);

		}catch(Exception e){
			e.printStackTrace();
		}		
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/salesMstUpdate.do", method = RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object>  salesMstUpdate(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			param.put("P_CORP_CODE"        , CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_EMP_NO"    	   , CommonUtil.getEnv(request.getSession()).getUserId()) ;   
			param.put("P_GRIDXMLDATA"      , request.getParameter("gridXmlData" )    		 ) ; 
			
			List<Map<String, Object>> resultList = salesMstService.updateSalesMst(param);

			log.debug("result :: " + resultList);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  resultList );
			result.put("result", jsonList);		
			return result;
		}catch(Exception e){
			e.printStackTrace();
			result.put("result", "{'RETURN_CODE':'9999','RESULTVALUE':'"+e.getMessage()+"'}");			
			return result;
		}		
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/salesMstUpdateAll.do", method = RequestMethod.POST)
	@ResponseBody	
	public Map<String, Object>  salesMstUpdateAll(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			param.put("P_CORP_CODE"        , CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			param.put("P_EMP_NO"    	   , CommonUtil.getEnv(request.getSession()).getUserId()) ;   
			param.put("P_GRIDXMLDATA"      , request.getParameter("gridXmlData" )    		 ) ; 
			
			List<Map<String, Object>> resultList = salesMstService.updateSalesMstAll(param);

			log.debug("result :: " + resultList);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  resultList );
			result.put("result", jsonList);		
			return result;
		}catch(Exception e){
			e.printStackTrace();
			result.put("result", "{'RETURN_CODE':'9999','RESULTVALUE':'"+e.getMessage()+"'}");			
			return result;
		}		
	}
	
}
