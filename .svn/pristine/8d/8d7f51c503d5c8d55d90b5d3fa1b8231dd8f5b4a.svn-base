package retail.product.venChange.web;

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
import retail.product.venChange.service.ProductVenChangeService;

import com.google.gson.Gson;

/**
 * 
 * @Class Name : ProductVenChangeController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 04.12           최초생성
 *
 * @author 김창열
 * @since 2017. 04. 12.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class ProductVenChangeController {
	@Autowired
	private ProductVenChangeService productVenChangeService; 
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());	

	
	/************************** 매입처일괄변경 ***************************/
	//협력업체조회
	@RequestMapping(value="/productVenChange.do", method=RequestMethod.GET)
	public ModelAndView productVenChange() throws Exception{
		ModelAndView mav = new ModelAndView("retail/product/venChange/productVenChange");
		return mav;
	}	
	
	//상품마스터(공통)
	@RequestMapping(value="/productVenChangeList.do", method=RequestMethod.POST)
	public void productVenChangeList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response)throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("ProductVenChangeController.productVenChangeList param :: " + param.toString());
			List<Map<String, Object>>resultList = productVenChangeService.productVenChangeList(param);
			log.debug("result :: " + resultList);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);			
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	//상품마스터(공통)
	@RequestMapping(value="/productVenChangeUpdate.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> productVenChangeUpdate(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response)throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("ProductVenChangeController.productVenChangeUpdate param :: " + param.toString());
			param = productVenChangeService.productVenChangeUpdate(param);		
			log.debug("result : " + param.toString());
						
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(param.get("CUR"));
			
			result.put("list", jsonList);
			result.put("cmnNumber", param.get("RETURN_CMN_NUMBER"));				
			result.put("returnCode", param.get("RETURN_CODE"));
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}
}



















