package retail.business.manage.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

/**
 * 
 * @Class Name : BusinessManageDao.java
 * @Description : 영업관리 > 카드프리픽스, 주류판매대장 관리
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2017. 03.27           최초생성
 *
 * @author 오동근
 * @since 2017. 03. 27.
 * @version 1.0
 * @see Copyright (C) by Retailtech All right reserved.
 */
@Repository("BusinessManageDao")
public class BusinessManageDao extends EgovAbstractDAO {
	
	/**
	 * 카드프리픽스 관리 List
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectBusinessManageCard(Map<String, Object> param) throws Exception {
		select("businessManage.selectBusinessManageCard", param);
		return param;
	}
	
	/**
	 * 카드프리픽스 Insert
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> insertBusinessManageCard(Map<String, Object> param) throws Exception {
		select("businessManage.insertBusinessManageCard", param);
		return param;
	}
	
	/**
	 * 주류판매대장 관리 List
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectBusinessManageDrink(Map<String, Object> param) throws Exception {
		return (List<Map<String, Object>>) list("businessManage.selectBusinessManageDrink", param);
	}
	
	/**
	 * 주류판매대장 Update
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> updateBusinessManageDrink(Map<String, Object> param) throws Exception {
		select("businessManage.updateBusinessManageDrink", param);
		return param;
	}
	
}
