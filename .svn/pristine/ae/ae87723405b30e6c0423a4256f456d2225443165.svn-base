package retail.business.callreceipt.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

@SuppressWarnings("unchecked")
@Repository("BusinessCallReceiptInputDao")
public class BusinessCallReceiptInputDao extends EgovAbstractDAO{
	
	/**
	 * 콜센터 주문등록 사용자 정보 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void businessCallReceiptUserInfo(Map<String, Object> paramMap) throws Exception{
		select("BCR.businessCallReceiptUserInfo", paramMap);
	}
	
	/**
	 * 콜센터 주문등록 주문 이력 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void businessCallOrderHistory(Map<String, Object> paramMap) throws Exception{
		list("BCR.businessCallOrderHistory", paramMap);
	}
	
	/**
	 * 콜센터 주문접수 주문상품 검색
	 * @param paramMap
	 * @throws Exception
	 */
	public void businessCallOrderProduct(Map<String, Object> paramMap) throws Exception{
		list("BCR.businessCallOrderProduct", paramMap);
	}
	
	public void businessCallOrderUser(Map<String, Object> paramMap) throws Exception{
		list("BCR.businessCallOrderUser", paramMap);
	}
	
	/**
	 * 콜센터 주문등록 주문 상품 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void businessCallSelectProduct(Map<String, Object> paramMap) throws Exception{
		list("BCR.businessCallSelectProduct", paramMap);
	}
	
	public void businessCallSelectProduct2(Map<String, Object> paramMap) throws Exception{
		list("BCR.businessCallSelectProduct2", paramMap);
	}
	
	/**
	 * 콜센터 주문접수 행사상품검색
	 * @param paramMap
	 * @throws Exception
	 */
	public void businessCallSelectEvent(Map<String, Object> paramMap) throws Exception{
		list("BCR.businessCallSelectEvent" , paramMap);
	}
	
	public void businessCallSelectSlip(Map<String, Object> paramMap) throws Exception{
		list("BCR.businessCallSelectSlip", paramMap);
	}
	
	
	/**
	 * 콜센터 주문접수 등록
	 * @param paramMap
	 * @throws Exception
	 */
	public void businessCallReceiptRegist(Map<String, Object> paramMap) throws Exception{
		insert("BCR.businessCallReceiptRegist", paramMap);
	}
	
	public void businessCallDetermine(Map<String, Object> paramMap) throws Exception{
		update("BCR.businessCallDetermine", paramMap);
	}
	
	/**
	 * 콜센터 주문 접수건 POS 상품 등록 현황 조회
	 * @param paramMap
	 * @throws Exception
	 */
	public void selectBusinessCallPos(Map<String, Object> paramMap) throws Exception{
		list("BCR.selectBusinessCallPos", paramMap);
	}
	
	
}
