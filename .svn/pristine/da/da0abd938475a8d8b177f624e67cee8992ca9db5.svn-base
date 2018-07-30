package retail.purch.supply.web;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SupplyPurchStateController {

	/**
	 * 영업일보 출력화면
	 * @param  
	 *             
	 * @param model
	 * @return "mav"
	 * @exception Exception
	 */
	@RequestMapping(value = "/supplyPurchState.do", method = RequestMethod.GET)
	public ModelAndView daylySalesState(@RequestParam Map<String, Object> param, HttpServletResponse response ) throws Exception {
		
		ModelAndView mav = new  ModelAndView();
		mav.setViewName("retail/purch/supply/supplyPurchState");
		
		return mav; 
	}
}
