package retail.salesmng.credit.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * 
 * @Class Name : SalesMngCreditController.java
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
public class SalesMngCreditController {
	
	/**
	 * 포인트임의관리 화면 이동
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/salesMngCreditManagement.do", method = RequestMethod.GET)
	public ModelAndView memberPointOptionManagement(HttpServletRequest request, HttpServletResponse response )throws Exception { 
		ModelAndView mav = new  ModelAndView("retail/salesmng/credit/salesMngCredit");
		return   mav; 
	}

}
