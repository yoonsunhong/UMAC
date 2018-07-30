package retail.business.doc.web;

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
import org.springframework.web.servlet.ModelAndView;

import retail.business.doc.service.BusinessDocService;
import retail.common.CommonUtil;

import com.google.gson.Gson;

/**
 * @Class Name : BusinessDocController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.05           최초생성
 *
 * @author kcy
 * @since 2017. 4. 21.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class BusinessDocController {
	@Autowired
	private BusinessDocService businessDocService;
	
	/** log */
	private final Log log = LogFactory.getLog(this.getClass());
	
	@RequestMapping(value="/businessDocMember.do", method=RequestMethod.GET)
	public ModelAndView businessDocMember() throws Exception{
		ModelAndView mv = new ModelAndView("retail/business/doc/businessDocMember");
		return mv;
	}
	
	@RequestMapping(value="/businessDocMemberList.do", method=RequestMethod.POST)
	public void businessDocMemberList(@RequestParam Map<String, Object>param, HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
			
			log.debug("===========================================================================");
			log.debug("BusinessDocController.businessDocMemberList param :: " + param.toString());
			List<Map<String, Object>> resultList = businessDocService.businessDocMemberList(param);
			
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(resultList);
			
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonList);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}















