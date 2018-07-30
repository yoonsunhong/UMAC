package retail.salesmng.point.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.salesmng.point.service.SalesMngPointService;

/**
 * 
 * @Class Name : SalesMngPointServiceImpl.java
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
@Service("SalesMngPointServiceImpl")
public class SalesMngPointServiceImpl implements SalesMngPointService{
	
	@Autowired
	private SalesMngPointDao saleMngPointDao;

	/**
	 * 포인트 임의등록현황 List
	 */
	public Map<String, Object> selectSalesMngPoint(Map<String, Object> params) throws Exception {
		return saleMngPointDao.selectSalesMngPoint(params);
	}

}
