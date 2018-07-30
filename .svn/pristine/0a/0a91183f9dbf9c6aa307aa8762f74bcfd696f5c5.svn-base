package retail.salesmng.point.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : SalesMngPointDao.java
 * @Description : 
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 01.05           최초생성
 *
 * @author 오동근
 * @since 2017. 01. 05.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("SalesMngPointDao")
public class SalesMngPointDao extends EgovAbstractDAO {
	
	/**
	 * 포인트 임의등록현황 List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectSalesMngPoint(Map<String, Object> params) throws Exception {
		select("salesMngPoint.selectSalesMngPoint", params);
		return params;
	}
	
	

}
