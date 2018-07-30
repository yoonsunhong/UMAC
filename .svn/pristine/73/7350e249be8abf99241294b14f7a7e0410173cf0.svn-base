package retail.member.email.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import retail.common.EgovStringUtil;
import retail.common.service.CommService;
import retail.posclosed.douzoneDay.web.PosClosedDouzoneDayController;

@Controller
public class MemberSendEmailController {
	
	@Autowired
	private CommService commService;
	
	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(PosClosedDouzoneDayController.class);
	
	@RequestMapping(value = "/memberSendEmailDouzone.do", method=RequestMethod.GET)
	public ModelAndView MemberDelivery() throws Exception{
		ModelAndView mav = new ModelAndView("retail/member/douzone/memberSendEmailDouzone");
		return mav; 
	}

	@RequestMapping(value="/memberSendEmailDouzoneList.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> memberSendEmailDouzoneList(@RequestParam Map<String, Object> param, HttpServletResponse response, HttpServletRequest request) throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		try{
			
			/** pageing setting */
			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));		// 현재페이지
			paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 20));	// 한 페이지당 게시되는 게시물 건 수
			paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));			// 페이지 리스트에 게시되는 페이지 건수,
			
			return result;
		}catch(Exception e){
			result.clear();
			result.put("error", e.getMessage());
			return result;
		}
	}
	
	
}
