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
package retail.order.store.web;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.code.service.CodeVO;
import retail.common.CommonUtil;
//import retail.product.customer.service.ProductCustomerVO;
import retail.order.store.service.OrderStoreBonusService;
import retail.order.store.service.OrderStoreBonusVO;
import retail.product.box.service.ProductBoxVO;
import retail.product.customer.service.ProductCustomerVO;
import retail.login.service.LoginVO;

/**
 * @Class Name : OrderStoreBonusController.java
 * @Description : 덤 상품 발주등록(R1)
 * @Modification Information @
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 유재훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class OrderStoreBonusController {

	@Autowired
	private OrderStoreBonusService orderStoreBonusService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());


	// 발주 등록 화면
	@RequestMapping(value = "/orderStoreRegisterBonus.do", method ={RequestMethod.GET, RequestMethod.HEAD})
	public ModelAndView orderStoreRegisterBonus(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView("retail/order/store/orderStoreRegisterBonus");
		return mav;
	}


	/**
	 * 공통코드 테이블의 MGMT_ENTRY 가져오기.
	 *
	 * @param
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/getCommonMgmtEntryBonus.do", method = RequestMethod.POST)
	@ResponseBody
	public void getCommonMgmtEntryBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object> paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();

		param.put("CORP_CODE", 	CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("CD_CL", 		request.getParameter("CD_CL"));
		param.put("CD_ID", 		request.getParameter("CD_ID"));
		param.put("CUR", 		CUR);

		List<Map<String, Object>> resultList = orderStoreBonusService.getCommonMgmtEntryBonus(param);

		Gson gson = new Gson();
		String jsonStr = gson.toJson(resultList);

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}


	/**
	 * 바코드로 점 상품 가져오기 .
	 *
	 * @param
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderStoreProductSelectBonus.do", method = RequestMethod.POST)
	@ResponseBody
	public void orderStoreProductSelectBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object> paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();

		param.put("CORP_CODE", 	CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("SCAN_CODE", 	request.getParameter("SCAN_CODE"));
		param.put("STR_CODE", 	request.getParameter("STR_CODE"));
		param.put("VEN_CODE", 	request.getParameter("VEN_CODE"));
		param.put("PUR_GB", 	request.getParameter("PUR_GB"));
		param.put("CUR", 		CUR);

		List<Map<String, Object>> resultList = orderStoreBonusService.orderStoreProductSelectBonus(param);

		Gson gson = new Gson();
		String jsonStr = gson.toJson(resultList);

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}


	/**
	 * 발주  등록 (헤더 , 디테일)
	 *
	 * @param
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderStoreProductRegisterBonus.do", method = RequestMethod.POST)
	@ResponseBody
	public void orderStoreProductRegisterBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ArrayList<Object> CUR = new ArrayList<Object>();
		OrderStoreBonusVO RETURN_CUR = new OrderStoreBonusVO();

		param.put("CORP_CODE", 			CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("EMP_NO", 			CommonUtil.getEnv(request.getSession()).getUserId());
		param.put("CRUD_BIT", 			request.getParameter("CRUD_BIT"));
		param.put("ORDER_STORE_HEADER", request.getParameter("orderStoreHeader"));
		param.put("ORDER_STORE_DETAIL", request.getParameter("orderStoreDetail"));
		param.put("RETURN_CUR", 		RETURN_CUR);

		List<Map<String, Object>> resultList = orderStoreBonusService.orderStoreProductRegisterBonus(param);

		Gson gson = new Gson();
		String jsonStr_RETURN_CUR = gson.toJson(resultList);

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
	}


	/**
	 * 발주헤더 목록 조회.
	 *
	 * @param
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderHeadSearchBonus.do", method = RequestMethod.POST)
	@ResponseBody
	public void orderHeadSearchBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object>  paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();

		param.put("CORP_CODE", 		CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("STR_CODE", 		request.getParameter("STR_CODE"));
		param.put("PUR_DT_FROM", 	request.getParameter("PUR_DT_FROM"));
		param.put("PUR_DT_TO", 		request.getParameter("PUR_DT_TO"));
		param.put("CFM_YN", 		request.getParameter("CFM_YN"));
		param.put("PUR_GB", 		request.getParameter("PUR_GB"));
		param.put("CUR", 			CUR);

		List<Map<String, Object>> resultList = orderStoreBonusService.orderHeadSearchBonus(param);

		Gson gson = new Gson();
		String jsonStr = gson.toJson(resultList);

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}


	/**
	 * 발주헤더  정보 보기 oneSelect.
	 *
	 * @param
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderHeadInfoBonus.do",  method = RequestMethod.POST)
	@ResponseBody
	public void orderHeadInfoBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object> paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();

		param.put("CORP_CODE",	CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("SLIP_NO", 	request.getParameter("SLIP_NO"));
		param.put("CUR", 		CUR);

		List<Map<String, Object>> resultList = orderStoreBonusService.orderHeadInfoBonus(param);

		Gson gson = new Gson();
		String jsonStr = gson.toJson(resultList);

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}


	/**
	 * 발주상품 리스트 정보 보여주기
	 *
	 * @param
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderDetailInfoBonus.do", method = RequestMethod.POST)
	@ResponseBody
	public void orderDetailInfoBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object> paramMap = new HashMap<String, Object>();
		ArrayList<Object> CUR = new ArrayList<Object>();

		param.put("CORP_CODE",  CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("STR_CODE",  	request.getParameter("STR_CODE"));
		param.put("SLIP_NO",  	request.getParameter("SLIP_NO"));
		param.put("CUR", 		CUR);

		List<Map<String, Object>> resultList = orderStoreBonusService.orderDetailInfoBonus(param);

		Gson gson = new Gson();
		String jsonStr = gson.toJson(resultList);

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr);
	}


	/**
	 * 발주 삭제 - (헤더 , 디테일)  삭제
	 *
	 * @param
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderDelBonus.do", method = RequestMethod.POST)
	@ResponseBody
	public void orderDelBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {

		ArrayList<Object> CUR = new ArrayList<Object>();
		OrderStoreBonusVO RETURN_CUR = new OrderStoreBonusVO();

		param.put("CORP_CODE", 		CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("SLIP_NO_XML", 	request.getParameter("orderDelXml"));
		param.put("RETURN_CUR", 	RETURN_CUR);

		List<Map<String, Object>> resultList = orderStoreBonusService.orderDelBonus(param);

		Gson gson = new Gson();
		String jsonStr_RETURN_CUR = gson.toJson(resultList);

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
	@RequestMapping(value = "/purchConfirmBonus.do", method = RequestMethod.POST)
	@ResponseBody
	public void purchConfirmBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {

		ArrayList<Object> CUR = new ArrayList<Object>();
		OrderStoreBonusVO RETURN_CUR = new OrderStoreBonusVO();

		param.put("CORP_CODE", 	CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("SLIP_NO", 	request.getParameter("SLIP_NO"));
		param.put("RETURN_CUR",	RETURN_CUR);

		List<Map<String, Object>> resultList = orderStoreBonusService.purchConfirmBonus(param);

		Gson gson = new Gson();
		String jsonStr_RETURN_CUR = gson.toJson(resultList);

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
	}


	/**
	 * 발주 확정 취소
	 *
	 * @param
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/orderConfirmCancelBonus.do", method = RequestMethod.POST)
	@ResponseBody
	public void orderConfirmCancelBonus(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
		//ArrayList<Object> CUR = new ArrayList<Object>();
		OrderStoreBonusVO RETURN_CUR = new OrderStoreBonusVO();

		param.put("P_CORP_CODE",	CommonUtil.getEnv(request.getSession()).getCORP_CODE());
		param.put("P_PUR_DT", 		request.getParameter("P_PUR_DT").replace("-", ""));
		param.put("P_PUR_CFM_DT", 	request.getParameter("P_PUR_CFM_DT").replace("-", ""));
		param.put("RETURN_CUR", 	RETURN_CUR);
		
		//log.debug("===========================================================================");
		//log.debug("orderStoreBonusService.orderConfirmCancelBonus param :: " + param.toString());
		
		List<Map<String, Object>> resultList = orderStoreBonusService.orderConfirmCancelBonus(param);

		Gson gson = new Gson();
		String jsonStr_RETURN_CUR = gson.toJson(resultList);

		response.setContentType("text/json; charset=utf-8");
		response.getWriter().print(jsonStr_RETURN_CUR);
	}
	


}