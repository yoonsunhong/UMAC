package retail.product.category.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;


/**
 * @Class Name : ProductCategoryDao.java
 * @Description : ProductCategoryDao Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016. 12.22           최초생성
 *
 * @author 권용욱
 * @since 2016. 12.22
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@SuppressWarnings("unchecked")
@Repository("ProductCategoryDao")
public class ProductCategoryDao extends EgovAbstractDAO {
	
	/**
	 * 상품분류체계 조회(대분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectLRGCode(Map<String, Object> paramMap) throws Exception{
		list("productCategory.selectLRGCode", paramMap);
	}
	
	/**
	 * 상품분류체계 최대코드 조회(대분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectLRGMaxCode(Map<String, Object> paramMap) throws Exception{
		list("productCategory.selectLRGMaxCode", paramMap);
	}
	
	/**
	 * 상품분류체계 조회(중분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectMIDCode(Map<String, Object> paramMap) throws Exception{
		list("productCategory.selectMIDCode", paramMap);
	}
	
	/**
	 * 상품분류체계 조회(소분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectSMLCode(Map<String, Object> paramMap) throws Exception{
		list("productCategory.selectSMLCode", paramMap);
	}
	
	/**
	 * 상품분류체계 저장(대분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void registerLRGCode(Map<String, Object> paramMap) throws Exception{
		update("productCategory.registerLRGCode", paramMap);
	}
	
	/**
	 * 상품분류체계 저장(중분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void registerMIDCode(Map<String, Object> paramMap) throws Exception{
		update("productCategory.registerMIDCode", paramMap);
	}
	
	/**
	 * 상품분류체계 저장(소분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void registerSMLCode(Map<String, Object> paramMap) throws Exception{
		update("productCategory.registerSMLCode", paramMap);
	}
	
	
	/**
	 * 상품분류체계 삭제(대분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteLRGCode(Map<String, Object> paramMap) throws Exception{
		delete("productCategory.deleteLRGCode", paramMap);
	}
	
	/**
	 * 상품분류체계 삭제(중분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteMIDCode(Map<String, Object> paramMap) throws Exception{
		delete("productCategory.deleteMIDCode", paramMap);
	}
	
	/**
	 * 상품분류체계 삭제(소분류)
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteSMLCode(Map<String, Object> paramMap) throws Exception{
		delete("productCategory.deleteSMLCode", paramMap);
	}

}
