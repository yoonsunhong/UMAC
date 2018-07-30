package retail.commonPopup.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : CommPopupDao.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.16           최초생성
 *
 * @author 오동근
 * @since 2016. 12. 16.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@SuppressWarnings("unchecked")
@Repository("CommPopupDao")
public class CommPopupDao extends EgovAbstractDAO {

	
	/**
	 * 공통팝업 List
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectcommUserList(Map<String, Object> paramMap) throws Exception{
		return (List<Map<String, Object>>) list("commonPopup.selectcommUserList", paramMap);
	}
	
	/**
	 * 점별 배송구분(ROUTE_GB)별 상품검색 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> storeRouteGbProduct(Map<String, Object> paramMap) throws Exception{
		return (List<Map<String, Object>>) list("commonPopup.storeRouteGbProduct", paramMap);
	}
	
	 
	public List<Map<String, Object>> selectedStoreProduct(Map<String, Object> paramMap) throws Exception{
		return (List<Map<String, Object>>) list("commonPopup.selectedStoreProduct", paramMap);
	}
	
	
	
	/**
	 * 점포명 select
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getStrName(Map<String, Object> params) throws Exception {
		select("commonPopup.getStrName", params);
		return params;
	}
	
	//
	public List<Map<String, Object>> getPaymentSelectBoxList_2(Map<String, Object> paramMap) throws Exception{
		return (List<Map<String, Object>>) list("commonPopup.getPaymentSelectBoxList_2", paramMap);
	}
}
