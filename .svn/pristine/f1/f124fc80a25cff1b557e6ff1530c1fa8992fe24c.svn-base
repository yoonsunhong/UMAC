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
package retail.wms.stock.wmsStockChange.web;

 
import java.util.ArrayList;
import java.util.HashMap;
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
import retail.wms.stock.wmsStockChange.service.WmsStockChangeService;

import com.google.gson.Gson;


/**
 * WMS -StockChange 할당조정
 * @author 송원두
 * @since 2018. 02.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class WmsStockChangeController {

	@Autowired
	private WmsStockChangeService wmsStockChangeService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	/**
	 * WMS 할당조정 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	//수정
	@RequestMapping(value = "/wmsStockChange.do", method = RequestMethod.GET)
	public ModelAndView wmsStockChange(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/wms/stock/wmsStockChange/wmsStockChange"); 
		return   mav; 
	}
	
	
	/**
	 * WMS 입고내역
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsStockChangeList.do", method = RequestMethod.POST)
	@ResponseBody
	public void getWmsStockChangeList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		log.debug("param :: " + param.toString());
		wmsStockChangeService.getWmsStockChangeList(param);
		log.debug("result :: " + param.toString());
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR1"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   
			
	}
	
	
	/**
	 * 현 재고 조회
	 * @param param
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getWmsStockChangePreList.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getWmsStockChangePreList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response ) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		param.put("P_CORP_CODE", CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		
		log.debug("param :: " + param.toString());
		wmsStockChangeService.getWmsStockChangePreList(param);
		log.debug("result :: " + param.toString());
		
		Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR3") );
		
		result.put("list", jsonList);
			
		return result;
			
	}

    /**
     * 변경내역 조회
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/getWmsStockChangeInfoList.do", method = RequestMethod.POST)
    @ResponseBody
    public void getWmsStockChangeInfoList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response, HttpSession session ) throws Exception {
    	    	 
        SessionModel sessionModel = CommonUtil.getEnv(session);
        param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
        param.put("P_UEMP_NO",   sessionModel.getUserId());
		
		log.debug("param :: " + param.toString());
		wmsStockChangeService.getWmsStockChangeInfoList(param);
		log.debug("result :: " + param.toString());
		
		Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR2"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   

    }
	
    /**
     * 할당내용 수정 (update)
     * @param model
     * @return "mav"
     * @exception Exception
     */
    @RequestMapping(value = "/saveWmsStockChangeUpdate.do", method = RequestMethod.POST)
    @ResponseBody
    public void saveWmsStockChangeUpdate(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response, HttpSession session ) throws Exception {

        ArrayList<Object> CUR = new ArrayList<Object>(); 

        SessionModel sessionModel = CommonUtil.getEnv(session);
        param.put("P_CORP_CODE", sessionModel.getCORP_CODE());
        param.put("P_IEMP_NO",   sessionModel.getUserId());
        param.put("P_LINE_CODE", request.getParameter("INS_LINE_CODE"));
        param.put("CUR", CUR);
        
        System.out.println("@@UPDATE-PARAM : " + param);

        wmsStockChangeService.saveWmsStockChangeUpdate(param);

        Gson gson = new Gson(); 
		String jsonStr = gson.toJson(param.get("CUR"));
		
		System.out.println(jsonStr);
		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);   

    }
}
