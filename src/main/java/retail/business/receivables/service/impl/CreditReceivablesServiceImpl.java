package retail.business.receivables.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import retail.business.receivables.service.CreditReceivablesService;
/**
 * @Class Name : CreditReceivablesServiceImpl.java
 * @Description : CreditReceivablesServiceImpl Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017.04.05           최초생성
 *
 * @author 추황영
 * @since 2017.04.05
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Service("CreditReceivablesService")
public class CreditReceivablesServiceImpl implements CreditReceivablesService{

	@Autowired
	private CreditReceivablesDao cRDao;
	/**
	 * 외상매출미수권조회
	 */
	public void  creditReceivablesList(Map<String, Object> param) throws Exception {
		cRDao.creditReceivablesList(param);
	}
	
}
