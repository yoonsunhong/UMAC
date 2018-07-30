/**
 * 
 */
/**
 * @author jhs
 *
 */
package retail.member.membership.web;

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

import retail.common.CommonUtil;
import retail.member.membership.service.MemberShipService;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Controller
public class MemberShipController {
	
	private final Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private MemberShipService memberShipService;
	
	@RequestMapping(value = "/memberShip.do", method=RequestMethod.GET)
	public ModelAndView memberShip (HttpServletRequest request, HttpServletResponse response )throws Exception {
		ModelAndView mav = new  ModelAndView("retail/member/membership/memberShip");
		return mav; 
	}
	
	
	@RequestMapping(value = "/memberShipList.do", method=RequestMethod.POST)
	@ResponseBody
	public void memberShipList(@RequestParam Map<String, Object> param, HttpServletResponse response) {
		
		
		try {
			
//			String corpCode = EgovStringUtil.isNullToString(param.get("S_CUST_NAME"), "");
//			String custNo = EgovStringUtil.isNullToString(param.get("B_CUST_NO"), "");
//			
//			if(!"".equals(corpCode) && !"".equals(custNo))	// 사업자탭 조회시 파라미터 변경
//			{
//				param.put("P_CORP_CODE", corpCode);
//				param.put("P_CUST_NO", custNo);
//			}
			
			ArrayList<Object> CUR = new ArrayList<Object>();
			param.put("CUR", CUR); 
			
			log.debug("param :: " + param.toString());
			List<Map<String, Object>> resultList = memberShipService.getMemberShipList(param);
			log.debug("result :: " + resultList.toString());
			
			  
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create(); 
			String jsonStr = gson.toJson(  resultList  );
	  
			
			log.debug("JSON :: " + jsonStr);
				
			response.setContentType("text/json; charset=utf-8");
			response.getWriter().print(jsonStr); 
			
			
	 	  
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}