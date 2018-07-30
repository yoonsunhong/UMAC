package retail.commonPopup.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.commonPopup.service.CommPopupService;

/**
 * 
 * @Class Name : CommPopupServiceImpl.java
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
@Service("CommPopupService")
public class CommPopupServiceImpl implements CommPopupService{
	
	@Autowired
	private CommPopupDao commPopupDao;

	/**
	 * 공통팝업 List
	 */
	public List<Map<String, Object>> selectCommPopList(Map<String, Object> paramMap) throws Exception {
		return commPopupDao.selectcommUserList(paramMap);
	}

	/**
	 * 점별 배송구분(ROUTE_GB)별 상품검색 
	 */
	public List<Map<String, Object>> storeRouteGbProduct(Map<String, Object> paramMap) throws Exception {
		return commPopupDao.storeRouteGbProduct(paramMap);
	}
	
	/**
	 *  
	 */
	public List<Map<String, Object>> selectedStoreProduct(Map<String, Object> paramMap) throws Exception {
		return commPopupDao.selectedStoreProduct(paramMap);
	}
	
	
	/**
	 * 점포명 select
	 */
	public Map<String, Object> getStrName(Map<String, Object> params)throws Exception {
		return commPopupDao.getStrName(params);
	}
	
	//
	public List<Map<String, Object>> getPaymentSelectBoxList_2(Map<String, Object> paramMap) throws Exception {
		return commPopupDao.getPaymentSelectBoxList_2(paramMap);
	}

}
