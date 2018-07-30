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
package retail.groupGridTest.web;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import net.sf.json.JSONArray;  
import net.sf.json.JSONObject;  
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;

 
 


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
//import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import retail.code.service.CodeVO;
import retail.common.CommonUtil;
import retail.groupGridTest.service.GroupGridTestService;
import retail.groupGridTest.service.GroupGridTestVO;
import retail.login.service.LoginVO;
 

/**
 * @Class Name : GroupGridTestController.java
 * @Description : 메뉴관리
 * @Modification Information @ 
 * @ 수정일 수정자 수정내용 @ --------- ---------
 * @author 문희훈
 * @since 2016. 10.31
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */

@Controller
public class GroupGridTestController {

	@Autowired
	private GroupGridTestService groupGridTestService;

	/** log */
	private final Log log = LogFactory.getLog(this.getClass());

	
	/**
	 * 화면뷰 만들기.  
	 * 
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/groupGrid.do", method = RequestMethod.GET)
	public ModelAndView groupGrid(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/groupGridTest/groupGridTest"); 
		 
		return   mav; 
	}
	
	 
	/**
	 * 그룹그리드테스트 리스트 만들기.  
	 * 
	 * @param  
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/groupGridTest.do",  produces="application/xml" ,method = RequestMethod.POST)
	@ResponseBody
	public    Map<String, Object>  groupGridTest(HttpServletRequest request, HttpServletResponse response )throws Exception { 
  
		Map<String, Object>  paramMap = new HashMap<String, Object>();
		  
		ArrayList<Object> CUR = new ArrayList<Object>(); 
		GroupGridTestVO  RETURN_CUR  = new  GroupGridTestVO ();
		
		paramMap.put("P_YEAR_Y"     , "2008") ;  
		paramMap.put("CUR"			, CUR);
		paramMap.put("RETURN_CUR"	, RETURN_CUR);
		  
		groupGridTestService.groupGridTest(paramMap);
		 
		@SuppressWarnings("unchecked")
		List<GroupGridTestVO> RETURN_CUR_LIST = (List<GroupGridTestVO>) paramMap.get("RETURN_CUR"); 		  
		System.out.println("[  RETURN_MESSAGE ] : "   +  RETURN_CUR_LIST.get(0).getRETURN_MESSAGE()   );
		System.out.println("[  RETURN_CODE ] : "      +  RETURN_CUR_LIST.get(0).getRETURN_CODE()   );

 
		Gson gson = new Gson(); 
		String jsonStr 				= gson.toJson(  paramMap.get("CUR") );
		String jsonStr_RETURN_CUR 	= gson.toJson(  RETURN_CUR_LIST.get(0) );
		  
		// Json 을 XML 로 바꿀때 이부분을 이곳에 추가해준다.  jsonStr을 넣어준다.
		XMLSerializer xmlSerializer = new XMLSerializer();  
        JSONArray jsonObject  = JSONArray.fromObject( JSONSerializer.toJSON( jsonStr ) );    
        jsonStr = xmlSerializer.write( jsonObject  );  
        System.out.println( "strXml3 : " + jsonStr );  
   
	    // xml test 끝
	    
		System.out.println("[ CUR ] : "         + jsonStr);
		System.out.println("[ RETURN_CUR ] : "  + jsonStr_RETURN_CUR);
		
	 
		 
		paramMap.put("CUR"			, jsonStr              ); 
		paramMap.put("RETURN_CUR"	, jsonStr_RETURN_CUR );
		
		 
		
		return paramMap;
		  
	}

	
	 
}
