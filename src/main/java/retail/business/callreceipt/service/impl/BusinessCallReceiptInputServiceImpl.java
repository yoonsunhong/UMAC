package retail.business.callreceipt.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import retail.business.callreceipt.service.BusinessCallReceiptInputService;

@Service("BusinessCallReceiptInputService")
public class BusinessCallReceiptInputServiceImpl implements BusinessCallReceiptInputService{
	
	@Autowired
	private BusinessCallReceiptInputDao bcrDao;
	
	/* 콜센터 주문 고객 정보 조회
	 * @see retail.business.callreceipt.service.BusinessCallReceiptInputService#businessCallReceiptUserInfo(java.util.Map)
	 */
	@Override
	@Transactional
	public void businessCallReceiptUserInfo(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallReceiptUserInfo(paramMap);
	}
	
	/* 콜센터 주문 고객 주문 이력 조회
	 * @see retail.business.callreceipt.service.BusinessCallReceiptInputService#businessCallOrderHistory(java.util.Map)
	 */
	@Override
	@Transactional
	public void businessCallOrderHistory(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallOrderHistory(paramMap);
	}
	
	/* 콜센터 주문 상품 검색
	 * @see retail.business.callreceipt.service.BusinessCallReceiptInputService#businessCallOrderProduct(java.util.Map)
	 */
	@Override
	@Transactional
	public void businessCallOrderProduct(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallOrderProduct(paramMap);
	}
	
	@Override
	@Transactional
	public void businessCallOrderUser(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallOrderUser(paramMap);
	}
	
	@Override
	@Transactional
	public void businessCallDetermine(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallDetermine(paramMap);
	}
	
	/* 콜센터 주문 상품 조회
	 * @see retail.business.callreceipt.service.BusinessCallReceiptInputService#businessCallSelectProduct(java.util.Map)
	 */
	@Override
	@Transactional
	public void businessCallSelectProduct(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallSelectProduct(paramMap);
	}
	
	@Override
	@Transactional
	public void businessCallSelectProduct2(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallSelectProduct2(paramMap);
	}
	
	/* 콜센터 주문접수 행사상품 검색
	 * @see retail.business.callreceipt.service.BusinessCallReceiptInputService#businessCallSelectEvent(java.util.Map)
	 */
	@Override
	@Transactional
	public void businessCallSelectEvent(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallSelectEvent(paramMap);
	}
	
	@Override
	@Transactional
	public void businessCallSelectSlip(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallSelectSlip(paramMap);
	}
	
	/* 콜센터 주문접수 등록
	 * @see retail.business.callreceipt.service.BusinessCallReceiptInputService#businessCallReceiptRegist(java.util.Map)
	 */
	@Override
	@Transactional
	public void businessCallReceiptRegist(Map<String, Object> paramMap) throws Exception{
		bcrDao.businessCallReceiptRegist(paramMap);
	}
	
	/* 콜센터 주문 접수건 POS 상품 등록 현황 조회
	 * @see retail.business.callreceipt.service.BusinessCallReceiptInputService#selectBusinessCallPos(java.util.Map)
	 */
	@Override
	@Transactional
	public void selectBusinessCallPos(Map<String, Object> paramMap) throws Exception{
		bcrDao.selectBusinessCallPos(paramMap);
	}

}
