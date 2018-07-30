package retail.stock.stockStatus.web;

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
import retail.common.EgovStringUtil;
import retail.stock.stockStatus.service.StockStatusService;

import com.google.gson.Gson;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 현상품재고현황
 * @author 최호정
 * @since 2017.06.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Controller
public class StockStatusController {

    /** log */
    private final Log log = LogFactory.getLog(this.getClass());

    @Autowired
    private StockStatusService stockStatusService;

    /**
     * 초기 화면 로드
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/stockStatus.do", method = RequestMethod.GET)
    public ModelAndView stockStatus(HttpServletRequest request, HttpServletResponse response) throws Exception { 
        ModelAndView mav = new  ModelAndView("retail/stock/stockStatus/stockStatusByItem"); 
        return   mav; 
    }

    /**
     * 현상품재고현황
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value ="/stockStatusList.do",  method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> stockStatusList(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception { 

        Map<String, Object> result = new HashMap<String, Object>();
        /** pageing setting */
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(EgovStringUtil.isNullToString(param.get("pageIndex"), 1));      // 현재페이지
        paginationInfo.setRecordCountPerPage(EgovStringUtil.isNullToString(param.get("pageUnit"), 25)); // 한 페이지당 게시되는 게시물 건 수
        paginationInfo.setPageSize(EgovStringUtil.isNullToString(param.get("pageSize"), 10));           // 페이지 리스트에 게시되는 페이지 건수,

        ArrayList<Object> CUR = new ArrayList<Object>();
        param.put("P_CORP_CODE",    CommonUtil.getEnv(request.getSession()).getCORP_CODE());
        param.put("P_STR_DATE",     ((String)param.get("P_STR_DATE")).replaceAll("-",""));
        param.put("P_END_DATE",     ((String)param.get("P_END_DATE")).replaceAll("-",""));
        param.put("P_FIRST_INDEX",  paginationInfo.getFirstRecordIndex());
        param.put("P_RECORD_COUNT", paginationInfo.getRecordCountPerPage());
        param.put("CUR", CUR);
        log.debug("Controller param>>>>>>>>>>"+param.toString());
        
        
        /*List<Map<String, Object>> resultList = stockStatusService.getStockStatusList(param);

        if(resultList.size() > 0 ){
            jsonStr = gson.toJson(resultList);
            result.put("code", "0000");
            result.put("result", jsonStr);
            result.put("totalCount", param.get("TOT_CNT"));
            log.debug("totalCount="+param.get("TOT_CNT"));
            //log.debug("result>>>>>>>>>"+result);
        }
        else{
            result.put("code", "9999");
            result.put("Alert", "조회된 건이 없습니다");
            log.debug("result>>>>>>>>>"+result);
        }
        return result;*/
        
        stockStatusService.getStockStatusList(param);
        
        log.debug("result :: " + param.toString());
        
        Gson gson = new Gson(); 
		String jsonList = gson.toJson(  param.get("CUR") );
		
		result.put("list", jsonList);
		result.put("totalCount", param.get("TOT_CNT"));
		return result;
    }

    /**
     * 현상품재고현황 엑셀파일용
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value ="/stockStatusExcel.do",  method = RequestMethod.POST)
    public ModelAndView stockStatusExcel(@RequestParam Map<String, Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
        ModelAndView mav = new ModelAndView();
        Map<String, Object> map;

        //Map<String, Object> paramMap = new HashMap<String, Object>();
        Map<String, Object>  CUR =  new HashMap<String, Object>();

        paramMap.put("P_CORP_CODE",    CommonUtil.getEnv(request.getSession()).getCORP_CODE());
        paramMap.put("P_STR_DATE",     ((String)paramMap.get("P_STR_DATE")).replaceAll("-",""));
        paramMap.put("P_END_DATE",     ((String)paramMap.get("P_END_DATE")).replaceAll("-",""));
        paramMap.put("CUR", CUR);
        log.debug("Controller Excel>>>>>>>>>>"+paramMap.toString());

        map = stockStatusService.stockStatusExcelDown(paramMap);
        log.debug("result SIZE:: " + map.size());

        mav.addObject("excelList", map);
        mav.setViewName("excelDownloadView");

        return mav;
    }

}
