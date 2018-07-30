package retail.product.category.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.product.category.service.ProductCategoryService;

/**
 * @Class Name : ProductCategoryServiceImpl.java
 * @Description : ProductCategoryService Class
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

@Service("ProductCategoryService")
public class ProductCategoryServiceImpl  implements ProductCategoryService{
	
	@Autowired
	private ProductCategoryDao productDao;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductCategoryServiceImpl.class);
	
	/* 상품분류코드체계  조회(대분류)
	 * @see retail.product.category.service.ProductCategoryService#selectLRGCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectLRGCode(Map<String, Object> paramMap) throws Exception{
		productDao.selectLRGCode(paramMap);
	}
	
	/* 상품분류코드체계  조회(대분류)
	 * @see retail.product.category.service.ProductCategoryService#selectLRGMaxCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectLRGMaxCode(Map<String, Object> paramMap) throws Exception{
		productDao.selectLRGMaxCode(paramMap);
	}
	
	/* 상품분류코드체계  조회(중분류)
	 * @see retail.product.category.service.ProductCategoryService#selectMIDCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectMIDCode(Map<String, Object> paramMap) throws Exception{
		productDao.selectMIDCode(paramMap);
	}
	
	
	/* 상품분류코드체계 조회(소분류)
	 * @see retail.product.category.service.ProductCategoryService#selectSMLCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectSMLCode(Map<String, Object> paramMap) throws Exception{
		productDao.selectSMLCode(paramMap);
	}
	
	/* 상품분류체계 저장(대분류)
	 * @see retail.product.category.service.ProductCategoryService#registerLRGCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void registerLRGCode(Map<String, Object> paramMap) throws Exception{
		productDao.registerLRGCode(paramMap);
	}
	
	/* 상품분류체계 저장(중분류)
	 * @see retail.product.category.service.ProductCategoryService#registerMIDCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void registerMIDCode(Map<String, Object> paramMap) throws Exception{
		productDao.registerMIDCode(paramMap);
	}
	
	/* 상품분류체계 저장(소분류)
	 * @see retail.product.category.service.ProductCategoryService#registerSMLCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void registerSMLCode(Map<String, Object> paramMap) throws Exception{
		productDao.registerSMLCode(paramMap);
	}
	
	/* 상품분류체계 삭제(대분류)
	 * @see retail.product.category.service.ProductCategoryService#deleteLRGCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteLRGCode(Map<String, Object> paramMap) throws Exception{
		productDao.deleteLRGCode(paramMap);
	}
	
	/* 상품분류체계 삭제(중분류)
	 * @see retail.product.category.service.ProductCategoryService#deleteMIDCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteMIDCode(Map<String, Object> paramMap) throws Exception{
		productDao.deleteMIDCode(paramMap);
	}
	
	/* 상품분류체계 삭제(소분류)
	 * @see retail.product.category.service.ProductCategoryService#deleteSMLCode(java.util.Map)
	 */
	@Override
	@Transactional
	public void deleteSMLCode(Map<String, Object> paramMap) throws Exception{
		productDao.deleteSMLCode(paramMap);
	}

}
