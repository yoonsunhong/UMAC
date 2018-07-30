package retail.salesmng.point.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import retail.common.CommonUtil;
import retail.common.SessionModel;
import retail.salesmng.point.service.SalesMngPointService;

import com.google.gson.Gson;

/**
 * 
 * @Class Name : SalesMngPointController.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.02           최초생성
 *
 * @author 오동근
 * @since 2017. 01. 02.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class SalesMngPointController {
	
	@Autowired
	private SalesMngPointService salesMngPointService;
	
	/**
	 * 포인트임의등록현황 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesMngPointManagement.do", method = RequestMethod.GET)
	public ModelAndView memberPointOptionManagement(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/salesmng/point/salesMngPoint");
		return   mav; 
	}
	
	/**
	 * 포인트임의등록현황 리스트
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesMngPointList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> salesMngPointList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpSession session ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		System.out.println("@@PARAM : " + param);
		
		try {
			
			SessionModel sessionModel = CommonUtil.getEnv(session);
			param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
			
			param = salesMngPointService.selectSalesMngPoint(param);
			Gson gson = new Gson(); 
			String jsonList = gson.toJson(  param.get("CUR") );
			result.put("list", jsonList);
			System.out.println("@@pointMap : " + param.get("CUR"));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
